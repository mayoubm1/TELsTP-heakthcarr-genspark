-- Function to automatically create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function after user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update course enrollment count
CREATE OR REPLACE FUNCTION public.update_course_enrollment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.courses
    SET enrolled_count = enrolled_count + 1
    WHERE id = NEW.course_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.courses
    SET enrolled_count = enrolled_count - 1
    WHERE id = OLD.course_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for enrollment count
DROP TRIGGER IF EXISTS on_enrollment_change ON public.enrollments;
CREATE TRIGGER on_enrollment_change
  AFTER INSERT OR DELETE ON public.enrollments
  FOR EACH ROW EXECUTE FUNCTION public.update_course_enrollment_count();

-- Function to calculate course progress
CREATE OR REPLACE FUNCTION public.calculate_course_progress(p_user_id UUID, p_course_id UUID)
RETURNS DECIMAL AS $$
DECLARE
  total_lessons INTEGER;
  completed_lessons INTEGER;
BEGIN
  -- Count total lessons in course
  SELECT COUNT(l.id) INTO total_lessons
  FROM public.lessons l
  JOIN public.modules m ON l.module_id = m.id
  WHERE m.course_id = p_course_id;

  -- Count completed lessons by user
  SELECT COUNT(lp.id) INTO completed_lessons
  FROM public.lesson_progress lp
  JOIN public.lessons l ON lp.lesson_id = l.id
  JOIN public.modules m ON l.module_id = m.id
  WHERE lp.user_id = p_user_id 
    AND m.course_id = p_course_id
    AND lp.is_completed = true;

  -- Calculate percentage
  IF total_lessons = 0 THEN
    RETURN 0;
  ELSE
    RETURN ROUND((completed_lessons::DECIMAL / total_lessons::DECIMAL) * 100, 2);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update enrollment progress when lesson is completed
CREATE OR REPLACE FUNCTION public.update_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
  v_course_id UUID;
  v_progress DECIMAL;
BEGIN
  -- Get course_id from lesson
  SELECT m.course_id INTO v_course_id
  FROM public.lessons l
  JOIN public.modules m ON l.module_id = m.id
  WHERE l.id = NEW.lesson_id;

  -- Calculate new progress
  v_progress := public.calculate_course_progress(NEW.user_id, v_course_id);

  -- Update enrollment progress
  UPDATE public.enrollments
  SET progress = v_progress,
      completed_at = CASE WHEN v_progress = 100 THEN NOW() ELSE NULL END
  WHERE user_id = NEW.user_id AND course_id = v_course_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for lesson progress update
DROP TRIGGER IF EXISTS on_lesson_progress_update ON public.lesson_progress;
CREATE TRIGGER on_lesson_progress_update
  AFTER INSERT OR UPDATE ON public.lesson_progress
  FOR EACH ROW 
  WHEN (NEW.is_completed = true)
  EXECUTE FUNCTION public.update_enrollment_progress();

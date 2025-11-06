-- Insert sample courses
INSERT INTO public.courses (id, title, description, department, level, duration_weeks, thumbnail_url, rating, enrolled_count) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Introduction to Biotechnology', 'Fundamentals of modern biotechnology and genetic engineering', 'Biotechnology', 'beginner', 8, 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400', 4.8, 1245),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Genomics and Bioinformatics', 'Advanced genomic analysis techniques and computational biology', 'Genomics', 'intermediate', 12, 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400', 4.9, 892),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'AI-Powered Diagnostics', 'Machine learning applications in medical diagnostics', 'AI in Healthcare', 'advanced', 10, 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400', 4.7, 654),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Molecular Biology Essentials', 'Core concepts in molecular biology and cellular processes', 'Medical Sciences', 'beginner', 6, 'https://images.unsplash.com/photo-1578496479531-32e296d6c977?w=400', 4.6, 1567),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Pharmaceutical Development', 'Drug discovery and pharmaceutical research methods', 'Pharmaceutical Sciences', 'advanced', 14, 'https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=400', 4.8, 723),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'Clinical Research Methods', 'Evidence-based research and clinical trial design', 'Medical Sciences', 'intermediate', 10, 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=400', 4.7, 891)
ON CONFLICT (id) DO NOTHING;

-- Insert sample modules for Introduction to Biotechnology course
INSERT INTO public.modules (id, course_id, title, description, order_index) VALUES
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Fundamentals of Biotechnology', 'Introduction to basic concepts and principles', 1),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Genetic Engineering', 'DNA manipulation and recombinant technology', 2),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Biotechnology Applications', 'Real-world applications in medicine and agriculture', 3)
ON CONFLICT (id) DO NOTHING;

-- Insert sample lessons
INSERT INTO public.lessons (id, module_id, title, description, type, duration_minutes, order_index) VALUES
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'What is Biotechnology?', 'Overview of biotechnology field', 'video', 30, 1),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'History of Biotechnology', 'Evolution of biotechnology through ages', 'video', 25, 2),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Quiz: Fundamentals', 'Test your knowledge', 'quiz', 15, 3),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'DNA Structure and Function', 'Understanding DNA molecules', 'video', 40, 1),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Recombinant DNA Technology', 'Techniques for DNA manipulation', 'video', 45, 2),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Virtual Lab: DNA Cloning', 'Hands-on DNA cloning simulation', 'lab', 60, 3)
ON CONFLICT (id) DO NOTHING;

-- Insert sample virtual labs
INSERT INTO public.virtual_labs (id, course_id, title, description, objectives, duration_minutes) VALUES
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'DNA Sequencing Simulation', 'Interactive DNA sequencing laboratory', ARRAY['Understand DNA sequencing process', 'Learn laboratory techniques', 'Analyze sequencing results'], 90),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'PCR Amplification Lab', 'Polymerase Chain Reaction simulation', ARRAY['Master PCR technique', 'Optimize reaction conditions', 'Troubleshoot common issues'], 75)
ON CONFLICT (id) DO NOTHING;

-- Insert sample assignments
INSERT INTO public.assignments (id, course_id, title, description, due_date, total_points) VALUES
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'DNA Sequencing Lab Report', 'Complete analysis of DNA sequencing results from virtual lab', NOW() + INTERVAL '7 days', 100),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Biotechnology Ethics Essay', 'Discuss ethical considerations in genetic engineering', NOW() + INTERVAL '14 days', 100),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Genomic Data Analysis Quiz', 'Assessment on genomic analysis techniques', NOW() + INTERVAL '10 days', 50)
ON CONFLICT (id) DO NOTHING;

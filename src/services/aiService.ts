import { supabase } from '../lib/supabase';
import type { AIPartner, Message } from '../types';

export const aiService = {
  /**
   * Get available AI partners
   */
  getAIPartners(): AIPartner[] {
    return [
      {
        id: 'mistral',
        name: 'Mistral',
        specialty: 'Biosciences Specialist',
        description: 'Expert in molecular biology, genetics, and biotechnology',
        is_online: true,
      },
      {
        id: 'claude',
        name: 'Claude',
        specialty: 'Research Mentor',
        description: 'Guidance on research methodology and scientific writing',
        is_online: true,
      },
      {
        id: 'gpt4',
        name: 'GPT-4',
        specialty: 'General Tutor',
        description: 'Comprehensive support across all subjects',
        is_online: true,
      },
      {
        id: 'gemini',
        name: 'Gemini',
        specialty: 'Analytics Guide',
        description: 'Data analysis and statistical support',
        is_online: true,
      },
      {
        id: 'perplexity',
        name: 'Perplexity',
        specialty: 'Knowledge Navigator',
        description: 'Research and information discovery',
        is_online: true,
      },
    ];
  },

  /**
   * Get chat history for a user with a specific AI partner
   */
  async getChatHistory(userId: string, partnerId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('ai_messages')
      .select('*')
      .eq('user_id', userId)
      .eq('partner_id', partnerId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return data.map(msg => ({
      ...msg,
      timestamp: new Date(msg.created_at),
    })) as Message[];
  },

  /**
   * Save a message to chat history
   */
  async saveMessage(
    userId: string,
    partnerId: string,
    content: string,
    sender: 'user' | 'ai'
  ) {
    const { data, error } = await supabase
      .from('ai_messages')
      .insert({
        user_id: userId,
        partner_id: partnerId,
        content,
        sender,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      ...data,
      timestamp: new Date(data.created_at),
    } as Message;
  },

  /**
   * Send a message to AI partner (simulated for now)
   * TODO: Integrate with actual AI APIs (Mistral, Claude, GPT-4, etc.)
   */
  async sendMessage(
    userId: string,
    partnerId: string,
    content: string
  ): Promise<Message> {
    // Save user message
    await this.saveMessage(userId, partnerId, content, 'user');

    // Simulate AI response (replace with actual API call)
    const aiResponse = this.generateSimulatedResponse(partnerId, content);

    // Save AI response
    const savedMessage = await this.saveMessage(
      userId,
      partnerId,
      aiResponse,
      'ai'
    );

    return savedMessage;
  },

  /**
   * Generate simulated AI response (placeholder)
   * TODO: Replace with actual AI API integration
   */
  generateSimulatedResponse(partnerId: string, userMessage: string): string {
    const responses: Record<string, string[]> = {
      mistral: [
        "As a biosciences specialist, I can help you understand this concept better. In molecular biology, this process involves...",
        "That's a great question about biotechnology! Let me explain the key mechanisms...",
        "From a genetic engineering perspective, this phenomenon occurs because...",
      ],
      claude: [
        "For your research methodology, I'd recommend following these structured steps...",
        "In scientific writing, it's important to maintain clarity and precision. Here's how you can improve...",
        "Based on research best practices, you should consider these methodological approaches...",
      ],
      gpt4: [
        "Let me break this down for you in a clear, comprehensive way...",
        "That's an interesting question! Here's what you need to know...",
        "To fully understand this topic, let's explore these key concepts...",
      ],
      gemini: [
        "Looking at the data analytically, we can observe several patterns...",
        "From a statistical perspective, this correlation suggests...",
        "Let me help you analyze this data set using appropriate methods...",
      ],
      perplexity: [
        "Based on the latest research and literature, here's what I found...",
        "Let me search through relevant sources to give you accurate information...",
        "According to recent scientific publications, the consensus is...",
      ],
    };

    const partnerResponses = responses[partnerId] || responses.gpt4;
    const randomResponse =
      partnerResponses[Math.floor(Math.random() * partnerResponses.length)];

    return randomResponse;
  },

  /**
   * Get AI chat statistics for user
   */
  async getChatStats(userId: string) {
    const { count: totalMessages } = await supabase
      .from('ai_messages')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('sender', 'user');

    const { data: partnerUsage } = await supabase
      .from('ai_messages')
      .select('partner_id')
      .eq('user_id', userId)
      .eq('sender', 'user');

    // Count messages per partner
    const partnerCounts: Record<string, number> = {};
    partnerUsage?.forEach(msg => {
      partnerCounts[msg.partner_id] = (partnerCounts[msg.partner_id] || 0) + 1;
    });

    return {
      total_messages: totalMessages || 0,
      partner_usage: partnerCounts,
    };
  },

  /**
   * Clear chat history with a partner
   */
  async clearChatHistory(userId: string, partnerId: string) {
    const { error } = await supabase
      .from('ai_messages')
      .delete()
      .eq('user_id', userId)
      .eq('partner_id', partnerId);

    if (error) throw error;
  },
};

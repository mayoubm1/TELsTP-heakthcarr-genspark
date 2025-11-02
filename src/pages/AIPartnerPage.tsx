import { useState } from 'react';
import { Send } from 'lucide-react';
import type { User, AIPartner, Message } from '../types';

interface AIPartnerPageProps {
  user: User;
}

export default function AIPartnerPage({ }: AIPartnerPageProps) {
  const [selectedPartner, setSelectedPartner] = useState<AIPartner | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const aiPartners: AIPartner[] = [
    {
      id: '1',
      name: 'Mistral',
      specialty: 'Biosciences Specialist',
      description: 'Expert in molecular biology, genetics, and biotechnology',
      is_online: true,
    },
    {
      id: '2',
      name: 'Claude',
      specialty: 'Research Mentor',
      description: 'Guidance on research methodology and scientific writing',
      is_online: true,
    },
    {
      id: '3',
      name: 'GPT-4',
      specialty: 'General Tutor',
      description: 'Comprehensive support across all subjects',
      is_online: true,
    },
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: 'This is a simulated response. AI integration coming soon!',
        timestamp: new Date(),
        partner_id: selectedPartner?.id,
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6">
      {/* AI Partners List */}
      <div className="w-80 card">
        <h2 className="text-xl font-bold mb-4">Your AI Learning Partners</h2>
        <div className="space-y-3">
          {aiPartners.map((partner) => (
            <button
              key={partner.id}
              onClick={() => setSelectedPartner(partner)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedPartner?.id === partner.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{partner.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                  <p className="text-xs text-primary-600">{partner.specialty}</p>
                </div>
                {partner.is_online && (
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </div>
              <p className="text-sm text-gray-600">{partner.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 card flex flex-col">
        {selectedPartner ? (
          <>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-xl font-bold">{selectedPartner.name}</h2>
              <p className="text-sm text-gray-600">{selectedPartner.specialty}</p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <p>Start a conversation with {selectedPartner.name}</p>
                  <p className="text-sm mt-2">Ask any question about your courses or learning!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Ask ${selectedPartner.name} anything...`}
                className="input-field"
              />
              <button onClick={handleSendMessage} className="btn-primary px-4">
                <Send size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select an AI partner to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}

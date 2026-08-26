import React, { useState, useRef, useEffect } from 'react';
import { generateResumeContentStream } from '../../services/geminiService';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

const GeneratingIcon: React.FC<{ className?: string }> = ({ className = 'text-white' }) => (
    <svg className={`animate-spin h-5 w-5 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const CareerCoachAIPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! I'm your AI Career Coach. How can I help you with your career today? You can ask me about resume tips, interview questions, or career paths.", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const newUserMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);
        
        const aiMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: 'ai' }]);

        try {
            const prompt = `You are a helpful and encouraging AI career coach. A user is asking for advice. User's question: "${input}". Provide a concise, helpful, and well-formatted response. Use markdown for lists or emphasis if needed.`;
            const stream = await generateResumeContentStream(prompt);
            
            for await (const chunk of stream) {
                setMessages(prev => prev.map(msg => 
                    msg.id === aiMessageId ? { ...msg, text: msg.text + chunk.text } : msg
                ));
            }
        } catch (error) {
            console.error("AI chat error:", error);
            setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, text: 'Sorry, I encountered an error. Please try again.' } : msg
            ));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#f8f7f3] text-slate-900 min-h-[calc(100vh-128px)] flex flex-col animate-fade-in">
            <header className="bg-white p-6 border-b border-slate-200 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Personal career guidance</p>
                <h1 className="text-3xl font-bold text-slate-900 mt-2">AI Career Coach</h1>
                <p className="text-sm text-slate-500 mt-1">Clear advice for your next career move.</p>
            </header>
            
            <main className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl w-full mx-auto">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 5a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1V8a1 1 0 011-1zm10-5a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1zM5.293 16.293a1 1 0 011.414 0L10 19.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </div>
                        )}
                        <div className={`max-w-lg p-4 rounded-2xl whitespace-pre-wrap shadow-sm ${msg.sender === 'user' ? 'bg-orange-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'}`}>
                           {msg.text || (isLoading && msg.sender === 'ai' ? <div className="dot-flashing"></div> : '')}
                        </div>
                    </div>
                ))}
                 <div ref={messagesEndRef} />
            </main>

            <footer className="p-4 bg-white border-t border-slate-200">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything about your career..."
                            className="w-full bg-slate-50 border border-slate-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                        <button type="submit" disabled={isLoading} className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 rounded-lg px-5 py-2 flex items-center justify-center font-semibold text-white transition-colors">
                            {isLoading ? <GeneratingIcon /> : 'Send'}
                        </button>
                    </form>
                </div>
            </footer>
             <style>{`
                .dot-flashing {
                  position: relative;
                  width: 5px;
                  height: 5px;
                  border-radius: 5px;
                  background-color: #9880ff;
                  color: #9880ff;
                  animation: dot-flashing 1s infinite linear alternate;
                  animation-delay: 0.5s;
                  margin: 10px;
                }
                .dot-flashing::before, .dot-flashing::after {
                  content: "";
                  display: inline-block;
                  position: absolute;
                  top: 0;
                }
                .dot-flashing::before {
                  left: -10px;
                  width: 5px;
                  height: 5px;
                  border-radius: 5px;
                  background-color: #9880ff;
                  color: #9880ff;
                  animation: dot-flashing 1s infinite alternate;
                  animation-delay: 0s;
                }
                .dot-flashing::after {
                  left: 10px;
                  width: 5px;
                  height: 5px;
                  border-radius: 5px;
                  background-color: #9880ff;
                  color: #9880ff;
                  animation: dot-flashing 1s infinite alternate;
                  animation-delay: 1s;
                }
                @keyframes dot-flashing {
                  0% { background-color: #9880ff; }
                  50%, 100% { background-color: rgba(152, 128, 255, 0.2); }
                }
            `}</style>
        </div>
    );
};

export default CareerCoachAIPage;

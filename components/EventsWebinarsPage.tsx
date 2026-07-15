import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Video, Clock, Users, ArrowRight } from 'lucide-react';

const events = [
    { 
        id: 1, 
        title: 'The Future of AI in Engineering', 
        type: 'Webinar', 
        date: 'May 24, 2025', 
        time: '10:00 AM PST', 
        speakers: ['Dr. Andrew Ng', 'Sam Altman'], 
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800'
    },
    { 
        id: 2, 
        title: 'Navigating Layoffs & Job Search', 
        type: 'Live Q&A', 
        date: 'June 2, 2025', 
        time: '2:00 PM PST', 
        speakers: ['Jane Doe', 'John Smith'], 
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800'
    },
    { 
        id: 3, 
        title: 'Mastering Remote Collaboration', 
        type: 'Workshop', 
        date: 'June 15, 2025', 
        time: '9:00 AM PST', 
        speakers: ['Chris Coyier'], 
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
    }
];

const EventsWebinarsPage: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight mb-4">Events & Webinars</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">Join live sessions with industry leaders to gain insights and accelerate your career.</p>
                </div>

                <div className="space-y-8">
                    {events.map((event, index) => (
                        <motion.div 
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col md:flex-row group"
                        >
                            <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                                    {event.type}
                                </div>
                            </div>
                            <div className="p-8 md:w-2/3 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h2>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4 text-indigo-500" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="h-4 w-4 text-indigo-500" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 col-span-2">
                                            <Users className="h-4 w-4 text-indigo-500" />
                                            <span>Featuring: {event.speakers.join(', ')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                                        Register Now <Video className="h-4 w-4" />
                                    </button>
                                    <button className="text-gray-400 hover:text-gray-600 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Learn More <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventsWebinarsPage;

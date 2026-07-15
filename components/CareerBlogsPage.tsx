import React from 'react';
import { motion } from 'motion/react';
import { Tag, User, Calendar, ArrowRight } from 'lucide-react';

const posts = [
    { 
        id: 1, 
        title: '10 Secrets to Acing Your Remote Interview', 
        category: 'Interview Tips', 
        author: 'Sarah Jenkins', 
        date: 'May 12, 2025', 
        excerpt: 'Remote interviews are the new norm. Learn how to present yourself professionally and handle technical glitches...', 
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800'
    },
    { 
        id: 2, 
        title: 'The Rise of AI: What it Means for Software Engineers', 
        category: 'Trends', 
        author: 'Michael Chen', 
        date: 'May 8, 2025', 
        excerpt: 'AI is changing the landscape of development. Discover the skills you need to stay relevant in an AI-driven world...', 
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    },
    { 
        id: 3, 
        title: 'Building a Personal Brand on LinkedIn', 
        category: 'Career Growth', 
        author: 'Elena Rossi', 
        date: 'May 1, 2025', 
        excerpt: 'Your LinkedIn profile is more than just a resume. Learn how to use it to attract high-paying opportunities...', 
        image: 'https://images.unsplash.com/photo-1512485694743-99a4778c3ab2?auto=format&fit=crop&q=80&w=800'
    }
];

const CareerBlogsPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">Career <span className="text-indigo-600">Insights</span></h1>
                    <p className="text-xl text-gray-500 max-w-2xl">Expert advice, industry trends, and practical tips to help you navigate your career journey.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map((post, index) => (
                        <motion.article 
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col group cursor-pointer"
                        >
                            <div className="relative h-64 w-full rounded-3xl overflow-hidden mb-6">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-indigo-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                    {post.category}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">{post.title}</h3>
                                <p className="text-gray-500 mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                            <User className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-400">
                                        <Calendar className="h-3 w-3" />
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
                
                <div className="mt-20 flex justify-center">
                    <button className="flex items-center gap-2 px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-600 hover:text-white transition-all group">
                        View All Articles <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CareerBlogsPage;

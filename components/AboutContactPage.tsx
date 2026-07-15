import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Linkedin, Twitter, Github } from 'lucide-react';

const AboutContactPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* About Section */}
            <section className="py-20 bg-indigo-900 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">Revolutionizing the <span className="text-indigo-400">Career Search</span> Experience</h1>
                            <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                                JobSarv was founded with a single mission: to empower every individual with the tools and data they need to build their dream career. By leveraging advanced AI, we bridge the gap between talent and opportunity globally.
                            </p>
                            <div className="flex gap-8">
                                <div>
                                    <h4 className="text-3xl font-bold">10M+</h4>
                                    <p className="text-indigo-300 text-sm">Users Trusted</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold">500k+</h4>
                                    <p className="text-indigo-300 text-sm">Hired via Us</p>
                                </div>
                            </div>
                        </motion.div>
                        <div className="relative">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="bg-white/10 backdrop-blur-xl p-8 rounded-[4rem] border border-white/10 aspect-square flex items-center justify-center"
                            >
                                <div className="text-center">
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-indigo-400 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <h3 className="text-4xl font-bold">JobSarv</h3>
                                    <p className="text-indigo-300">Global Career Network</p>
                                </div>
                            </motion.div>
                            {/* Abstract blobs */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-30"></div>
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-30"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900 tracking-tight">Get in Touch</h2>
                                <p className="text-gray-500 mb-12 text-lg">Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.</p>
                                
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                            <Mail className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 font-medium">Email Us</p>
                                            <p className="text-lg font-bold text-gray-900">support@jobsarv.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                            <Phone className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 font-medium">Call Us</p>
                                            <p className="text-lg font-bold text-gray-900">+1 (800) JOBSARV</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                            <MapPin className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 font-medium">Visit Us</p>
                                            <p className="text-lg font-bold text-gray-900">San Francisco, CA 94103</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-16 pt-12 border-t border-gray-200 flex gap-6">
                                    <a href="#" className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-indigo-600 shadow-sm transition-colors"><Linkedin className="h-5 w-5" /></a>
                                    <a href="#" className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-indigo-600 shadow-sm transition-colors"><Twitter className="h-5 w-5" /></a>
                                    <a href="#" className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-indigo-600 shadow-sm transition-colors"><Github className="h-5 w-5" /></a>
                                </div>
                            </div>

                            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-indigo-100">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                            <input type="text" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                            <input type="email" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                                        <input type="text" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="How can we help?" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                        <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500" placeholder="Tell us more about your inquiry..."></textarea>
                                    </div>
                                    <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2">
                                        Send Message <Send className="h-4 w-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutContactPage;

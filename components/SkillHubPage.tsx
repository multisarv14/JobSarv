import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Code, Lightbulb, PenTool, Database, Award, ArrowRight } from 'lucide-react';

const courses = [
    { id: 1, title: 'Advanced React Patterns', instructor: 'Sarah Drasner', duration: '12h 30m', level: 'Advanced', icon: Code, color: 'bg-indigo-600' },
    { id: 2, title: 'Product Management Strategy', instructor: 'Roman Pichler', duration: '8h 45m', level: 'Intermediate', icon: Lightbulb, color: 'bg-amber-500' },
    { id: 3, title: 'UX Design Fundamentals', instructor: 'Don Norman', duration: '15h 20m', level: 'Beginner', icon: PenTool, color: 'bg-rose-500' },
    { id: 4, title: 'Mastering SQL & NoSQL', instructor: 'Ben Stopford', duration: '10h 15m', level: 'Intermediate', icon: Database, color: 'bg-emerald-600' },
];

const SkillHubPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <BookOpen className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Skill Hub</h2>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                        Level Up Your <span className="text-indigo-600">Pro Skills</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-3xl">
                        Expert-led courses and certifications designed to help you stay ahead in your career.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {courses.map((course, index) => (
                        <motion.div 
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 rounded-3xl p-6 hover:bg-white hover:shadow-2xl transition-all border border-gray-100 group cursor-pointer"
                        >
                            <div className={`h-12 w-12 rounded-2xl ${course.color} flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform`}>
                                <course.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                            <p className="text-sm text-gray-500 mb-6">{course.instructor}</p>
                            
                            <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                                <span>{course.duration}</span>
                                <span className="bg-white px-2 py-1 rounded-md border border-gray-200">{course.level}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <Award className="h-12 w-12 text-indigo-300 mb-8" />
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Earn Industry-Recognized Certifications</h2>
                        <p className="text-indigo-100 text-lg mb-10 leading-relaxed">
                            Validate your expertise and stand out to top employers with our certification programs in Software Development, Data Science, and Marketing.
                        </p>
                        <button className="flex items-center gap-2 bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-colors">
                            Browse Certifications <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                    {/* Decorative abstract shape */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
                </div>
            </div>
        </div>
    );
};

export default SkillHubPage;

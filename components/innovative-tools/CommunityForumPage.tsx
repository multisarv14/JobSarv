import React from 'react';
import { MOCK_FORUM_THREADS } from '../../constants';
import { ForumThread } from '../../types';

const ForumThreadRow: React.FC<{ thread: ForumThread }> = ({ thread }) => (
    <div className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-4 flex-1">
            <img src={thread.authorPhoto} alt={thread.author} className="w-12 h-12 rounded-full" />
            <div>
                <a href="#" className="font-bold text-gray-800 hover:text-indigo-600 text-lg">{thread.title}</a>
                <p className="text-sm text-gray-500">
                    by <span className="font-medium text-gray-700">{thread.author}</span> in <span className="text-indigo-600 font-semibold">{thread.category}</span>
                </p>
            </div>
        </div>
        <div className="w-24 text-center">
            <p className="font-bold text-gray-800">{thread.replies}</p>
            <p className="text-xs text-gray-500">Replies</p>
        </div>
        <div className="w-40 text-right text-sm text-gray-600">
            {thread.lastActivity}
        </div>
    </div>
);

const CommunityForumPage: React.FC = () => {
    const [showComposer, setShowComposer] = useState(false);
    return (
        <div className="bg-white min-h-screen animate-fade-in">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8 pb-4 border-b">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">Community Forum</h1>
                        <p className="mt-2 text-lg text-gray-600">Connect with peers, share knowledge, and get answers.</p>
                    </div>
                    <button onClick={() => setShowComposer(current => !current)} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                        Start a New Discussion
                    </button>
                </div>

                {showComposer && <form onSubmit={event => { event.preventDefault(); setShowComposer(false); }} className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4"><input required placeholder="Discussion title" className="w-full rounded-md border border-gray-300 p-3" /><textarea required placeholder="Share your question or insight..." rows={3} className="mt-3 w-full rounded-md border border-gray-300 p-3" /><button type="submit" className="mt-3 rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white">Publish discussion</button></form>}

                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                    <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <h2 className="font-semibold text-gray-700">All Topics</h2>
                             <select className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                                <option>Latest</option>
                                <option>Top</option>
                                <option>Unanswered</option>
                            </select>
                        </div>
                         <div className="relative">
                            <input type="text" placeholder="Search forum..." className="w-64 pl-10 pr-4 py-2 border rounded-md text-sm" />
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        {MOCK_FORUM_THREADS.map(thread => <ForumThreadRow key={thread.id} thread={thread} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityForumPage;

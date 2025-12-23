import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { fetchGitHubActivity, formatRelativeTime, type GitHubActivity } from '../lib/github';

export default function GitHubActivityFeed() {
    const [activities, setActivities] = useState<GitHubActivity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState<'all' | 'highlights' | 'commits'>('all');

    useEffect(() => {
        async function loadActivity() {
            try {
                // Fetch more items initially to allow filtering
                const username = import.meta.env.VITE_GITHUB_USERNAME || 'am-goku';
                const data = await fetchGitHubActivity(username, 20);
                setActivities(data);
                setError(false);
            } catch (err) {
                console.error('Failed to load GitHub activity:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadActivity();
    }, []);

    if (loading) {
        return (
            <div className="bg-linear-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                    <FiGithub className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-100">Recent GitHub Activity</h3>
                </div>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse flex gap-3">
                            <div className="w-8 h-8 bg-gray-700/50 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-700/50 rounded w-3/4" />
                                <div className="h-3 bg-gray-700/50 rounded w-1/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || activities.length === 0) {
        return (
            <div className="bg-linear-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                    <FiGithub className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-100">Recent GitHub Activity</h3>
                </div>
                <p className="text-sm text-gray-400">Unable to load GitHub activity</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-linear-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-indigo-500/40 transition-all duration-300"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <FiGithub className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-100">Recent Activity</h3>
                </div>

                {/* Filter Buttons */}
                <div className="flex bg-gray-800/50 rounded-lg p-1 border border-white/5">
                    {(['all', 'highlights', 'commits'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${filter === f
                                ? 'bg-blue-500/20 text-blue-400 shadow-xs'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Activity List */}
            <div className="space-y-3">
                {activities
                    .filter(activity => {
                        if (filter === 'all') return true;
                        if (filter === 'commits') return activity.type === 'push';
                        if (filter === 'highlights') return ['pr', 'issue', 'release', 'create'].includes(activity.type);
                        return true;
                    })
                    .slice(0, 8) // Show top 8 after filtering
                    .map((activity, index) => (
                        <motion.a
                            key={activity.id}
                            href={activity.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-200 group"
                        >
                            {/* Icon */}
                            <div className="shrink-0 w-8 h-8 flex items-center justify-center text-lg">
                                {activity.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors">
                                    {activity.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {formatRelativeTime(activity.timestamp)}
                                </p>
                            </div>

                            {/* External Link Icon */}
                            <FiExternalLink className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors shrink-0 opacity-0 group-hover:opacity-100" />
                        </motion.a>
                    ))}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-gray-500 text-center">
                    Showing recent activity from GitHub
                </p>
            </div>
        </motion.div>
    );
}

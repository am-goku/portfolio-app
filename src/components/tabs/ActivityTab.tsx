import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiStar, FiUsers, FiBook, FiGitBranch } from 'react-icons/fi';
import GitHubActivityFeed from '../GitHubActivity';
import { fetchGitHubStats, fetchTopRepos, type GitHubStats, type Values } from '../../lib/github';

export default function ActivityTab() {
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [repos, setRepos] = useState<Values[]>([]);

    useEffect(() => {
        async function loadData() {
            const username = import.meta.env.VITE_GITHUB_USERNAME || 'am-goku';
            const statsData = await fetchGitHubStats(username);
            setStats(statsData);
            const reposData = await fetchTopRepos(username);
            setRepos(reposData);
        }
        loadData();
    }, []);

    return (
        <section className="space-y-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div className="mb-8">
                    <h2 className="text-3xl font-semibold mb-2">Activity</h2>
                    <p className="text-gray-300 max-w-2xl leading-7">
                        A real-time feed of my open source contributions and coding activity across repositories.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-linear-to-br from-white/5 to-white/2 p-4 rounded-xl border border-white/10 flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                            <FiUsers className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Followers</p>
                            <h3 className="text-2xl font-bold">{stats?.followers || '-'}</h3>
                        </div>
                    </div>
                    <div className="bg-linear-to-br from-white/5 to-white/2 p-4 rounded-xl border border-white/10 flex items-center gap-4">
                        <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                            <FiBook className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Public Repos</p>
                            <h3 className="text-2xl font-bold">{stats?.publicRepos || '-'}</h3>
                        </div>
                    </div>
                    <div className="bg-linear-to-br from-white/5 to-white/2 p-4 rounded-xl border border-white/10 flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400">
                            <FiStar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Total Stars</p>
                            <h3 className="text-2xl font-bold">{stats?.totalStars || '-'}</h3>
                        </div>
                    </div>
                </div>

                {/* Contribution Heatmap */}
                <div className="bg-linear-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md rounded-xl p-6 border border-white/10 mb-8 overflow-hidden hover:border-blue-500/30 transition-colors">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FiGitBranch className="text-green-400" />
                        Contributions
                    </h3>
                    <div className="overflow-x-auto pb-2">
                        <img
                            src="https://ghchart.rshah.org/2196F3/am-goku"
                            alt="GitHub Contributions chart for am-goku"
                            loading="lazy"
                            className="w-full min-w-[600px]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Activity Feed */}
                    <div className="lg:col-span-2">
                        <GitHubActivityFeed />
                    </div>

                    {/* Right: Top Repos */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4">Top Repositories</h3>
                        {repos.map((repo, i) => (
                            <motion.a
                                key={repo.name}
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (i * 0.05) }}
                                className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-blue-400 group-hover:underline truncate pr-2">{repo.name}</h4>
                                    <div className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
                                        <FiStar />
                                        {repo.stars}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 line-clamp-2 mb-3 h-8">{repo.description || 'No description available'}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                                    {repo.language || 'Code'}
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

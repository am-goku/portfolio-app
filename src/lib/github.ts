// GitHub API types
export interface GitHubEvent {
    id: string;
    type: string;
    repo: {
        name: string;
        url: string;
    };
    created_at: string;
    payload: {
        commits?: Array<{
            message: string;
            sha: string;
        }>;
        ref?: string;
        ref_type?: string;
        action?: string;
    };
}

export interface GitHubActivity {
    id: string;
    type: 'push' | 'create' | 'star' | 'fork' | 'pr' | 'issue' | 'release' | 'other';
    repo: string;
    repoUrl: string;
    message: string;
    timestamp: Date;
    icon: string;
}

// Cache configuration
const CACHE_DURATION = 3600 * 1000; // 1 hour

// Helper to get cached data
function getCachedData<T>(key: string): T | null {
    try {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_DURATION) {
            localStorage.removeItem(key);
            return null;
        }

        return data as T;
    } catch {
        return null;
    }
}

// Helper to set cached data
function setCachedData<T>(key: string, data: T): void {
    try {
        localStorage.setItem(key, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch (e) {
        console.warn('Failed to cache GitHub data', e);
    }
}

// Fetch recent GitHub activity
export async function fetchGitHubActivity(username: string = import.meta.env.VITE_GITHUB_USERNAME || 'am-goku', limit: number = 10): Promise<GitHubActivity[]> {
    const cacheKey = `gh_activity_${username}`;
    const cached = getCachedData<GitHubActivity[]>(cacheKey);
    if (cached) return cached;

    try {
        const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=${limit}`);

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const events: GitHubEvent[] = await response.json();
        const data = events.map(event => parseGitHubEvent(event)).filter(Boolean) as GitHubActivity[];

        setCachedData(cacheKey, data);
        return data;
    } catch (error) {
        console.error('Failed to fetch GitHub activity:', error);
        return [];
    }
}

export interface GitHubStats {
    followers: number;
    publicRepos: number;
    totalStars: number;
    avatarUrl: string;
    profileUrl: string;
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats | null> {
    const cacheKey = `gh_stats_${username}`;
    const cached = getCachedData<GitHubStats>(cacheKey);
    if (cached) return cached;

    try {
        // Fetch user profile
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const user = await userRes.json();

        // Fetch repos to count stars (limited to 100 for simplicity)
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const repos = await reposRes.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const totalStars = repos.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);

        const stats = {
            followers: user.followers,
            publicRepos: user.public_repos,
            totalStars,
            avatarUrl: user.avatar_url,
            profileUrl: user.html_url
        };

        setCachedData(cacheKey, stats);
        return stats;
    } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
        return null;
    }
}

export interface Values {
    name: string;
    description: string;
    stars: number;
    language: string;
    url: string;
}

export async function fetchTopRepos(username: string): Promise<Values[]> {
    const cacheKey = `gh_top_repos_${username}`;
    const cached = getCachedData<Values[]>(cacheKey);
    if (cached) return cached;

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!response.ok) throw new Error('Failed to fetch repos');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const repos = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = repos.map((repo: any) => ({
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            language: repo.language,
            url: repo.html_url
        }));

        setCachedData(cacheKey, data);
        return data;
    } catch (error) {
        console.error('Failed to fetch top repos:', error);
        return [];
    }
}

// Parse GitHub event into activity format
function parseGitHubEvent(event: GitHubEvent): GitHubActivity | null {
    const baseActivity = {
        id: event.id,
        repo: event.repo.name,
        repoUrl: event.repo.url.replace('api.github.com/repos', 'github.com'),
        timestamp: new Date(event.created_at),
    };

    switch (event.type) {
        case 'PushEvent': {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const payload = event.payload as any;
            const commitCount = payload.size || payload.commits?.length || 1;
            return {
                ...baseActivity,
                type: 'push',
                message: `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${event.repo.name.split('/')[1]}`,
                icon: '📝',
            };
        }

        case 'CreateEvent': {
            const refType = event.payload.ref_type;
            return {
                ...baseActivity,
                type: 'create',
                message: `Created ${refType} in ${event.repo.name.split('/')[1]}`,
                icon: '🌱',
            };
        }

        case 'WatchEvent':
            return {
                ...baseActivity,
                type: 'star',
                message: `Starred ${event.repo.name.split('/')[1]}`,
                icon: '⭐',
            };

        case 'ForkEvent':
            return {
                ...baseActivity,
                type: 'fork',
                message: `Forked ${event.repo.name.split('/')[1]}`,
                icon: '🍴',
            };

        case 'PullRequestEvent': {
            const action = event.payload.action;
            return {
                ...baseActivity,
                type: 'pr',
                message: `${action === 'opened' ? 'Opened' : 'Updated'} PR in ${event.repo.name.split('/')[1]}`,
                icon: '🔀',
            };
        }

        case 'IssuesEvent':
            return {
                ...baseActivity,
                type: 'issue',
                message: `${event.payload.action === 'opened' ? 'Opened' : 'Updated'} issue in ${event.repo.name.split('/')[1]}`,
                icon: '🐛',
            };

        case 'ReleaseEvent':
            return {
                ...baseActivity,
                type: 'release',
                message: `Published release ${event.payload.action} in ${event.repo.name.split('/')[1]}`,
                icon: '🚀',
            };

        default:
            return null;
    }
}

// Format relative time (e.g., "2 hours ago")
// Format relative time (e.g., "2 hours ago")
export function formatRelativeTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;
    return `${Math.floor(diffDay / 30)}mo ago`;
}

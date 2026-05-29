'use client';

import { useState, useEffect } from 'react';
import { Github, Star, GitFork, ExternalLink, ChevronLeft, ChevronRight, Code } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  homepage: string | null;
}

interface GitHubReposProps {
  username: string;
}

export default function GitHubRepos({ username }: GitHubReposProps) {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const reposPerPage = 6;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const data = await response.json();
        
        const filteredRepos = data
          .filter((repo: Repository) => !repo.name.includes('fork'))
          .sort((a: Repository, b: Repository) => b.stargazers_count - a.stargazers_count);
        
        setRepos(filteredRepos);
        setError(null);
      } catch (err) {
        console.error('Error fetching repositories:', err);
        setError('Failed to load repositories');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  const totalPages = Math.ceil(repos.length / reposPerPage);
  const startIndex = currentPage * reposPerPage;
  const endIndex = startIndex + reposPerPage;
  const currentRepos = repos.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-500',
      Python: 'bg-blue-400',
      Java: 'bg-orange-500',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-600',
      Ruby: 'bg-red-500',
      PHP: 'bg-purple-500',
      C: 'bg-gray-600',
      'C++': 'bg-pink-500',
      'C#': 'bg-green-600',
      Swift: 'bg-orange-400',
      Kotlin: 'bg-purple-600',
      Shell: 'bg-green-500',
      HTML: 'bg-orange-500',
      CSS: 'bg-blue-600',
    };
    return colors[language || ''] || 'bg-anime-lavender';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-anime-pink via-anime-purple to-anime-blue rounded-3xl blur opacity-25"></div>
          <div className="relative bg-comfy-dark p-8 rounded-3xl border border-anime-lavender/10">
            <div className="flex items-center gap-3 mb-6">
              <Github className="text-anime-purple glow-purple" size={28} />
              <h3 className="text-2xl font-display font-bold text-white">
                Repositories
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-40 bg-anime-lavender/10 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || repos.length === 0) {
    return (
      <div className="w-full">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur opacity-25"></div>
          <div className="relative bg-comfy-dark p-8 rounded-3xl border border-red-500/20">
            <div className="text-center space-y-3">
              <div className="text-4xl">😢</div>
              <h3 className="text-lg font-semibold text-white">No Repositories Found</h3>
              <p className="text-sm text-anime-lavender/70">
                {error || 'Unable to fetch repositories'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-anime-pink via-anime-purple to-anime-blue rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
        
        <div className="relative bg-comfy-dark p-6 md:p-8 rounded-3xl border border-anime-lavender/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Github className="text-anime-purple glow-purple" size={28} />
              <div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Repositories
                </h3>
                <p className="text-sm text-anime-lavender/70">
                  {repos.length} public {repos.length === 1 ? 'repository' : 'repositories'}
                </p>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="p-2 rounded-lg bg-comfy-darker border border-anime-lavender/20 hover:border-anime-pink hover:text-anime-pink transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-anime-lavender/20 disabled:hover:text-current"
                  title="Previous page"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="text-sm text-anime-lavender/70">
                  <span className="text-white font-semibold">{currentPage + 1}</span>
                  {' '}/{' '}
                  <span>{totalPages}</span>
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className="p-2 rounded-lg bg-comfy-darker border border-anime-lavender/20 hover:border-anime-pink hover:text-anime-pink transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-anime-lavender/20 disabled:hover:text-current"
                  title="Next page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {currentRepos.map((repo) => (
              <div
                key={repo.id}
                className="group/card relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-anime-pink via-anime-purple to-anime-blue rounded-xl blur opacity-0 group-hover/card:opacity-30 transition-opacity"></div>
                
                <div className="relative h-full p-4 bg-comfy-darker rounded-xl border border-anime-lavender/10 hover:border-anime-pink/50 transition-all flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Code className="text-anime-blue flex-shrink-0" size={18} />
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-semibold hover:text-anime-pink transition-colors truncate text-sm"
                      >
                        {repo.name}
                      </a>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:bg-anime-lavender/10 rounded-lg transition-colors flex-shrink-0"
                      title="View on GitHub"
                    >
                      <ExternalLink className="text-anime-lavender/60 hover:text-anime-pink" size={14} />
                    </a>
                  </div>

                  <p className="text-xs text-anime-lavender/70 mb-3 flex-1 line-clamp-2">
                    {repo.description || 'No description available'}
                  </p>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 bg-anime-blue/10 border border-anime-blue/30 rounded-full text-[10px] text-anime-blue"
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="px-2 py-0.5 text-[10px] text-anime-lavender/50">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-anime-lavender/60 mt-auto pt-3 border-t border-anime-lavender/10">
                    <div className="flex items-center gap-3">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`}></div>
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-500" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork size={12} className="text-anime-blue" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-anime-lavender/40 mt-2">
                    Updated {formatDate(repo.updated_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentPage
                      ? 'bg-anime-pink w-6'
                      : 'bg-anime-lavender/30 hover:bg-anime-lavender/50'
                  }`}
                  title={`Page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


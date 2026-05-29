'use client';

import { useState, useEffect } from 'react';
import { Github, Calendar, TrendingUp } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface GitHubStats {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface GitHubHeatmapProps {
  username: string;
}

export default function GitHubHeatmap({ username }: GitHubHeatmapProps) {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub contributions');
        }

        const result = await response.json();
        
        const weeks: ContributionWeek[] = [];
        let currentWeek: ContributionDay[] = [];
        
        result.contributions.forEach((day: any, index: number) => {
          const level = day.count === 0 ? 0 : 
                       day.count <= 3 ? 1 :
                       day.count <= 6 ? 2 :
                       day.count <= 9 ? 3 : 4;
          
          currentWeek.push({
            date: day.date,
            count: day.count,
            level: level as 0 | 1 | 2 | 3 | 4,
          });

          if (currentWeek.length === 7) {
            weeks.push({ days: currentWeek });
            currentWeek = [];
          }
        });

        if (currentWeek.length > 0) {
          weeks.push({ days: currentWeek });
        }

        setData({
          totalContributions: result.total[Object.keys(result.total)[0]] || 0,
          weeks: weeks.slice(-52), // Last 52 weeks
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        setError('Failed to load GitHub activity');
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  const getColorForLevel = (level: number) => {
    const colors = {
      0: 'bg-anime-lavender/5 border-anime-lavender/10',
      1: 'bg-anime-mint/30 border-anime-mint/50',
      2: 'bg-anime-mint/50 border-anime-mint/70',
      3: 'bg-anime-mint/70 border-anime-mint/90',
      4: 'bg-anime-mint border-anime-mint',
    };
    return colors[level as keyof typeof colors] || colors[0];
  };

  const getGlowForLevel = (level: number) => {
    if (level === 0) return '';
    const intensity = level * 5;
    return `shadow-[0_0_${intensity}px_rgba(183,255,226,0.${level * 2})]`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleMouseMove = (e: React.MouseEvent, day: ContributionDay) => {
    setHoveredDay(day);
    setMousePosition({ x: e.clientX, y: e.clientY });
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
                GitHub Activity
              </h3>
            </div>
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-anime-purple/10 rounded w-1/3"></div>
              <div className="h-32 bg-anime-lavender/10 rounded-xl"></div>
              <div className="flex gap-2">
                <div className="h-3 bg-anime-blue/10 rounded w-1/4"></div>
                <div className="h-3 bg-anime-pink/10 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur opacity-25"></div>
          <div className="relative bg-comfy-dark p-8 rounded-3xl border border-red-500/20">
            <div className="text-center space-y-3">
              <div className="text-4xl">😢</div>
              <h3 className="text-lg font-semibold text-white">Failed to Load</h3>
              <p className="text-sm text-anime-lavender/70">
                {error || 'Unable to fetch GitHub activity'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
                  GitHub Activity
                </h3>
                <p className="text-sm text-anime-lavender/70">
                  @{username}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="text-anime-blue" size={20} />
                <div>
                  <p className="text-xs text-anime-lavender/60">Last Year</p>
                  <p className="text-lg font-bold text-white">{data.totalContributions}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-anime-pink" size={20} />
                <div>
                  <p className="text-xs text-anime-lavender/60">Contributions</p>
                  <p className="text-lg font-bold gradient-text">Active</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="inline-block min-w-full">
              <div className="flex gap-1">
                <div className="flex flex-col gap-1 pr-2 text-[10px] text-anime-lavender/50">
                  <div className="h-3"></div>
                  {dayLabels.map((day, i) => (
                    i % 2 === 1 ? (
                      <div key={day} className="h-3 flex items-center">
                        {day}
                      </div>
                    ) : (
                      <div key={day} className="h-3"></div>
                    )
                  ))}
                </div>

                <div className="flex-1">
                  <div className="flex gap-1 mb-1 text-[10px] text-anime-lavender/50">
                    {data.weeks.map((week, weekIndex) => {
                      const firstDay = new Date(week.days[0].date);
                      const isFirstWeekOfMonth = firstDay.getDate() <= 7;
                      
                      return (
                        <div key={weekIndex} className="w-3">
                          {isFirstWeekOfMonth && monthLabels[firstDay.getMonth()]}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-1">
                    {data.weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {week.days.map((day, dayIndex) => (
                          <div
                            key={`${weekIndex}-${dayIndex}`}
                            className={`w-3 h-3 rounded-sm border cursor-pointer transition-all duration-200 hover:scale-125 ${getColorForLevel(day.level)} ${getGlowForLevel(day.level)}`}
                            onMouseEnter={(e) => handleMouseMove(e, day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            onMouseMove={(e) => handleMouseMove(e, day)}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-anime-lavender/60">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm border ${getColorForLevel(level)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {hoveredDay && (
        <div
          className="fixed z-[60] pointer-events-none"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 60,
          }}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-anime-pink to-anime-purple rounded-lg blur opacity-50"></div>
            <div className="relative bg-comfy-darker border border-anime-lavender/30 rounded-lg px-3 py-2 shadow-xl backdrop-blur-lg">
              <p className="text-sm font-semibold text-white">
                {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
              </p>
              <p className="text-xs text-anime-lavender/70">
                {formatDate(hoveredDay.date)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


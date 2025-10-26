'use client';

import { useEffect, useState } from 'react';
import { Music, Gamepad2, Circle } from 'lucide-react';

interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    global_name?: string;
    public_flags: number;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities?: Array<{
    id: string;
    name: string;
    type: number;
    state?: string;
    details?: string;
    timestamps?: {
      start?: number;
      end?: number;
    };
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
    sync_id?: string;
    created_at: number;
  }>;
  spotify?: {
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
  listening_to_spotify?: boolean;
}

interface DiscordProfileProps {
  userId: string;
}

export default function DiscordProfile({ userId }: DiscordProfileProps) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // First, try REST API to get initial data
    const fetchInitialData = async () => {
      try {
        console.log('Fetching from REST API for user:', userId);
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const result = await response.json();
        
        console.log('REST API Response:', result);
        
        if (result.success && result.data) {
          setData(result.data);
          setLoading(false);
          setError(null);
        } else {
          setError('User not found. Have you joined the Lanyard Discord server?');
          setLoading(false);
        }
      } catch (err) {
        console.error('REST API Error:', err);
        setError('Failed to fetch Discord presence');
        setLoading(false);
      }
    };

    fetchInitialData();

    // Then setup WebSocket for real-time updates
    let ws: WebSocket;
    let heartbeatInterval: NodeJS.Timeout;

    const connectWebSocket = () => {
      ws = new WebSocket('wss://api.lanyard.rest/socket');

      ws.onopen = () => {
        console.log('✅ Connected to Lanyard WebSocket');
      };

      ws.onmessage = (event) => {
        const { op, t, d } = JSON.parse(event.data);

        if (op === 1) {
          // Hello - set up heartbeat
          console.log('❤️ Setting up heartbeat:', d.heartbeat_interval);
          heartbeatInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ op: 3 }));
            }
          }, d.heartbeat_interval);

          // Subscribe to user
          ws.send(
            JSON.stringify({
              op: 2,
              d: {
                subscribe_to_id: userId,
              },
            })
          );
        } else if (t === 'INIT_STATE') {
          console.log('🎉 INIT_STATE received:', d);
          if (d && d.discord_user) {
            setData(d);
            setError(null);
          }
        } else if (t === 'PRESENCE_UPDATE') {
          console.log('🔄 PRESENCE_UPDATE received');
          if (d && d.discord_user) {
            setData(d);
          }
        }
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('🔌 WebSocket disconnected');
        clearInterval(heartbeatInterval);
      };
    };

    // Connect WebSocket after getting initial data
    setTimeout(connectWebSocket, 1000);

    return () => {
      if (ws) {
        ws.close();
      }
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }
    };
  }, [userId]);

  if (loading || !data || !data.discord_user) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="relative p-6 bg-comfy-dark rounded-3xl border border-anime-lavender/10 animate-pulse">
          <div className="h-32 bg-anime-purple/10 rounded-2xl mb-4"></div>
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-anime-pink/10 rounded-full"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-anime-blue/10 rounded w-3/4"></div>
              <div className="h-3 bg-anime-lavender/10 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statusColors = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500',
  };

  const statusGlow = {
    online: 'shadow-green-500/50',
    idle: 'shadow-yellow-500/50',
    dnd: 'shadow-red-500/50',
    offline: 'shadow-gray-500/50',
  };

  const getAvatarUrl = () => {
    const { id, avatar } = data.discord_user;
    return `https://cdn.discordapp.com/avatars/${id}/${avatar}.${
      avatar?.startsWith('a_') ? 'gif' : 'png'
    }?size=256`;
  };

  const getBannerUrl = () => {
    // Try to get banner from activities or use default gradient
    return null; // Discord banner requires user banner hash which isn't in Lanyard free tier
  };

  const getActivity = () => {
    if (data.listening_to_spotify && data.spotify) {
      return {
        type: 'spotify',
        ...data.spotify,
      };
    }

    if (!data.activities || data.activities.length === 0) {
      return null;
    }

    const activity = data.activities.find((a) => a.type === 0 || a.type === 1);
    return activity || null;
  };

  const activity = getActivity();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-anime-pink via-anime-purple to-anime-blue rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>

        <div className="relative bg-comfy-dark rounded-3xl border border-anime-lavender/10 overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-br from-anime-pink/20 via-anime-purple/20 to-anime-blue/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex items-start gap-4 -mt-10">
              {/* Avatar with status */}
              <div className="relative">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-comfy-dark shadow-xl">
                  <img
                    src={getAvatarUrl()}
                    alt={data.discord_user.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-4 border-comfy-dark ${
                    statusColors[data.discord_status]
                  } shadow-lg ${statusGlow[data.discord_status]}`}
                ></div>
              </div>

              {/* Username and status */}
              <div className="flex-1 pt-12">
                <h3 className="text-xl font-display font-bold text-white mb-1">
                  {data.discord_user.global_name || data.discord_user.username}
                </h3>
                <p className="text-sm text-anime-lavender/60">
                  @{data.discord_user.username}
                </p>
              </div>
            </div>

            {/* Activity Card */}
            {activity && (
              <div className="mt-4 p-4 bg-comfy-darker rounded-2xl border border-anime-lavender/10">
                {data.listening_to_spotify && data.spotify ? (
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={data.spotify.album_art_url}
                        alt={data.spotify.album}
                        className="w-16 h-16 rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Music className="text-anime-pink glow-pink" size={16} />
                        <span className="text-xs text-anime-pink font-semibold">
                          Listening to Spotify
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-white truncate">
                        {data.spotify.song}
                      </p>
                      <p className="text-xs text-anime-lavender/60 truncate">
                        by {data.spotify.artist}
                      </p>
                    </div>
                  </div>
                ) : activity && 'name' in activity ? (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-anime-blue/10 rounded-lg">
                      <Gamepad2 className="text-anime-blue" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Circle className="text-anime-blue fill-anime-blue" size={8} />
                        <span className="text-xs text-anime-blue font-semibold">
                          Playing
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-white truncate">
                        {activity.name}
                      </p>
                      {activity.details && (
                        <p className="text-xs text-anime-lavender/60 truncate">
                          {activity.details}
                        </p>
                      )}
                      {activity.state && (
                        <p className="text-xs text-anime-lavender/50 truncate">
                          {activity.state}
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* Custom Status */}
            {data.activities && data.activities.length > 0 && data.activities.find((a) => a.type === 4) && (
              <div className="mt-3 text-sm text-anime-lavender/80">
                {data.activities.find((a) => a.type === 4)?.state}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


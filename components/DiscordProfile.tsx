'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Music, Gamepad2, Circle, Monitor, Smartphone, Globe } from 'lucide-react';

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
    application_id?: string;
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
  active_on_discord_desktop?: boolean;
  active_on_discord_mobile?: boolean;
  active_on_discord_web?: boolean;
}

interface DiscordBadge {
  id: string;
  description: string;
  icon: string;
  link?: string;
}

interface DiscordAPIProfile {
  user: {
    id: string;
    username: string;
    avatar: string | null;
    banner: string | null;
    banner_color: string | null;
    global_name: string | null;
    avatar_decoration_data?: {
      asset: string;
      sku_id: string;
    };
  };
  badges: DiscordBadge[];
  display_name_styles?: {
    colors?: number[];
  };
}

interface DiscordProfileProps {
  userId: string;
}

export default function DiscordProfile({ userId }: DiscordProfileProps) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [discordApiData, setDiscordApiData] = useState<DiscordAPIProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState<string>('');

  useEffect(() => {

    const fetchInitialData = async () => {
      try {
        console.log('Fetching from REST API for user:', userId);
        const [lanyardRes, dstnRes] = await Promise.all([
          fetch(`https://api.lanyard.rest/v1/users/${userId}`),
          fetch(`https://dcdn.dstn.to/profile/${userId}`)
        ]);

        const lanyardResult = await lanyardRes.json();

        if (dstnRes.ok) {
          const dstnResult = await dstnRes.json();
          setDiscordApiData(dstnResult);
        }

        if (lanyardResult.success && lanyardResult.data) {
          setData(lanyardResult.data);
          setError(null);
        } else {
          setError('User not found. Have you joined the Lanyard Discord server?');
        }

        setLoading(false);
      } catch (err) {
        console.error('REST API Error:', err);
        setError('Failed to fetch Discord presence');
        setLoading(false);
      }
    };

    fetchInitialData();

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

          console.log('❤️ Setting up heartbeat:', d.heartbeat_interval);
          heartbeatInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ op: 3 }));
            }
          }, d.heartbeat_interval);

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

  const getActivity = () => {
    if (!data) return null;
    if (data.listening_to_spotify && data.spotify) {
      return {
        type: 'spotify',
        ...data.spotify,
      };
    }

    if (!data.activities || data.activities.length === 0) {
      return null;
    }

    const activity = data.activities.find((a) => [0, 1, 2, 3].includes(a.type));
    return activity || null;
  };

  const activity = getActivity();

  useEffect(() => {
    if (!activity || !activity.timestamps?.start || activity.type === 'spotify') {
      setElapsed('');
      return;
    }
    const updateElapsed = () => {
      const diff = Math.floor(Date.now() / 1000) - Math.floor(activity.timestamps!.start! / 1000);
      if (diff < 0) return;
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;
      const timeString = h > 0 
        ? `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` 
        : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      setElapsed(`${timeString} elapsed`);
    };
    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [activity]);

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
    return `https://cdn.discordapp.com/avatars/${id}/${avatar}.${avatar?.startsWith('a_') ? 'gif' : 'png'
      }?size=256`;
  };

  const getBannerUrl = () => {
    if (discordApiData?.user?.banner) {
      return `https://cdn.discordapp.com/banners/${userId}/${discordApiData.user.banner}.${discordApiData.user.banner.startsWith('a_') ? 'gif' : 'png'
        }?size=512`;
    }
    return null;
  };

  const resolveAssetUrl = (appId: string | undefined, assetId: string | undefined) => {
    if (!assetId) return null;
    if (assetId.startsWith('mp:external/')) {
      return `https://media.discordapp.net/external/${assetId.replace('mp:external/', '')}`;
    }
    if (appId) {
      return `https://cdn.discordapp.com/app-assets/${appId}/${assetId}.png`;
    }
    return null;
  };



  const nameColor = discordApiData?.display_name_styles?.colors?.[0]
    ? `#${discordApiData.display_name_styles.colors[0].toString(16).padStart(6, '0')}`
    : '#ffffff';

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-anime-pink via-anime-purple to-anime-blue rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>

        <div className="relative bg-comfy-dark rounded-3xl border border-anime-lavender/10 overflow-hidden">
          <div
            className="h-32 bg-gradient-to-br from-anime-pink/20 via-anime-purple/20 to-anime-blue/20 relative overflow-hidden"
            style={discordApiData?.user?.banner_color && !getBannerUrl() ? { backgroundColor: discordApiData.user.banner_color } : {}}
          >
            {getBannerUrl() ? (
              <Image
                src={getBannerUrl()!}
                alt="Banner"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-comfy-dark/80 to-transparent"></div>
          </div>

          <div className="px-6 pb-6">
            <div className="flex items-start gap-4 -mt-10">
              <div className="relative">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-comfy-dark shadow-xl bg-comfy-dark">
                  <Image
                    src={getAvatarUrl()}
                    alt={data.discord_user.username}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                {discordApiData?.user?.avatar_decoration_data && (
                  <Image
                    src={`https://cdn.discordapp.com/avatar-decoration-presets/${discordApiData.user.avatar_decoration_data.asset}.png`}
                    alt="Avatar Decoration"
                    width={96}
                    height={96}
                    className="absolute -top-[8px] -left-[8px] w-24 h-24 max-w-none pointer-events-none"
                    unoptimized
                  />
                )}
                <div
                  className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-4 border-comfy-dark ${statusColors[data.discord_status]
                    } shadow-lg ${statusGlow[data.discord_status]} ${discordApiData?.user?.avatar_decoration_data ? 'z-10' : ''}`}
                ></div>
              </div>

              <div className="flex-1 pt-12">
                <div className="flex items-center gap-2 mb-1">
                  <h3 
                    className="text-xl font-display font-bold drop-shadow-sm"
                    style={{ color: nameColor }}
                  >
                    {data.discord_user.global_name || data.discord_user.username}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-anime-lavender/60">
                  <p>@{data.discord_user.username}</p>
                  <div className="flex gap-1 ml-1 opacity-70">
                    {data.active_on_discord_desktop && <Monitor size={14} />}
                    {data.active_on_discord_mobile && <Smartphone size={14} />}
                    {data.active_on_discord_web && <Globe size={14} />}
                  </div>
                </div>
              </div>

              {discordApiData?.badges && discordApiData.badges.length > 0 && (
                <div className="pt-12 flex justify-end">
                  <div className="flex flex-wrap justify-end gap-1.5 bg-comfy-darker rounded-lg p-1.5 border border-white/5 shadow-sm max-w-[120px]">
                    {discordApiData.badges.map((badge) => (
                      <Image
                        key={badge.id}
                        src={`https://cdn.discordapp.com/badge-icons/${badge.icon}.png`}
                        alt={badge.description}
                        width={24}
                        height={24}
                        className="w-[22px] h-[22px] object-contain cursor-help transition-transform hover:scale-110"
                        title={badge.description}
                        unoptimized
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {activity && (
              <div className="mt-4 p-4 bg-comfy-darker rounded-2xl border border-anime-lavender/10">
                {data.listening_to_spotify && data.spotify ? (
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={data.spotify.album_art_url}
                        alt={data.spotify.album}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg"
                        unoptimized
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
                    <div className="relative flex-shrink-0">
                      {resolveAssetUrl(activity.application_id, activity.assets?.large_image || activity.assets?.small_image) ? (
                        <>
                          <Image
                            src={resolveAssetUrl(activity.application_id, activity.assets?.large_image || activity.assets?.small_image)!}
                            alt={activity.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-lg object-cover"
                            unoptimized
                          />
                          {activity.assets?.large_image && activity.assets?.small_image && (
                            <div className="absolute -bottom-1 -right-1 rounded-full bg-comfy-darker border-[3px] border-comfy-darker">
                              <Image
                                src={resolveAssetUrl(activity.application_id, activity.assets?.small_image)!}
                                alt="Small icon"
                                width={24}
                                height={24}
                                className="w-6 h-6 rounded-full object-cover"
                                unoptimized
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="p-4 bg-anime-blue/10 rounded-lg w-16 h-16 flex items-center justify-center">
                          <Gamepad2 className="text-anime-blue" size={24} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Circle className="text-anime-blue fill-anime-blue" size={8} />
                        <span className="text-xs text-anime-blue font-semibold">
                          {activity.type === 2 ? 'Listening to' : activity.type === 3 ? 'Watching' : 'Playing'}
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
                      {elapsed && (
                        <p className="text-xs text-anime-lavender/50 font-mono mt-0.5">
                          {elapsed}
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            )}

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


import { useState, useEffect, useRef } from "react";
import { Heart, Users, Eye } from "lucide-react";
import { hostInfo } from "@/data/liveData";
import { cn } from "@/lib/utils";

interface FloatingHeart {
  id: number;
  x: number;
  color: string;
}

export default function LiveVideoArea() {
  const [likes, setLikes] = useState(hostInfo.likeCount);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [online] = useState(hostInfo.onlineCount + Math.floor(Math.random() * 200));
  const heartIdRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLikes((prev) => +(prev + Math.random() * 0.03).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const addHeart = () => {
    const colors = ["#f43f5e", "#f59e0b", "#a78bfa", "#38bdf8"];
    const newHeart: FloatingHeart = {
      id: heartIdRef.current++,
      x: 30 + Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2000);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-surface-base">
      {/* Simulated stream background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(260,40%,8%)] via-[hsl(280,30%,12%)] to-[hsl(220,47%,6%)]" />

      {/* Animated ambient light */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* LIVE badge & Online count - Top bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot inline-block" />
            LIVE
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm text-foreground text-xs px-2.5 py-1 rounded-full border border-white/10">
            <Eye className="w-3 h-3 text-muted-foreground" />
            <span className="font-mono">{online.toLocaleString()}</span>
          </div>
        </div>

        {/* Host info */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
          <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary">
            {hostInfo.avatar}
          </div>
          <span className="text-xs text-foreground font-medium">{hostInfo.name}</span>
          <span className="text-[10px] text-muted-foreground">{hostInfo.followers}粉</span>
        </div>
      </div>

      {/* Center content - host placeholder */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none select-none">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 border-2 border-primary/30 flex items-center justify-center text-4xl font-black text-primary">
          {hostInfo.avatar}
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">{hostInfo.name}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{hostInfo.badge} · 直播中</p>
        </div>
        <div className="mt-2 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-center max-w-[280px]">
          <p className="text-xs text-foreground leading-relaxed line-clamp-2">{hostInfo.roomTitle}</p>
        </div>
      </div>

      {/* Likes counter bottom-right */}
      <div className="absolute bottom-20 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 z-10">
        <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
        <span className="font-mono text-xs text-foreground">{likes.toFixed(1)}万</span>
      </div>

      {/* Users icon */}
      <div className="absolute bottom-20 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 z-10">
        <Users className="w-3.5 h-3.5 text-primary" />
        <span className="font-mono text-xs text-foreground">{(online / 10000).toFixed(1)}万在线</span>
      </div>

      {/* Floating hearts */}
      {hearts.map((h) => (
        <div key={h.id}
          className="absolute pointer-events-none animate-float-heart z-20"
          style={{ left: `${h.x}%`, bottom: "80px", color: h.color }}>
          <Heart className="w-6 h-6 fill-current" />
        </div>
      ))}

      {/* Like click area (bottom-right) */}
      <button onClick={addHeart}
        className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center hover:bg-red-500/30 transition-colors z-10">
        <Heart className="w-5 h-5 text-red-400" />
      </button>
    </div>
  );
}

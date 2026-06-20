import { useState, useEffect } from "react";
import { Clock, Tag } from "lucide-react";
import { liveProducts } from "@/data/liveData";
import ProductCard from "./ProductCard";
import type { LiveProduct } from "@/data/liveData";

interface ProductPanelProps {
  onBuy: (product: LiveProduct) => void;
}

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    const id = setInterval(() => setRemaining((p) => (p > 0 ? p - 1 : seconds)), 1000);
    return () => clearInterval(id);
  }, [seconds]);
  const m = String(Math.floor(remaining / 60)).padStart(2, "0");
  const s = String(remaining % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function ProductPanel({ onBuy }: ProductPanelProps) {
  const [activeId, setActiveId] = useState(liveProducts[0].id);
  const countdown = useCountdown(724);
  const activeProduct = liveProducts.find((p) => p.id === activeId) ?? liveProducts[0];

  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden">
      {/* Flash sale countdown */}
      <div className="flex-none flex items-center justify-between px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-900/30 to-orange-900/20 border border-red-500/20">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-red-400" />
          <span className="text-xs font-semibold text-foreground">限时抢购倒计时</span>
        </div>
        <div className="font-mono text-lg font-black text-red-400 tracking-widest">{countdown}</div>
      </div>

      {/* Current featured product */}
      <div className="flex-none">
        <ProductCard product={activeProduct} onBuy={onBuy} />
      </div>

      {/* Product list */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-2 flex-none">
          <Tag className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground">全部商品</span>
          <span className="text-[10px] text-muted-foreground">({liveProducts.length}件)</span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
          {liveProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              compact
              active={p.id === activeId}
              onSelect={setActiveId}
              onBuy={onBuy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

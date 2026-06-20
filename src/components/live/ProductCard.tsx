import { ShoppingCart, Zap, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LiveProduct } from "@/data/liveData";

interface ProductCardProps {
  product: LiveProduct;
  compact?: boolean;
  active?: boolean;
  onSelect?: (id: string) => void;
  onBuy?: (product: LiveProduct) => void;
}

export default function ProductCard({ product, compact, active, onSelect, onBuy }: ProductCardProps) {
  const stockRatio = product.stock / product.totalStock;
  const discount = Math.round((1 - product.price / product.originalPrice) * 10);

  if (compact) {
    return (
      <button
        onClick={() => onSelect?.(product.id)}
        className={cn(
          "w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all",
          active
            ? "border-primary/50 bg-primary/10"
            : "border-border bg-card hover:border-primary/30 hover:bg-primary/5"
        )}>
        {/* Product icon placeholder */}
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border",
          active ? "bg-primary/20 border-primary/30" : "bg-surface-overlay border-border"
        )}>
          <Package className={cn("w-5 h-5", active ? "text-primary" : "text-muted-foreground")} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-xs font-medium truncate", active ? "text-primary" : "text-foreground")}>
            {product.name}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs font-bold text-primary">¥{product.price}</span>
            <span className="text-[10px] text-muted-foreground line-through">¥{product.originalPrice}</span>
            {product.tag && (
              <span className="text-[9px] bg-primary/15 text-primary px-1 py-0.5 rounded font-medium">{product.tag}</span>
            )}
          </div>
        </div>
        <span className="text-[10px] text-muted-foreground shrink-0">{product.sales.toLocaleString()}件</span>
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-primary/30 bg-card overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/15 to-primary/5 px-4 py-2 flex items-center justify-between border-b border-primary/20">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary">直播专享价</span>
        </div>
        {product.tag && (
          <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded font-bold">{product.tag}</span>
        )}
      </div>

      <div className="p-4">
        {/* Product image placeholder */}
        <div className="w-full h-28 rounded-lg bg-surface-overlay border border-border flex items-center justify-center mb-4">
          <div className="text-center">
            <Package className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
            <span className="text-[10px] text-muted-foreground">商品图片</span>
          </div>
        </div>

        {/* Name & desc */}
        <h3 className="text-sm font-semibold text-foreground leading-snug">{product.name}</h3>
        <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{product.desc}</p>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-2xl font-black text-primary">¥{product.price}</span>
          <span className="text-sm text-muted-foreground line-through">¥{product.originalPrice}</span>
          <span className="text-xs bg-red-500/15 text-red-400 px-1.5 py-0.5 rounded font-bold">{discount}折</span>
        </div>

        {/* Stock progress */}
        <div className="mt-3 space-y-1.5">
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">库存紧张</span>
            <span className="font-mono text-warning">仅剩 {product.stock} 件</span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-warning transition-all duration-500"
              style={{ width: `${(1 - stockRatio) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>已售 {(product.totalStock - product.stock).toLocaleString()} 件</span>
            <span>{product.sales.toLocaleString()} 人购买</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onBuy?.(product)}
          className="mt-4 w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all">
          <ShoppingCart className="w-4 h-4" />
          立即抢购
        </button>
      </div>
    </div>
  );
}

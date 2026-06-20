import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Share2, X, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LiveVideoArea from "@/components/live/LiveVideoArea";
import LiveChat from "@/components/live/LiveChat";
import ProductPanel from "@/components/live/ProductPanel";
import type { LiveProduct } from "@/data/liveData";

export default function LiveRoom() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<LiveProduct[]>([]);

  const handleBuy = (product: LiveProduct) => {
    setCartCount((c) => c + 1);
    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists ? prev : [...prev, product];
    });
    toast({
      title: "已加入购物车",
      description: `${product.name} · ¥${product.price}`,
    });
  };

  const totalPrice = cartItems.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex-none h-12 flex items-center justify-between px-4 border-b border-border bg-surface-base z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-sm font-semibold text-foreground">直播间</span>
            <span className="ml-2 text-[10px] text-muted-foreground font-mono">夜间专场</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              toast({ title: "链接已复制" });
            }}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowCart(true)}
            className="relative w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
            <ShoppingCart className="w-3.5 h-3.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden min-h-0">
        {/* Left: Video + Chat */}
        <div className="flex-1 flex flex-col gap-3 min-w-0 min-h-0">
          {/* Video area */}
          <div className="flex-1 min-h-0">
            <LiveVideoArea />
          </div>

          {/* Chat area */}
          <div className="h-52 flex-none rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-surface-overlay">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse-dot" />
              <span className="text-xs font-semibold text-foreground">实时互动</span>
            </div>
            <div className="h-[calc(100%-37px)]">
              <LiveChat />
            </div>
          </div>
        </div>

        {/* Right: Product panel */}
        <div className="w-72 flex-none flex flex-col overflow-hidden">
          <ProductPanel onBuy={handleBuy} />
        </div>
      </div>

      {/* Cart drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)} />
          <div className="relative w-80 h-full bg-card border-l border-border flex flex-col z-10">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-primary" />
                购物车 ({cartCount})
              </h2>
              <button onClick={() => setShowCart(false)}
                className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  购物车为空
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-surface-raised">
                    <div className="w-10 h-10 rounded-lg bg-surface-overlay border border-border flex items-center justify-center text-muted-foreground text-xs shrink-0">
                      图
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-primary font-bold mt-0.5">¥{item.price}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="flex-none p-4 border-t border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">合计</span>
                  <span className="text-lg font-black text-primary">¥{totalPrice}</span>
                </div>
                <button
                  onClick={() => {
                    toast({ title: "订单提交成功", description: "请前往订单页面完成支付" });
                    setShowCart(false);
                    setCartItems([]);
                    setCartCount(0);
                  }}
                  className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all">
                  立即结算
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

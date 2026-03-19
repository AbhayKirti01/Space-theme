import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Activity, BarChart3, Globe } from 'lucide-react';

const Candlestick: React.FC<{ delay: number; height: number; isUp: boolean }> = ({ delay, height, isUp }) => (
  <motion.div 
    initial={{ scaleY: 0, opacity: 0 }}
    whileInView={{ scaleY: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center w-1 md:w-2"
  >
    <div className={isUp ? "w-[1px] h-4 bg-primary" : "w-[1px] h-4 bg-secondary"} />
    <div 
      className={`w-full rounded-sm ${isUp ? "bg-primary shadow-[0_0_10px_rgba(0,255,136,0.3)]" : "bg-secondary shadow-[0_0_10px_rgba(255,0,85,0.3)]"}`} 
      style={{ height: `${height}px` }} 
    />
    <div className={isUp ? "w-[1px] h-4 bg-primary" : "w-[1px] h-4 bg-secondary"} />
  </motion.div>
);

export const TradingSection: React.FC = () => {
  const chartData = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      height: Math.random() * 40 + 20,
      isUp: Math.random() > 0.4
    }));
  }, []);

  return (
    <section id="trading" className="py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tighter">
              Market <span className="text-primary">Analysis</span> & Trading
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
              Specialized in technical analysis and algorithmic trading strategies. 
              Bridging the gap between financial markets and technology through data-driven insights.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: TrendingUp, label: "Forex", value: "+12.5%" },
                { icon: Activity, label: "Crypto", value: "Bullish" },
                { icon: BarChart3, label: "Gold", value: "Stable" },
                { icon: Globe, label: "Global", value: "Active" },
              ].map((item, i) => (
                <div key={i} className="glass p-6 rounded-2xl hover:bg-white/10 transition-colors group">
                  <item.icon className="text-primary mb-4 group-hover:scale-110 transition-transform" size={24} />
                  <div className="text-sm text-white/40 uppercase tracking-widest mb-1">{item.label}</div>
                  <div className="text-xl font-bold">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glass p-4 md:p-8 rounded-3xl aspect-square md:aspect-video flex items-end justify-between gap-1 md:gap-2 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] md:text-xs font-medium uppercase tracking-widest text-white/60">Live Market</span>
                </div>
                <div className="text-xl md:text-2xl font-bold font-mono">$68,432.12</div>
              </div>
              
              {chartData.map((data, i) => (
                <Candlestick key={i} delay={i * 0.05} height={data.height} isUp={data.isUp} />
              ))}
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-[80px] rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 blur-[80px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

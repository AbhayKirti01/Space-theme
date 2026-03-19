import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MousePointer2, Hexagon } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants: any = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen min-h-[100dvh] flex items-center justify-center px-6 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full text-center z-10 pb-32 md:pb-0"
      >
        <motion.div 
          variants={itemVariants} 
          className="mb-8 flex justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <a href="#home" className="group relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/40 transition-all duration-500" />
            <div className="relative glass p-4 rounded-2xl border border-white/10 group-hover:border-primary/50 transition-all duration-500">
              <Hexagon size={32} className="text-primary group-hover:rotate-90 transition-transform duration-700" />
            </div>
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <span className="px-4 py-2 rounded-full glass text-primary text-xs font-medium tracking-widest uppercase">
            Available for new projects
          </span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight tracking-tighter"
        >
          <span className="block">Abhay</span>
          <span className="text-gradient">Kirti</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-base md:text-xl lg:text-2xl text-white/60 mb-10 max-w-2xl mx-auto font-light px-4"
        >
          Web Developer <span className="text-primary mx-2">|</span> 
          Graphic Designer <span className="text-accent mx-2">|</span> 
          Market Analyst
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a 
            href="#contact"
            className="w-full sm:w-auto group relative px-8 py-4 bg-white text-black rounded-full font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95 inline-block"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Hire Me <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          
          <a 
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 glass rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            Let's Talk <MousePointer2 size={18} />
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';

const { Zap, Cpu, Globe2 } = LucideIcons;

const SkillCard: React.FC<{ 
  title: string; 
  icon: string; 
  skills: string[]; 
  color: string;
  delay: number;
  image?: string;
}> = ({ title, icon, skills, color, delay, image }) => {
  const Icon = (LucideIcons as any)[icon] || LucideIcons.Brain;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass p-6 md:p-8 rounded-[2rem] relative overflow-hidden group hover:bg-white/10 transition-all duration-500"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-${color}/20 transition-all`} />
      
      {image && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="relative z-10">
        <div className={`p-4 rounded-2xl bg-${color}/10 text-${color} w-fit mb-6 group-hover:scale-110 transition-transform duration-500`}>
          <Icon size={28} />
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">{title}</h3>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span 
              key={i}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-medium text-white/60 hover:text-white hover:border-white/30 transition-all"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Skills: React.FC = () => {
  const staticSkills = [
    {
      title: "AI & Innovation",
      icon: "Brain",
      skills: ["AI Prompting", "Generative AI", "Prompt Engineering"],
      color: "primary",
    },
    {
      title: "Market Analysis",
      icon: "LineChart",
      skills: ["Live Chart Analysis", "MMC Strategy", "Technical Analysis", "Market Sentiment"],
      color: "secondary",
    },
    {
      title: "Web Development",
      icon: "Code2",
      skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Node.js"],
      color: "accent",
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4"
            >
              Expertise
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter"
            >
              Core <span className="text-gradient">Skills.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/40 max-w-md text-base md:text-xl"
          >
            A multidisciplinary approach combining cutting-edge technology with financial market intelligence.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticSkills.map((group, i) => (
            <SkillCard 
              key={i} 
              {...group} 
              delay={i * 0.1} 
            />
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 glass p-6 sm:p-12 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group mt-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <h4 className="text-3xl font-bold mb-2">Always Learning</h4>
              <p className="text-white/40">Constantly evolving with the latest industry trends and emerging technologies.</p>
            </div>
            
            <div className="relative z-10 flex gap-4">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center animate-bounce">
                <Zap size={20} className="text-primary" />
              </div>
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center animate-bounce [animation-delay:0.2s]">
                <Cpu size={20} className="text-accent" />
              </div>
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center animate-bounce [animation-delay:0.4s]">
                <Globe2 size={20} className="text-secondary" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

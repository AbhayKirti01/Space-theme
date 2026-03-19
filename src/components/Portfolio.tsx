import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '../utils/cn';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const categories = ['All', 'Web', 'Design', 'Trading'];

const staticProjects = [
  {
    title: "Ethereal Design System",
    category: "Design",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800&h=600",
    description: "A futuristic UI kit focused on glassmorphism and motion.",
    tags: ["Figma", "Motion", "UI/UX"]
  },
  {
    title: "Nebula Web Engine",
    category: "Web",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800&h=600",
    description: "High-performance rendering engine for interactive web experiences.",
    tags: ["TypeScript", "WebGL", "Vite"]
  },
  {
    title: "Crypto Pulse",
    category: "Trading",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800&h=600",
    description: "Market sentiment analysis tool for cryptocurrency traders.",
    tags: ["Python", "React", "D3.js"]
  }
];

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const path = 'projects';
      try {
        const q = query(collection(db, path), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        if (fetchedProjects.length > 0) {
          setProjects(fetchedProjects);
        } else {
          setProjects(staticProjects);
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes('permission')) {
          handleFirestoreError(error, OperationType.GET, path);
        }
        console.error("Error fetching projects:", error);
        setProjects(staticProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p => 
    activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 px-4 md:px-6 bg-white/2 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tighter">
              Selected <span className="text-accent">Works.</span>
            </h2>
            <p className="text-white/40 text-lg md:text-xl max-w-md">
              A collection of projects where technology meets creative expression.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === cat 
                    ? "bg-white text-black" 
                    : "glass text-white/60 hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id || project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -10 }}
                className="group relative glass rounded-3xl overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold px-2 py-1 rounded bg-primary/10">
                      {project.category || 'Web'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-white/40 text-sm mb-6 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="text-[10px] text-white/30 border border-white/10 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass hover:bg-primary hover:text-black transition-all">
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <button className="p-3 rounded-full glass hover:bg-white hover:text-black transition-all">
                      <Github size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

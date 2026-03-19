import React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="glass p-6 sm:p-12 md:p-24 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight tracking-tighter">
                Let's create <br />
                <span className="text-gradient">something epic.</span>
              </h2>
              <p className="text-white/40 text-base md:text-xl mb-8 md:mb-12 max-w-md">
                Have a project in mind? Or just want to say hi? Feel free to reach out.
              </p>

              <div className="flex flex-col gap-6">
                <motion.a 
                  href="mailto:abhay.kirti25@gmail.com" 
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex items-center gap-4 group max-w-full"
                >
                  <div className="p-3 sm:p-4 rounded-2xl glass group-hover:bg-primary group-hover:text-black transition-all shrink-0">
                    <Mail size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0 overflow-hidden">
                    <div className="text-[10px] sm:text-xs text-white/30 uppercase tracking-widest mb-1">Email Me</div>
                    <div className="text-base sm:text-xl font-medium break-all sm:break-normal">abhay.kirti25@gmail.com</div>
                  </div>
                </motion.a>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { name: 'LinkedIn', icon: Linkedin, href: '#' },
                  { name: 'GitHub', icon: Github, href: '#' },
                  { name: 'Instagram', icon: Instagram, href: '#' },
                  { name: 'Dribbble', icon: ArrowUpRight, href: '#' },
                ].map((social) => (
                  <motion.a 
                    key={social.name}
                    href={social.href}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="glass p-4 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-4 hover:bg-white/10 transition-all group"
                  >
                    <social.icon size={24} className="sm:w-8 sm:h-8 group-hover:scale-110 transition-transform text-white/60 group-hover:text-white" />
                    <span className="text-xs sm:text-sm font-medium text-white/40 group-hover:text-white">{social.name}</span>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-white/30 text-xs sm:text-sm text-center md:text-left">
                  © 2026 Abhay Kirti. All rights reserved.
                </div>
                <div className="flex gap-4 sm:gap-8 text-white/30 text-xs sm:text-sm">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

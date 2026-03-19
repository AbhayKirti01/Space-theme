import React, { useState, useEffect } from 'react';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, LogOut, Layout, Brain, Save, X } from 'lucide-react';

const OWNER_EMAIL = "abhay.humane3@gmail.com";

export const Admin: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'projects' | 'skills'>('projects');
  
  // Form states
  const [projectForm, setProjectForm] = useState({ title: '', description: '', image: '', tags: '', link: '' });
  const [skillForm, setSkillForm] = useState({ title: '', icon: '', skills: '', color: 'primary', image: '', order: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u && u.email === OWNER_EMAIL) {
        setUser(u);
        fetchData();
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      const projectsSnap = await getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc')));
      setProjects(projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      const skillsSnap = await getDocs(query(collection(db, 'skills'), orderBy('order', 'asc')));
      setSkills(skillsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      if (error instanceof Error && error.message.includes('permission')) {
        handleFirestoreError(error, OperationType.GET, 'projects/skills');
      }
      console.error("Fetch failed", error);
    }
  };

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => signOut(auth);

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const path = 'projects';
    const data = {
      ...projectForm,
      tags: projectForm.tags.split(',').map(t => t.trim()),
      createdAt: serverTimestamp()
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, path, editingId), data);
      } else {
        await addDoc(collection(db, path), data);
      }
      
      setProjectForm({ title: '', description: '', image: '', tags: '', link: '' });
      setEditingId(null);
      fetchData();
    } catch (error) {
      handleFirestoreError(error, editingId ? OperationType.UPDATE : OperationType.CREATE, path);
    }
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const path = 'skills';
    const data = {
      ...skillForm,
      skills: skillForm.skills.split(',').map(s => s.trim()),
      order: Number(skillForm.order)
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, path, editingId), data);
      } else {
        await addDoc(collection(db, path), data);
      }
      
      setSkillForm({ title: '', icon: '', skills: '', color: 'primary', image: '', order: 0 });
      setEditingId(null);
      fetchData();
    } catch (error) {
      handleFirestoreError(error, editingId ? OperationType.UPDATE : OperationType.CREATE, path);
    }
  };

  const deleteItem = async (col: string, id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteDoc(doc(db, col, id));
        fetchData();
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, col);
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="glass p-12 rounded-[2rem] text-center max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6">Admin Access</h1>
          <p className="text-white/40 mb-8">Only the owner can access this panel to manage projects and skills.</p>
          <button 
            onClick={login}
            className="w-full py-4 bg-primary text-black rounded-full font-bold hover:scale-105 transition-transform"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">Admin <span className="text-gradient">Panel.</span></h1>
            <p className="text-white/40 text-sm">Logged in as {user.email}</p>
          </div>
          <button onClick={logout} className="p-4 glass rounded-2xl text-white/60 hover:text-white transition-colors">
            <LogOut size={24} />
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          <button 
            onClick={() => { setActiveTab('projects'); setEditingId(null); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all text-sm md:text-base ${activeTab === 'projects' ? 'bg-primary text-black' : 'glass text-white/60'}`}
          >
            <Layout size={18} /> Projects
          </button>
          <button 
            onClick={() => { setActiveTab('skills'); setEditingId(null); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all text-sm md:text-base ${activeTab === 'skills' ? 'bg-primary text-black' : 'glass text-white/60'}`}
          >
            <Brain size={18} /> Skills
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="glass p-6 md:p-8 rounded-[2rem] h-fit lg:sticky lg:top-32">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              {editingId ? <Edit2 size={20} /> : <Plus size={20} />}
              {editingId ? 'Edit' : 'Add New'} {activeTab === 'projects' ? 'Project' : 'Skill'}
            </h2>

            <form onSubmit={activeTab === 'projects' ? handleProjectSubmit : handleSkillSubmit} className="space-y-4">
              {activeTab === 'projects' ? (
                <>
                  <input 
                    type="text" placeholder="Project Title" 
                    value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                    className="w-full p-4 glass rounded-xl outline-none focus:border-primary/50 transition-colors" required
                  />
                  <textarea 
                    placeholder="Description" 
                    value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                    className="w-full p-4 glass rounded-xl outline-none focus:border-primary/50 transition-colors h-32" required
                  />
                  <input 
                    type="text" placeholder="Image URL" 
                    value={projectForm.image} onChange={e => setProjectForm({...projectForm, image: e.target.value})}
                    className="w-full p-4 glass rounded-xl outline-none focus:border-primary/50 transition-colors" required
                  />
                  <input 
                    type="text" placeholder="Tags (comma separated)" 
                    value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})}
                    className="w-full p-4 glass rounded-xl outline-none focus:border-primary/50 transition-colors" required
                  />
                  <input 
                    type="text" placeholder="Project Link" 
                    value={projectForm.link} onChange={e => setProjectForm({...projectForm, link: e.target.value})}
                    className="w-full p-4 glass rounded-xl outline-none focus:border-primary/50 transition-colors"
                  />
                </>
              ) : (
                <>
                  <input 
                    type="text" placeholder="Skill Category Title" 
                    value={skillForm.title} onChange={e => setSkillForm({...skillForm, title: e.target.value})}
                    className="w-full p-4 glass rounded-xl outline-none focus:border-primary/50 transition-colors" required
                  />
                  <input 
                    type="text" placeholder="Lucide Icon Name (e.g., Brain, Code2)" 
                    value={skillForm.icon} onChange={e => setSkillForm({...skillForm, icon: e.target.value})}
                    className="w-full p-4 glass rounded-xl outline-none focus:border-primary/50 transition-colors" required
                  />
                  <input 
                    type="text" placeholder="Skills (comma separated)" 
                    value={skillForm.skills} onChange={e => setSkillForm({...skillForm, skills: e.target.value})}
                    className="w-full p-4 glass rounded-xl outline-none focus:border-primary/50 transition-colors" required
                  />
                  <select 
                    value={skillForm.color} onChange={e => setSkillForm({...skillForm, color: e.target.value})}
                    className="w-full p-4 glass rounded-xl outline-none focus:border-primary/50 transition-colors appearance-none"
                  >
                    <option value="primary">Primary (Blue)</option>
                    <option value="secondary">Secondary (Purple)</option>
                    <option value="accent">Accent (Emerald)</option>
                  </select>
                  <input 
                    type="text" placeholder="Image URL (Optional)" 
                    value={skillForm.image} onChange={e => setSkillForm({...skillForm, image: e.target.value})}
                    className="w-full p-4 glass rounded-xl outline-none focus:border-primary/50 transition-colors"
                  />
                  <input 
                    type="number" placeholder="Display Order" 
                    value={skillForm.order} onChange={e => setSkillForm({...skillForm, order: Number(e.target.value)})}
                    className="w-full p-4 glass rounded-xl outline-none focus:border-primary/50 transition-colors" required
                  />
                </>
              )}

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 py-4 bg-primary text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                  <Save size={20} /> {editingId ? 'Update' : 'Save'}
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    onClick={() => { setEditingId(null); setProjectForm({ title: '', description: '', image: '', tags: '', link: '' }); setSkillForm({ title: '', icon: '', skills: '', color: 'primary', image: '', order: 0 }); }}
                    className="px-6 glass rounded-xl text-white/60 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Existing {activeTab === 'projects' ? 'Projects' : 'Skills'}</h2>
            <AnimatePresence mode="popLayout">
              {(activeTab === 'projects' ? projects : skills).map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass p-6 rounded-2xl flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    )}
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-xs text-white/40">{activeTab === 'projects' ? item.tags.join(', ') : item.skills.join(', ')}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setEditingId(item.id);
                        if (activeTab === 'projects') {
                          setProjectForm({ title: item.title, description: item.description, image: item.image, tags: item.tags.join(', '), link: item.link || '' });
                        } else {
                          setSkillForm({ title: item.title, icon: item.icon, skills: item.skills.join(', '), color: item.color, image: item.image || '', order: item.order });
                        }
                      }}
                      className="p-2 glass rounded-lg text-white/60 hover:text-primary transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => deleteItem(activeTab, item.id)}
                      className="p-2 glass rounded-lg text-white/60 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

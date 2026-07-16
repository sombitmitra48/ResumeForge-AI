import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  const [score, setScore] = useState(61);

  useEffect(() => {
    const t = setTimeout(() => setScore(98), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center relative px-6 md:px-12 pt-32 pb-20 overflow-hidden">
      {/* Grid lines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }}></div>
      
      {/* Glowing orb */}
      <div className="absolute top-[-10%] left-1/2 transform -translate-x-1/2 w-[900px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)" }}></div>

      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 font-[var(--font-mono)] text-xs tracking-[0.2em] uppercase text-gold mb-8"
          >
            <div className="w-8 h-px bg-gold"></div>
            JD Matcher · AI Tailor · Cover Letter
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-[var(--font-display)] text-5xl md:text-7xl font-light leading-[1.05] tracking-tight text-text max-w-3xl"
          >
            The Resume Builder <br/>
            That Actually <em className="italic text-gold">Gets You Hired</em>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="text-lg text-text-muted max-w-xl leading-[1.7] mt-8 font-light"
          >
            Build, tailor, and apply — all in one place. Analyze your match against any job, get AI-rewritten content, and generate a cover letter in seconds.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="flex items-center gap-6 mt-12"
          >
            <Link to="/builder" className="inline-flex items-center gap-2 bg-gold text-bg font-[var(--font-sans)] text-sm font-semibold tracking-[0.12em] uppercase px-8 py-4 rounded-sm border border-gold transition-all duration-300 hover:bg-transparent hover:text-gold hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,168,76,0.2)]">
              Build My Resume <ArrowRight size={16} className="ml-1" />
            </Link>
            <a href="#features" className="inline-flex items-center gap-2 text-text-muted text-sm tracking-[0.08em] transition-colors hover:text-text">
              Explore features
            </a>
          </motion.div>
        </div>

        {/* Floating Resume Preview */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hidden lg:block relative ml-auto w-full max-w-md"
        >
          <div className="bg-bg2 border border-border p-8 relative rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(201,168,76,0.18)]">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-transparent"></div>
            
            <motion.div 
              key={score}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-4 -right-4 bg-gold text-bg font-[var(--font-mono)] text-xs font-semibold px-3 py-1 rounded-full shadow-lg"
            >
              ATS {score}% Match
            </motion.div>

            <h3 className="font-[var(--font-display)] text-2xl text-gold mb-1">Jane Doe</h3>
            <p className="text-[10px] tracking-[0.1em] text-text-muted uppercase mb-6">Senior Frontend Engineer</p>

            <div className="inline-flex items-center gap-1.5 bg-[rgba(201,168,76,0.1)] border border-border px-3 py-1 rounded-full text-[10px] text-gold tracking-[0.08em] mb-5">
              <Sparkles size={10} /> AI Tailored
            </div>

            <div className="space-y-4">
              <div>
                <div className="h-2 bg-bg3 rounded-sm w-[40%] mb-2"></div>
                <div className="h-2 bg-bg3 rounded-sm w-[85%] mb-2"></div>
                <div className="h-2 bg-bg3 rounded-sm w-[65%]"></div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="h-2 bg-[rgba(201,168,76,0.15)] border border-border rounded-sm w-[30%] mb-3"></div>
                <div className="h-2 bg-bg3 rounded-sm w-[100%] mb-2"></div>
                <div className="h-2 bg-bg3 rounded-sm w-[90%]"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

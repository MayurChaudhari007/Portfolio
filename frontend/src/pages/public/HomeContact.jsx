import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

/* ---------------- ANIMATION VARIANTS ---------------- */

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.2 }
  },
  exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 30 }
};

const HomeContact = () => {
  const form = useRef();
  const [status, setStatus] = useState(""); // sending | success | error

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      () => {
        setStatus("success");
        form.current.reset();
        setTimeout(() => setStatus(""), 5000);
      },
      () => {
        setStatus("error");
      }
    );
  };

  return (
    <motion.section
      id="contact"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: false, margin: "-100px" }}
      className="py-24 relative bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* HEADER */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block mb-4 uppercase tracking-tight">
            Get In <span className="text-slate-900">Touch</span>
          </h2>
          <div className="h-1.5 w-20 bg-indigo-600 rounded-full mx-auto mb-6"></div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium italic">
            "Have a question or want to work together? Let's turn your ideas into reality."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* LEFT PANEL: CONTACT INFO */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-10"
          >
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-wide">
                Contact Information
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                I'm always open to discussing new projects, creative ideas or 
                opportunities to be part of your visions. Feel free to reach out!
              </p>
              
              <a
                href="mailto:chaudharimayur485@gmail.com"
                className="text-xl md:text-2xl font-black text-indigo-600 hover:text-indigo-800 transition-colors break-all"
              >
                chaudharimayur485@gmail.com
              </a>
            </div>

            {/* SOCIALS - Using Font Awesome (Consistent with your other files) */}
            <div>
              <h4 className="text-xs font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">
                Follow My Journey
              </h4>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: "fa-brands fa-github", link: "https://github.com/MayurChaudhari007", color: "hover:bg-slate-900" },
                  { icon: "fa-brands fa-linkedin-in", link: "https://www.linkedin.com/in/mayur-chaudhari-7949752ba/", color: "hover:bg-blue-700" },
                  { icon: "fa-solid fa-code", link: "https://leetcode.com/u/ItsMeMayur/", color: "hover:bg-orange-600" },
                  { icon: "fa-brands fa-twitter", link: "https://x.com/itsmemayur007", color: "hover:bg-slate-800" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 hover:text-white ${social.color} transition-all duration-300 hover:-translate-y-2 text-xl cursor-cta`}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL: EMAIL FORM */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            {status === "success" ? (
              <div className="py-12 text-center">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase">Success!</h3>
                <p className="text-slate-500 font-medium">Your message is on its way.</p>
              </div>
            ) : (
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Name</label>
                    <input
                      type="text"
                      name="user_name"
                      required
                      placeholder="Your Name"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                    <input
                      type="email"
                      name="user_email"
                      required
                      placeholder="hello@example.com"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Message</label>
                  <textarea
                    name="user_message"
                    required
                    rows="5"
                    placeholder="Tell me about your project..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium text-slate-600 resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === "sending"}
                  type="submit"
                  className="w-full py-5 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all cursor-cta disabled:bg-slate-300"
                >
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fa-solid fa-circle-notch animate-spin"></i> Processing...
                    </span>
                  ) : "Send Message"}
                </motion.button>

                {status === "error" && (
                  <p className="text-red-500 text-[10px] font-black uppercase text-center mt-4">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HomeContact;
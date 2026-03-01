

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

/* ---------------- ANIMATION ---------------- */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ContactForm = () => {
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
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="py-12 md:py-20 bg-white"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          variants={fadeUp}
          className="bg-slate-50 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
        >

          {/* LEFT PANEL */}
          <motion.div
            variants={fadeUp}
            className="lg:w-2/5 bg-indigo-600 p-8 md:p-12 lg:p-16 text-white flex flex-col justify-between"
          >
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-[1.1] tracking-tight uppercase">
                Let’s start a <br />
                <span className="text-indigo-200">conversation.</span>
              </h2>

              <p className="text-indigo-100 mb-10 text-base md:text-lg font-medium leading-relaxed">
                Have a question or a proposal? I’m always open to discussing new
                projects or creative ideas.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg text-xl">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-0.5">
                      Email Me
                    </p>
                    <p className="font-bold text-sm md:text-base break-all">
                      chaudharimayur485@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg text-xl">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-0.5">
                      Location
                    </p>
                    <p className="font-bold text-sm md:text-base">
                      Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SOCIAL BAR */}
            <div className="mt-12 pt-8 border-t border-indigo-500/50">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-6">
                Connect with me:
              </p>

              <div className="flex flex-wrap gap-6">
                <a href="https://github.com/MayurChaudhari007" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-black transition-colors cursor-cta">
                  <i className="fa-brands fa-github text-lg"></i> GitHub
                </a>

                <a href="https://www.linkedin.com/in/mayur-chaudhari-7949752ba/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-cta">
                  <i className="fa-brands fa-linkedin text-lg"></i> LinkedIn
                </a>

                <a href="https://leetcode.com/u/ItsMeMayur/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-orange-600 transition-colors cursor-cta">
                  <i className="fa-solid fa-code text-lg"></i> LeetCode
                </a>

                <a href="https://x.com/itsmemayur007" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-black transition-colors cursor-cta">
                  <i className="fa-brands fa-twitter text-lg"></i> X
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL (FORM) */}
          <motion.div
            variants={fadeUp}
            className="lg:w-3/5 p-8 md:p-12 lg:p-16 bg-white flex flex-col justify-center"
          >
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center text-4xl mb-6 shadow-xl shadow-emerald-50">
                  <i className="fa-solid fa-paper-plane"></i>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 uppercase tracking-tight">
                  Message Sent!
                </h3>

                <p className="text-slate-500 font-medium max-w-xs mx-auto">
                  Thank you for reaching out. I'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form ref={form} onSubmit={sendEmail} className="space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      required
                      placeholder="your name"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      required
                      placeholder="abcd@example.com"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Your Message
                  </label>
                  <textarea
                    name="user_message"
                    required
                    rows="5"
                    placeholder="Write your message..."
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none font-medium text-slate-600 leading-relaxed"
                  ></textarea>
                </div>

                <div className="pt-4 flex flex-col items-center md:items-start gap-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all disabled:bg-slate-300 disabled:transform-none cursor-cta"
                  >
                    {status === "sending" ? (
                      <span className="flex items-center gap-2">
                        <i className="fa-solid fa-circle-notch animate-spin"></i> Sending...
                      </span>
                    ) : "Send Message"}
                  </button>

                  {status === "error" && (
                    <p className="text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                      Submission failed. Please try again.
                    </p>
                  )}
                </div>

              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactForm;

// import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import api from "../../services/api";

// const About = () => {
//   const [about, setAbout] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAbout = async () => {
//       try {
//         const res = await api.get("/about");
//         if (res.data.success) {
//           setAbout(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching about data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAbout();
//   }, []);

//   // if (loading) return <div className="text-center py-20">Loading...</div>;
//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   if (!about)
//     return <div className="text-center py-20">No about info found.</div>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-16 ">
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="p-8 md:p-12 bg-white">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">
//             {about.headline}
//           </h2>
//           <p className="text-gray-500 mb-8">{about.contactEmail}</p>

//           <article className="prose prose-blue max-w-none">
//             <ReactMarkdown>{about.bio}</ReactMarkdown>
//           </article>

//           {about.socialLinks && about.socialLinks.length > 0 && (
//             <div className="mt-8 pt-8 border-t border-gray-100">
//               <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
//                 Connect
//               </h3>
//               <div className="flex gap-4">
//                 {about.socialLinks.map((link, index) => (
//                   <a
//                     key={index}
//                     href={link.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-600 hover:text-blue-600 font-medium transition"
//                   >
//                     {link.platform}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

// ------------------------------------------------------------------------------------------

// import React from 'react';
// import { Link } from 'react-router-dom';

// const About = () => {
//     // Stats to make the page engaging
//     const stats = [
//         { label: 'Projects Completed', value: '15+' },
//         { label: 'Core Technologies', value: '10+' },
//         { label: 'Learning Journey', value: '2 Years' },
//         { label: 'Certifications', value: '5+' },
//     ];

//     const services = [
//         {
//             title: "Frontend Development",
//             desc: "Crafting beautiful, responsive, and user-friendly interfaces using React and Tailwind CSS.",
//             icon: "🚀"
//         },
//         {
//             title: "Backend Systems",
//             desc: "Building scalable APIs and secure database architectures with Node.js, Express, and MongoDB.",
//             icon: "⚙️"
//         },
//         {
//             title: "AI Integration",
//             desc: "Implementing smart features using Gemini API and Machine Learning models.",
//             icon: "🧠"
//         }
//     ];

//     return (
//         <div className="bg-white">
//             {/* --- Hero Section --- */}
//             <section className="relative py-20 overflow-hidden">
//                 <div className="max-w-7xl mx-auto px-6 lg:px-8">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                         <div>
//                             <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
//                                 My Story
//                             </span>
//                             <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
//                                 Designing the future, <br />
//                                 <span className="text-blue-600">one line of code</span> at a time.
//                             </h1>
//                             <p className="text-lg text-gray-600 leading-relaxed mb-8">
//                                 I'm a passionate **Full Stack Developer** based in India, currently pursuing my
//                                 **MCA**. I specialize in building digital experiences that combine robust
//                                 backend logic with pixel-perfect frontend design.
//                             </p>
//                             <div className="flex flex-wrap gap-4">
//                                 <Link to="/projects" className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition shadow-lg hover:-translate-y-1">
//                                     See My Work
//                                 </Link>
//                                 <Link to="/activity" className="px-8 py-3 border border-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition">
//                                     Read Blog
//                                 </Link>
//                             </div>
//                         </div>

//                         {/* Image/Decoration Area */}
//                         <div className="relative">
//                             <div className="aspect-square rounded-3xl bg-blue-600/5 border border-blue-100 p-8 relative overflow-hidden">
//                                 {/* Replace with your actual photo later */}
//                                 <div className="w-full h-full rounded-2xl bg-gray-200 flex items-center justify-center text-gray-400 text-4xl italic">
//                                     [Your Photo]
//                                 </div>
//                                 {/* Floating Badge */}
//                                 <div className="absolute bottom-12 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-4 animate-bounce">
//                                     <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
//                                     <div>
//                                         <p className="text-xs font-bold text-gray-400 uppercase">Available for</p>
//                                         <p className="text-sm font-black text-gray-900">New Projects</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* --- Stats Section --- */}
//             <section className="bg-gray-900 py-16">
//                 <div className="max-w-7xl mx-auto px-6 lg:px-8">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//                         {stats.map((stat, i) => (
//                             <div key={i} className="text-center">
//                                 <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</div>
//                                 <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">{stat.label}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* --- What I Do Section --- */}
//             <section className="py-24 bg-gray-50/50">
//                 <div className="max-w-7xl mx-auto px-6 lg:px-8">
//                     <div className="text-center mb-16">
//                         <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter sm:text-4xl">
//                             What I <span className="text-blue-600">Bring To The Table</span>
//                         </h2>
//                         <div className="mt-4 h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         {services.map((service, i) => (
//                             <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
//                                 <div className="text-4xl mb-6 group-hover:scale-125 transition-transform inline-block">
//                                     {service.icon}
//                                 </div>
//                                 <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
//                                 <p className="text-gray-600 leading-relaxed text-sm">
//                                     {service.desc}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* --- Engagement Section --- */}
//             <section className="py-24">
//                 <div className="max-w-4xl mx-auto px-6 text-center">
//                     <h2 className="text-3xl font-black text-gray-900 mb-6">Let's work on something great.</h2>
//                     <p className="text-gray-600 mb-10 text-lg">
//                         I am currently looking for internship opportunities or freelance projects.
//                         If you have an idea or just want to chat tech, feel free to reach out!
//                     </p>
//                     <a href="mailto:your-email@example.com" className="inline-block px-10 py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-full shadow-blue-200 shadow-2xl hover:bg-blue-700 hover:-translate-y-1 transition-all">
//                         Get In Touch
//                     </a>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default About;

// ------------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { Link } from "react-router-dom";
// import api from "../../services/api";


// const About = () => {
//   const [about, setAbout] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAbout = async () => {
//       try {
//         const res = await api.get("/about");
//         if (res.data.success) {
//           setAbout(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching about data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAbout();
//   }, []);

//   //   if (loading)
//   //     return (
//   //       <div className="flex justify-center items-center min-h-[70vh]">
//   //         <div className="relative w-16 h-16">
//   //           <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
//   //           <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
//   //         </div>
//   //       </div>
//   //     );
//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   if (!about)
//     return (
//       <div className="text-center py-32">
//         <p className="text-gray-400 italic">
//           No biographical information found.
//         </p>
//       </div>
//     );

//   return (
//     <div className="bg-white min-h-screen">
//       {/* --- HERO SECTION --- */}
//       <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
//             {/* Image/Visual Container (Order First on Mobile) */}
//             <div className="lg:col-span-5 order-first lg:order-last">
//               <div className="relative">
//                 {/* Decorative Elements */}
//                 <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>
//                 <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60"></div>

//                 {/* Main Photo Card */}
//                 <div className="relative aspect-[4/5] rounded-[2.5rem] bg-slate-100 border border-slate-200 overflow-hidden shadow-2xl transition-transform hover:rotate-2 duration-500">
//                   <div className="absolute inset-0 flex items-center justify-center text-slate-300 italic font-serif text-2xl">
//                     {/* Replace with <img> later */}
//                     <img src="/image/Mayur_Chaudhari.jpg" alt="" />
//                   </div>
//                   {/* Gradient Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent"></div>
//                 </div>

//                 {/* Floating Contact Badge */}
//                 <div className="absolute -bottom-6 -right-4 md:right-0 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-in slide-in-from-right duration-700">
//                   <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                       />
//                     </svg>
//                   </div>
//                   <div className="pr-4">
//                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
//                       Available for hire
//                     </p>
//                     <p className="text-sm font-bold text-slate-800">
//                       {about.contactEmail}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Text Content Area */}
//             <div className="lg:col-span-7 text-center lg:text-left">
//               <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-[0.2em] mb-6 border border-indigo-100">
//                 Full Stack Developer
//               </span>
//               <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
//                 {about.headline.split(" ").map((word, i) => (
//                   <span key={i}>
//                     {i === about.headline.split(" ").length - 1 ? (
//                       <span className="text-indigo-600">{word}</span>
//                     ) : (
//                       word + " "
//                     )}
//                   </span>
//                 ))}
//               </h1>

//               <div className="prose prose-indigo prose-lg text-slate-600 max-w-none mb-10 leading-relaxed font-medium italic">
//                 <ReactMarkdown>{about.bio}</ReactMarkdown>
//               </div>

//               <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
//                 <Link
//                   to="/projects"
//                   className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1"
//                 >
//                   View Projects
//                 </Link>
//                 <div className="flex items-center gap-6">
//                   {about.socialLinks?.map((link, index) => (
//                     <a
//                       key={index}
//                       href={link.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-slate-400 hover:text-indigo-600 transition-colors transform hover:scale-110"
//                       title={link.platform}
//                     >
//                       <span className="text-xs font-black uppercase tracking-tighter">
//                         {link.platform}
//                       </span>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- STATS / FOCUS SECTION --- */}
//       <section className="py-12 bg-slate-50 border-y border-slate-100">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             <StatItem label="Tech Stack" value="MERN" />
//             <StatItem label="Education" value="MCA" />
//             <StatItem label="Location" value="India" />
//             <StatItem label="Status" value="Open to Work" />
//           </div>
//         </div>
//       </section>

//       {/* --- CONNECT SECTION --- */}
//       <section className="py-24 bg-white">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
//             Let's build something digital.
//           </h2>
//           <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">
//             Currently focusing on scalable web applications and AI integration.
//             Interested in collaborating or just want to say hi?
//           </p>
//           <a
//             href="/contact"
//             className="inline-flex items-center justify-center px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-[0_20px_50px_rgba(79,70,229,0.2)] hover:shadow-none"
//           >
//             Send an Email
//           </a>
//         </div>
//       </section>
//       {/* <ContactForm/> */}
//     </div>
//   );
// };

// // Helper Stat Component
// const StatItem = ({ label, value }) => (
//   <div className="text-center md:text-left">
//     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
//       {label}
//     </p>
//     <p className="text-xl font-bold text-slate-800 tracking-tight">{value}</p>
//   </div>
// );

// export default About;






import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import api from "../../services/api";

const About = () => {
  const [about, setAbout] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, profileRes] = await Promise.all([
          api.get("/about"),
          api.get("/profile")
        ]);

        if (aboutRes.data.success) setAbout(aboutRes.data.data);
        if (profileRes.data.success) setProfile(profileRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (!about)
    return (
      <div className="text-center py-32">
        <p className="text-slate-400 italic">No biographical information found.</p>
      </div>
    );

  return (
    <div className="bg-white min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Image Container - Order first on mobile, right side on desktop */}
            <div className="lg:col-span-5 order-first lg:order-last">
              <div className="relative max-w-sm mx-auto lg:max-w-none">
                {/* Decorative Blur Backgrounds */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

                {/* Main Photo Card */}
                <div className="relative aspect-[4/5] rounded-[2.5rem] bg-slate-100 border border-slate-200 overflow-hidden shadow-2xl transition-transform hover:rotate-2 duration-500">
                  {profile?.profileImage ? (
                    <img 
                      src={profile.profileImage} 
                      alt={about.fullName || "Profile"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 italic">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent"></div>
                </div>

                {/* Floating Contact Badge - Hidden on very small screens, shown on MD+ */}
                <div className="absolute -bottom-6 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4 animate-in slide-in-from-right duration-700">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
                    <i className="fa-solid fa-envelope text-xl"></i>
                  </div>
                  <div className="pr-4 text-left">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Available for hire</p>
                    <p className="text-xs font-bold text-slate-800">{about.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content Area */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-indigo-100">
                Full Stack Developer
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight uppercase">
                {about.headline.split(" ").map((word, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? <span className="text-indigo-600">{word}</span> : word + " "}
                  </span>
                ))}
              </h1>

              {/* Responsive Markdown Text */}
              <div className="prose prose-slate prose-sm sm:prose-base md:prose-lg text-slate-600 max-w-none mb-10 leading-relaxed font-medium italic">
                <ReactMarkdown>{about.bio}</ReactMarkdown>
              </div>

              {/* Buttons & Socials */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                <Link
                  to="/projects"
                  className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1 text-center"
                >
                  View Projects
                </Link>
                <div className="flex items-center gap-6">
                  {about.socialLinks?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-indigo-600 transition-all transform hover:scale-110"
                      title={link.platform}
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {link.platform}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RESPONSIVE STATS SECTION --- */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4">
            <StatItem label="Tech Stack" value="MERN" />
            <StatItem label="Education" value="MCA" />
            <StatItem label="Location" value="India" />
            <StatItem label="Status" value="Open to Work" />
          </div>
        </div>
      </section>

      {/* --- CONNECT SECTION --- */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">
            Let's build something <span className="text-indigo-600">digital</span>.
          </h2>
          <p className="text-slate-500 text-base md:text-xl mb-12 max-w-2xl mx-auto font-medium">
            Interested in collaborating or just want to say hi?
          </p>
          <Link
            to="/contact"
            className="inline-block w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 hover:shadow-none"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

const StatItem = ({ label, value }) => (
  <div className="text-center">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
    <p className="text-lg md:text-2xl font-black text-slate-800 tracking-tight">{value}</p>
  </div>
);

export default About;


const WhyChoose = () => {
  const features = [
    {
      title: 'Modern Technology',
      description: 'Built with React, Node.js, AI integrations, and the latest industry-standard developer tools for maximum scalability.',
      gradient: 'from-indigo-500 to-cyan-400',
      icon: (
        <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: 'Clean & Responsive Design',
      description: 'Interfaces engineered to look stunning and perform flawlessly across all desktop, tablet, and mobile devices.',
      gradient: 'from-cyan-400 to-teal-300',
      icon: (
        <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Fast Performance',
      description: 'Optimized for lightning-fast page load times, snappy interactions, and superior overall user experience.',
      gradient: 'from-indigo-400 to-teal-300',
      icon: (
        <svg className="w-7 h-7 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Continuous Support',
      description: 'Dedicated post-delivery assistance, updates, and feature enhancements to keep your application running smoothly.',
      gradient: 'from-teal-300 to-indigo-500',
      icon: (
        <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 lg:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Why Choose <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">Shyam Studio?</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Building reliable, modern, and scalable digital solutions.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 relative overflow-hidden group hover:border-slate-700/80 hover:bg-slate-900/90 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
            >
              {/* Top Accent Gradient Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />

              <div>
                {/* Icon Box */}
                <div className="w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-700/50 shadow-inner">
                  {feature.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Subtle Highlight */}
              <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>QUALITY GUARANTEED</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;
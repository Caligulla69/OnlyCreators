import React, { useState, useEffect, useRef } from "react";

const Dilemma = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);
  const intervalRef = useRef(null);

  const storyText =
    "ou pour your heart into every piece of content. Late nights editing. Early mornings brainstorming. The dopamine hit of a notification. But somewhere between the uploads and the analytics, a question lingers...";

  const isTypingComplete = visibleChars >= storyText.length;

  // Intersection Observer
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!isInView) return;
    if (visibleChars >= storyText.length) return;

    intervalRef.current = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= storyText.length) {
          clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isInView, storyText.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const platforms = ["YouTube", "Instagram", "TikTok"];
  const barData = [
    [30, 50, 20, 70, 40],
    [45, 35, 60, 25, 55],
    [20, 65, 40, 50, 30],
  ];

  return (
    <section
      ref={ref}
      id="story"
      className="py-24 md:py-32 px-4 sm:px-6 bg-secondary-100 dark:bg-dark-bg min-h-screen flex items-center overflow-hidden"
    >
      <div className="max-w-3xl mx-auto relative w-full">
        {/* Ambient background */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent-100/30 dark:bg-accent-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary-50/50 dark:bg-primary-900/20 rounded-full blur-3xl pointer-events-none" />

        {/* Book page */}
        <div className="relative bg-white/95 dark:bg-dark-surface/95 backdrop-blur-sm rounded-sm shadow-2xl shadow-secondary-200/50 dark:shadow-black/30 p-8 sm:p-12 md:p-16 border border-accent-100/60 dark:border-dark-border">
          {/* Page fold */}
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-accent-100/50 dark:border-t-dark-surface-light/50" />
          <div className="absolute top-0 right-0 w-[35px] h-[35px] bg-gradient-to-bl from-gray-100 dark:from-dark-surface-light to-transparent" />

          {/* Chapter heading */}
          <div className="text-center mb-12 md:mb-16">
            <div
              className={`transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4 justify-center mb-4">
                <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-accent-300 dark:to-accent-600" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent-600 dark:text-accent-400 font-semibold">
                  Chapter One
                </span>
                <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-accent-300 dark:to-accent-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-text-primary dark:text-dark-text italic tracking-wide">
                The Creator's Dilemma
              </h2>
            </div>
          </div>

          {/* Drop cap + Typewriter */}
          <div className="relative">
            <span
              className={`float-left text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-accent-200/80 dark:text-accent-700/60 leading-none mr-2 sm:mr-4 select-none transition-opacity duration-700 ${
                isInView ? "opacity-100" : "opacity-0"
              }`}
            >
              Y
            </span>

            <p className="text-base sm:text-lg md:text-xl text-text-secondary dark:text-dark-text-muted leading-relaxed font-serif min-h-[140px] sm:min-h-[120px]">
              {storyText.substring(0, visibleChars)}
              <span
                className={`inline-block w-0.5 h-5 bg-accent-500 dark:bg-accent-400 ml-0.5 rounded-full align-middle ${
                  !isTypingComplete && isInView ? "animate-pulse" : "opacity-0"
                }`}
              />
            </p>
          </div>

          <div className="clear-both" />

          {/* Question reveal */}
          <div
            className={`mt-12 md:mt-16 text-center transition-all duration-1000 ${
              isTypingComplete
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="py-8 md:py-10 border-t border-b border-accent-200/60 dark:border-accent-700/40 relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-accent-200/40 dark:text-accent-700/40 font-serif select-none">
                "
              </span>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif italic text-text-primary dark:text-dark-text leading-snug">
                Are you creating
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-accent-600 dark:from-accent-400 dark:to-accent-500">
                  in the dark?
                </span>
              </p>
            </div>
          </div>

          {/* Platform cards */}
          <div
            className={`mt-12 md:mt-16 transition-all duration-1000 ${
              isTypingComplete ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-center text-xs sm:text-sm text-text-light dark:text-dark-text-muted italic mb-8">
              Your story unfolds in fragments across platforms...
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
              {platforms.map((platform, i) => (
                <div
                  key={platform}
                  className={`bg-gradient-to-br from-accent-50 to-white dark:from-dark-surface-light dark:to-dark-surface rounded-xl p-4 sm:p-5 border border-accent-100/80 dark:border-dark-border shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${
                    isTypingComplete
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transform: isTypingComplete
                      ? `rotate(${(i - 1) * 3}deg)`
                      : undefined,
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  <div className="text-xs font-medium text-text-muted dark:text-dark-text-muted mb-3 tracking-wide text-center">
                    {platform}
                  </div>
                  <div className="flex gap-1.5 items-end justify-center h-10">
                    {barData[i].map((h, j) => (
                      <div
                        key={j}
                        className="w-2 bg-gradient-to-t from-accent-300 to-accent-200 dark:from-accent-600 dark:to-accent-500 rounded-t transition-all duration-500"
                        style={{
                          height: isTypingComplete ? h * 0.5 : 0,
                          transitionDelay: `${i * 150 + j * 50}ms`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-2xl text-center mt-3 text-accent-400 dark:text-accent-500 animate-pulse">
                    ?
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Page number */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-xs sm:text-sm text-accent-300/70 dark:text-accent-600/70 font-serif tracking-wider">
            — 1 —
          </div>
        </div>

        {/* Book shadow */}
        <div className="absolute -bottom-3 left-3 right-3 h-6 bg-gradient-to-b from-gray-300/30 dark:from-black/30 to-transparent rounded-b-2xl blur-md -z-10" />
      </div>
    </section>
  );
};

export default Dilemma;

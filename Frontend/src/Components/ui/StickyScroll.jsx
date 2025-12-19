import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const StickyScroll = ({ content, contentClassName }) => {
    const [activeCard, setActiveCard] = useState(0);
    // We'll use the window scroll, but to scope it to this component, 
    // we actually need to track when the text blocks enter the viewport center.
    // A simple way is to use refs for each block.

    const textRefs = useRef([]);

    const handleScroll = () => {
        const viewportHeight = window.innerHeight;
        const center = viewportHeight / 2;

        let closestIndex = 0;
        let minDistance = Number.MAX_VALUE;

        textRefs.current.forEach((el, index) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const distance = Math.abs(rect.top + rect.height / 2 - center);

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        setActiveCard(closestIndex);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const backgroundColors = [
        "var(--slate-900)",
        "var(--black)",
        "var(--neutral-900)",
    ];
    const linearGradients = [
        "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
        "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
        "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
    ];

    return (
        <div className="flex justify-center relative space-x-0 md:space-x-10 p-4 md:p-10">
            {/* Left Text Column */}
            <div className="relative flex flex-col items-start w-full md:w-1/2">
                {content.map((item, index) => (
                    <div
                        key={item.title + index}
                        className="my-10 md:my-24 min-h-[40vh] md:min-h-[60vh] flex flex-col justify-center"
                        ref={el => textRefs.current[index] = el}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl md:text-4xl font-bold text-black mb-6">
                                {item.title}
                            </h2>
                            <div className="text-lg text-slate-800 max-w-sm mt-4 leading-relaxed">
                                {item.description}
                            </div>
                        </motion.div>
                    </div>
                ))}
                {/* Spacer to allow scraping the last item */}
                <div className="h-20" />
            </div>

            {/* Right Sticky Content Column */}
            <div
                style={{ background: backgroundColors[activeCard % backgroundColors.length] }}
                className={`hidden md:block h-80 w-[400px] lg:w-[500px] rounded-xl bg-white sticky top-1/2 -translate-y-1/2 overflow-hidden ${contentClassName}`}
            >
                <div className="relative w-full h-full">
                    {content.map((item, index) => (
                        <motion.div
                            key={item.title + index}
                            className="absolute inset-0 w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeCard === index ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {item.content}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StickyScroll;

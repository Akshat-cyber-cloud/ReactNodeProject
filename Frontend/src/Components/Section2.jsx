import React, { useRef } from "react";
import "../index.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Card = ({ card }) => {
    return (
        <div
            key={card.id}
            className="group relative h-[600px] w-[500px] shrink-0 overflow-hidden rounded-[3rem] bg-[#0a0a0a] border border-white/10"
        >
            <div
                style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110 opacity-60"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between">
                {/* Top: ID and Indicator */}
                <div className="flex justify-between items-start">
                    <span style={{
                        fontSize: '6rem',
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0 0 30px rgba(255,255,255,0.3)',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.05em',
                        padding: '1rem',
                    }}>
                        {String(card.id).padStart(2, '0')}
                    </span>
                    <div className={`w-12 h-1 bg-${card.color === 'yellow' ? 'yellow-500' : card.color + '-400'} rounded-full mt-4`} />
                </div>

                {/* Bottom: Content */}
                <div>
                    <h3 style={{
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0 0 30px rgba(255,255,255,0.3)',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.05em',
                        padding: '1rem',    
                    }}>
                        {card.title}
                    </h3>
                    <p style={{
                        fontSize: '1.5rem',
                        fontWeight: 'light',
                        color: 'white',
                        marginBottom: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.05em',
                        padding: '1rem',
                    }}>
                        {card.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Section2 = () => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);

    const features = [
        {
            id: 1,
            title: "Global Network",
            description: "Connect instantly with over 500+ enterprise partners across 30 countries.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
            color: "cyan"
        },
        {
            id: 2,
            title: "Secure Funding",
            description: "Verified investment channels with blockchain-backed security for transparent capital.",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
            color: "purple"
        },
        {
            id: 3,
            title: "Innovation Hub",
            description: "A collaborative ecosystem featuring mentors from Fortune 500 companies.",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop",
            color: "pink"
        },
        {
            id: 4,
            title: "Smart Matching",
            description: "Proprietary AI algorithms that analyze 50+ data points to connect you with partners.",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop",
            color: "blue"
        },
        {
            id: 5,
            title: "Fast Growth",
            description: "Comprehensive toolkit including legal templates and growth hacking guides.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
            color: "yellow"
        }
    ];

    useGSAP(() => {
        // Total scrollable width = Total width of cards + gaps - viewport width
        // Or we can just scroll the track by percentage.
        // Length is 5 cards. With gaps and padding.
        // Simplest is to measure the scrollWidth.

        const totalWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = totalWidth - viewportWidth;

        const pin = gsap.to(trackRef.current, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=3000", // Controls speed/duration of the scroll
                scrub: 1, // Smooth scrolling feeling (like Lenis)
                pin: true,
                anticipatePin: 1
            }
        });

        return () => {
            pin.kill();
        };

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative overflow-hidden bg-transparent">
            {/* Track Container - Flex row */}
            <div ref={trackRef} className="flex h-screen w-max items-center px-20 gap-20">

                {/* Header Section (Inline with scroll) */}
                <div className="w-[40vw] shrink-0">
                    <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 leading-none">
                        THE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">CORE.</span>
                    </h2>
                    <div className="h-1 w-20 bg-white/20 mb-8"></div>
                    <p className="text-gray-400 text-lg tracking-widest uppercase font-semibold border-l-2 border-purple-500 pl-4">
                        Scroll to Explore <br /> The Ecosystem
                    </p>
                </div>

                {features.map((card) => {
                    return <Card card={card} key={card.id} />;
                })}

                {/* End Spacer */}
                <div className="w-[10vw] shrink-0"></div>
            </div>
        </section>
    );
};
export default Section2;

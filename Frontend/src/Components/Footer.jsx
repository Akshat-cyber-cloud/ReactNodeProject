import React from "react";
import "../index.css";
import SplitText from "../Corporates/SplitText";
import MagneticButton from "./ui/MagneticButton";

const Footer = () => {
    const links = ["Instagram", "Twitter", "LinkedIn", "Github"];

    return (
        <footer className="relative w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-between p-12 md:p-24 border-t border-white/10">

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[100px]" />
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="flex flex-col gap-6">
                    <div className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.9]">
                        <SplitText
                            text="LET'S"
                            className="block"
                            delay={150}
                            from={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                            to={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                            threshold={0.2}
                            rootMargin="-50px"
                        />
                        <SplitText
                            text="COLLAB."
                            className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
                            delay={150}
                            from={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                            to={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                            threshold={0.2}
                            rootMargin="-50px"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-8 md:text-right">
                    {links.map((link) => (
                        <MagneticButton key={link} className="text-xl md:text-2xl text-gray-400 hover:text-white transition-colors cursor-pointer">
                            {link}
                        </MagneticButton>
                    ))}
                </div>
            </div>

            <div className="relative z-10 w-full flex justify-between items-end mt-24 border-t border-white/10 pt-8">
                <p className="text-gray-500 text-sm">© 2025 CollabX Inc.</p>
                <div className="flex gap-4">
                    <span className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">Privacy</span>
                    <span className="text-gray-500 text-sm hover:text-white cursor-pointer transition-colors">Terms</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

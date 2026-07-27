import React, { useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

interface ButtonCreativeTopProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}

function ButtonCreativeTop({ children, href, onClick, icon }: ButtonCreativeTopProps) {
    const [isHovered, setIsHovered] = useState(false);

    const content = (
        <div
            className='cursor-pointer px-5 py-2.5 rounded-lg text-center font-medium text-sm inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all hover:translate-y-[-1px] hover:shadow-lg hover:shadow-blue-600/20 active:translate-y-0'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-4 h-4 overflow-hidden">
                <AnimatePresence mode="wait">
                    {isHovered ? (
                        <motion.div
                            key="icon-hover"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            {icon}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="icon-normal"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            {icon}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {children}
        </div>
    );

    if (href) {
        const isInternal = href.startsWith("/");
        if (isInternal) {
            return <Link href={href}>{content}</Link>;
        }
        return (
            <a href={href} rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    return <div onClick={onClick}>{content}</div>;
}

export default ButtonCreativeTop;

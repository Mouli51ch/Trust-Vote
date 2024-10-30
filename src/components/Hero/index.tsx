// src/components/Hero/index.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Vote, 
  Shield, 
  Users,
  Wallet,
  Sparkles,
  Cpu,
  Network,
  Lock,
  AlertCircle,
  Check,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VotingForm from '../VotingForm';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  className?: string;
}

// Animated Text Component
const AnimatedText: React.FC<AnimatedTextProps> = ({ text, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.5, 
            delay: delay + index * 0.05,
            type: "spring",
            stiffness: 100 
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// Particle Effect Component
const ParticleEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-500 rounded-full"
          animate={{
            y: [-10, -50],
            x: Math.random() * 10 - 5,
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Floating Icon Component
const FloatingIcon: React.FC<{
  icon: React.ElementType;
  className: string;
  mousePosition: { x: number; y: number };
}> = ({ icon: Icon, className, mousePosition }) => (
  <motion.div 
    className={`absolute transform transition-all duration-500 ${className}`}
    animate={{
      x: mousePosition.x * 0.5,
      y: mousePosition.y * 0.5,
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      rotate: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    <motion.div
      whileHover={{ scale: 1.2, rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      <Icon size={48} className="text-blue-500 opacity-20" />
    </motion.div>
  </motion.div>
);

// Feature Badge Component
const FeatureBadge: React.FC<{
  icon: React.ElementType;
  text: string;
  delay: number;
}> = ({ icon: Icon, text, delay }) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="px-4 py-2 bg-blue-500 bg-opacity-10 rounded-full text-sm text-blue-300 flex items-center gap-2"
  >
    <Icon className="w-4 h-4" />
    {text}
  </motion.span>
);

// Main Hero Component
const HeroSection: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showWalletTooltip, setShowWalletTooltip] = useState(false);
  const [showVotingForm, setShowVotingForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
    if (!isWalletConnected) {
      setTimeout(() => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }, 500);
    }
  };

  const handleCreateVote = () => {
    if (!isWalletConnected) {
      setShowWalletTooltip(true);
      setTimeout(() => setShowWalletTooltip(false), 3000);
      return;
    }
    setShowVotingForm(true);
  };

  const features = [
    { icon: Shield, text: "Blockchain Secured", delay: 1.5 },
    { icon: Cpu, text: "AI-Powered", delay: 1.6 },
    { icon: Network, text: "Decentralized", delay: 1.7 },
    { icon: Lock, text: "End-to-End Encryption", delay: 1.8 },
    { icon: Globe, text: "Trust-Vote Technology", delay: 1.9 }
  ];

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, #1a1a1a 0%, #000000 100%)",
              "radial-gradient(circle at 100% 100%, #1a1a1a 0%, #000000 100%)",
              "radial-gradient(circle at 0% 0%, #1a1a1a 0%, #000000 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        <ParticleEffect />
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[Cpu, Shield, Network].map((Icon, index) => (
            <FloatingIcon
              key={index}
              icon={Icon}
              className={`
                ${index === 0 ? 'top-1/4 left-1/4' : ''}
                ${index === 1 ? 'top-1/3 right-1/4' : ''}
                ${index === 2 ? 'bottom-1/4 left-1/3' : ''}
              `}
              mousePosition={mousePosition}
            />
          ))}
        </div>

        {/* Main Content */}
        <motion.div 
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <div className="relative mb-8">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl lg:text-9xl font-bold text-blue-500 blur-xl"
            >
              Trust-Vote
            </motion.span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 overflow-hidden flex items-center justify-center gap-2">
              <span className="text-white">
                <AnimatedText text="Trust" delay={300} />
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                <AnimatedText text="-" delay={400} />
              </span>
              <span className="text-blue-500">
                <AnimatedText text="Vote" delay={500} />
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Sparkles className="w-8 h-8 text-blue-500" />
              </motion.span>
            </h1>
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <span className="text-sm text-blue-400 bg-blue-500 bg-opacity-10 px-4 py-1 rounded-full">
              Revolutionizing Digital Democracy
            </span>
          </motion.div>

          {/* Description */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-300 mb-4 overflow-hidden">
              <AnimatedText 
                text="Building Trust in Digital Democracy Through Secure Voting Solutions" 
                delay={900} 
              />
            </p>
            <p className="text-base md:text-lg text-gray-400 mb-8 overflow-hidden">
              <AnimatedText 
                text="Trust-Vote revolutionizes democratic processes with blockchain technology and AI-powered verification, ensuring transparent, secure, and efficient voting for everyone." 
                delay={1200} 
              />
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {features.map((feature, index) => (
              <FeatureBadge
                key={index}
                icon={feature.icon}
                text={feature.text}
                delay={feature.delay}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateVote}
              className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Create Trust-Vote
                <Sparkles className="w-4 h-4" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"
                animate={{
                  x: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConnectWallet}
              onMouseEnter={() => setShowWalletTooltip(true)}
              onMouseLeave={() => setShowWalletTooltip(false)}
              className="relative px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg flex items-center gap-2"
            >
              <Wallet className="w-5 h-5" />
              <span>{isWalletConnected ? "0x1234...5678" : "Connect Wallet"}</span>
              <AnimatePresence>
                {showWalletTooltip && !isWalletConnected && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-12 left-0 bg-gray-800 text-white text-sm p-2 rounded-md whitespace-nowrap"
                  >
                    Connect wallet to create vote
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Success Alert */}
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Check size={20} />
              Wallet connected successfully!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voting Form */}
        <VotingForm 
          isOpen={showVotingForm}
          onClose={() => setShowVotingForm(false)}
        />
      </div>
    </>
  );
};

export default HeroSection;
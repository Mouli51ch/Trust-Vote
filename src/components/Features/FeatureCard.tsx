// src/components/Features/FeatureCard.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.5,
      }
    }
  };

  return (
    <motion.div
      className="relative group"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl p-6 h-full"
           style={{ 
             background: `linear-gradient(135deg, 
               var(--secondary) 0%, 
               var(--background) 100%)`
           }}>
        {/* Animated background gradient */}
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, 
              var(--primary) 0%, 
              var(--secondary) 100%)`,
            opacity: isHovered ? 0.1 : 0,
          }}
        />

        {/* Icon container */}
        <motion.div
          className="relative z-10 flex items-center justify-center w-14 h-14 rounded-lg mb-4"
          style={{ background: 'var(--primary)' }}
          variants={iconVariants}
        >
          <Icon className="w-7 h-7" style={{ color: 'var(--primary-foreground)' }} />
        </motion.div>

        {/* Content */}
        <motion.div className="relative z-10">
          <h3 
            className="text-xl font-semibold mb-3"
            style={{ color: 'var(--foreground)' }}
          >
            {title}
          </h3>
          <p 
            className="text-base"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {description}
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div 
          className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full blur-2xl transition-opacity duration-300"
          style={{
            background: 'var(--primary)',
            opacity: isHovered ? 0.15 : 0,
          }}
        />
      </div>
    </motion.div>
  );
};

export default FeatureCard;
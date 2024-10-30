"use client";

import React from 'react';
import { Shield, Vote, Users, BarChart3, Lock, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Voting",
      description: "End-to-end encryption ensures your vote remains confidential and tamper-proof."
    },
    {
      icon: Users,
      title: "Easy Access",
      description: "Vote from anywhere, anytime with our user-friendly interface."
    },
    {
      icon: BarChart3,
      title: "Real-time Results",
      description: "Watch live vote counting and result analytics as they happen."
    },
    {
      icon: Vote,
      title: "Verified Identity",
      description: "Multi-factor authentication ensures legitimate voter participation."
    },
    {
      icon: Lock,
      title: "Blockchain Secured",
      description: "Immutable record-keeping with distributed ledger technology."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access the platform round the clock with 99.9% uptime guarantee."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%,
            var(--background) 0%,
            var(--secondary) 100%)`
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Header */}
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Why Choose VoteSafe?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Experience the future of digital democracy with our cutting-edge features
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              {...feature}
              index={index}
            />
          ))}
        </motion.div>

        {/* Bottom Gradient */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom,
              transparent,
              var(--background))`
          }}
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
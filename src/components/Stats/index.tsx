"use client";

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { BarChart3, Users, CheckCircle2, Award } from 'lucide-react';

interface StatItemProps {
  icon: React.ElementType;
  endValue: number;
  suffix?: string;
  label: string;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ 
  icon: Icon, 
  endValue,
  suffix = '', 
  label, 
  delay = 0 
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const controls = useAnimation();
  const duration = 2;

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    const steps = 60;
    const increment = endValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current > endValue) {
        current = endValue;
        clearInterval(timer);
      }
      setCurrentValue(Math.floor(current));
    }, (duration * 1000) / steps);

    return () => clearInterval(timer);
  }, [endValue, duration, controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, delay }}
      className="relative group"
    >
      <div 
        className="p-6 rounded-xl"
        style={{ 
          background: `linear-gradient(135deg, 
            var(--secondary) 0%, 
            var(--background) 100%)`
        }}
      >
        {/* Background glow effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center,
              var(--primary) 0%,
              transparent 70%)`
          }}
        />

        {/* Icon */}
        <motion.div
          className="mb-4 relative"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: 'var(--primary)' }}
          >
            <Icon className="w-7 h-7" style={{ color: 'var(--primary-foreground)' }} />
          </div>
        </motion.div>

        {/* Value */}
        <motion.h3
          className="text-4xl md:text-5xl font-bold mb-2"
          style={{ color: 'var(--foreground)' }}
        >
          {currentValue.toLocaleString()}{suffix}
        </motion.h3>

        {/* Label */}
        <p 
          className="text-lg opacity-80"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {label}
        </p>

        {/* Decorative line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 rounded-full"
          style={{ background: 'var(--primary)' }}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: delay + 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const StatsSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: CheckCircle2,
      endValue: 98,
      suffix: '%',
      label: 'Accuracy Rate',
      delay: 0,
    },
    {
      icon: Users,
      endValue: 1000000,
      suffix: '+',
      label: 'Votes Processed',
      delay: 0.2,
    },
    {
      icon: Award,
      endValue: 50,
      suffix: '+',
      label: 'Organizations',
      delay: 0.4,
    },
    {
      icon: BarChart3,
      endValue: 99.9,
      suffix: '%',
      label: 'Uptime',
      delay: 0.6,
    },
  ];

  return (
    <section 
      ref={ref}
      className="relative py-20 px-6 overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, var(--primary) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, var(--primary) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, var(--primary) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Our Impact in Numbers
          </h2>
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Transforming digital democracy with proven results
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              {...stat}
            />
          ))}
        </div>

        {/* Bottom Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right,
                transparent 0%,
                var(--primary) 50%,
                transparent 100%)`,
              opacity: 0.1,
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
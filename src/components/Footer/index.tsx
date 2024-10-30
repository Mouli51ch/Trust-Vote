"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Vote,
  Heart,
  ExternalLink
} from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Security", href: "#security" },
        { label: "Enterprise", href: "#enterprise" },
        { label: "Pricing", href: "#pricing" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Careers", href: "#careers" },
        { label: "Partners", href: "#partners" },
        { label: "Contact", href: "#contact" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#docs" },
        { label: "API Reference", href: "#api" },
        { label: "Support", href: "#support" },
        { label: "Status", href: "#status" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
        { label: "Security", href: "#security" },
        { label: "Compliance", href: "#compliance" },
      ]
    }
  ];

  const socialLinks: SocialLink[] = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    }
  };

  return (
    <footer className="relative overflow-hidden border-t" style={{ borderColor: 'var(--secondary)' }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
        >
          {/* Logo and Description */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 mb-4">
              <Vote className="w-8 h-8" style={{ color: 'var(--primary)' }} />
              <h2 
                className="text-2xl font-bold"
                style={{ color: 'var(--foreground)' }}
              >
                TrustVote
              </h2>
            </div>
            <p 
              className="text-sm mb-4"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Secure, transparent, and efficient digital voting platform for modern democracy. Making every vote count with cutting-edge technology.
            </p>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div 
              key={section.title}
              variants={itemVariants}
            >
              <h3 
                className="font-semibold mb-4"
                style={{ color: 'var(--foreground)' }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-sm hover:underline flex items-center gap-1 w-fit"
                      style={{ color: 'var(--muted-foreground)' }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'var(--secondary)' }}
          variants={itemVariants}
        >
          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="w-4 h-4 text-red-500" />
            </motion.div>
            <span>by Trust-VoteTeam © {new Date().getFullYear()}</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 50%)`,
        }}
      />
    </footer>
  );
};

export default Footer;
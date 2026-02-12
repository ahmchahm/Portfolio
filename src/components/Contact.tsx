'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: 'hello@example.com',
      href: 'mailto:hello@example.com',
    },
    {
      icon: '💬',
      label: 'Twitter',
      value: '@yourhandle',
      href: 'https://twitter.com',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'Your Name',
      href: 'https://linkedin.com',
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'yourusername',
      href: 'https://github.com',
    },
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/yourhandle',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
          <path d="M22 5.92c-.66.29-1.36.5-2.09.59.75-.45 1.33-1.17 1.6-2.03-.7.42-1.48.72-2.31.88A3.6 3.6 0 0 0 12.1 8.5c0 .28.03.55.09.81-3-.15-5.66-1.58-7.45-3.76-.31.54-.49 1.16-.49 1.82 0 1.25.64 2.35 1.62 2.99-.6-.02-1.17-.18-1.66-.46v.05c0 1.75 1.25 3.21 2.9 3.54-.3.08-.62.12-.95.12-.23 0-.46-.02-.68-.07.46 1.43 1.79 2.47 3.37 2.5A7.2 7.2 0 0 1 3 19.54a10.17 10.17 0 0 0 5.5 1.61c6.6 0 10.22-5.47 10.22-10.22v-.47c.7-.5 1.3-1.12 1.78-1.83-.64.29-1.33.48-2.04.56z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/yourusername',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
          <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.6-4-1.6-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.7 1.9-1.1-.9-.1-1.9-.5-1.9-2.2 0-.5.2-.9.6-1.2-.1-.2-.3-1 .1-2 0 0 .5-.2 1.9.7.6-.2 1.2-.3 1.9-.3s1.3.1 1.9.3c1.4-1 1.9-.7 1.9-.7.4 1 .2 1.8.1 2 .4.3.6.7.6 1.2 0 1.7-1 2.1-1.9 2.2.2.2.4.6.4 1.2v1.8c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yourprofile',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
          <path d="M4.98 3.5A2.5 2.5 0 1 0 4.98 8.5 2.5 2.5 0 0 0 4.98 3.5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2.1 3.7-2.1C21.6 8.6 22 11 22 14.6V21h-4v-6.1c0-1.5-.1-3.4-2-3.4-2 0-2.3 1.6-2.3 3.3V21H9z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/yourhandle',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="currentColor" stroke="none" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="contact" className="relative w-full py-20 px-4 sm:px-6 lg:px-8" dir="ltr">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto ltr">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and create something amazing together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-primary-500/20 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-primary-500/20 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-dark-800/50 border border-primary-500/20 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:shadow-neon-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitted ? '✓ Message Sent!' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-8">Other Ways to Connect</h3>

            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-dark-800/50 border border-primary-500/20 hover:border-primary-500/50 transition-all group"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                >
                  <span className="text-3xl">{method.icon}</span>
                  <div>
                    <p className="text-sm text-gray-400">{method.label}</p>
                    <p className="text-white font-medium group-hover:text-primary-400 transition-colors">
                      {method.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-400 text-sm mb-4">Or find me on social media:</p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-10 h-10 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 hover:bg-primary-500/20 transition-all flex items-center justify-center"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="inline-flex items-center justify-center">{s.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

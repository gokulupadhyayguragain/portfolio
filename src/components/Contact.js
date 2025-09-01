"use client";

import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-pink-300' : 'text-pink-600'}`}>
            Get In Touch
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Have a project in mind or want to collaborate? I&apos;d love to hear from you! 
            Let&apos;s discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Let&apos;s Connect
              </h3>
              <p className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                I&apos;m always open to discussing new opportunities, collaborations, 
                or just having a chat about technology and innovation.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className={`p-6 rounded-xl ${
                isDark 
                  ? 'bg-gray-800 border border-pink-500/20' 
                  : 'bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-pink-600' : 'bg-pink-500'
                  }`}>
                    <span className="text-white text-xl">📧</span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Email
                    </h4>
                    <a 
                      href="mailto:gokul@addtocloud.tech"
                      className={`${isDark ? 'text-pink-300 hover:text-pink-200' : 'text-pink-600 hover:text-pink-700'} hover:underline font-medium`}
                    >
                      gokul@addtocloud.tech
                    </a>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-xl ${
                isDark 
                  ? 'bg-gray-800 border border-pink-500/20' 
                  : 'bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-pink-600' : 'bg-pink-500'
                  }`}>
                    <span className="text-white text-xl">💼</span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      LinkedIn
                    </h4>
                    <a 
                      href="https://www.linkedin.com/in/gokulupadhyayguragain/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${isDark ? 'text-pink-300' : 'text-pink-600'} hover:underline`}
                    >
                      @gokulupadhyayguragain
                    </a>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-xl ${
                isDark 
                  ? 'bg-gray-800 border border-pink-500/20' 
                  : 'bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-pink-600' : 'bg-pink-500'
                  }`}>
                    <span className="text-white text-xl">🐙</span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      GitHub
                    </h4>
                    <a 
                      href="https://github.com/gokulupadhyayguragain"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${isDark ? 'text-pink-300 hover:text-pink-200' : 'text-pink-600 hover:text-pink-700'} hover:underline font-medium`}
                    >
                      @gokulupadhyayguragain
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`p-8 rounded-xl ${
            isDark 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200 shadow-lg'
          }`}>
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-pink-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-pink-500'
                    } focus:outline-none focus:ring-2 focus:ring-pink-500/20`}
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-pink-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-pink-500'
                    } focus:outline-none focus:ring-2 focus:ring-pink-500/20`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-pink-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-pink-500'
                  } focus:outline-none focus:ring-2 focus:ring-pink-500/20`}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-pink-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-pink-500'
                  } focus:outline-none focus:ring-2 focus:ring-pink-500/20`}
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              {/* Status Message */}
              {submitStatus && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? (isDark ? 'bg-green-900/50 border border-green-700 text-green-300' : 'bg-green-100 border border-green-300 text-green-700')
                    : (isDark ? 'bg-red-900/50 border border-red-700 text-red-300' : 'bg-red-100 border border-red-300 text-red-700')
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  isSubmitting
                    ? (isDark ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-400 cursor-not-allowed')
                    : (isDark
                        ? 'bg-pink-600 hover:bg-pink-700 text-white'
                        : 'bg-pink-500 hover:bg-pink-600 text-white')
                } transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pink-500/50 disabled:transform-none disabled:hover:scale-100`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Sending...
                  </span>
                ) : (
                  'Send Message 📨'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

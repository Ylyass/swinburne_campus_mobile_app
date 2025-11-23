"use client";

import { useState } from "react";

interface ContactFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ContactForm({ onClose, onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to dummy endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would post to an actual endpoint
      console.log('Contact form submitted:', formData);
      
      onSuccess();
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      // In a real implementation, show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ overscrollBehavior: 'contain' }}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Form Sheet */}
      <div 
        className="relative w-full bg-white rounded-t-[1.25rem] shadow-2xl overflow-y-auto"
        style={{ 
          maxHeight: 'calc(80vh - env(safe-area-inset-bottom))',
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
          overscrollBehavior: 'contain'
        }}
        role="dialog"
        aria-labelledby="contact-form-title"
        aria-describedby="contact-form-description"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 id="contact-form-title" className="text-xl font-semibold text-slate-900">Talk to a person</h3>
              <p id="contact-form-description" className="text-sm text-slate-600 mt-1">
                We'll get back to you by email within 24 hours
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-700 transition-colors flex items-center justify-center"
              aria-label="Close form"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Your name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange('name')}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="your.email@student.swinburne.edu.my"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                How can we help?
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange('message')}
                placeholder="Describe your issue or question in detail..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                style={{ minHeight: '48px' }}
                aria-label={isSubmitting ? "Sending message..." : "Send message"}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <span className="text-lg">→</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              For urgent matters, contact Campus Security at +60 82 xxxx xxx
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

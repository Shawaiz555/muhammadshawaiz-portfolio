
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage({
        type: 'success',
        text: 'Thank you! Your message has been sent successfully.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitMessage(null);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-900">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-700 to-black mx-auto mb-6 rounded-full"></div>
          <p className="text-navy-700 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in-up">
              <h3 className="text-xl font-bold text-navy-900 mb-4">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-gray-100 rounded-lg mr-4">
                    <Mail className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                    <p className="text-navy-800 transition-colors">
                      shawaizbutt555@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-gray-100 rounded-lg mr-4">
                    <Phone className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                    <p className="text-navy-800 transition-colors">
                      +92 3433326500
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-gray-100 rounded-lg mr-4">
                    <MapPin className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                    <p className="text-navy-800">
                      Gujrat, Pakistan
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-navy-800 font-medium mb-3">Follow Me</h4>
                <div className="flex gap-3 space-x-3">
                  <a

                    href="https://github.com/Shawaiz555"
                    className="text-mono-400 hover:text-black transition-colors"
                    target='_black'
                  >
                    <img
                      src={`https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/github.svg`}
                      alt={"github"}
                      className="w-6 h-6 rounded-full bg-navy-50 hover:bg-gray-200 hover:text-black transition-colors text-navy-700"
                    />
                  </a>
                  <a

                    href="https://www.linkedin.com/in/muhammad-shawaiz-b52483280/"
                    className="text-mono-400 hover:text-black transition-colors"
                    target='_black'
                  >
                    <img
                      src={`https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/linkedin.svg`}
                      alt={"linkedin"}
                      className="w-6 h-6 rounded-full bg-navy-50 hover:bg-gray-200 hover:text-black transition-colors text-navy-700"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-700 to-black rounded-xl shadow-md p-6 mt-6 text-white animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h3 className="text-xl font-bold mb-4">Available for Freelance</h3>
              <p className="mb-4">
                I'm currently accepting new projects and would love to hear about yours. Let's build something amazing together.
              </p>
              <a href="https://www.upwork.com/freelancers/~016b5a1c020c5b6c5b?mp_source=share" target='_bla' className="inline-block py-2 px-8 bg-gray-100 text-black font-medium rounded-md hover:scale-95 transition-colors">
                Hire Me
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
              <h3 className="text-xl font-bold text-navy-900 mb-6">Send Me a Message</h3>

              {submitMessage && (
                <div className={`mb-6 p-4 rounded-md ${submitMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}>
                  {submitMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-2">
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-navy-700 mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

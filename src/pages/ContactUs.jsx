/**
 * Contact Us Page - Professional Engineering Support
 * Rejlers Abu Dhabi EDRS Platform
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ClockIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    inquiry_type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to backend API (simple contact endpoint)
      const response = await fetch('/api/contact/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Thank you for contacting us! Your message has been sent directly to Mohammed Agra at Rejlers. We\'ll respond within 24 hours.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: '',
          inquiry_type: 'general'
        });
      } else {
        const errorData = await response.json();
        if (response.status === 400 && errorData.message) {
          toast.error(`Please check your information: ${errorData.message}`);
        } else {
          throw new Error('Failed to send message');
        }
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      // Fallback to mailto if API fails
      try {
        const emailSubject = encodeURIComponent(`EDRS ${formData.inquiry_type.toUpperCase()}: ${formData.subject}`);
        const emailBody = encodeURIComponent(
          `Dear Mohammed,\n\n` +
          `Contact Details:\n` +
          `Name: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Company: ${formData.company || 'Not provided'}\n` +
          `Phone: ${formData.phone || 'Not provided'}\n` +
          `Inquiry Type: ${formData.inquiry_type}\n\n` +
          `Message:\n${formData.message}\n\n` +
          `---\nSent from EDRS Contact Form`
        );
        
        const mailtoLink = `mailto:mohammed.agra@rejlers.ae?subject=${emailSubject}&body=${emailBody}`;
        window.open(mailtoLink, '_blank');
        
        toast.success('Unable to send directly. Your email client has been opened with the message for Mohammed Agra.');
      } catch (mailtoError) {
        toast.error('Unable to send message. Please contact mohammed.agra@rejlers.ae directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      description: 'Get technical assistance and project support',
      contact: 'support@rejlers.ae',
      availability: 'Response within 24 hours'
    },
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Direct line for urgent technical issues',
      contact: '+971 4 123 4567',
      availability: 'Sun-Thu, 8:00 AM - 6:00 PM GST'
    },
    {
      icon: MapPinIcon,
      title: 'Abu Dhabi Office',
      description: 'Rejlers Abu Dhabi Engineering Hub',
      contact: 'Al Reem Island, Abu Dhabi, UAE',
      availability: 'Visit by appointment'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'sales', label: 'Sales & Licensing' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'training', label: 'Training & Certification' },
    { value: 'enterprise', label: 'Enterprise Solutions' }
  ];

  const supportFeatures = [
    {
      icon: UserGroupIcon,
      title: 'Dedicated Support Team',
      description: 'Professional engineers and technical specialists'
    },
    {
      icon: ClockIcon,
      title: '24/7 Enterprise Support',
      description: 'Priority support for enterprise clients'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Multiple Channels',
      description: 'Email, phone, and in-person consultation'
    },
    {
      icon: DocumentTextIcon,
      title: 'Comprehensive Documentation',
      description: 'Technical guides and training materials'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | EDRS Engineering Platform - Professional Support</title>
        <meta name="description" content="Get professional support for EDRS engineering document management platform. Contact Rejlers Abu Dhabi team for technical assistance, sales inquiries, and enterprise solutions." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <BuildingOfficeIcon className="w-16 h-16 mx-auto mb-4 text-blue-300" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact Our Engineering Team
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Professional support for your engineering document management needs. 
                Our experts are ready to assist with technical questions, implementation, and enterprise solutions.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    name="inquiry_type"
                    value={formData.inquiry_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide details about your inquiry, including any specific requirements or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <method.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {method.title}
                        </h3>
                        <p className="text-gray-600 mb-2">{method.description}</p>
                        <p className="font-medium text-blue-600 mb-1">{method.contact}</p>
                        <p className="text-sm text-gray-500">{method.availability}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Support Features */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Why Choose Our Support?
                </h3>
                <div className="space-y-4">
                  {supportFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <div className="ml-3">
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
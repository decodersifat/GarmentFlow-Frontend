import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import { validateEmail } from '../utils/helpers';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="section-title text-center">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Get in Touch</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="space-y-6">
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <div className="text-2xl">📧</div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Email</p>
                <p className="text-gray-600">support@garmentflow.com</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <div className="text-2xl">📞</div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Phone</p>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <div className="text-2xl">📍</div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Address</p>
                <p className="text-gray-600">123 Garment Street, Fashion City, FC 12345</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-0 bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Input
            label="Your Name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <Input
            label="Your Email"
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <Input
            label="Subject"
            type="text"
            name="subject"
            placeholder="What is this about?"
            value={formData.subject}
            onChange={handleChange}
            error={errors.subject}
            required
          />
          <TextArea
            label="Your Message"
            name="message"
            placeholder="Tell us what you think..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            required
          />
          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            size="lg"
            className="w-full"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact;

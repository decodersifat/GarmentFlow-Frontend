import React from 'react';
import { FiLinkedin, FiTwitter, FiInstagram, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '#' },
      { name: 'Our Team', path: '#' },
      { name: 'Contact', path: '/contact' },
    ],
    resources: [
      { name: 'Documentation', path: '#' },
      { name: 'Blog', path: '#' },
      { name: 'Community', path: '#' },
      { name: 'Help Center', path: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Cookie Policy', path: '#' },
    ],
  };

  return (
    <footer className="bg-secondary-950 text-secondary-300 pt-20 pb-10 dark:bg-black dark:border-t dark:border-secondary-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-lg group-hover:shadow-primary-500/30 transition-all duration-300">
                <span className="text-2xl">👔</span>
              </div>
              <span className="font-display font-bold text-2xl text-white">
                GarmentFlow
              </span>
            </Link>
            <p className="text-secondary-400 leading-relaxed">
              Empowering garment manufacturers with intelligent production tracking and order management solutions.
            </p>
            <div className="flex space-x-4">
              {[FiTwitter, FiLinkedin, FiInstagram, FiFacebook].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary-900 flex items-center justify-center text-secondary-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-display font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-bold text-lg mb-6">Resources</h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.path} className="hover:text-primary-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-display font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FiMapPin className="mt-1 text-primary-500" />
                <span>123 Fashion Avenue,<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-primary-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-primary-500" />
                <span>contact@garmentflow.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-secondary-500">
            &copy; {currentYear} GarmentFlow. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            {footerLinks.legal.map((link) => (
              <a key={link.name} href={link.path} className="text-secondary-500 hover:text-primary-400 transition-colors">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

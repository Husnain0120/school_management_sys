'use client';

import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronDown,
  Globe,
  GraduationCap,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  Shield,
  Users,
} from 'lucide-react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

const poppins = Poppins({
  weight: ['900'],
  subsets: ['latin'],
});

const SocialIcons = {
  twitter: <FaXTwitter className="w-5 h-5" />,
  instagram: <FaInstagram className="w-5 h-5" />,
  facebook: <FaFacebook className="w-5 h-5" />,
  youtube: <FaYoutube className="w-5 h-5" />,
  tiktok: <FaTiktok className="w-5 h-5" />,
  linkedin: <FaLinkedin className="w-5 h-5" />,
};

export default function Footer() {
  const [language, setLanguage] = useState('English (UK)');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const sections = {
    'Quick Links': [
      { label: 'Home', href: '#home' },
      { label: 'Features', href: '#features' },
      { label: 'Solutions', href: '#solutions' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Testimonials', href: '#testimonials' },
    ],
    Resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Developers', href: '#' },
    ],
    Company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press Kit', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Contact Sales', href: '#' },
    ],
    Legal: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'GDPR Compliance', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  };

  const router = useRouter();

  return (
    <>
      {/* Support Button - Floating */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            router.push('/pages/contact');
          }}
          className="group bg-gradient-to-r cursor-pointer from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full p-4 shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center gap-3 animate-pulse hover:animate-none"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="font-semibold text-sm hidden sm:inline">
            Need Help?
          </span>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
        </button>
      </div>

      {/* Main Footer Content */}
      <footer className="w-full bg-white text-gray-900 border-t border-gray-100">
        {/* Top Support Section */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100/30 border-y border-orange-100">
          <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12">
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Support Info */}
              <div className="md:col-span-2">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  We're Here to Help
                </h2>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  Get instant support, schedule a demo, or explore our extensive
                  documentation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <a
                    href="/pages/contact"
                    className="bg-white hover:border-orange-300 border border-gray-200 hover:shadow-lg rounded-xl p-3 sm:p-4 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">
                          Email Support
                        </div>
                        <div className="text-xs text-gray-500">
                          24/7 response
                        </div>
                      </div>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="bg-white hover:border-orange-300 border border-gray-200 hover:shadow-lg rounded-xl p-3 sm:p-4 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">
                          Call Us
                        </div>
                        <div className="text-xs text-gray-500">
                          +1 (555) 123-4567
                        </div>
                      </div>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="bg-white hover:border-orange-300 border border-gray-200 hover:shadow-lg rounded-xl p-3 sm:p-4 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">
                          Knowledge Base
                        </div>
                        <div className="text-xs text-gray-500">
                          500+ articles
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-white border border-orange-200 rounded-xl p-4 sm:p-6 shadow-sm mt-4 md:mt-0">
                <h3 className="font-bold text-base sm:text-lg mb-3 text-gray-900">
                  Stay Updated
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                  Get the latest features and educational insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 mt-2 sm:mt-0">
                    Subscribe
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-8">
            {/* Brand & Language Section */}
            <div className="lg:col-span-2 flex flex-col gap-6 sm:gap-8">
              {/* Brand */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold">
                      <span className="text-gray-900">Edu</span>
                      <span className="text-orange-600">Manage</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Transforming Education Since 2015
                    </p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="flex items-center gap-2 text-xs bg-orange-50 text-orange-700 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 border border-orange-100">
                    <Shield className="w-3 h-3" />
                    <span className="text-xs">GDPR Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-gray-50 text-gray-700 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 border border-gray-200">
                    <Award className="w-3 h-3" />
                    <span className="text-xs">EdTech Award 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-gray-50 text-gray-700 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 border border-gray-200">
                    <Users className="w-3 h-3" />
                    <span className="text-xs">500+ Schools</span>
                  </div>
                </div>
              </div>

              {/* Language Selector */}
              <div className="relative w-full max-w-[180px] sm:max-w-[200px]">
                <p className="text-xs font-semibold uppercase tracking-wide mb-2 text-gray-600">
                  <Globe className="w-3 h-3 inline mr-1" />
                  Language
                </p>
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-orange-500 transition-all px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-4 relative overflow-hidden rounded-sm">
                      <img
                        src="https://flagcdn.com/gb.svg"
                        alt="UK Flag"
                        className="w-full h-full object-cover"
                      />
                    </span>
                    <span className="text-gray-900 text-sm sm:text-base">
                      {language}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform text-gray-500 ${
                      showLanguageMenu ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showLanguageMenu && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 max-h-60 overflow-y-auto text-sm">
                    {[
                      'Urdu (PAK)',
                      'English (UK)',
                      'English (US)',
                      'Español',
                      'Français',
                      'Deutsch',
                      'Italiano',
                      '中文',
                      '日本語',
                    ].map(lang => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setShowLanguageMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition-colors text-gray-700"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Social Icons */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-3 text-gray-600">
                  Follow Us
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {Object.entries(SocialIcons).map(([key, icon]) => (
                    <a
                      key={key}
                      href="#"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-50 hover:bg-orange-50 hover:border-orange-300 hover:scale-110 transition-all flex items-center justify-center border border-gray-200 text-gray-600 hover:text-orange-600"
                      aria-label={key}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mt-8 lg:mt-0">
              {Object.entries(sections).map(([title, links]) => (
                <div key={title} className="flex flex-col gap-3 sm:gap-4">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700">
                    {title}
                  </h3>
                  <ul className="flex flex-col gap-2 sm:gap-3">
                    {links.map(item => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="text-gray-600 hover:text-orange-600 hover:translate-x-1 transition-all inline-flex items-center gap-1 text-xs sm:text-sm group"
                        >
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6 sm:my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Copyright */}
            <div className="text-gray-500 text-xs sm:text-sm text-center md:text-left order-2 md:order-1">
              © 2024 EduManage. All rights reserved.
            </div>

            {/* Large Brand Text */}
            <div className="text-center order-1 md:order-2 mb-4 md:mb-0">
              <h1
                className={`${poppins.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl select-none opacity-5 font-extrabold text-gray-900 tracking-wider`}
              >
                EDU-MANAGE
              </h1>
            </div>

            {/* Additional Links */}
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm order-3">
              <Link
                href="/pages/login"
                className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
              >
                Login
              </Link>
              <a
                href="/pages/contact"
                className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1"
              >
                Contact Support
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>

          {/* Inspiration Credit */}
          <p className="text-xs text-center text-gray-400 mt-6 sm:mt-8">
            Design inspired by modern SaaS platforms •
            <Link
              href="https://discord.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-orange-600 transition-colors ml-1"
            >
              Discord
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}

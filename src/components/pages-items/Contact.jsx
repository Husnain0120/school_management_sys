'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowRight,
  Award,
  BookOpen,
  Building,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  GraduationCap,
  HelpCircle,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/contact-success');
    }, 1500);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleFaq = index => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What's the admission process timeline?",
      answer:
        "Our admission process typically takes 7-10 working days from application submission to final decision. You'll receive email updates at each stage including document verification, payment confirmation, and final enrollment.",
      category: 'Admissions',
    },
    {
      question: 'What documents are required for admission?',
      answer:
        'Required documents include: Birth certificate, CNIC/B-form, 4 passport-sized photographs, previous school transcripts, and a medical fitness certificate. All documents must be attested.',
      category: 'Admissions',
    },
    {
      question: 'Do you offer financial aid or scholarships?',
      answer:
        'Yes, we offer merit-based scholarships covering 25-100% of tuition fees. Need-based financial aid is also available. Applications open annually in March.',
      category: 'Financial',
    },
    {
      question: 'What are the school hours?',
      answer:
        'Regular school hours are 8:00 AM to 2:00 PM. Extended care program available until 4:30 PM. Friday hours are 8:00 AM to 12:30 PM.',
      category: 'General',
    },
    {
      question: 'How is the curriculum structured?',
      answer:
        'We follow the National Curriculum with enhancements in STEM education. Our program includes robotics, coding from Grade 3, and advanced mathematics from Grade 6.',
      category: 'Academic',
    },
    {
      question: 'What technology is used in classrooms?',
      answer:
        'Smart classrooms with interactive whiteboards, 1:1 iPad program from Grade 5, and dedicated computer labs with latest software for programming and design.',
      category: 'Academic',
    },
    {
      question: 'What safety measures are in place?',
      answer:
        'Campus features 24/7 security, CCTV surveillance, biometric entry, and trained medical staff. Regular safety drills conducted monthly.',
      category: 'Safety',
    },
    {
      question: 'What are the transportation options?',
      answer:
        'Air-conditioned buses with GPS tracking cover all major areas. Female attendants on each route. Transportation fees range based on distance.',
      category: 'Services',
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri, 8:00 AM - 6:00 PM',
      gradient: 'from-orange-500 to-orange-600',
      color: 'orange',
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@edumanage.com',
      description: 'Response within 24 hours',
      gradient: 'from-gray-900 to-black',
      color: 'gray',
    },
    {
      icon: MapPin,
      title: 'Visit Campus',
      details: '123 Education Street, City',
      description: 'Mon-Sat, 9:00 AM - 4:00 PM',
      gradient: 'from-orange-500 to-orange-600',
      color: 'orange',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      details: 'Available on website',
      description: 'Real-time support 24/7',
      gradient: 'from-gray-900 to-black',
      color: 'gray',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-32 pb-20 px-4">
        {/* Background Pattern */}
        <div className="absolute top-40 right-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-40 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-gray-900">Edu</span>
                  <span className="text-orange-600">Manage</span>
                </h1>
                <p className="text-sm text-gray-500">Support Center</p>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              How can we{' '}
              <span className="text-transparent bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text">
                help you
              </span>{' '}
              today?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to your questions or reach out to our support team.
              We're here to help.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
              <div className="text-2xl font-bold text-gray-900">2h</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Schools Helped</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <HelpCircle className="h-8 w-8 text-orange-600" />
                Contact Options
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <method.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">
                          {method.title}
                        </h3>
                        <p className="text-gray-900 font-semibold">
                          {method.details}
                        </p>
                        <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {method.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className={`mt-4 w-full border-${method.color}-300 text-${method.color}-600 hover:bg-${method.color}-50 hover:border-${method.color}-400`}
                    >
                      {method.title === 'Live Chat'
                        ? 'Start Chat'
                        : 'Contact Now'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Send className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Full Name *
                    </label>
                    <Input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="rounded-lg border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="rounded-lg border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="rounded-lg border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Subject *
                    </label>
                    <Input
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="rounded-lg border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your issue or question in detail..."
                    className="rounded-lg border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 rounded-lg font-semibold shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Help */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-2xl p-6 border border-orange-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">Quick Help</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/pages/admission"
                    className="text-gray-700 hover:text-orange-600 hover:underline flex items-center gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    Admission Process
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule a Tour
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline flex items-center gap-2"
                  >
                    <Award className="h-4 w-4" />
                    Scholarships
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-700 hover:text-orange-600 hover:underline flex items-center gap-2"
                  >
                    <Building className="h-4 w-4" />
                    Campus Facilities
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Hours */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Support Hours
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Monday - Friday</span>
                  <span className="text-sm font-semibold text-gray-900">
                    8:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Saturday</span>
                  <span className="text-sm font-semibold text-gray-900">
                    9:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sunday</span>
                  <span className="text-sm font-semibold text-gray-900">
                    Emergency Only
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl text-white p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-400" />
                Trust & Security
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span className="text-sm">GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Secure Data Encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span className="text-sm">24/7 System Monitoring</span>
                </div>
              </div>
            </div>

            {/* Live Support */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Live Support Available
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Connect with our support team in real-time
              </p>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                Start Live Chat
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about admissions, programs,
              and campus life
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 mb-4 overflow-hidden hover:border-orange-300 transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mt-1 ${
                        faq.category === 'Admissions'
                          ? 'bg-orange-100 text-orange-600'
                          : faq.category === 'Financial'
                            ? 'bg-blue-100 text-blue-600'
                            : faq.category === 'Academic'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {faq.category === 'Admissions' ? (
                        <GraduationCap className="h-4 w-4" />
                      ) : faq.category === 'Financial' ? (
                        <Award className="h-4 w-4" />
                      ) : faq.category === 'Academic' ? (
                        <BookOpen className="h-4 w-4" />
                      ) : (
                        <HelpCircle className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-500 mb-1 block">
                        {faq.category}
                      </span>
                      <h3 className="font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {expandedFaq === index && (
                  <div className="px-6 pb-6 pl-16">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100/30 border-y border-orange-100 mt-20 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4" />
            Ready to Get Started?
          </div>

          <h3 className="text-4xl font-bold text-gray-900 mb-4">
            Join hundreds of schools already using EduManage
          </h3>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Start your journey towards educational excellence today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 rounded-lg font-semibold shadow-lg hover:shadow-orange-500/30 transition-all">
              Apply Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 px-8 py-6 rounded-lg font-semibold"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

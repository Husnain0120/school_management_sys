'use client';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  GraduationCap,
  Menu,
  MessageSquare,
  Play,
  Shield,
  Sparkles,
  Star,
  Target,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Footer from './Footer';

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //router
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Modern Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">
                <span className="text-gray-900">Edu</span>
                <span className="text-orange-600">Manage</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="#home"
                className="text-gray-600 hover:text-orange-600 transition-colors font-medium hover:font-semibold"
              >
                Home
              </Link>
              <Link
                href="#features"
                className="text-gray-600 hover:text-orange-600 transition-colors font-medium hover:font-semibold"
              >
                Features
              </Link>
              <Link
                href="#solutions"
                className="text-gray-600 hover:text-orange-600 transition-colors font-medium hover:font-semibold"
              >
                Solutions
              </Link>
              <Link
                href="#pricing"
                className="text-gray-600 hover:text-orange-600 transition-colors font-medium hover:font-semibold"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-600 hover:text-orange-600 transition-colors font-medium hover:font-semibold"
              >
                Testimonials
              </Link>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-lg font-semibold px-6">
                Get Started Free
              </Button>
              <Button
                onClick={() => {
                  router.push('/pages/login');
                }}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600 rounded-lg cursor-pointer font-medium"
              >
                Login
              </Button>
            </nav>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
              <nav className="flex flex-col gap-4">
                <Link
                  href="#home"
                  className="text-gray-600 hover:text-orange-600 py-2 hover:bg-orange-50 rounded-lg px-4"
                >
                  Home
                </Link>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-orange-600 py-2 hover:bg-orange-50 rounded-lg px-4"
                >
                  Features
                </Link>
                <Link
                  href="#solutions"
                  className="text-gray-600 hover:text-orange-600 py-2 hover:bg-orange-50 rounded-lg px-4"
                >
                  Solutions
                </Link>
                <Link
                  href="#pricing"
                  className="text-gray-600 hover:text-orange-600 py-2 hover:bg-orange-50 rounded-lg px-4"
                >
                  Pricing
                </Link>
                <Link
                  href="#testimonials"
                  className="text-gray-600 hover:text-orange-600 py-2 hover:bg-orange-50 rounded-lg px-4"
                >
                  Testimonials
                </Link>
                <div className="flex gap-2 pt-2">
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white w-full rounded-lg font-semibold">
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 w-full rounded-lg"
                  >
                    Login
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 right-40 w-96 h-96 bg-orange-500 rounded-full"></div>
          <div className="absolute bottom-40 left-40 w-96 h-96 bg-gray-900 rounded-full"></div>
        </div>

        <div className="container mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full border border-orange-200">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Trusted by 500+ Schools Worldwide
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  <span className="text-gray-900">Modern School</span>
                  <span className="block text-orange-600 mt-2">
                    Management System
                  </span>
                </h1>

                <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                  A comprehensive, cloud-based platform that transforms how
                  schools manage operations, engage with students, and drive
                  educational excellence. Everything you need in one powerful
                  system.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-lg py-6 text-base font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-200 transition-all">
                  <UserPlus className="h-5 w-5" />
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button className="relative group bg-white border border-gray-300 hover:border-orange-300 text-gray-700 rounded-lg py-6 text-base font-semibold flex items-center justify-center gap-2 hover:text-orange-600">
                  <Play className="h-5 w-5" />
                  Watch Demo
                  <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-orange-500 transition-all duration-300"></div>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-orange-600">500+</div>
                  <div className="text-sm text-gray-600">Schools</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right - Dashboard Preview */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl p-6 border border-gray-200 shadow-2xl">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Admin Dashboard
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    Updated just now
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="space-y-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Students</div>
                      <div className="text-xl font-bold text-gray-900">
                        1,245
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Teachers</div>
                      <div className="text-xl font-bold text-gray-900">68</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Courses</div>
                      <div className="text-xl font-bold text-gray-900">42</div>
                    </div>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="h-40 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Performance Analytics
                      </p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Recent Activity
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">
                          New student enrollment
                        </span>
                        <span className="text-xs text-orange-600">
                          Just now
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">
                          Grade updates
                        </span>
                        <span className="text-xs text-gray-500">
                          10 min ago
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 border border-gray-200 shadow-lg hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      Excellence Award
                    </div>
                    <div className="text-xs text-gray-500">
                      2024 EdTech Leader
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 border border-gray-200 shadow-lg hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      Secure & Compliant
                    </div>
                    <div className="text-xs text-gray-500">
                      GDPR, FERPA Ready
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Solutions for Every</span>
              <span className="block text-orange-600">Educational Need</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From K-12 to higher education, we provide tailored solutions that
              scale with your institution
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'K-12 Schools',
                desc: 'Complete management system for primary and secondary education',
                features: [
                  'Attendance Tracking',
                  'Parent Portal',
                  'Grade Management',
                ],
                color: 'orange',
              },
              {
                icon: GraduationCap,
                title: 'Higher Education',
                desc: 'Advanced solutions for colleges and universities',
                features: [
                  'Course Management',
                  'Research Tools',
                  'Alumni Network',
                ],
                color: 'gray',
              },
              {
                icon: Target,
                title: 'Training Centers',
                desc: 'Specialized platform for professional training institutes',
                features: [
                  'Certification',
                  'Skill Tracking',
                  'Corporate Integration',
                ],
                color: 'orange',
              },
            ].map((solution, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${solution.color}-500 to-${solution.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <solution.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-6">{solution.desc}</p>
                <ul className="space-y-3">
                  {solution.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <CheckCircle
                        className={`h-5 w-5 text-${solution.color}-500 flex-shrink-0`}
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="ghost"
                  className="mt-6 text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-0 h-auto"
                >
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Powerful Features</span>
              <span className="block text-orange-600">That Drive Success</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive tools designed to streamline every aspect of school
              management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: UserPlus,
                title: 'Smart Admissions',
                desc: 'Automated application processing with AI-powered screening',
                color: 'orange',
              },
              {
                icon: BookOpen,
                title: 'Learning Management',
                desc: 'Full-featured LMS with interactive content and assessments',
                color: 'gray',
              },
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                desc: 'Real-time insights into student performance and institutional health',
                color: 'orange',
              },
              {
                icon: Calendar,
                title: 'Scheduling & Attendance',
                desc: 'Intelligent timetabling and automated attendance tracking',
                color: 'gray',
              },
              {
                icon: MessageSquare,
                title: 'Communication Hub',
                desc: 'Secure messaging, announcements, and parent engagement tools',
                color: 'orange',
              },
              {
                icon: Shield,
                title: 'Security & Compliance',
                desc: 'Enterprise-grade security with education compliance standards',
                color: 'gray',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-4`}
                >
                  <feature.icon
                    className={`h-6 w-6 text-${feature.color}-600`}
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className={`h-0.5 w-8 bg-${feature.color}-500`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Trusted by</span>
              <span className="block text-orange-600">Educational Leaders</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'EduManage transformed how we operate. Efficiency increased by 40% in the first month.',
                author: 'Sarah Johnson',
                role: 'Principal, Green Valley High',
                rating: 5,
              },
              {
                quote:
                  'The parent engagement tools have revolutionized our communication. Absolutely essential.',
                author: 'Michael Chen',
                role: 'Director, Bright Future Academy',
                rating: 5,
              },
              {
                quote:
                  'From admissions to graduation, everything is streamlined. A game-changer for education.',
                author: 'Dr. Emily Rodriguez',
                role: 'Dean, University of Innovation',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-orange-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-lg italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>

            <div className="relative">
              <h3 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your School?
              </h3>
              <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
                Join hundreds of forward-thinking educational institutions using
                EduManage to drive excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-orange-600 hover:bg-gray-100 border-0 rounded-lg py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                  Start 30-Day Free Trial
                </Button>
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg py-6 text-base font-semibold">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Book a Demo
                </Button>
              </div>
              <p className="text-orange-200 text-sm mt-6">
                No credit card required • Cancel anytime • Full feature access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Home,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/contact-success");
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20">
      {/* Hero Section */}
      <div className="relative bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center h-96 flex items-center justify-center before:absolute before:inset-0 before:bg-black/40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center z-10 px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-serif tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Reach out to our admissions team for personalized guidance.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Contact Information (Luxury Card) */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100/50">
            <div className="p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif">
                Get in Touch
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-600/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      Call Us
                    </h3>
                    <p className="text-gray-600 mt-1">+92 300 123 4567</p>
                    <p className="text-gray-600">+92 42 123 4567</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 transition-colors">
                      Schedule a call <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-blue-600/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      Email
                    </h3>
                    <p className="text-gray-600 mt-1">
                      admissions@edumanage.edu.pk
                    </p>
                    <p className="text-gray-600">support@edumanage.edu.pk</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 transition-colors">
                      Email directly <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="bg-blue-600/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      Visit Campus
                    </h3>
                    <p className="text-gray-600 mt-1">123 Education Street</p>
                    <p className="text-gray-600">Lahore, Punjab 54000</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 transition-colors">
                      Get directions <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">
                    Office Hours
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600/10 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-gray-600">
                        Mon-Fri: 8:00 AM - 4:00 PM
                      </p>
                      <p className="text-gray-600">Sat: 9:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="h-80 w-full relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.036989863575!2d74.3584973151049!3d31.48120998138589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>

          {/* Contact Form (Elegant Design) */}
          <div className="bg-white rounded-xl shadow-2xl p-10 border border-gray-100/50">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
              Send a Message
            </h2>
            <p className="text-gray-600 mb-8">
              We typically respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* FAQ Section (Premium Accordion Style) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-28"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">
              Common Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to frequently asked questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What's the admission deadline?",
                answer:
                  "We have rolling admissions, but priority deadlines are August 1st for Fall and December 1st for Spring.",
              },
              {
                question: "Do you offer virtual campus tours?",
                answer:
                  "Yes! Schedule a live virtual tour with our admissions team.",
              },
              {
                question: "How can I check my application status?",
                answer:
                  "Log in to your applicant portal or email admissions@edumanage.edu.pk.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept bank transfers, credit cards, and installment plans.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
                <div className="mt-4 text-blue-600 flex items-center gap-1 text-sm font-medium">
                  Read more{" "}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Home,
  CheckCircle2,
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

  // Expanded FAQ data
  const faqs = [
    {
      question: "What's the admission process timeline?",
      answer:
        "Our admission process typically takes 7-10 working days from application submission to final decision. You'll receive email updates at each stage including document verification, payment confirmation, and final enrollment.",
    },
    {
      question: "What documents are required for admission?",
      answer:
        "Required documents include: Birth certificate, CNIC/B-form, 4 passport-sized photographs, previous school transcripts, and a medical fitness certificate. All documents must be attested.",
    },
    {
      question: "Do you offer financial aid or scholarships?",
      answer:
        "Yes, we offer merit-based scholarships covering 25-100% of tuition fees. Need-based financial aid is also available. Applications open annually in March.",
    },
    {
      question: "What are the school hours?",
      answer:
        "Regular school hours are 8:00 AM to 2:00 PM. Extended care program available until 4:30 PM. Friday hours are 8:00 AM to 12:30 PM.",
    },
    {
      question: "How is the curriculum structured?",
      answer:
        "We follow the National Curriculum with enhancements in STEM education. Our program includes robotics, coding from Grade 3, and advanced mathematics from Grade 6.",
    },
    {
      question: "What extracurricular activities are available?",
      answer:
        "We offer 30+ activities including sports (swimming, cricket, basketball), arts (music, drama, fine arts), and clubs (robotics, debate, environmental club).",
    },
    {
      question: "What safety measures are in place?",
      answer:
        "Campus features 24/7 security, CCTV surveillance, biometric entry, and trained medical staff. Regular safety drills conducted monthly.",
    },
    {
      question: "What technology is used in classrooms?",
      answer:
        "Smart classrooms with interactive whiteboards, 1:1 iPad program from Grade 5, and dedicated computer labs with latest software for programming and design.",
    },
    {
      question: "What are the transportation options?",
      answer:
        "Air-conditioned buses with GPS tracking cover all major areas. Female attendants on each route. Transportation fees range from Rs. 3,500-6,000/month based on distance.",
    },
    {
      question: "What parent involvement is expected?",
      answer:
        "Monthly parent-teacher meetings, optional workshops, and access to parent portal for real-time academic tracking. Volunteer opportunities for school events.",
    },
  ];

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
            Premium Educational Consultations & Admissions Support
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
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100/50">
            <div className="p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 font-serif border-b pb-4">
                Direct Connections
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-6 p-4 hover:bg-blue-50 rounded-xl transition-colors">
                  <div className="bg-blue-600/10 p-3 rounded-lg flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                      Phone Support
                    </h3>
                    <p className="text-gray-600">
                      +92 300 123 4567 (Admissions)
                    </p>
                    <p className="text-gray-600">+92 42 123 4567 (General)</p>
                    <div className="mt-3">
                      <p className="text-sm text-blue-600 font-medium">
                        <Clock className="inline mr-2 h-4 w-4" />
                        Phone Hours: Mon-Sat 8:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-4 hover:bg-blue-50 rounded-xl transition-colors">
                  <div className="bg-blue-600/10 p-3 rounded-lg flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                      Email Support
                    </h3>
                    <p className="text-gray-600">admissions@edumanage.edu.pk</p>
                    <p className="text-gray-600">support@edumanage.edu.pk</p>
                    <div className="mt-3">
                      <p className="text-sm text-blue-600 font-medium">
                        <Clock className="inline mr-2 h-4 w-4" />
                        Response Time: 24 business hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-4 hover:bg-blue-50 rounded-xl transition-colors">
                  <div className="bg-blue-600/10 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">
                      Campus Visit
                    </h3>
                    <p className="text-gray-600">123 Education Street</p>
                    <p className="text-gray-600">Lahore, Punjab 54000</p>
                    <div className="mt-3">
                      <p className="text-sm text-blue-600 font-medium">
                        <Clock className="inline mr-2 h-4 w-4" />
                        Visiting Hours: Mon-Sat 9:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="h-80 w-full relative border-t">
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

          {/* Premium Contact Form */}
          <div className="bg-white rounded-xl shadow-2xl p-10 border border-gray-100/50">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 font-serif mb-2">
                Priority Inquiry Form
              </h2>
              <p className="text-gray-600 text-lg">
                Complete this form for expedited response (4-hour guarantee)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 peer"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-3 px-1 bg-white text-gray-500 transition-all 
                    peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600
                    peer-valid:-top-2 peer-valid:text-sm"
                >
                  Full Name *
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 peer"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-3 px-1 bg-white text-gray-500 transition-all 
                      peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600
                      peer-valid:-top-2 peer-valid:text-sm"
                  >
                    Email *
                  </label>
                </div>

                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 peer"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-4 top-3 px-1 bg-white text-gray-500 transition-all 
                      peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600
                      peer-valid:-top-2 peer-valid:text-sm"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              <div className="relative">
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 peer"
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-3 px-1 bg-white text-gray-500 transition-all 
                    peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600
                    peer-valid:-top-2 peer-valid:text-sm"
                >
                  Detailed Message *
                </label>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group"
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
                      <span className="font-medium">Processing Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      <span className="font-medium">Send Priority Message</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Premium FAQ Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-28"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">
              Admissions Handbook
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guide to our educational programs and policies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.question}
                  </h3>
                </div>
                <p className="text-gray-600 pl-10">{item.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

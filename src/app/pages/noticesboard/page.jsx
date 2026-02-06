'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Clock,
  ExternalLink,
  FileText,
  GraduationCap,
  Megaphone,
  Search,
  ShieldAlert,
} from 'lucide-react';
import { useState } from 'react';

// LMS Notices Data
const lmsNoticesData = [
  {
    id: 1,
    title: 'Opportunity to Participate in a National-level Event',
    date: 'Feb 06, 2026',
    type: 'event',
    description:
      'Join this prestigious national event showcasing talent and innovation.',
  },
  {
    id: 2,
    title:
      'Postponement of Fall 2025 End Semester Examinations (Punjab Province Only)',
    date: 'Feb 04, 2026',
    type: 'exam',
    description:
      'Important update regarding examination schedule for Punjab province students.',
  },
  {
    id: 3,
    title:
      'Virtual University of Pakistan Holds Webinar on Kashmir Solidarity Day',
    date: 'Feb 04, 2026',
    type: 'webinar',
    description:
      'Special webinar session commemorating Kashmir Solidarity Day.',
  },
  {
    id: 4,
    title: 'Results Announced: Winners of Kashmir Solidarity Day Online Debate',
    date: 'Feb 02, 2026',
    type: 'result',
    description:
      'Congratulations to all winners of the online debate competition.',
  },
  {
    id: 5,
    title: 'Join Us for an Informative Webinar on Kashmir Solidarity Day',
    date: 'Feb 02, 2026',
    type: 'webinar',
    description: 'Register now for this informative session.',
  },
  {
    id: 6,
    title: 'JOIN DEBATE FOR JUSTICE AND PEACE!',
    date: 'Jan 30, 2026',
    type: 'event',
    description: 'Participate in the debate competition on justice and peace.',
  },
  {
    id: 7,
    title: 'Attention Overseas Students! Urgent: Download VUTES New Version',
    date: 'Jan 21, 2026',
    type: 'urgent',
    description:
      'Urgent update for overseas students regarding examination software.',
  },
  {
    id: 8,
    title: 'Unblocking of VUIMS Accounts (20-01-2026)',
    date: 'Jan 20, 2026',
    type: 'admin',
    description: 'Account unblocking process update for affected students.',
  },
  {
    id: 9,
    title:
      'Struggling with desk rejections? Turn research into publishable success!',
    date: 'Jan 20, 2026',
    type: 'workshop',
    description: 'Workshop on improving research paper acceptance rates.',
  },
  {
    id: 10,
    title: 'Overseas Examination Guidelines and Demo Schedule',
    date: 'Jan 19, 2026',
    type: 'exam',
    description: 'Complete guidelines for overseas examination process.',
  },
];

// Important Links Data
const importantLinksData = [
  {
    id: 1,
    title: 'Beware of Fake Websites',
    date: 'Jul 11',
    icon: ShieldAlert,
  },
  {
    id: 2,
    title: 'Endowment Fund (Frequently Asked Questions)',
    date: 'Jun 01',
    icon: FileText,
  },
  {
    id: 3,
    title: 'MS Excel Tutorials',
    date: 'Mar 25',
    icon: BookOpen,
  },
  {
    id: 4,
    title: 'Microsoft Office Specialist (MOS) Exam Festival',
    date: 'Oct 01',
    icon: Megaphone,
  },
  {
    id: 5,
    title: 'Virtual University Students Support Services (VUSSS)',
    date: 'Jan 29',
    icon: Bell,
  },
  {
    id: 6,
    title: 'Official Email Policy for Students',
    date: 'Jul 10',
    icon: ShieldAlert,
  },
  {
    id: 7,
    title: 'Protect Your LMS & VU Email Accounts',
    date: 'Jul 10',
    icon: ShieldAlert,
  },
  {
    id: 8,
    title: 'Allowed Softwares & their List',
    date: 'Jul 11',
    icon: FileText,
  },
  {
    id: 9,
    title: 'HEC Plagiarism Policy',
    date: 'Jun 22',
    icon: ShieldAlert,
  },
  {
    id: 10,
    title: 'Coursework: Upcoming Courses',
    date: 'May 02',
    icon: BookOpen,
  },
];

const NoticeBoardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter notices based on search query
  const filteredNotices = lmsNoticesData.filter(notice =>
    notice.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLinks = importantLinksData.filter(link =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle back button
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Clean Header */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white hover:bg-white/10 p-2 rounded-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Back</span>
            </button>

            {/* Center: Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg">
                <GraduationCap className="w-7 h-7 text-orange-600" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">EDU MANAGE</h1>
                <p className="text-sm text-orange-100">Notice Board</p>
              </div>
            </div>

            {/* Placeholder for alignment */}
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">News & Events</h2>
          <p className="text-gray-600 mt-2">
            Stay updated with the latest announcements
          </p>
        </div>

        {/* Simple Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full pl-12 pr-4 p-4"
              placeholder="Search for..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - All Notices */}
          <div className="lg:col-span-2">
            {/* Notices List */}
            <div className="space-y-4">
              {(searchQuery ? filteredNotices : lmsNoticesData).map(notice => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Date Box */}
                      <div className="flex-shrink-0">
                        <div className="flex flex-col items-center justify-center w-14 h-14 bg-gray-50 border border-gray-200 rounded">
                          <span className="text-xs font-medium text-gray-900">
                            {notice.date.split(' ')[0]}
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            {notice.date.split(' ')[1]}
                          </span>
                        </div>
                      </div>

                      {/* Notice Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 mb-2">
                          {notice.title}
                        </h3>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{notice.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredNotices.length === 0 && searchQuery && (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700">
                    No notices found
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Try different search terms
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Important Links */}
          <div>
            {/* Important Links Card */}
            <div className="bg-white rounded-lg border border-gray-200 sticky top-6">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">
                  Important Links & Notifications
                </h3>
              </div>

              <div className="divide-y divide-gray-200">
                {(searchQuery ? filteredLinks : importantLinksData).map(
                  link => {
                    const Icon = link.icon;
                    return (
                      <div
                        key={link.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <div className="p-2 bg-gray-100 rounded">
                              <Icon className="w-5 h-5 text-gray-600" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900">
                              {link.title}
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-500">
                                {link.date}
                              </span>
                            </div>
                          </div>

                          <ExternalLink className="w-4 h-4 text-gray-300 flex-shrink-0" />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {filteredLinks.length === 0 && searchQuery && (
                <div className="p-4 text-center text-gray-500">
                  No links found
                </div>
              )}
            </div>

            {/* Total Notices Count */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Total Notices</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {lmsNoticesData.length}
                  </p>
                </div>
                <Bell className="w-8 h-8 text-orange-500" />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Last updated: Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>EDU MANAGE Notice Board System</p>
            <p className="mt-2 md:mt-0">
              Showing {filteredNotices.length} of {lmsNoticesData.length}{' '}
              notices
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NoticeBoardPage;

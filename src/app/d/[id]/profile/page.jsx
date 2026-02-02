import EnhancedProfilePage from '@/components/pages-items/Profile';

export const metadata = {
  title: 'Profile-EduManage',
  description:
    'Reach out to us with any questions, feedback, or support requests.',
  themeColor: '#007BFF',
};
const page = () => {
  return (
    <div>
      <EnhancedProfilePage />
    </div>
  );
};

export default page;

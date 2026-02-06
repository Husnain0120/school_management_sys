import NotFoundPage from '@/components/NotFoundPage';

export const metadata = {
  title: 'Error: 404 • Resource Not Found',
  description:
    "The page you're looking for might have been moved, deleted, or doesn't exist.",
};
export default function NotFound() {
  return (
    <>
      <NotFoundPage />
    </>
  );
}

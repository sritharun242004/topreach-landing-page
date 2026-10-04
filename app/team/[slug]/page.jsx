import { notFound } from 'next/navigation';
import AdminPanel from './AdminPanel';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Team access | Top Reach Pro', robots: { index: false, follow: false } };

export default async function TeamPage({ params }) {
  const { slug } = await params;
  if (!process.env.ADMIN_SLUG || slug !== process.env.ADMIN_SLUG) notFound();
  return <AdminPanel slug={slug} />;
}

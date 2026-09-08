import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import type { ProjectCategory } from '@/lib/types';
import VivaClient from './VivaClient';

export default async function VivaPortalPage({ params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  const supabase = createAdminClient();

  const { data: order, error } = await supabase
    .from('orders')
    .select('*, projects(title, category)')
    .eq('id', orderId)
    .single();

  if (error || !order || order.status !== 'PAID') {
    return notFound();
  }

  const category  = (order.projects?.category ?? 'FullStack') as ProjectCategory;
  const purchaseDate = new Date(order.created_at).toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  // Pass only small primitive props — question banks are imported directly
  // inside VivaClient to avoid serializing 150KB+ across the server/client boundary
  return (
    <VivaClient
      orderId={orderId}
      studentName={order.customer_name}
      projectTitle={order.projects?.title ?? 'Your Project'}
      category={category}
      purchaseDate={purchaseDate}
    />
  );
}

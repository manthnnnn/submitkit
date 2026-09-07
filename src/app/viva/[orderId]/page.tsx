import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { getVivaSections, getCategoryLabel } from './question-banks';
import type { ProjectCategory } from '@/lib/types';
import VivaClient from './VivaClient';

// Category accent colors (must match question-banks section colors for the hero)
const CATEGORY_COLORS: Record<string, string> = {
  AIML:          '#818cf8',
  FullStack:     '#6366f1',
  Cybersecurity: '#f87171',
  Healthcare:    '#34d399',
  FinTech:       '#f59e0b',
  Cloud:         '#38bdf8',
};

export default async function VivaPortalPage({ params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  const supabase = createAdminClient();

  const { data: order, error } = await supabase
    .from('orders')
    .select('*, projects(*)')
    .eq('id', orderId)
    .single();

  if (error || !order || order.status !== 'PAID') {
    return notFound();
  }

  const category = order.projects?.category as ProjectCategory | undefined;
  const sections = getVivaSections(category);
  const categoryLabel = getCategoryLabel(category);
  const categoryColor = CATEGORY_COLORS[category ?? ''] ?? '#818cf8';

  const purchaseDate = new Date(order.created_at).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <VivaClient
      orderId={orderId}
      studentName={order.customer_name}
      projectTitle={order.projects?.title ?? 'Your Project'}
      categoryLabel={categoryLabel}
      categoryColor={categoryColor}
      purchaseDate={purchaseDate}
      sections={sections}
    />
  );
}

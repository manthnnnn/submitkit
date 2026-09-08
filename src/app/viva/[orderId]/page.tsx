import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import type { ProjectCategory } from '@/lib/types';
import { getProjectMeta } from '@/lib/available-projects';
import VivaClient from './VivaClient';

export const dynamic = 'force-dynamic';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function VivaPortalPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  if (!orderId) return notFound();

  const supabase = createAdminClient();

  let studentName = 'Student';
  let projectTitle = 'Your Project';
  let category: ProjectCategory = 'FullStack';
  let purchaseDate = 'Verified Access';
  let resolved = false;

  // 1. Try finding by Order UUID
  if (UUID_REGEX.test(orderId)) {
    const { data: order } = await supabase
      .from('orders')
      .select('customer_name, created_at, status, projects(title, category, slug)')
      .eq('id', orderId)
      .maybeSingle();

    if (order && order.status === 'PAID') {
      studentName = (order.customer_name?.trim() || 'Student');
      const proj = Array.isArray(order.projects) ? order.projects[0] : order.projects;
      if (proj) {
        const readyMeta = proj.slug ? getProjectMeta(proj.slug) : null;
        projectTitle = readyMeta?.name || proj.title || projectTitle;
        category = (readyMeta?.category || proj.category || 'FullStack') as ProjectCategory;
      }
      try {
        if (order.created_at) {
          purchaseDate = new Date(order.created_at).toLocaleDateString('en-US', {
            day: 'numeric', month: 'long', year: 'numeric',
          });
        }
      } catch {
        purchaseDate = 'Recent';
      }
      resolved = true;
    }
  }

  // 2. Try finding by Razorpay Order ID (e.g. order_...)
  if (!resolved && orderId.startsWith('order_')) {
    const { data: order } = await supabase
      .from('orders')
      .select('customer_name, created_at, status, projects(title, category, slug)')
      .eq('order_id', orderId)
      .maybeSingle();

    if (order && order.status === 'PAID') {
      studentName = (order.customer_name?.trim() || 'Student');
      const proj = Array.isArray(order.projects) ? order.projects[0] : order.projects;
      if (proj) {
        const readyMeta = proj.slug ? getProjectMeta(proj.slug) : null;
        projectTitle = readyMeta?.name || proj.title || projectTitle;
        category = (readyMeta?.category || proj.category || 'FullStack') as ProjectCategory;
      }
      try {
        if (order.created_at) {
          purchaseDate = new Date(order.created_at).toLocaleDateString('en-US', {
            day: 'numeric', month: 'long', year: 'numeric',
          });
        }
      } catch {
        purchaseDate = 'Recent';
      }
      resolved = true;
    }
  }

  // 3. Try finding directly by Project Slug or Project ID
  if (!resolved) {
    let query = supabase.from('projects').select('title, category, slug');
    if (UUID_REGEX.test(orderId)) {
      query = query.eq('id', orderId);
    } else {
      query = query.eq('slug', orderId);
    }
    const { data: project } = await query.maybeSingle();

    if (project) {
      projectTitle = project.title || 'Your Project';
      category = (project.category || 'FullStack') as ProjectCategory;
      purchaseDate = 'Official Q&A Prep';
      resolved = true;
    }
  }

  // 4. Fallback: check static catalog in available-projects
  if (!resolved) {
    const staticProject = getProjectMeta(orderId);
    if (staticProject) {
      projectTitle = staticProject.name;
      category = staticProject.category as ProjectCategory;
      purchaseDate = 'Official Q&A Prep';
      resolved = true;
    }
  }

  if (!resolved) {
    return notFound();
  }

  return (
    <VivaClient
      orderId={orderId}
      studentName={studentName}
      projectTitle={projectTitle}
      category={category}
      purchaseDate={purchaseDate}
    />
  );
}


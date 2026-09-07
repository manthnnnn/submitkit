export type ProjectCategory = 'AIML' | 'FullStack' | 'Cybersecurity' | 'Healthcare' | 'FinTech' | 'Cloud';
export type ProjectTier = 'MINI' | 'MAJOR';
export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  tier: ProjectTier;
  price_inr: number;
  description: string;
  problem_statement?: string;
  architecture_details?: string;
  tech_stack: string[];
  features: string[];
  demo_video_id: string | null;   // YouTube video ID (e.g. 'dQw4w9WgXcQ')
  demo_screenshots: string[];     // Array of screenshot URLs
  live_demo_url: string | null;   // Legacy - no longer used
  s3_storage_key: string;
  report_template_key: string;
  is_active: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  order_id: string;
  payment_id: string | null;
  customer_email: string;
  customer_phone: string;
  customer_name: string;
  college_name: string | null;
  project_id: string;
  amount_paid: number;
  status: OrderStatus;
  download_count: number;
  download_limit: number;
  has_personalization: boolean;
  has_plagiarism_cert: boolean;
  has_viva_call: boolean;
  created_at: string;
}

export interface DownloadLog {
  id: string;
  order_id: string;
  ip_address: string;
  user_agent: string;
  downloaded_at: string;
}

export interface PaymentPayload {
  projectId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  collegeName?: string;
  addPersonalization?: boolean;
  addPlagiarismCert?: boolean;
  addVivaCall?: boolean;
}

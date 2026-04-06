// types/email.ts
export interface Template {
  _id: string;
  name: string;
  description: string;
  html_content: string;
  css_content: string;
  components?: any;
  thumbnail?: string;
  version?: number;
  tags: string[];
  is_shared?: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
}

export interface Campaign {
  _id?: string;
  name: string;
  description: string;
  template_id: string;
  user_filters: {
    year: string;
    natural_query: string;
    filters: {
      activity_days?: number;
      match_count_min?: number;
      match_count_max?: number;
      registered_after?: string;
      registered_before?: string;
      engagement_level?: 'high' | 'medium' | 'low';
    };
  };
  campaign_type: 'bulk' | 'personalized' | 'ab_test';
  scheduled_at?: string;
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'failed' | 'paused';
  analytics?: {
    sent_count: number;
    delivered_count: number;
    opened_count: number;
    clicked_count: number;
    bounced_count: number;
    unsubscribed_count: number;
  };
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  template?: {
    name: string;
  };
}

export interface User {
  id: string;
  first_name: string;
  email: string;
  created_at: string;
  match_count: number;
  last_active: string;
  engagement_score: number;
}

export interface FilterCriteria {
  year: string;
  natural_query: string;
  filters: {
    activity_days?: number;
    match_count_min?: number;
    match_count_max?: number;
    registered_after?: string;
    registered_before?: string;
    engagement_level?: 'high' | 'medium' | 'low';
  };
}

export interface DashboardStats {
  totalTemplates: number;
  activeCampaigns: number;
  totalSent: number;
  avgOpenRate: number;
}
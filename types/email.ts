export type EngagementLevel = "high" | "medium" | "low";
export type CampaignType = "bulk" | "personalized" | "ab_test";
export type CampaignStatus = "draft" | "scheduled" | "sending" | "completed" | "failed" | "paused";
export type CampaignSaveAction = "draft" | "schedule" | "send";

export type TemplateComponentValue = string | number | boolean | null | undefined;

export interface TemplateComponentBlock {
	type: string;
	content: Record<string, TemplateComponentValue>;
	styling: Record<string, TemplateComponentValue>;
	custom_html: string;
}

export interface Template {
	_id?: string;
	name: string;
	description: string;
	html_content: string;
	css_content: string;
	components?: {
		blocks: TemplateComponentBlock[];
	};
	thumbnail?: string;
	version?: number;
	tags: string[];
	year?: string;
	is_shared?: boolean;
	created_at?: string;
	updated_at?: string;
	created_by?: string;
}

export interface UserFilters {
	activity_days?: number;
	match_count_min?: number;
	match_count_max?: number;
	registered_after?: string;
	registered_before?: string;
	engagement_level?: EngagementLevel;
	opt_in?: boolean;
	profile_complete?: boolean;
	survey_complete?: boolean;
	has_matches?: boolean;
	is_incomplete?: boolean;
	class_year?: string | string[];
	gender?: string;
	age_min?: number;
	age_max?: number;
}

export interface FilterCriteria {
	year: string;
	natural_query: string;
	filters: UserFilters;
}

export interface UserSelectionStats {
	count: number;
	total: number;
	percentage: number;
}

export interface CampaignAnalytics {
	sent_count: number;
	delivered_count: number;
	opened_count: number;
	clicked_count: number;
	bounced_count: number;
	unsubscribed_count: number;
}

export interface Campaign {
	_id?: string;
	name: string;
	description: string;
	template_id: string;
	user_filters: FilterCriteria;
	campaign_type: CampaignType;
	scheduled_at?: string;
	status: CampaignStatus;
	analytics?: CampaignAnalytics;
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
	last_name?: string;
	email: string;
	created_at?: string;
	match_count: number;
	last_active?: string;
	engagement_score?: number;
}

export interface DashboardStats {
	totalTemplates: number;
	activeCampaigns: number;
	totalSent: number;
	avgOpenRate: number;
}

export interface AvailableYearsResponse {
	years: string[];
	default_year?: string;
	error?: string;
}

export interface UserCountResponse extends UserSelectionStats {
	error?: string;
}

export interface UserPreviewResponse {
	preview_users: User[];
	error?: string;
}

export interface UserFilterResponse {
	applied_filters?: Partial<UserFilters>;
	preview_users: User[];
	filtered_count: number;
	total_users: number;
	error?: string;
}

export interface CampaignListResponse {
	campaigns?: Campaign[];
	pagination?: {
		pages?: number;
	};
	error?: string;
}

export interface CampaignActionResponse {
	error?: string;
}

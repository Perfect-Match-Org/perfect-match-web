// components/admin/email/PlaceholderComponents.tsx
// Temporary placeholder components for missing functionality

import React from "react";

export function CampaignBuilder({ campaign, onSave, onCancel }: any) {
	return (
		<div className="p-8 text-center">
			<h2 className="text-2xl font-bold mb-4">Campaign Builder</h2>
			<p className="text-gray-600 mb-4">Campaign builder functionality coming soon...</p>
			<button onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">
				Back to Dashboard
			</button>
		</div>
	);
}

export function TemplateEditor({ template, onSave, onCancel }: any) {
	return (
		<div className="p-8 text-center">
			<h2 className="text-2xl font-bold mb-4">Template Editor</h2>
			<p className="text-gray-600 mb-4">Template editor functionality coming soon...</p>
			<button onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">
				Back to Dashboard
			</button>
		</div>
	);
}

export function UserSelector({ onSelectionChange, initialCriteria }: any) {
	return (
		<div className="p-4 bg-gray-50 rounded">
			<h3 className="font-medium mb-2">User Selector</h3>
			<p className="text-gray-600 text-sm">User selection functionality coming soon...</p>
		</div>
	);
}

export function CampaignHistory({ onEditCampaign, onViewAnalytics }: any) {
	return (
		<div className="p-8 text-center">
			<h2 className="text-2xl font-bold mb-4">Campaign History</h2>
			<p className="text-gray-600 mb-4">Campaign history functionality coming soon...</p>
		</div>
	);
}

export function AnalyticsDashboard() {
	return (
		<div className="p-8 text-center">
			<h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
			<p className="text-gray-600 mb-4">Analytics functionality coming soon...</p>
		</div>
	);
}

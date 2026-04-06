import React, { useState, useCallback } from "react";
import { theme } from "@/styles/themes";
import { Template, Campaign } from "@/types/email";
import EmailDashboard from "./EmailDashboard";
import HybridTemplateEditor from "./HybridTemplateEditor";
import TemplateList from "./TemplateList";
import CampaignBuilder from "./CampaignBuilder";
import CampaignHistory from "./CampaignHistory";
import AnalyticsDashboard from "./AnalyticsDashboard";

type EmailView = "dashboard" | "templates" | "template-editor" | "campaigns" | "campaign-builder" | "analytics";

export default function EmailMarketing() {
	const [currentView, setCurrentView] = useState<EmailView>("dashboard");
	const [editingTemplate, setEditingTemplate] = useState<Template | undefined>();
	const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>();

	const handleCreateTemplate = useCallback(() => {
		setEditingTemplate(undefined);
		setCurrentView("template-editor");
	}, []);

	const handleEditTemplate = useCallback((template: Template) => {
		setEditingTemplate(template);
		setCurrentView("template-editor");
	}, []);

	const handleSaveTemplate = useCallback(async (template: Template) => {
		try {
			const url = template._id ? `/api/admin/email/templates/${template._id}` : "/api/admin/email/templates";

			const method = template._id ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(template),
			});

			if (response.ok) {
				setCurrentView("dashboard");
				setEditingTemplate(undefined);
			} else {
				const error = await response.json();
				alert(`Failed to save template: ${error.error}`);
			}
		} catch (error) {
			alert(`Network error: ${error}`);
		}
	}, []);

	const handleCreateCampaign = useCallback(() => {
		setEditingCampaign(undefined);
		setCurrentView("campaign-builder");
	}, []);

	const handleEditCampaign = useCallback((campaign: Campaign) => {
		setEditingCampaign(campaign);
		setCurrentView("campaign-builder");
	}, []);

	const handleSaveCampaign = useCallback(async (campaign: Campaign, action: string) => {
		try {
			const method = campaign._id && action === "draft" ? "PUT" : "POST";
			const url = campaign._id
				? `/api/admin/email/campaigns/${campaign._id}/${["send", "schedule"].includes(action) ? "send" : ""}`
				: "/api/admin/email/campaigns";
            
            const body = action === "send" ? { ...campaign, send_immediately: true } : campaign;
            const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			if (response.ok) {
				setCurrentView("campaigns");
				setEditingCampaign(undefined);
			} else {
				const error = await response.json();
				alert(`Failed to save campaign: ${error.error}`);
			}
		} catch (error) {
			alert(`Network error: ${error}`);
		}
	}, []);

	const renderCurrentView = useCallback(() => {
		switch (currentView) {
			case "dashboard":
				return (
					<EmailDashboard
						onCreateTemplate={handleCreateTemplate}
						onCreateCampaign={handleCreateCampaign}
						onViewAnalytics={() => setCurrentView("analytics")}
						onViewCampaigns={() => setCurrentView("campaigns")}
					/>
				);

			case "templates":
				return <TemplateList onEditTemplate={handleEditTemplate} onCreateTemplate={handleCreateTemplate} />;

			case "template-editor":
				return (
					<HybridTemplateEditor
						template={editingTemplate}
						onSave={handleSaveTemplate}
						onCancel={() => setCurrentView("templates")}
					/>
				);

			case "campaign-builder":
				return (
					<CampaignBuilder campaign={editingCampaign} onSave={handleSaveCampaign} onCancel={() => setCurrentView("campaigns")} />
				);

			case "campaigns":
				return (
					<CampaignHistory
						onEditCampaign={handleEditCampaign}
						onViewAnalytics={(campaign) => {
							// Could pass campaign ID to analytics view
							setCurrentView("analytics");
						}}
					/>
				);

			case "analytics":
				return <AnalyticsDashboard />;

			default:
				return (
					<EmailDashboard
						onCreateTemplate={handleCreateTemplate}
						onCreateCampaign={handleCreateCampaign}
						onViewAnalytics={() => setCurrentView("analytics")}
						onViewCampaigns={() => setCurrentView("campaigns")}
					/>
				);
		}
	}, [
		currentView,
		editingTemplate,
		editingCampaign,
		handleCreateTemplate,
		handleEditTemplate,
		handleSaveTemplate,
		handleCreateCampaign,
		handleEditCampaign,
		handleSaveCampaign,
	]);

	return (
		<div className="flex min-h-0 flex-1 flex-col bg-gray-50">
			{/* Navigation Bar */}
			{currentView !== "template-editor" && currentView !== "campaign-builder" && (
				<div className="bg-white border-b">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex space-x-8">
							<button
								onClick={() => setCurrentView("dashboard")}
								className={`py-4 px-4 border-b-2 font-bold text-xs uppercase tracking-widest transition-all ${
									currentView === "dashboard"
										? "border-pink-500 text-pink-600"
										: "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300"
								}`}
							>
								Overview
							</button>

							<button
								onClick={() => setCurrentView("templates")}
								className={`py-4 px-4 border-b-2 font-bold text-xs uppercase tracking-widest transition-all ${
									currentView === "templates"
										? "border-pink-500 text-pink-600"
										: "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300"
								}`}
							>
								Templates
							</button>

							<button
								onClick={() => setCurrentView("campaigns")}
								className={`py-4 px-4 border-b-2 font-bold text-xs uppercase tracking-widest transition-all ${
									currentView === "campaigns"
										? "border-pink-500 text-pink-600"
										: "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300"
								}`}
							>
								Campaigns
							</button>

							<button
								onClick={() => setCurrentView("analytics")}
								className={`py-4 px-4 border-b-2 font-bold text-xs uppercase tracking-widest transition-all ${
									currentView === "analytics"
										? "border-pink-500 text-pink-600"
										: "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300"
								}`}
							>
								Analytics
							</button>

							{/* Quick Action Buttons */}
							<div className="ml-auto flex items-center space-x-3">
								<button
									onClick={handleCreateTemplate}
									className="inline-flex items-center px-4 py-1.5 border border-transparent text-xs font-bold uppercase tracking-widest rounded-lg text-white hover:shadow-lg transition-all active:scale-95"
									style={{ backgroundColor: theme.colors.primary }}
								>
									+ Template
								</button>

								<button
									onClick={handleCreateCampaign}
									className="inline-flex items-center px-4 py-1.5 border-2 text-xs font-bold uppercase tracking-widest rounded-lg hover:shadow-lg transition-all active:scale-95"
									style={{
										borderColor: theme.colors.primary,
										color: theme.colors.primary,
									}}
								>
									+ Campaign
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Main content fills space below nav (critical for full-height template editor) */}
			<div className="flex min-h-0 flex-1 flex-col">{renderCurrentView()}</div>
		</div>
	);
}

// components/admin/email/EmailMarketing.tsx
import React, { useState } from 'react';
import { theme } from '@/styles/themes';
import { Template, Campaign } from '@/types/email';
import EmailDashboard from './EmailDashboard';
import HybridTemplateEditor from './HybridTemplateEditor';
import TemplateList from './TemplateList';
import CampaignBuilder from './CampaignBuilder';
import CampaignHistory from './CampaignHistory';
import UserSelector from './UserSelector';
import AnalyticsDashboard from './AnalyticsDashboard';

type EmailView = 'dashboard' | 'templates' | 'template-editor' | 'campaigns' | 'campaign-builder' | 'analytics';

export default function EmailMarketing() {
  const [currentView, setCurrentView] = useState<EmailView>('dashboard');
  const [editingTemplate, setEditingTemplate] = useState<Template | undefined>();
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>();

  const handleCreateTemplate = () => {
    setEditingTemplate(undefined);
    setCurrentView('template-editor');
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setCurrentView('template-editor');
  };

  const handleSaveTemplate = async (template: Template) => {
    try {
      const url = template._id 
        ? `/api/admin/email/templates/${template._id}`
        : '/api/admin/email/templates';
      
      const method = template._id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template),
      });

      if (response.ok) {
        setCurrentView('dashboard');
        setEditingTemplate(undefined);
      } else {
        const error = await response.json();
        alert(`Failed to save template: ${error.error}`);
      }
    } catch (error) {
      alert(`Network error: ${error}`);
    }
  };

  const handleCreateCampaign = () => {
    setEditingCampaign(undefined);
    setCurrentView('campaign-builder');
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setCurrentView('campaign-builder');
  };

  const handleSaveCampaign = async (campaign: Campaign) => {
    try {
      const url = campaign._id 
        ? `/api/admin/email/campaigns/${campaign._id}`
        : '/api/admin/email/campaigns';
      
      const method = campaign._id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaign),
      });

      if (response.ok) {
        setCurrentView('campaigns');
        setEditingCampaign(undefined);
      } else {
        const error = await response.json();
        alert(`Failed to save campaign: ${error.error}`);
      }
    } catch (error) {
      alert(`Network error: ${error}`);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <EmailDashboard
            onCreateTemplate={handleCreateTemplate}
            onCreateCampaign={handleCreateCampaign}
            onViewAnalytics={() => setCurrentView('analytics')}
            onViewCampaigns={() => setCurrentView('campaigns')}
          />
        );

      case 'templates':
        return (
          <TemplateList
            onEditTemplate={handleEditTemplate}
            onCreateTemplate={handleCreateTemplate}
          />
        );

      case 'template-editor':
        return (
          <HybridTemplateEditor
            template={editingTemplate}
            onSave={handleSaveTemplate}
            onCancel={() => setCurrentView('templates')}
          />
        );

      case 'campaign-builder':
        return (
          <CampaignBuilder
            campaign={editingCampaign}
            onSave={handleSaveCampaign}
            onCancel={() => setCurrentView('campaigns')}
          />
        );

      case 'campaigns':
        return (
          <CampaignHistory
            onEditCampaign={handleEditCampaign}
            onViewAnalytics={(campaign) => {
              // Could pass campaign ID to analytics view
              setCurrentView('analytics');
            }}
          />
        );

      case 'analytics':
        return <AnalyticsDashboard />;

      default:
        return (
          <EmailDashboard
            onCreateTemplate={handleCreateTemplate}
            onCreateCampaign={handleCreateCampaign}
            onViewAnalytics={() => setCurrentView('analytics')}
            onViewCampaigns={() => setCurrentView('campaigns')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      {currentView !== 'template-editor' && currentView !== 'campaign-builder' && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  currentView === 'dashboard'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dashboard
              </button>
              
              <button
                onClick={() => setCurrentView('templates')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  currentView === 'templates'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Templates
              </button>
              
              <button
                onClick={() => setCurrentView('campaigns')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  currentView === 'campaigns'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Campaigns
              </button>
              
              <button
                onClick={() => setCurrentView('analytics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  currentView === 'analytics'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analytics
              </button>

              {/* Quick Action Buttons */}
              <div className="ml-auto flex items-center space-x-4">
                <button
                  onClick={handleCreateTemplate}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:shadow-lg transition-all"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  + New Template
                </button>
                
                <button
                  onClick={handleCreateCampaign}
                  className="inline-flex items-center px-4 py-2 border-2 text-sm font-medium rounded-md hover:shadow-lg transition-all"
                  style={{ 
                    borderColor: theme.colors.primary,
                    color: theme.colors.primary 
                  }}
                >
                  + New Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {renderCurrentView()}
    </div>
  );
}
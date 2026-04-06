// components/admin/email/HybridTemplateEditor.tsx
import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { theme } from '@/styles/themes';
import { Template } from '@/types/email';
import DOMPurify from 'dompurify';
import BlockEditor from './BlockEditor';

interface Block {
  id: string;
  type: 'text' | 'heading' | 'image' | 'button' | 'divider' | 'spacer' | 'logo';
  content: any;
  styles: any;
}

interface TemplateEditorProps {
  template?: Template;
  onSave: (template: Template) => void;
  onCancel: () => void;
}

export default function HybridTemplateEditor({ template, onSave, onCancel }: TemplateEditorProps) {
  const [templateData, setTemplateData] = useState<Template>({
    _id: template?._id || '',
    name: template?.name || '',
    description: template?.description || '',
    html_content: template?.html_content || '',
    css_content: template?.css_content || '',
    tags: template?.tags || []
  });

  const [editorMode, setEditorMode] = useState<'visual' | 'code' | 'preview'>('visual');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  
  const editorRef = useRef<any>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);

  // Available block types for drag-and-drop
  const blockTypes = [
    { type: 'heading', label: 'Heading', icon: '📝', description: 'Large title text' },
    { type: 'text', label: 'Text Block', icon: '📄', description: 'Paragraph text' },
    { type: 'image', label: 'Image', icon: '🖼️', description: 'Upload or link image' },
    { type: 'button', label: 'CTA Button', icon: '🔘', description: 'Call-to-action button' },
    { type: 'divider', label: 'Divider', icon: '➖', description: 'Horizontal line' },
    { type: 'spacer', label: 'Spacer', icon: '⬜', description: 'Empty space' },
    { type: 'logo', label: 'Perfect Match Logo', icon: '💝', description: 'Brand logo' }
  ];

  // Default template structure
  const defaultBlocks: Block[] = [
    {
      id: 'header',
      type: 'logo',
      content: { text: 'Perfect Match', subtitle: 'Find Your Perfect Match' },
      styles: { textAlign: 'center', marginBottom: '30px' }
    },
    {
      id: 'greeting',
      type: 'heading',
      content: { text: 'Hello {{firstName}}!' },
      styles: { fontSize: '28px', color: '#161616', marginBottom: '20px' }
    },
    {
      id: 'content',
      type: 'text',
      content: { text: 'Welcome to Perfect Match! We\'re excited to help you find meaningful connections.' },
      styles: { fontSize: '16px', lineHeight: '1.6', color: '#161616', marginBottom: '20px' }
    },
    {
      id: 'cta',
      type: 'button',
      content: { text: 'Get Started', link: '{{ctaLink}}' },
      styles: { backgroundColor: '#FF328F', color: '#ffffff', padding: '12px 30px', borderRadius: '6px' }
    }
  ];

  useEffect(() => {
    if (!template && blocks.length === 0) {
      setBlocks(defaultBlocks);
      generateHtmlFromBlocks(defaultBlocks);
    } else if (template && template.html_content) {
      // Try to parse existing HTML into blocks (simplified)
      setBlocks(defaultBlocks); // For now, use default blocks
    }
  }, [template]);

  const generateHtmlFromBlocks = (currentBlocks: Block[]) => {
    const htmlParts = [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '    <meta charset="UTF-8">',
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '    <title>{{subject}}</title>',
      '    <style>',
      '        body { margin: 0; padding: 0; font-family: \'Work Sans\', sans-serif; background-color: #f3f3f3; }',
      '        .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; }',
      '        .block { margin-bottom: 20px; }',
      '        .cta-button { display: inline-block; text-decoration: none; font-weight: 600; }',
      '        .divider { height: 1px; background-color: #e5e5e5; margin: 20px 0; }',
      '        .spacer { height: 20px; }',
      '        .logo { font-family: \'Dela Gothic One\', cursive; font-size: 24px; color: #FF328F; }',
      '        @media only screen and (max-width: 600px) {',
      '            .email-container { padding: 20px !important; }',
      '            .cta-button { display: block !important; text-align: center !important; }',
      '        }',
      '    </style>',
      '</head>',
      '<body>',
      '    <div class="email-container">'
    ];

    currentBlocks.forEach(block => {
      htmlParts.push('        <div class="block">');
      
      switch (block.type) {
        case 'logo':
          htmlParts.push(`            <div class="logo" style="text-align: ${block.styles.textAlign};">`);
          htmlParts.push(`                <div>${block.content.text}</div>`);
          if (block.content.subtitle) {
            htmlParts.push(`                <p style="font-size: 14px; color: #666; margin: 5px 0 0 0;">${block.content.subtitle}</p>`);
          }
          htmlParts.push('            </div>');
          break;
          
        case 'heading':
          const headingStyles = Object.entries(block.styles).map(([key, value]) => 
            `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`
          ).join('; ');
          htmlParts.push(`            <h1 style="${headingStyles}">${block.content.text}</h1>`);
          break;
          
        case 'text':
          const textStyles = Object.entries(block.styles).map(([key, value]) => 
            `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`
          ).join('; ');
          htmlParts.push(`            <p style="${textStyles}">${block.content.text}</p>`);
          break;
          
        case 'button':
          const buttonStyles = Object.entries(block.styles).map(([key, value]) => 
            `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`
          ).join('; ');
          htmlParts.push(`            <div style="text-align: center;">`);
          htmlParts.push(`                <a href="${block.content.link}" class="cta-button" style="${buttonStyles}">${block.content.text}</a>`);
          htmlParts.push('            </div>');
          break;
          
        case 'image':
          htmlParts.push(`            <div style="text-align: center;">`);
          htmlParts.push(`                <img src="${block.content.src}" alt="${block.content.alt}" style="max-width: 100%; height: auto;" />`);
          htmlParts.push('            </div>');
          break;
          
        case 'divider':
          htmlParts.push('            <div class="divider"></div>');
          break;
          
        case 'spacer':
          htmlParts.push(`            <div class="spacer" style="height: ${block.content.height || '20px'};"></div>`);
          break;
      }
      
      htmlParts.push('        </div>');
    });

    htmlParts.push(
      '        <div class="block" style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #666666; text-align: center;">',
      '            <p>Perfect Match | <a href="{{unsubscribeLink}}">Unsubscribe</a></p>',
      '            <p>© 2026 Perfect Match. All rights reserved.</p>',
      '        </div>',
      '    </div>',
      '</body>',
      '</html>'
    );

    const generatedHtml = htmlParts.join('\n');
    setTemplateData(prev => ({ ...prev, html_content: generatedHtml }));
  };

  const addBlock = (blockType: string) => {
    const newBlock: Block = {
      id: `block_${Date.now()}`,
      type: blockType as any,
      content: getDefaultContent(blockType),
      styles: getDefaultStyles(blockType)
    };

    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    generateHtmlFromBlocks(updatedBlocks);
  };

  const getDefaultContent = (blockType: string) => {
    switch (blockType) {
      case 'heading': return { text: 'Your Heading Here' };
      case 'text': return { text: 'Your text content goes here. You can add personalization tokens like {{firstName}}.' };
      case 'button': return { text: 'Click Here', link: '{{ctaLink}}' };
      case 'image': return { src: 'https://via.placeholder.com/400x200', alt: 'Image description' };
      case 'logo': return { text: 'Perfect Match', subtitle: 'Find Your Perfect Match' };
      case 'spacer': return { height: '20px' };
      default: return {};
    }
  };

  const getDefaultStyles = (blockType: string) => {
    switch (blockType) {
      case 'heading': return { fontSize: '24px', color: '#161616', marginBottom: '15px', fontWeight: 'bold' };
      case 'text': return { fontSize: '16px', color: '#161616', lineHeight: '1.6', marginBottom: '15px' };
      case 'button': return { backgroundColor: '#FF328F', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', textAlign: 'center' };
      case 'image': return { maxWidth: '100%', height: 'auto', marginBottom: '15px' };
      case 'logo': return { textAlign: 'center', marginBottom: '20px' };
      case 'divider': return { height: '1px', backgroundColor: '#e5e5e5', margin: '20px 0' };
      case 'spacer': return { height: '20px' };
      default: return {};
    }
  };

  const updateBlock = (blockId: string, updates: Partial<Block>) => {
    const updatedBlocks = blocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    );
    setBlocks(updatedBlocks);
    generateHtmlFromBlocks(updatedBlocks);
  };

  const deleteBlock = (blockId: string) => {
    const updatedBlocks = blocks.filter(block => block.id !== blockId);
    setBlocks(updatedBlocks);
    generateHtmlFromBlocks(updatedBlocks);
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const updatedBlocks = [...blocks];
    const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
    updatedBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(updatedBlocks);
    generateHtmlFromBlocks(updatedBlocks);
  };

  const insertPersonalizationToken = (token: string) => {
    if (editorMode === 'code') {
      const editor = editorRef.current;
      if (editor) {
        const selection = editor.getSelection();
        const range = selection || {
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: 1,
          endColumn: 1
        };
        
        const tokenText = `{{${token}}}`;
        
        editor.executeEdits('insert-token', [
          {
            range: range,
            text: tokenText,
            forceMoveMarkers: true
          }
        ]);
        
        editor.focus();
      }
    } else {
      // In visual mode, show a dialog to select which block to add token to
      alert('Switch to Code view to insert personalization tokens, or edit individual blocks in Visual mode.');
    }
  };

  const handleSave = async () => {
    const validationErrors = validateTemplate();
    setErrors(validationErrors);
    
    if (validationErrors.length > 0) {
      return;
    }
    
    setSaving(true);
    try {
      await onSave(templateData);
    } catch (error) {
      setErrors(['Failed to save template. Please try again.']);
    } finally {
      setSaving(false);
    }
  };

  const validateTemplate = (): string[] => {
    const errors: string[] = [];
    
    if (!templateData.name.trim()) {
      errors.push('Template name is required');
    }
    
    if (!templateData.html_content.trim()) {
      errors.push('Template content is required');
    }
    
    return errors;
  };

  const generatePreviewHtml = () => {
    const combinedHtml = templateData.html_content.replace(
      '</head>',
      `<style>${templateData.css_content}</style></head>`
    );
    
    return combinedHtml
      .replace(/\{\{firstName\}\}/g, 'John')
      .replace(/\{\{lastName\}\}/g, 'Doe')
      .replace(/\{\{subject\}\}/g, templateData.name)
      .replace(/\{\{ctaLink\}\}/g, 'https://perfectmatch.ai')
      .replace(/\{\{unsubscribeLink\}\}/g, 'https://perfectmatch.ai/unsubscribe');
  };

  const updatePreview = () => {
    if (previewRef.current) {
      const previewHtml = generatePreviewHtml();
      const sanitizedHtml = DOMPurify.sanitize(previewHtml);
      
      const previewDoc = previewRef.current.contentDocument;
      if (previewDoc) {
        previewDoc.open();
        previewDoc.write(sanitizedHtml);
        previewDoc.close();
      }
    }
  };

  useEffect(() => {
    if (editorMode === 'preview') {
      updatePreview();
    }
  }, [editorMode, templateData.html_content, templateData.css_content]);

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
      default: return '100%';
    }
  };

  const renderVisualEditor = () => (
    <div className="flex h-full">
      {/* Block Library */}
      <div className="w-64 bg-gray-50 border-r p-4">
        <h3 className="font-medium text-gray-900 mb-4">Add Blocks</h3>
        <div className="space-y-2">
          {blockTypes.map((blockType) => (
            <button
              key={blockType.type}
              onClick={() => addBlock(blockType.type)}
              className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{blockType.icon}</span>
                <div>
                  <div className="font-medium text-sm">{blockType.label}</div>
                  <div className="text-xs text-gray-500">{blockType.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-3">Personalization</h3>
          <div className="space-y-1">
            {[
              { token: 'firstName', label: 'First Name' },
              { token: 'lastName', label: 'Last Name' },
              { token: 'matchCount', label: 'Match Count' },
              { token: 'ctaLink', label: 'CTA Link' }
            ].map((item) => (
              <button
                key={item.token}
                onClick={() => insertPersonalizationToken(item.token)}
                className="w-full text-left px-2 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50"
              >
                <div className="font-medium">{item.label}</div>
                <div className="text-gray-500">{`{${item.token}}`}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Builder */}
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg border min-h-96 p-6" style={{ maxWidth: '600px', margin: '0 auto' }}>
          {blocks.map((block, index) => (
            <div
              key={block.id}
              className="relative group mb-4 p-2 border border-transparent hover:border-gray-300 rounded"
            >
              {/* Block Controls */}
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 flex gap-1 bg-white shadow-sm rounded border">
                <button
                  onClick={() => setEditingBlock(block)}
                  className="p-1 text-xs text-blue-600 hover:bg-blue-50"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteBlock(block.id)}
                  className="p-1 text-xs text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>

              {/* Block Content */}
              {renderBlockContent(block)}
            </div>
          ))}
          
          {blocks.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📧</div>
              <p>Start building your email by adding blocks from the left panel</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBlockContent = (block: Block) => {
    const styles = Object.entries(block.styles).map(([key, value]) => 
      `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`
    ).join('; ');

    switch (block.type) {
      case 'logo':
        return (
          <div style={{ textAlign: block.styles.textAlign }}>
            <div className="font-bold text-xl" style={{ color: '#FF328F', fontFamily: theme.fonts.heading }}>
              {block.content.text}
            </div>
            {block.content.subtitle && (
              <p className="text-sm text-gray-600 mt-1">{block.content.subtitle}</p>
            )}
          </div>
        );
        
      case 'heading':
        return <h1 style={{ ...block.styles }}>{block.content.text}</h1>;
        
      case 'text':
        return <p style={{ ...block.styles }}>{block.content.text}</p>;
        
      case 'button':
        return (
          <div style={{ textAlign: 'center' }}>
            <a
              href={block.content.link}
              className="inline-block px-6 py-3 rounded font-medium text-white no-underline"
              style={{ ...block.styles }}
            >
              {block.content.text}
            </a>
          </div>
        );
        
      case 'image':
        return (
          <div style={{ textAlign: 'center' }}>
            <img
              src={block.content.src}
              alt={block.content.alt}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        );
        
      case 'divider':
        return <hr style={{ border: 'none', height: '1px', backgroundColor: '#e5e5e5', margin: '20px 0' }} />;
        
      case 'spacer':
        return <div style={{ height: block.content.height || '20px' }}></div>;
        
      default:
        return <div>Unknown block type</div>;
    }
  };

  const renderCodeEditor = () => (
    <div className="flex h-full">
      <div className="flex-1">
        <div className="flex h-full">
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="html"
              value={templateData.html_content}
              onChange={(value) => setTemplateData(prev => ({ ...prev, html_content: value || '' }))}
              onMount={(editor) => { editorRef.current = editor; }}
              theme="vs-light"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
              }}
            />
          </div>
          <div className="w-64 bg-gray-50 border-l p-4">
            <h3 className="font-medium text-gray-900 mb-3">Personalization Tokens</h3>
            <div className="space-y-2">
              {[
                { token: 'firstName', label: 'First Name' },
                { token: 'lastName', label: 'Last Name' },
                { token: 'email', label: 'Email Address' },
                { token: 'matchCount', label: 'Match Count' },
                { token: 'joinDate', label: 'Join Date' },
                { token: 'ctaLink', label: 'CTA Link' },
                { token: 'unsubscribeLink', label: 'Unsubscribe Link' }
              ].map((item) => (
                <button
                  key={item.token}
                  onClick={() => insertPersonalizationToken(item.token)}
                  className="w-full text-left px-3 py-2 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium">{item.label}</div>
                  <div className="text-gray-500 text-xs">{`{{${item.token}}}`}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="flex-1 bg-gray-100 p-4">
      <div className="mx-auto bg-white rounded-lg shadow-sm overflow-hidden" style={{ width: getPreviewWidth() }}>
        <iframe
          ref={previewRef}
          className="w-full h-full min-h-96"
          style={{ height: 'calc(100vh - 300px)' }}
          title="Email Preview"
        />
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: theme.fonts.heading }}>
            {template ? 'Edit Template' : 'Create New Template'}
          </h1>
          <p className="text-gray-600">Design with visual blocks or edit HTML directly</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            style={{ backgroundColor: theme.colors.primary }}
          >
            {saving ? 'Saving...' : 'Save Template'}
          </button>
        </div>
      </div>

      {/* Template Info */}
      <div className="bg-white border-b px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template Name *
            </label>
            <input
              type="text"
              value={templateData.name}
              onChange={(e) => setTemplateData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="e.g., Welcome Series 2026"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={templateData.description}
              onChange={(e) => setTemplateData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Brief description of this template"
            />
          </div>
        </div>
        
        {errors.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <ul className="text-sm text-red-600">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Editor Mode Tabs */}
      <div className="bg-white border-b">
        <div className="flex">
          {(['visual', 'code', 'preview'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setEditorMode(mode)}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                editorMode === mode
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {mode === 'visual' && '🎨 Visual Builder'}
              {mode === 'code' && '💻 HTML/CSS Code'}
              {mode === 'preview' && '👁️ Preview'}
            </button>
          ))}
          
          {editorMode === 'preview' && (
            <div className="ml-auto flex items-center gap-2 px-6">
              <span className="text-sm text-gray-600">Preview:</span>
              {(['desktop', 'tablet', 'mobile'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPreviewMode(mode)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    previewMode === mode
                      ? 'bg-pink-100 text-pink-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex">
        {editorMode === 'visual' && renderVisualEditor()}
        {editorMode === 'code' && renderCodeEditor()}
        {editorMode === 'preview' && renderPreview()}
      </div>

      {/* Block Editor Modal */}
      {editingBlock && (
        <BlockEditor
          block={editingBlock}
          onUpdate={(updatedBlock) => {
            updateBlock(updatedBlock.id, updatedBlock);
            setEditingBlock(null);
          }}
          onClose={() => setEditingBlock(null)}
        />
      )}
    </div>
  );
}
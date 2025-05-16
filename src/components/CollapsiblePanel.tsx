// src/components/CollapsiblePanel.tsx
import React, { useState, useRef, useEffect } from 'react';

interface CollapsiblePanelProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({ 
  title, 
  defaultOpen = true, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, [ isOpen]);

  return (
    <div className="bg-gray-50 rounded-md shadow-md overflow-hidden">
      {/* Header with toggle */}
      <button 
        className="w-full px-3 py-2 flex items-center justify-between bg-indigo-100 hover:bg-indigo-200 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-bold text-indigo-800">{title}</h3>
        <span className="text-indigo-800 transition-transform duration-200">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Collapsible content with dynamic height */}
      <div 
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : '0',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out'
        }}
        className="overflow-hidden"
      >
        <div className="p-3" ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsiblePanel;
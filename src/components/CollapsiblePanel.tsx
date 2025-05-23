// src/components/CollapsiblePanel.tsx
import React, { useState } from 'react';

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
      <div className={`${isOpen ? 'block' : 'hidden'}`}>
        <div className="p-3" >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsiblePanel;
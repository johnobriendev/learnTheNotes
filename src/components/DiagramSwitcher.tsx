// src/components/DiagramSwitcher.tsx
import React from 'react';

interface DiagramSwitcherProps {
  diagrams: Array<{
    label: string;
    content: React.ReactNode;
  }>;
  activeIndex: number;
}

const DiagramSwitcher: React.FC<DiagramSwitcherProps> = ({ diagrams, activeIndex }) => {
  if (diagrams.length === 0) {
    return null;
  }

  // Render only the active diagram (no switcher buttons)
  return <div className="w-full">{diagrams[activeIndex]?.content || diagrams[0].content}</div>;
};

export default DiagramSwitcher;

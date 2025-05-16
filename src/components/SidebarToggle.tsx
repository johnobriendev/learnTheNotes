

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  side?: 'left' | 'right';
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ 
  isOpen, 
  onToggle, 
  side = 'right' 
}) => {
  return (
    <button
      onClick={onToggle}
      className={`
        fixed z-20 bg-indigo-600 hover:bg-indigo-700 text-white
        rounded-full p-2 shadow-lg transition-all duration-300
        ${side === 'right' 
          ? `${isOpen ? 'right-1/3 md:right-[calc(33.333%_-_1.5rem)]' : 'right-4'} top-20` 
          : `${isOpen ? 'left-1/3 md:left-[calc(33.333%_-_1.5rem)]' : 'left-4'} top-20`
        }
      `}
      aria-label={isOpen ? 'Hide Controls' : 'Show Controls'}
    >
      {isOpen 
        ? (side === 'right' ? '→' : '←') 
        : (side === 'right' ? '←' : '→')}
    </button>
  );
};

export default SidebarToggle;

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TabProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabProps[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const Tab: React.FC<TabProps> = ({ 
  id, 
  label, 
  isActive, 
  onClick, 
  disabled 
}) => {
  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-b-none border-b-2 px-6 py-3 text-sm font-medium transition-colors",
        isActive 
          ? "border-b-primary bg-background text-primary" 
          : "border-b-transparent text-muted-foreground hover:text-foreground",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {label}
    </Button>
  );
};

const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  className 
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex border-b">
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={tab.id === activeTab}
            onClick={() => onTabChange(tab.id)}
            disabled={tab.disabled}
          />
        ))}
      </div>
      <div className="mt-4">
        {tabs.find(tab => tab.id === activeTab)?.children}
      </div>
    </div>
  );
};

export { Tabs, Tab };
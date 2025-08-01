import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

// Simple type for stats card props
type StatsCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
};

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon: Icon }) => {
  return (
    <Card className="bg-card/50 border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="gradient-primary p-3 rounded-full">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
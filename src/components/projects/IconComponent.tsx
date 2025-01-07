import React from 'react';
import { Brain, Server, BarChart3, Cog, Shield, Cloud, Users, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'brain': Brain,
  'server': Server,
  'bar-chart-3': BarChart3,
  'cog': Cog,
  'shield': Shield,
  'cloud': Cloud,
  'users': Users,
};

interface IconComponentProps {
  name: string;
  className?: string;
}

const IconComponent = ({ name, className }: IconComponentProps) => {
  const Icon = iconMap[name];
  
  if (!Icon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <Icon className={className} />;
};

export default IconComponent;
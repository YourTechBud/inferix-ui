import React from 'react';

interface SectionProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function SectionHeading({ title, icon: Icon }: SectionProps) {
  return (
    <div className="flex items-center space-x-2 border-b border-gray-200 pb-4">
      {Icon && <Icon className="size-5 text-gray-800" />}
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {title}
      </h3>
    </div>
  );
}

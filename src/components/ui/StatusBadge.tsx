import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  'Pending': 'bg-amber-50 text-amber-600',
  'In Progress': 'bg-blue-50 text-blue-600',
  'Completed': 'bg-green-50 text-green-600',
  'Online': 'bg-green-50 text-green-600',
  'Offline': 'bg-red-50 text-red-600',
  'Maintenance': 'bg-amber-100 text-amber-700',
  'Scheduled': 'bg-purple-50 text-purple-600',
  'Critical': 'bg-red-100 text-red-700',
  'Warning': 'bg-orange-100 text-orange-700',
  'Excellent': 'bg-green-50 text-green-600',
  'Good': 'bg-blue-50 text-blue-600',
  'Fair': 'bg-orange-50 text-orange-600',
  'Poor': 'bg-red-50 text-red-600',
  'Active': 'bg-green-100 text-green-700',
  'Inactive': 'bg-slate-100 text-slate-500',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide ${
      statusStyles[status] || 'bg-gray-50 text-gray-600'
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;

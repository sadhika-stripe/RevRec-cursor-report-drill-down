import React, { Suspense } from 'react';
import DrillDownContent from './DrillDownContent';

export default function DrillDownPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <DrillDownContent />
    </Suspense>
  );
} 
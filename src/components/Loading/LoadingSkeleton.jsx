// src/components/Loading/LoadingSkeleton.jsx

import React from 'react';

export const LoadingSkeleton = () => (
  <div className="max-w-2xl mx-auto p-8 bg-white/50 rounded-2xl shadow-lg animate-pulse">
    {/* Skeleton for Header */}
    <div className="flex justify-between mb-8 pb-8 border-b border-gray-300">
      <div className="space-y-2">
        <div className="h-8 bg-gray-300 rounded w-48"></div>
        <div className="h-6 bg-gray-300 rounded w-32"></div>
      </div>
      <div className="h-20 w-20 bg-gray-300 rounded-full"></div>
    </div>
    {/* Skeleton for Temperature Section */}
    <div className="text-center mb-8">
      <div className="h-20 bg-gray-300 rounded w-40 mx-auto mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-32 mx-auto"></div>
    </div>
    {/* Skeleton for Details Grid */}
    <div className="grid grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-20 bg-gray-300 rounded-lg"></div>
      ))}
    </div>
  </div>
);
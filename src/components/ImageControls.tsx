import React from 'react';
import type { ImagePosition } from '../types/image';

interface ImageControlsProps {
  position: ImagePosition;
  onChange: (position: ImagePosition) => void;
}

export function ImageControls({ position, onChange }: ImageControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-2">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Size</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-500">Width (px)</label>
            <input
              type="number"
              value={position.width}
              onChange={(e) => onChange({ ...position, width: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              min="50"
              max="800"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Height (px)</label>
            <input
              type="number"
              value={position.height}
              onChange={(e) => onChange({ ...position, height: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              min="50"
              max="800"
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Position</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-500">X (px)</label>
            <input
              type="number"
              value={position.x}
              onChange={(e) => onChange({ ...position, x: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Y (px)</label>
            <input
              type="number"
              value={position.y}
              onChange={(e) => onChange({ ...position, y: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
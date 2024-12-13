import React, { useState, useRef } from 'react';
import { Move } from 'lucide-react';
import { ImageControls } from './ImageControls';
import type { ImagePosition } from '../types/image';

interface DraggableImageProps {
  src: string;
  alt: string;
  initialPosition?: ImagePosition;
  onPositionChange?: (position: ImagePosition) => void;
}

export function DraggableImage({
  src,
  alt,
  initialPosition = { x: 0, y: 0, width: 200, height: 200 },
  onPositionChange
}: DraggableImageProps) {
  const [position, setPosition] = useState<ImagePosition>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newPosition = {
        ...position,
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      };
      setPosition(newPosition);
      onPositionChange?.(newPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePositionChange = (newPosition: ImagePosition) => {
    setPosition(newPosition);
    onPositionChange?.(newPosition);
  };

  return (
    <div className="space-y-4">
      <div
        style={{
          position: 'relative',
          width: position.width,
          height: position.height,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="border border-gray-200 rounded-lg overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 p-1 bg-indigo-500 rounded-br cursor-move z-10"
          onMouseDown={handleMouseDown}
        >
          <Move className="h-4 w-4 text-white" />
        </div>
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
        />
      </div>
      
      <ImageControls
        position={position}
        onChange={handlePositionChange}
      />
    </div>
  );
}
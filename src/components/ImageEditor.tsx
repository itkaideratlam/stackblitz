import React, { useState } from 'react';
import { ImageData, ImagePosition } from '../types/image';
import { Move, ArrowsMaximize } from 'lucide-react';

interface ImageEditorProps {
  imageUrl: string;
  onPositionChange: (imageData: ImageData) => void;
  initialPosition?: ImagePosition;
}

export function ImageEditor({ imageUrl, onPositionChange, initialPosition }: ImageEditorProps) {
  const [position, setPosition] = useState<ImagePosition>(initialPosition || {
    x: 0,
    y: 0,
    width: 200,
    height: 200
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, mode: 'drag' | 'resize') => {
    e.preventDefault();
    if (mode === 'drag') {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    } else {
      setIsResizing(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newPosition = {
        ...position,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      };
      setPosition(newPosition);
      onPositionChange({ url: imageUrl, position: newPosition });
    } else if (isResizing) {
      const newPosition = {
        ...position,
        width: Math.max(50, position.width + (e.clientX - dragStart.x)),
        height: Math.max(50, position.height + (e.clientY - dragStart.y))
      };
      setPosition(newPosition);
      setDragStart({ x: e.clientX, y: e.clientY });
      onPositionChange({ url: imageUrl, position: newPosition });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img
        src={imageUrl}
        alt="Editable"
        style={{
          width: position.width,
          height: position.height,
          transform: `translate(${position.x}px, ${position.y}px)`,
          position: 'relative',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        className="rounded-md"
      />
      <div
        className="absolute top-0 left-0 p-1 bg-indigo-500 rounded-tl cursor-move"
        onMouseDown={(e) => handleMouseDown(e, 'drag')}
      >
        <Move className="h-4 w-4 text-white" />
      </div>
      <div
        className="absolute bottom-0 right-0 p-1 bg-indigo-500 rounded-br cursor-se-resize"
        onMouseDown={(e) => handleMouseDown(e, 'resize')}
      >
        <ArrowsMaximize className="h-4 w-4 text-white" />
      </div>
    </div>
  );
}
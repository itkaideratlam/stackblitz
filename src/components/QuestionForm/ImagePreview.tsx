import React from 'react';
import { DraggableImage } from '../DraggableImage';
import type { ImagePosition } from '../../types/image';

interface ImagePreviewProps {
  imageUrl: string;
  position: ImagePosition;
  onPositionChange: (position: ImagePosition) => void;
}

export function ImagePreview({ imageUrl, position, onPositionChange }: ImagePreviewProps) {
  return (
    <div className="mt-4">
      <DraggableImage
        src={imageUrl}
        alt="Preview"
        initialPosition={position}
        onPositionChange={onPositionChange}
      />
    </div>
  );
}
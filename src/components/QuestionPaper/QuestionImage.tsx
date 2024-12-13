import React from 'react';
import type { ImageData } from '../../types/image';

interface QuestionImageProps {
  image: ImageData;
}

export function QuestionImage({ image }: QuestionImageProps) {
  return (
    <div 
      className="mt-2"
      style={{
        width: image.position.width,
        height: image.position.height,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <img
        src={image.url}
        alt="Question"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: `translate(${image.position.x}px, ${image.position.y}px)`
        }}
        className="rounded-md"
      />
    </div>
  );
}
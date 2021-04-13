import React, { useEffect, useState } from 'react';
import './Mosaic.css';

export interface MosaicProps {
  colorCount: number;
  pieceAmount: number;
  onClick: (index: number) => void;
}

export function Mosaic({ colorCount, pieceAmount: pieceCount, onClick }: MosaicProps) {
  const [indexes, setIndexes] = useState<number[]>([]);

  useEffect(() => {
    console.debug('building mosaic grid');

    const indexes = new Array(pieceCount);
    for (let i = 0; i < pieceCount; i++) {
      indexes[i] = Math.floor(Math.random() * colorCount);
    }
    setIndexes(indexes);
  }, [colorCount]);

  return (
    <div className="Mosaic">
      {indexes.map((index, cellIndex) => (
        <div
          className="Piece"
          key={`${index}.${cellIndex}`}
          style={{ backgroundColor: `var(--color-${index})` }}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
}

import React, { useEffect, useState } from 'react'
import "./Mosaic.css";


export interface MosaicProps {
  size: number;
  colors: string[];
  onClick: (index: number) => void;
}

export function Mosaic({ size, colors, onClick }: MosaicProps) {
  const [ indexes, setIndexes ] = useState<number[]>([])

  useEffect(() => {
    console.debug('building mosaic grid')

    const indexes = new Array(size);
    for (let i = 0; i < size; i++) {
      indexes[i] = Math.floor(Math.random() * colors.length)
    }
    setIndexes(indexes)
  }, [colors.length])

  return (
    <div className="Mosaic">
      {indexes.map((index, cellIndex) => {
        const color = colors[index]

        return <div 
          className="Piece"
          key={`${index}.${cellIndex}${color}`}
          style={{ backgroundColor: color }}
          onClick={() => onClick(index)}
        />
      })}
    </div>
  )
}
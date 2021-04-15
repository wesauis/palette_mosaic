import React, { useEffect, useRef, useState } from 'react';
import { Mosaic } from './components/mosaic/Mosaic';
import './App.css';
import timed from './timed';
import { queryColors, serializeColors } from './query-colors';

interface SelectedColor {
  color: string;
  index: number;
}

function App() {
  const [colors, setColors] = useState(queryColors());

  const [index, setIndex] = useState(0);

  const colorPickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const url = new URL(location.href);

    url.searchParams.set('colors', serializeColors(colors));

    window.history.replaceState(
      { path: url.toString() },
      document.title,
      url.toString(),
    );
  }, [colors]);

  return (
    <>
      <style>
        .Mosaic{'{'}
        {colors.map((color, index) => `--color-${index}: ${color};`)}
        {'}'}
      </style>
      <input
        className={'Picker'}
        type="color"
        ref={colorPickerRef}
        onChange={timed(100, (evt) => {
          const color = evt.target.value;

          const colors_ = [...colors];
          colors_[index] = color;
          setColors(colors_);
        })}
      />
      <Mosaic
        colorCount={colors.length}
        pieceAmount={2048}
        onClick={(index) => {
          setIndex(index);
          colorPickerRef.current!.value = colors[index];
          colorPickerRef.current?.click();
        }}
      />
    </>
  );
}

export default App;

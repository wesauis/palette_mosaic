import React, { useEffect, useRef, useState } from 'react';
import { Mosaic } from './components/mosaic/Mosaic';
import './App.css';

interface SelectedColor {
  color: string;
  index: number;
}

function getParam<T>(
  param: string,
  check: (parsed: T) => boolean,
  default_: T,
): T {
  const value = new URLSearchParams(location.search).get(param);

  console.debug(param, '->', value);

  if (value !== null) {
    try {
      const parsed = JSON.parse(value) as T;

      if (check(parsed)) {
        return parsed;
      }
    } catch (err) {
      console.error(err);
    }
  }

  return default_;
}

function App() {
  const [colors, setColors] = useState(
    getParam<string[]>('colors', (arr) => arr.length > 0, [
      '#6a737d',
      '#babfc4',
      '#e3e5e8',
      '#c792ea',
      '#ffd46c',
      '#d9b1d9',
      '#6a737d',
      '#babfc4',
      '#e3e5e8',
    ]),
  );

  const [index, setIndex] = useState(0);

  const colorPickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const url = new URL(location.href);

    url.searchParams.set('colors', JSON.stringify(colors));

    window.history.replaceState(
      { path: url.toString() },
      document.title,
      url.toString(),
    );
  }, [colors]);

  return (
    <>
      <input
        className={'Picker'}
        type="color"
        ref={colorPickerRef}
        onChange={(evt) => {
          const color = evt.target.value;

          const colors_ = [...colors]
          colors_[index] = color;
          setColors(colors_)
        }}
      />
      <Mosaic
        size={128}
        colors={colors}
        onClick={(index) => {
          setIndex(index)
          colorPickerRef.current!.value = colors[index]
          colorPickerRef.current?.click()
        }}
      />
    </>
  );
}

export default App;

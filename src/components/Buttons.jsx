import React from 'react';
import "./Buttons.css";
export default function Buttons({
  generateArray,
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  resetArray,
  size,
  setSize,
  speed,
  setSpeed,
}) {
  return (
    <div className="controls">
      <button onClick={generateArray}>Generate New Array</button>
      <button onClick={bubbleSort}>Bubble Sort</button>
      <button onClick={selectionSort}>Selection Sort</button>
      <button onClick={insertionSort}>Insertion Sort</button>
      <button onClick={mergeSort}>Merge Sort</button>
      <button onClick={quickSort}>Quick Sort</button>
      <button onClick={resetArray}>Reset</button>
      <br />
      <div className='rangeControl'>
      <label>Size: </label>
      <input type="range" min="10" max="100" value={size} onChange={(e) => setSize(Number(e.target.value))} />
      <label>Speed: </label>
      <input type="range" min="1" max="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
      </div>
    </div>
  );
}

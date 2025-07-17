import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Head';
import Buttons from './components/Buttons';
import BarContainer from './components/Container';
import {
  generateArray,
  animate,
  animateMerge,
  bubbleSortLogic,
  selectionSortLogic,
  insertionSortLogic,
  mergeSortLogic,
  quickSortLogic,
} from './utils/functions';

import './SortingVisualizer.css';

const PRIMARY_COLOR = '#3498db';

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const isSorting = useRef(false);
  const speedRef = useRef(speed);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    resetArray();
  }, [size]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const resetArray = () => {
    isSorting.current = false;
    setShowPopup(false);
    setArray(generateArray(size));
  };

  const runSort = async (logic, merge = false, message = 'Sorting Completed!') => {
    if (isSorting.current) return;
    isSorting.current = true;
    setShowPopup(false);
    const animations = logic([...array]);
    if (merge) {
      await animateMerge(animations, speedRef, isSorting);
    } else {
      await animate(animations, speedRef, isSorting);
    }
    isSorting.current = false;
    setPopupMessage(message);
    setShowPopup(true);
  };

  return (
    <div className="container">
      <Header />
      <Buttons
        generateArray={resetArray}
        bubbleSort={() =>
          runSort(bubbleSortLogic,false,
            <div className='popup-text'>
              <h1>✅ Bubble Sort Completed!</h1> <br />
              <h3>Time Complexities:</h3>
              <ul>
                <li><b>Best Case:</b> O(n)</li>
                <li><b>Average Case:</b> O(n²)</li>
                <li><b>Worst Case:</b> O(n²)</li>
              </ul>
              <h3>Space Complexity: O(1)</h3>
            </div>
          )}
        selectionSort={() => 
          runSort(selectionSortLogic,false,
            <div className='popup-text'>
              <h1>✅ Selection Sort Completed!</h1> <br />
              <h3>Time Complexities:</h3>
              <ul>
                <li><b>Best Case:</b> O(n²)</li>
                <li><b>Average Case:</b> O(n²)</li>
                <li><b>Worst Case:</b> O(n²)</li>
              </ul>
              <h3>Space Complexity: O(1)</h3>
            </div>
          )}
        insertionSort={() => 
          runSort(insertionSortLogic, false,
            <div className='popup-text'>
              <h1>✅ Insertion Sort Completed!</h1> <br />
              <h3>Time Complexities:</h3>
              <ul>
                <li><b>Best Case:</b> O(n)</li>
                <li><b>Average Case:</b> O(n²)</li>
                <li><b>Worst Case:</b> O(n²)</li>
              </ul>
              <h3>Space Complexity: O(1)</h3>
            </div>
          )}
        mergeSort={() => 
          runSort(mergeSortLogic, true,
             <div className='popup-text'>
              <h1>✅ Merge Sort Completed!</h1> <br />
              <h3>Time Complexities:</h3>
              <ul>
                <li><b>Best Case:</b> O(nlogn)</li>
                <li><b>Average Case:</b> O(nlogn)</li>
                <li><b>Worst Case:</b> O(nlogn)</li>
              </ul>
              <h3>Space Complexity: O(n)</h3>
            </div>
          )}
        quickSort={() => 
          runSort(quickSortLogic, false, 
            <div className='popup-text'>
              <h1>✅ Quick Sort Completed!</h1> <br />
              <h3>Time Complexities:</h3>
              <ul>
                <li><b>Best Case:</b> O(nlogn)</li>
                <li><b>Average Case:</b> O(nlogn)</li>
                <li><b>Worst Case:</b> O(n²)</li>
              </ul>
              <h3>Space Complexity: O(n)</h3>
            </div>
          )}
        resetArray={resetArray}
        size={size}
        setSize={setSize}
        speed={speed}
        setSpeed={setSpeed}
      />
      <BarContainer array={array} size={size} PRIMARY_COLOR={PRIMARY_COLOR} />
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{popupMessage}</h2>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

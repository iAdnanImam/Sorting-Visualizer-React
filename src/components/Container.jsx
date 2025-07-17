import React from 'react';
import './Container.css';

export default function BarContainer({ array, size, PRIMARY_COLOR }) {
  return (
    <div className="bar-container">
      {array.map((val, idx) => (
        <div
          className="bar"
          key={idx}
          style={{
            height: `${val}px`,
            width: `${1000 / size}px`,
            backgroundColor: PRIMARY_COLOR,
          }}
        >
          {size < 80 && <span className="bar-label">{val}</span>}
        </div>
      ))}
    </div>
  );
}

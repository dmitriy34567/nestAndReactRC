
import React, { useState } from 'react';

function ShowMore({ items, initialCount, step }) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  function showMore() {
    setVisibleCount(prevCount => prevCount + step);
  }

  return (
    <div >
      {items.slice(0, visibleCount).map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      {visibleCount < items.length && (
        <button onClick={showMore}>Показать больше</button>
      )}
    </div>
  );
}

export default ShowMore;


//<ShowMore items={items} initialCount={3} step={3} />
/*const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
  { id: 7, name: 'Item 7' },
  { id: 8, name: 'Item 8' },
];*/
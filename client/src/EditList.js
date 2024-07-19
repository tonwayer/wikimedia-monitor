import React from 'react';

function EditList({ events, markAsSeen }) {
  return (
    <ul className="edit-list">
      {events.map((event, index) => (
        <li key={index}>
          <div>
            <strong>{event.title}</strong>
            <p>{event.comment}</p>
            <p>{event.user}</p>
            <button onClick={() => markAsSeen(index)}>Mark as Seen</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default EditList;

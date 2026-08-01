import React, { useState } from 'react';
import { FaFilm, FaPlus, FaTrash } from 'react-icons/fa';

export default function FilmsTab({ selectedMovie, movieTitles, onPickMovie, watchList, setWatchList }) {
  const [newWatchTitle, setNewWatchTitle] = useState('');
  const [priority, setPriority] = useState('À voir');

  const addToWatchList = () => {
    const trimmed = newWatchTitle.trim();
    if (!trimmed) return;
    setWatchList((current) => [...current, { title: trimmed, priority, toWatch: true }]);
    setNewWatchTitle('');
  };

  const removeWatchItem = (indexToRemove) => {
    setWatchList((current) => current.filter((_, index) => index !== indexToRemove));
  };

  const toggleToWatch = (indexToToggle) => {
    setWatchList((current) =>
      current.map((item, index) =>
        index === indexToToggle ? { ...item, toWatch: !item.toWatch } : item
      )
    );
  };

  return (
    <div className="panel-grid">
      <button className="card movie-card" onClick={onPickMovie}>
        <div className="movie-title">{selectedMovie}</div>
        <span className="movie-button">Je tente ma chance</span>
      </button>

      <section className="card tiny-list-card">
        <p className="eyebrow"><FaFilm /> Aperçu</p>
        <ul className="mini-list">
          {movieTitles.map((movie) => (
            <li key={movie}>{movie}</li>
          ))}
        </ul>
      </section>

      <section className="card watch-card">
        <p className="eyebrow">📝 Watch list</p>
        <div className="watch-list-input">
          <input
            type="text"
            value={newWatchTitle}
            onChange={(event) => setNewWatchTitle(event.target.value)}
            placeholder="Ajoute une série ou un film"
          />
          <select value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option value="À voir">À voir</option>
            <option value="Priorité 2">Priorité 2</option>
            <option value="Priorité 1">Priorité 1</option>
          </select>
          <button onClick={addToWatchList}><FaPlus /></button>
        </div>

        <ul className="watch-list">
          {watchList.length === 0 ? (
            <li className="empty-watch">Ta watch list est encore vide. Ajoute une petite idée 💗</li>
          ) : (
            watchList.map((item, index) => (
              <li key={`${item.title}-${index}`} className="watch-item">
                <div>
                  <strong>{item.title}</strong>
                  <div className="watch-meta">
                    <span>{item.priority}</span>
                    <button className="secondary-button" onClick={() => toggleToWatch(index)}>
                      {item.toWatch ? 'À voir' : 'Vu'}
                    </button>
                  </div>
                </div>
                <button onClick={() => removeWatchItem(index)}><FaTrash /></button>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}

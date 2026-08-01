import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function ThoughtsTab({ thoughts, thoughtIndex, usedIndexes, thoughtHistory, onPickThought, profile }) {
  return (
    <div className="panel-grid">
      <section className="card thought-card">
        <p className="eyebrow"><FaHeart /> Une pensée douce</p>
        <div className="thought-bubble" onClick={onPickThought} role="button" tabIndex={0}>
          <h2>{thoughtIndex !== null ? thoughts[thoughtIndex] : `Clique pour découvrir une petite raison pour ${profile.firstName || 'toi'}`}</h2>
        </div>
        <button className="cta-button" onClick={onPickThought}>Une nouvelle pensée</button>
        <p className="hint">Découvertes : {usedIndexes.length} / {thoughts.length}</p>
        <div className="history-chip">
          <span>Historique : {thoughtHistory.length} pensées gardées</span>
        </div>
      </section>
    </div>
  );
}

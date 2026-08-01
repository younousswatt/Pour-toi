import React, { useState } from 'react';
import { FaCalendarAlt, FaHeart, FaPaperPlane } from 'react-icons/fa';

export default function AgendaTab({ daysCount, meetingDateInput, onMeetingDateChange, profile, showSetup, onSaveProfile, dailyMessage }) {
  const [firstName, setFirstName] = useState(profile.firstName ?? '');

  if (showSetup) {
    return (
      <div className="panel-grid">
        <section className="card soft-card">
          <p className="eyebrow"><FaCalendarAlt /> Bienvenue dans ton petit carnet</p>
          <h2>Remplis une petite première page</h2>
          <label className="date-picker-label">
            <span>Ton prénom</span>
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Ex. Camille"
            />
          </label>
          <label className="date-picker-label">
            <span>Date de notre rencontre</span>
            <input
              type="date"
              value={meetingDateInput}
              onChange={(event) => onMeetingDateChange(event.target.value)}
            />
          </label>
          <button className="cta-button" onClick={() => onSaveProfile(firstName, meetingDateInput)}>C’est parti</button>
        </section>
      </div>
    );
  }

  return (
    <div className="panel-grid">
      <section className="card soft-card">
        <p className="eyebrow"><FaCalendarAlt /> Date de nos débuts</p>
        <h2>{daysCount} jours depuis notre rencontre</h2>
        <p className="hint">Avec {profile.firstName}, on garde une petite trace douce de nos débuts.</p>
        <label className="date-picker-label">
          <span>Modifie la date</span>
          <input
            type="date"
            value={meetingDateInput}
            onChange={(event) => onMeetingDateChange(event.target.value)}
          />
        </label>
      </section>

      <section className="card ritual-card">
        <p className="eyebrow"><FaPaperPlane /> Rituel du jour</p>
        <h3>Envoie-lui une réf’ de série</h3>
        <p>Un petit message, un lien, une scène à partager. C’est tout ce qu’il faut pour garder le lien léger et mignon.</p>
        <div className="ritual-tag">
          <FaHeart /> <span>Petite attention du jour</span>
        </div>
        <div className="daily-message">
          <strong>Message du jour</strong>
          <p>{dailyMessage}</p>
        </div>
      </section>
    </div>
  );
}

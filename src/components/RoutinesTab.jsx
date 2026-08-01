import React from 'react';
import { FaBed, FaCheckCircle, FaComment, FaGlassCheers, FaLeaf, FaPen, FaRegCircle, FaTv } from 'react-icons/fa';

const routineIcons = [
  FaGlassCheers,
  FaPen,
  FaBed,
  FaLeaf,
  FaTv,
  FaComment,
];

export default function RoutinesTab({ routines, onToggle, newRoutine, onNewRoutineChange, onAddRoutine }) {
  return (
    <div className="panel-grid">
      <section className="card checklist-card">
        <p className="eyebrow">🗒️ Routines douces</p>
        <div className="checklist-meta">
          <strong>{routines.filter((routine) => routine.done).length} / {routines.length} accomplies</strong>
        </div>
        <ul className="routine-list">
          {routines.map((routine, index) => {
            const Icon = routineIcons[index % routineIcons.length];
            return (
              <li key={`${routine.text}-${index}`} className={`routine-row ${routine.done ? 'done' : ''}`} onClick={() => onToggle(index)}>
                {routine.done ? <FaCheckCircle className="icon-check" /> : <FaRegCircle className="icon-uncheck" />}
                <span className="routine-icon"><Icon /></span>
                <span>{routine.text}</span>
              </li>
            );
          })}
        </ul>

        <div className="routine-adder">
          <input
            type="text"
            value={newRoutine}
            onChange={(event) => onNewRoutineChange(event.target.value)}
            placeholder="Ajouter une petite routine"
          />
          <button onClick={onAddRoutine}>Ajouter</button>
        </div>
      </section>
    </div>
  );
}

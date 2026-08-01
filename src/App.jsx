import React, { useEffect, useMemo, useState } from 'react';
import {
  FaCalendarAlt,
  FaClipboardList,
  FaFilm,
  FaGift,
  FaHeart,
} from 'react-icons/fa';
import AgendaTab from './components/AgendaTab';
import FilmsTab from './components/FilmsTab';
import RoutinesTab from './components/RoutinesTab';
import ThoughtsTab from './components/ThoughtsTab';

const STORAGE_KEY = 'petit-carnet-doux';

const movieTitles = [
  'Inception',
  'La La Land',
  'Squid Game',
  'Les Bronzés',
  'Harry Potter',
  'The Office',
  'Dune',
  'Emily in Paris',
];

const baseThoughts = [
  'Tu me fais sourire sans même essayer.',
  'Tu rends mes journées plus légères.',
  'Ta présence me met dans un état très doux.',
  'Je t’aime la façon dont tu me regardes.',
  'Tu as cette énergie si agréable à vivre.',
  'Je trouve mignon le simple fait de penser à toi.',
  'Tu inspires un vrai calme dans ma tête.',
  'J’apprécie ton côté drôle et attentionné.',
  'Tu me fais vouloir être plus présent.',
  'Ton sourire a un effet immédiat sur moi.',
  'Tu arrives à rendre même une journée ordinaire spéciale.',
  'Je pourrais te raconter n’importe quoi, et ça ferait du sens.',
  'Tu me rappelles qu’il y a aussi des choses très simples que j’aime.',
  'Ta façon d’être me touche souvent plus que tu ne le crois.',
  'Tu portes une douceur qui me plaît énormément.',
  'J’aime la manière dont tu m’écoutes vraiment.',
  'Tu me fais vouloir rester dans cette petite bulle douce.',
  'Même un message simple avec toi devient un vrai petit rayon de soleil.',
  'Je trouve adorable la façon dont tu me fais confiance.',
  'Tu rends mes pensées plus belles, plus légères, plus claires.',
  'Je garde un goût très doux au souvenir de nos petits moments.',
  'Tu as cette manière d’être qui semble faite pour apaiser le monde.',
  'Je me sens plus heureux juste en te pensant.',
  'Tu me donnes envie de ralentir pour mieux profiter de toi.',
  'Ta présence a ce petit effet rassurant et magnifique.',
  'Je me souviens encore de la façon dont tu me fais rire.',
  'Tu me fais croire qu’une journée simple peut devenir très spéciale.',
  'Tu es douce dans une manière très rare et très agréable.',
  'Le simple fait de te voir me met immédiatement de bonne humeur.',
  'Je t’aime cette énergie qui me rend plus serein.',
  'Tu as un côté si facile à aimer, c’est presque déroutant.',
  'Tu me fais sentir que l’on peut créer une vraie petite histoire heureuse.',
  'J’apprécie tellement les petites choses qui viennent de toi.',
  'Tu me fais vivre des moments qui ont un vrai goût de douceur.',
  'Ton calme me touche énormément.',
  'Tu me fais sourire comme si j’avais gardé une petite lumière en moi.',
  'Je suis content juste de te connaître un peu plus chaque jour.',
  'Tu me fais envie de te dire à quel point tu m’as plu.',
  'Je te trouve vraiment très belle, à la fois simple et spéciale.',
  'Tu portes quelque chose de si agréable dans l’air, c’est rare.',
  'Tu as un petit effet magique sur mon humeur.',
  'Je trouve ta présence incroyablement apaisante.',
  'J’aime la façon dont tu me regardes, comme si tout était plus léger.',
  'Tu me fais croire que le temps peut devenir un beau souvenir.',
  'Tu as cette façon de rendre les matinées plus douces.',
  'Je garde des choses de toi dans ma tête comme des petites étoiles.',
  'Tu me fais aimer des micro-moments qu’on partage.',
  'J’aime ce que tu apportes à mes journées sans même l’avoir prévu.',
  'Tu pousses certaines idées à devenir bien plus belles que je ne les pensais.',
  'Tu me fais penser à ce qu’est une vraie note positive dans la vie.',
  'Je ressens en toi quelque chose de vraiment honnête et lumineux.',
  'Tu me surprends par ta gentillesse qui ne demande rien en retour.',
  'Je suis bien avec toi, et ce sentiment est doux à garder.',
  'Il y a quelque chose de très léger dans la manière dont tu m’attires.',
  'Je trouve touchant ce que tu me laisses vivre avec toi.',
  'Tu rends les choses concrètes plus savoureuses, plus belles.',
  'Tu me fais vouloir en parler comme si c’était un secret précieux.',
  'Je trouve ton côté spontané super agréable à découvrir.',
  'Tu as cette petite manière qui me laisse un vrai sourire sur le visage.',
  'Tu me rappelles qu’il faut parfois garder de petits riens pour soi.',
  'Ton attention me touche souvent plus que tu ne le crois.',
  'Tu apportes une douceur qui me fait du bien sans même le vouloir.',
  'Tu me fais vivre la petite sensation qu’on aime garder longtemps.',
  'Je souhaite juste te voir sourire encore un peu plus.',
  'J’aime la tension douce de nos petites conversations.',
  'Tu as ce charme simple mais très vrai, c’est beau.',
  'Tu me fais envie de noter les petits moments, comme pour les garder.',
  'Je trouve mignon ce que tu me fais ressentir sans même parler trop.',
  'Tu me fais sentir qu’on peut construire quelque chose de joli, avec patience.',
  'Chaque petit geste de toi me laisse une impression très douce.',
  'Tu as cette capacité à me remettre de bonne humeur sans effort.',
  'Mémoire de toi : un parfum de calme, de lumière, de bien-être.',
  'Tu fais naître dans mes journées des instants que je veux garder.',
  'Tu me fais vouloir ralentir pour seulement être avec toi.',
  'Tu as un côté très particulier, qui m’apaise immédiatement.',
  'Je suis content d’avoir découvert ce que tu apportes à ma vie.',
  'Tu me fais aimer le hasard de nos échanges.',
  'Tu me fais sentir qu’il y a des jours qui se transforment avec toi.',
  'Je suis rassuré par ta façon d’être là, simplement.',
  'Tu as cette qualité de rendre une idée banale en un petit miracle.',
  'Je trouve étrange et merveilleux à quel point tu me touche.',
  'Tu es dans mes pensées comme une petite lumière plutôt agréable.',
  'Je pense à toi et ça me donne envie de sourire doucement.',
  'Tu as cette manière de m’apaiser juste en étant toi.',
  'Tu es vraiment quelqu’un que je veux garder dans mon orbitre doux.',
  'Tu me fais sentir qu’on peut être très heureux à petites doses.',
  'Tu me fais sourire avec quelque chose d’assez simple, et c’est précieux.',
  'Tu me fais vouloir écrire des petites notes sur toi.',
  'Tu as un impact très doux sur ma façon de vivre les journées.',
  'Je trouve super agréable de te découvrir petit à petit.',
  'Tu me rends plus présent et plus doux avec moi-même.',
  'Ton sourire me laisse cette impression qu’on peut faire des choses tendres.',
  'Tu m’as appris que la douceur peut vivre dans les détails.',
  'Tu me fais vivre une belle sensation d’accueil, même sans rien dire.',
  'Tu me fais aimer les modestes petits moments de vie.',
  'Tu apportes une vraie énergie fine et magnifique à mon quotidien.',
  'Tu vas me rester en tête comme quelque chose de très bien.',
  'Tu me fais sentir que notre histoire peut être plus qu’une idée jolie.',
  'Tu me fais apprécier les choses qu’on partage, une à une.',
  'Tu as cette manière qui transforme la banalité en quelque chose de précieux.',
  'Je garde en tête ta présence comme un petit bonheur discret.',
  'Tu me fais aimer les heures où le monde devient plus calme.',
  'Je t’aime ce qu’il y a de sincère dans ce que tu me laisses voir.',
  'Tu me fais penser à toutes les choses qui valent la peine d’être vu.',
  'J’aime la texture de nos échanges : simple, doux, très lumineux.',
  'Tu me touches souvent plus que tu n’en as conscience.',
  'Tu me fais trouver plus de beauté dans des choses très simples.',
  'Tu es une belle petite surprise dans mon quotidien.',
  'Ton amour de l’attention me touche beaucoup.',
  'Tu fais que j’ai envie de dire des mots agréables et réels.',
  'Tu me fais aimer le côté délicat et léger de nos jours.',
  'Tu me fais ressentir que quelque chose de joli peut se construire juste comme ça.',
  'Je suis content d’avoir découvert ce petit espace chaleureux avec toi.',
  'Tu me fais vivre une charmante vraie douceur de présence.',
  'Tu me touches dans un endroit où j’aime garder très juste les choses.',
  'Tu me donnes envie de préserver des moments comme ils sont.',
  'Tu m’inspires beaucoup plus de sérénité qu’il n’y paraît.',
  'Tu me fais sentir que c’est bon de garder cette petite lumière.',
  'Tu me fais avoir un souvenir très doux de tout ce qu’on partage.',
  'Tu as un charme doux qui me surprend dans le bon sens.',
  'Tu me fais aimer l’idée de vouloir continuer à te connaître.',
  'Tu me donnes envie de dire “merci” pour le simple fait de te voir.',
  'Tu as cette façon de rendre les petites choses significatives.',
  'Tu me laisses un sentiment très entier, très chaud, très léger à la fois.',
  'Tu me rends heureux dans une manière calme, presque évidente.',
  'Tu me fais avoir cette envie de te transmettre de la douceur.',
  'Tu as un rôle très simple et très joli dans mes jours.',
  'Je me sens attentionné même en faisant juste des choses ordinaires avec toi.',
];

const thoughts = Array.from({ length: 100 }, (_, index) => baseThoughts[index] ?? `Tu me fais penser à une petite chose merveilleuse, déjà, #${index + 1}`);

const getSavedData = () => {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const initialRoutines = [
  'Boire un grand verre d’eau en pensant à toi',
  'Écrire une petite pensée dans mon téléphone',
  'S’endormir avec le sourire',
  'Faire une petite pause pour respirer calmement',
  'Regarder une scène de série et la partager',
  'Relire notre dernier petit message doux',
];

const tabs = [
  { id: 'agenda', label: 'Agenda', icon: FaCalendarAlt },
  { id: 'films', label: 'Films & Séries', icon: FaFilm },
  { id: 'routines', label: 'Routines', icon: FaClipboardList },
  { id: 'thoughts', label: '100 Pensées', icon: FaHeart },
];

const dailyMessages = [
  'La douceur du jour, c’est un petit “tu me manques déjà” même quand on vient à peine de se quitter.',
  'Petite mission du jour : un petit message, juste pour faire sourire sans raison.',
  'Aujourd’hui, laisse une trace douce : un petit “je t’aime ça me parle” dans le fond du cœur.',
  'Le rituel du jour, c’est te rappeler que même un instant banal devient spécial avec toi.',
  'Un petit “je suis fier de toi” peut changer l’énergie d’une journée entière.',
  'Aujourd’hui, fais un petit geste discret pour lui garder ce sourire sur le visage.',
];

function App() {
  const savedData = getSavedData();
  const [activeTab, setActiveTab] = useState('agenda');
  const [selectedMovie, setSelectedMovie] = useState(movieTitles[0]);
  const [profile, setProfile] = useState(savedData?.profile ?? { firstName: '', meetingDate: '2026-07-25' });
  const [meetingDateInput, setMeetingDateInput] = useState(savedData?.profile?.meetingDate ?? '2026-07-25');
  const [routines, setRoutines] = useState(savedData?.routines ?? initialRoutines.map((text) => ({ text, done: true })));
  const [newRoutine, setNewRoutine] = useState('');
  const [watchList, setWatchList] = useState(
    savedData?.watchList ?? [
      { title: 'The Summer I Turned Pretty', priority: 'À voir', toWatch: true },
      { title: 'Only Murders in the Building', priority: 'Priorité 2', toWatch: true },
    ]
  );
  const [thoughtIndex, setThoughtIndex] = useState(null);
  const [usedIndexes, setUsedIndexes] = useState(savedData?.usedIndexes ?? []);
  const [thoughtHistory, setThoughtHistory] = useState(savedData?.thoughtHistory ?? []);
  const [showSetup, setShowSetup] = useState(!savedData?.profile?.firstName || !savedData?.profile?.meetingDate);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ profile, routines, watchList, usedIndexes, thoughtHistory })
    );
  }, [profile, routines, watchList, usedIndexes, thoughtHistory]);

  const daysCount = useMemo(() => {
    const start = new Date(`${meetingDateInput}T00:00:00`);
    const today = new Date();
    const diff = today.getTime() - start.getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  }, [meetingDateInput]);

  const dailyMessage = useMemo(() => {
    const today = new Date();
    const dayIndex = today.getDate() % dailyMessages.length;
    return dailyMessages[dayIndex];
  }, []);

  const pickRandomMovie = () => {
    const nextMovie = movieTitles[Math.floor(Math.random() * movieTitles.length)];
    setSelectedMovie(nextMovie);
  };

  const toggleRoutine = (index) => {
    setRoutines((current) =>
      current.map((routine, idx) => (idx === index ? { ...routine, done: !routine.done } : routine))
    );
  };

  const addRoutine = () => {
    const trimmed = newRoutine.trim();
    if (!trimmed) return;
    setRoutines((current) => [...current, { text: trimmed, done: false }]);
    setNewRoutine('');
  };

  const pickThought = () => {
    const availableIndexes = thoughts
      .map((_, idx) => idx)
      .filter((idx) => !usedIndexes.includes(idx));

    if (availableIndexes.length === 0) {
      const resetIndex = Math.floor(Math.random() * thoughts.length);
      setUsedIndexes([resetIndex]);
      setThoughtIndex(resetIndex);
      setThoughtHistory((current) => [...current, resetIndex]);
      return;
    }

    const nextIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    setThoughtIndex(nextIndex);
    setUsedIndexes((current) => [...current, nextIndex]);
    setThoughtHistory((current) => [...current, nextIndex]);
  };

  const saveProfile = (firstName, meetingDate) => {
    const safeName = firstName.trim();
    if (!safeName || !meetingDate) return;

    const nextProfile = { firstName: safeName, meetingDate };
    setProfile(nextProfile);
    setMeetingDateInput(meetingDate);
    setShowSetup(false);
  };

  const renderTabContent = () => {
    if (activeTab === 'agenda') {
      return (
        <AgendaTab
          daysCount={daysCount}
          meetingDateInput={meetingDateInput}
          onMeetingDateChange={setMeetingDateInput}
          profile={profile}
          showSetup={showSetup}
          onSaveProfile={saveProfile}
          dailyMessage={dailyMessage}
        />
      );
    }

    if (activeTab === 'films') {
      return (
        <FilmsTab
          selectedMovie={selectedMovie}
          movieTitles={movieTitles}
          onPickMovie={pickRandomMovie}
          watchList={watchList}
          setWatchList={setWatchList}
        />
      );
    }

    if (activeTab === 'routines') {
      return (
        <RoutinesTab
          routines={routines}
          onToggle={toggleRoutine}
          newRoutine={newRoutine}
          onNewRoutineChange={setNewRoutine}
          onAddRoutine={addRoutine}
        />
      );
    }

    return (
      <ThoughtsTab
        thoughts={thoughts}
        thoughtIndex={thoughtIndex}
        usedIndexes={usedIndexes}
        thoughtHistory={thoughtHistory}
        onPickThought={pickThought}
        profile={profile}
      />
    );
  };

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="app-header">
          <div>
            <p className="eyebrow">Petit carnet doux</p>
            <h1>{profile.firstName ? `Pour ${profile.firstName}` : 'Pour toi'}</h1>
          </div>
          <span className="header-badge"><FaGift /></span>
        </div>

        <main className="content-area">{renderTabContent()}</main>

        <nav className="bottom-tabs" aria-label="Navigation principale">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`tab-button ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default App;

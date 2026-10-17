import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TABLES = [
  {
    id: 1,
    shape: 'rect',
    top: ['Iliana Rodríguez', 'Victor M. Arguedas', 'Eduardo Campos', 'Adelia Arce'],
    bottom: ['Rodrigo Rodríguez', 'Julieta Marín', 'Juan Campos', 'Anayanci Rodríguez'],
  },
  {
    id: 2,
    shape: 'rect',
    top: ['Fausto Apuy', 'Silvia Apuy', 'Lisa Apuy', 'Randall Cordero'],
    bottom: ['Gustavo Apuy', 'Rebeca Martínez', 'Gabriel Apuy', 'Mariana Murillo'],
  },
  {
    id: 3,
    shape: 'round',
    seats: [
      'Lorena Cespedes',
      'Benjamín Martínez',
      'David Martínez',
      'Esteban Martínez',
      'Tita Elena',
      'Laura Martínez',
      'Mauricio Picado',
      'Silvia Martínez',
    ],
  },
  {
    id: 4,
    shape: 'rect',
    top: ['Orlando Rodríguez', 'Ana Flores', 'Maria Campos', 'Francisco Gonzalez', 'Catalina Rodríguez', 'Donnis Orozco'],
    bottom: ['Lorena Sanchez', 'Laura Rodríguez', 'Nicole Fernandez', 'Franco Rodríguez', 'Rodrigo Rodriguez F.', 'Andrey Orozco'],
  },
  {
    id: 5,
    shape: 'rect',
    top: ['Natalia Rodríguez', 'Tobías Umaña', 'Samuel Umaña', 'Graciela Arguedas', 'Esteban Sánchez', 'Lorenzo Sánchez'],
    bottom: ['Ariel Valverde', 'Victor Arguedas', 'Monserrat Armijo', 'Gael Armijo', 'Rebeca Arguedas', 'Carlos Armijo'],
  },
  {
    id: 6,
    shape: 'rect',
    top: ['Ighor Cardozo', 'Hazel Villalobos',  'Melissa Mena', 'Priscilla'],
    bottom: ['Diego Rodriguez', 'Rosario Arias', 'Tania', 'Catalina González'],
  },
  {
    id: 7,
    shape: 'rect',
    top: ['Sean Lea', 'Gabriel Kappelgaard', 'Tatiana Moreira', 'Daniel Rodríguez'],
    bottom: ['Evan Hefflin', 'Rebekah Hamilton', 'Channah van der Lee-de Feijter', 'Alex Wu Hou'],
  },
  {
    id: 8,
    shape: 'round',
    seats: [
      'Nicole Hückmann',
      'Moisés Piedra',
      'Logan Griffin',
      'Ángeles Madriz Mora',
      'Joel García',
      'Marie Rodríguez',
      'Daniel Villalobos',
      'Sary Montero',
      'Benjamín Castro',
      'Gabriel Piedra',
    ],
  },
  {
    id: 9,
    shape: 'rect',
    top: ['Mariana Vargas', 'Paul García', 'Geannina Briancesco', 'Arturo Solano', 'Brenda Solano', 'Jonathan Calderón'],
    bottom: ['Javier Vargas', 'Alina Jiménez', 'Leonor Baena', 'Edwin Piedra', 'Marcela Sánchez', 'Alfredo Álvarez'],
  },
  {
    id: 10,
    shape: 'rect',
    top: ['Maricruz Rodríguez', 'Andres Coto', 'Cecilia Guevara', 'Saúl Rodríguez', 'Carlos Castro', 'Sofía Ramírez'],
    bottom: ['Vincent Worsfold', 'Paula De La O','Abigail Funk', 'Erlin Obando', 'Sebastián Constanza', 'Susy Umaña'],
  },
];

const NOVIOS = ['Israel Apuy', 'Paula Campos'];

function normalize(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function allSeats(table) {
  return table.shape === 'round'
    ? table.seats
    : [...(table.top || []), ...(table.bottom || [])];
}

function Chair({ name, highlight }) {
  return (
    <div className={`sc-chair${highlight ? ' sc-chair-hl' : ''}`}>
      <span className="sc-chair-dot" />
      <span className="sc-chair-name">{name}</span>
    </div>
  );
}

function RectTable({ table, highlightSet }) {
  return (
    <div className="sc-table sc-table-rect">
      <div className="sc-row sc-row-top">
        {table.top.map(n => (
          <Chair key={n + 't'} name={n} highlight={highlightSet.has(normalize(n))} />
        ))}
      </div>
      <div className="sc-rect-surface">
        <span className="sc-table-num">{table.id}</span>
      </div>
      <div className="sc-row sc-row-bottom">
        {table.bottom.map(n => (
          <Chair key={n + 'b'} name={n} highlight={highlightSet.has(normalize(n))} />
        ))}
      </div>
    </div>
  );
}

function RoundTable({ table, highlightSet }) {
  const n = table.seats.length;
  return (
    <div className="sc-table sc-table-round">
      <div className="sc-round-surface">
        <span className="sc-table-num">{table.id}</span>
        {table.seats.map((name, i) => {
          const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
          const r = 50;
          const x = 50 + r * Math.cos(angle);
          const y = 50 + r * Math.sin(angle);
          return (
            <div
              key={name + i}
              className={`sc-round-chair${highlightSet.has(normalize(name)) ? ' sc-chair-hl' : ''}`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="sc-chair-dot" />
              <span className="sc-chair-name">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SeatingChart() {
  const { i18n } = useTranslation();
  const [query, setQuery] = useState('');

  const q = normalize(query);
  const matches = useMemo(() => {
    if (!q) return [];
    const out = [];
    for (const table of TABLES) {
      for (const name of allSeats(table)) {
        if (normalize(name).includes(q)) out.push({ name, table: table.id });
      }
    }
    return out;
  }, [q]);

  const highlightSet = useMemo(() => {
    const s = new Set();
    for (const m of matches) s.add(normalize(m.name));
    return s;
  }, [matches]);

  const lang = i18n.language?.startsWith('en') ? 'en' : 'es';
  const copy = {
    es: {
      title: 'Distribución de Mesas',
      subtitle: 'Buscá tu nombre para encontrar tu mesa',
      search: 'Escribí tu nombre',
      noResults: 'No encontramos ese nombre. Revisá la ortografía.',
      found: 'Mesa',
      table: 'Mesa',
      novios: 'Novios',
      back: '← Volver a la invitación',
      langToggle: 'EN',
    },
    en: {
      title: 'Seating Chart',
      subtitle: 'Search your name to find your table',
      search: 'Type your name',
      noResults: "We couldn't find that name. Check the spelling.",
      found: 'Table',
      table: 'Table',
      novios: 'Bride & Groom',
      back: '← Back to invitation',
      langToggle: 'ES',
    },
  }[lang];

  function toggleLang() {
    const next = lang === 'es' ? 'en' : 'es';
    localStorage.setItem('lang', next);
    i18n.changeLanguage(next);
  }

  return (
    <div className="sc-page">
      <div className="sc-topbar">
        <a href="/" className="sc-back">{copy.back}</a>
        <button className="sc-lang" onClick={toggleLang}>{copy.langToggle}</button>
      </div>

      <header className="sc-header">
        <h1 className="sc-title">{copy.title}</h1>
        <p className="sc-subtitle">{copy.subtitle}</p>
      </header>

      <div className="sc-search-wrap">
        <input
          className="sc-search"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={copy.search}
          autoComplete="off"
        />
        {q && (
          <div className="sc-results">
            {matches.length === 0 ? (
              <p className="sc-no-results">{copy.noResults}</p>
            ) : (
              <ul>
                {matches.slice(0, 20).map((m, i) => (
                  <li key={i}>
                    <strong>{m.name}</strong> — {copy.found} {m.table}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="sc-chart-scroll">
        <div className="sc-chart">
          <div className="sc-row-tables sc-row-9-10">
            {TABLES.filter(t => t.id === 9 || t.id === 10).map(table => (
              <RectTable key={table.id} table={table} highlightSet={highlightSet} />
            ))}
          </div>

          <div className="sc-row-tables sc-row-6-8-7">
            <RectTable table={TABLES.find(t => t.id === 6)} highlightSet={highlightSet} />
            <RoundTable table={TABLES.find(t => t.id === 8)} highlightSet={highlightSet} />
            <RectTable table={TABLES.find(t => t.id === 7)} highlightSet={highlightSet} />
          </div>

          <div className="sc-row-tables sc-row-4-5">
            <RectTable table={TABLES.find(t => t.id === 4)} highlightSet={highlightSet} />
            <RectTable table={TABLES.find(t => t.id === 5)} highlightSet={highlightSet} />
          </div>

          <div className="sc-row-tables sc-row-1-3-2">
            <RectTable table={TABLES.find(t => t.id === 1)} highlightSet={highlightSet} />
            <RoundTable table={TABLES.find(t => t.id === 3)} highlightSet={highlightSet} />
            <RectTable table={TABLES.find(t => t.id === 2)} highlightSet={highlightSet} />
          </div>

          <div className="sc-novios-wrap">
            <div className="sc-novios">
              <span className="sc-novios-label">{copy.novios}</span>
              <div className="sc-novios-chairs">
                {NOVIOS.map(name => (
                  <Chair key={name} name={name} highlight={highlightSet.has(normalize(name))} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sc-chart-mobile">
        {TABLES.map(table => {
          const seats = allSeats(table);
          return (
            <div className="sc-mcard" key={table.id}>
              <div className="sc-mcard-header">
                <span className="sc-mcard-num">{copy.table} {table.id}</span>
                <span className="sc-mcard-shape" aria-hidden="true">
                  {table.shape === 'round' ? '◯' : '▭'}
                </span>
              </div>
              <ul className="sc-mcard-list">
                {seats.map(name => (
                  <li
                    key={name}
                    className={highlightSet.has(normalize(name)) ? 'sc-mcard-hl' : ''}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        <div className="sc-mcard sc-mcard-novios">
          <div className="sc-mcard-header">
            <span className="sc-mcard-num">{copy.novios}</span>
          </div>
          <ul className="sc-mcard-list">
            {NOVIOS.map(name => (
              <li
                key={name}
                className={highlightSet.has(normalize(name)) ? 'sc-mcard-hl' : ''}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

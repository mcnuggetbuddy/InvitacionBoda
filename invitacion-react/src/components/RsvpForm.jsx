import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT;

const COUNTRY_CODES = [
  { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: '+1',   flag: '🇺🇸', name: 'USA / Canada' },
  { code: '+49',   flag: '🇩🇪', name: 'Germany' },
  { code: '+45',   flag: '🇩🇰', name: 'Denmark' },
];

export default function RsvpForm() {
  const { t, i18n } = useTranslation();
  const [nombre, setNombre] = useState('');
  const [countryCode, setCountryCode] = useState('+506');
  const [telefono, setTelefono] = useState('');
  const [asiste, setAsiste] = useState(null);
  const [personas, setPersonas] = useState(1);
  const [acompanantes, setAcompanantes] = useState(['', '', '']);
  const [tieneAlergias, setTieneAlergias] = useState(null);
  const [alergias, setAlergias] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  function updateAcompanante(index, value) {
    setAcompanantes(prev => prev.map((v, i) => (i === index ? value : v)));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setResult(null);

    const payload = {
      nombre: nombre.trim(),
      telefono: `${countryCode} ${telefono.trim()}`,
      asiste,
      personas: asiste ? personas : 0,
      acompanante1: asiste && personas >= 2 ? acompanantes[0].trim() : '',
      acompanante2: asiste && personas >= 3 ? acompanantes[1].trim() : '',
      acompanante3: asiste && personas >= 4 ? acompanantes[2].trim() : '',
      alergias: asiste && tieneAlergias ? alergias.trim() : '',
      idioma: i18n.language,
    };

    try {
      await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      setResult('ok');
    } catch {
      setResult('error');
    } finally {
      setSubmitting(false);
    }
  }

  if (result === 'ok') {
    const attended = asiste;
    return (
      <div className="rsvp-form-success">
        <h3>{t(attended ? 'rsvp.form.success_titulo' : 'rsvp.form.success_no_titulo')}</h3>
        <p>{t(attended ? 'rsvp.form.success_texto' : 'rsvp.form.success_no_texto')}</p>
      </div>
    );
  }

  const showGuestFields = asiste === true;

  return (
    <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
      <label className="rsvp-field">
        <span>{t('rsvp.form.nombre_label')}</span>
        <input
          type="text"
          required
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder={t('rsvp.form.nombre_placeholder')}
          autoComplete="name"
        />
      </label>

      <label className="rsvp-field">
        <span>{t('rsvp.form.telefono_label')}</span>
        <div className="rsvp-phone">
          <select
            className="rsvp-phone-code"
            value={countryCode}
            onChange={e => setCountryCode(e.target.value)}
            aria-label="Country code"
          >
            {COUNTRY_CODES.map(c => (
              <option key={c.code + c.name} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            required
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
            placeholder={t('rsvp.form.telefono_placeholder')}
            autoComplete="tel-national"
          />
        </div>
      </label>

      <fieldset className="rsvp-field rsvp-field-radio">
        <legend>{t('rsvp.form.asiste_label')}</legend>
        <div className="rsvp-radio-group">
          <label className={`rsvp-radio${asiste === true ? ' active' : ''}`}>
            <input
              type="radio"
              name="asiste"
              checked={asiste === true}
              onChange={() => setAsiste(true)}
              required
            />
            <span>{t('rsvp.form.asiste_si')}</span>
          </label>
          <label className={`rsvp-radio${asiste === false ? ' active' : ''}`}>
            <input
              type="radio"
              name="asiste"
              checked={asiste === false}
              onChange={() => setAsiste(false)}
            />
            <span>{t('rsvp.form.asiste_no')}</span>
          </label>
        </div>
      </fieldset>

      {showGuestFields && (
        <>
          <label className="rsvp-field">
            <span>{t('rsvp.form.personas_label')}</span>
            <select
              value={personas}
              onChange={e => setPersonas(parseInt(e.target.value, 10))}
              required
            >
              {[1, 2, 3, 4].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>

          {personas >= 2 && (
            <label className="rsvp-field">
              <span>{t('rsvp.form.acompanante_label', { n: 1 })}</span>
              <input
                type="text"
                required
                value={acompanantes[0]}
                onChange={e => updateAcompanante(0, e.target.value)}
                placeholder={t('rsvp.form.acompanante_placeholder')}
              />
            </label>
          )}

          {personas >= 3 && (
            <label className="rsvp-field">
              <span>{t('rsvp.form.acompanante_label', { n: 2 })}</span>
              <input
                type="text"
                required
                value={acompanantes[1]}
                onChange={e => updateAcompanante(1, e.target.value)}
                placeholder={t('rsvp.form.acompanante_placeholder')}
              />
            </label>
          )}

          {personas >= 4 && (
            <label className="rsvp-field">
              <span>{t('rsvp.form.acompanante_label', { n: 3 })}</span>
              <input
                type="text"
                required
                value={acompanantes[2]}
                onChange={e => updateAcompanante(2, e.target.value)}
                placeholder={t('rsvp.form.acompanante_placeholder')}
              />
            </label>
          )}

          <fieldset className="rsvp-field rsvp-field-radio">
            <legend>{t('rsvp.form.alergias_pregunta', { count: personas })}</legend>
            <div className="rsvp-radio-group">
              <label className={`rsvp-radio${tieneAlergias === false ? ' active' : ''}`}>
                <input
                  type="radio"
                  name="tieneAlergias"
                  checked={tieneAlergias === false}
                  onChange={() => setTieneAlergias(false)}
                />
                <span>{t('rsvp.form.alergias_no', { count: personas })}</span>
              </label>
              <label className={`rsvp-radio${tieneAlergias === true ? ' active' : ''}`}>
                <input
                  type="radio"
                  name="tieneAlergias"
                  checked={tieneAlergias === true}
                  onChange={() => setTieneAlergias(true)}
                />
                <span>{t('rsvp.form.alergias_si')}</span>
              </label>
            </div>
          </fieldset>

          {tieneAlergias === true && (
            <label className="rsvp-field">
              <span>{t('rsvp.form.alergias_detalle_label', { count: personas })}</span>
              <textarea
                rows="3"
                required
                value={alergias}
                onChange={e => setAlergias(e.target.value)}
                placeholder={t('rsvp.form.alergias_placeholder', { count: personas })}
              />
            </label>
          )}
        </>
      )}

      {result === 'error' && (
        <p className="rsvp-form-error">{t('rsvp.form.error')}</p>
      )}

      <button
        type="submit"
        className="rsvp-btn"
        disabled={submitting || asiste === null}
        aria-busy={submitting}
      >
        {submitting ? t('rsvp.form.submitting') : t('rsvp.form.submit')}
      </button>
    </form>
  );
}

export default function Preloader({ hidden }) {
  return (
    <div id="preloader" className={`preloader${hidden ? ' hidden' : ''}`}>
      <div className="preloader-spinner" />
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="ui-card">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}

export default Card;

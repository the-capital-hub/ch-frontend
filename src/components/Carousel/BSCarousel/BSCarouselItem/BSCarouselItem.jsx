function BSCarouselItem({ index, children }) {
  return (
    <div key={index} className={`carousel-item ${!index && "active"}`}>
      {children}
    </div>
  );
}

export default BSCarouselItem;

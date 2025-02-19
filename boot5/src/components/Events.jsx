const Events = ({ events }) => {
  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {events.map((event) => (
            <div className="col" key={event.id}>
              <div className="card h-100">
                <img
                  src="https://dia.pucmm.edu.do/wp-content/uploads/2023/05/PUCMM-jpg.webp"
                  className="img-fluid card-img-top object-fit-cover"
                  alt="..."
                  height="300"
                />
                <div className="card-body">
                  <h5 className="card-title">{event.title.rendered}</h5>
                  <p className="card-text">-</p>
                  <ul className="list-group list-group-flush mx-n3">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;

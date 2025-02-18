const Events = () => {
    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-4 g-4">

                    <div className="col">
                        <div className="card h-100">
                            <img src="https://dia.pucmm.edu.do/wp-content/uploads/2023/05/PUCMM-jpg.webp" className="img-fluid card-img-top object-fit-cover" alt="..." height="300" />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <ul className="list-group list-group-flush mx-n3">
                                    <li className="list-group-item">An item</li>
                                    <li className="list-group-item">A second item</li>
                                    <li className="list-group-item">A third item</li>
                                </ul>
                            </div>
                            <div className="card-footer">
                                <small className="text-body-secondary">Last updated 3 mins ago</small>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Events
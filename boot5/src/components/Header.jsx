import Top from './Top'
import pucmmLogo from '../assets/pucmm-logo.svg'

const Header = () => {

    return (
        <>
            <Top />
            <header className="bg-primary">
                <div className="container">
                    <nav className="navbar navbar-expand-lg " data-bs-theme="dark">
                        <a className="navbar-brand" href="#">
                            <img src={pucmmLogo} alt="Logo" width="150" height="50" className="d-inline-block align-text-top" />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Features</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Pricing</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )

}

export default Header
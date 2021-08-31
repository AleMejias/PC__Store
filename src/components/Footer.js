import React from 'react';

/* DEPENDENCIAS */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt , faEnvelope , faPhone } from '@fortawesome/free-solid-svg-icons';

/* ROUTER */
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <section className="container-fluid footer mt-5">
                <div className="row footer__container">
                    <div className="col-md-4 col-sm-12 footer__container--img">  
                        {/* LOGO DE MI TIENDA */}  
                    </div>
                    <div className="col-md-4 col-sm-6 footer__container--information">
                        <span>
                            <FontAwesomeIcon icon = { faMapMarkerAlt } />
                                Capital Federal. Buenos Aires, Argentina.
                        </span>
                        <span>
                            <FontAwesomeIcon icon = { faEnvelope } />
                                alejandro20452@gmail.com
                        </span>
                        <span>
                            <FontAwesomeIcon  icon= { faPhone } />
                                4322-7777
                        </span>
                    </div>
                    <div className="col-md-4 col-sm-6 footer__container--menu">
                        <ul className="px-0">
                            <li>
                                <Link to="/product/notebook">
                                    Notebooks
                                </Link>
                            </li>
                            <li>
                                <Link to="/product/auriculares">
                                    Auriculares
                                </Link>
                            </li>
                            <li>
                                <Link to="/product/sillas">
                                    Sillas
                                </Link>
                            </li>
                            <li>
                                <Link to="/product/discos">
                                    Discos
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="copyright">
                <div className="copyright__container">
                    <p className="mb-0 copyright__container--developer">
                        Alejandro Mejias-Desarrollador Web Jr &copy;
                    </p>
                </div>
            </section>
        </footer>
    );
}
export default Footer
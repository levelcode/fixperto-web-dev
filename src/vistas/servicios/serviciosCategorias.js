import React from 'react';
import { Link } from "react-router-dom";

class ServiciosCateg extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {


		return (
			<React.Fragment>


				<div className="">

					<div className="info_perfil_comp">
						<h1 className="titleRegister">Categorias</h1>

                        <div className="categorias_serv">

                            <div className="w3-row item">
                                 <Link to="/fixperto/servicios-nueva" className="">
                                    <div className="w3-col s3">
                                        <img src="../../assets/iconos/services/1.png" className="" alt="1"></img>
                                    </div>

                                    <div className="w3-col s7 text">
                                        <Link to="/fixperto/servicios-nueva" className="">Carpinteros</Link>
                                    </div>

                                    <div className="w3-col s2">
                                        <img src="../../assets/iconos/continuar.png" className="img_continue" alt="1"></img>
                                    </div>
                                 </Link>
                            </div>

                            <div className="w3-row item">
                                 <Link to="/fixperto/servicios-nueva"  className="">
                                    <div className="w3-col s3">
                                        <img src="../../assets/iconos/services/2.png" className="" alt="1"></img>
                                    </div>

                                    <div className="w3-col s7 text">
                                        <Link to="/fixperto/servicios-nueva"  className="">planos</Link>
                                    </div>

                                    <div className="w3-col s2">
                                        <img src="../../assets/iconos/continuar.png" className="img_continue" alt="1"></img>
                                    </div>
                                 </Link>
                            </div>

                            <div className="w3-row item">
                                 <Link to="/fixperto/servicios-nueva"  className="">
                                    <div className="w3-col s3">
                                        <img src="../../assets/iconos/services/3.png" className="" alt="1"></img>
                                    </div>

                                    <div className="w3-col s7 text">
                                        <Link to="/fixperto/servicios-nueva"  className="">Construcción</Link>
                                    </div>

                                    <div className="w3-col s2">
                                        <img src="../../assets/iconos/continuar.png" className="img_continue" alt="1"></img>
                                    </div>
                                 </Link>
                            </div>

                            <div className="w3-row item">
                                 <Link to="/fixperto/servicios-nueva"  className="">
                                    <div className="w3-col s3">
                                        <img src="../../assets/iconos/services/4.png" className="" alt="1"></img>
                                    </div>

                                    <div className="w3-col s7 text">
                                        <Link to="/fixperto/servicios-nueva"  className="">BBQ</Link>
                                    </div>

                                    <div className="w3-col s2">
                                        <img src="../../assets/iconos/continuar.png" className="img_continue" alt="1"></img>
                                    </div>
                                 </Link>
                            </div>

                            <div className="w3-row item">
                                 <Link to="/fixperto/servicios-nueva"  className="">
                                    <div className="w3-col s3">
                                        <img src="../../assets/iconos/services/5.png" className="" alt="1"></img>
                                    </div>

                                    <div className="w3-col s7 text">
                                        <Link to="/fixperto/servicios-nueva"  className="">Arquitectura general</Link>
                                    </div>

                                    <div className="w3-col s2">
                                        <img src="../../assets/iconos/continuar.png" className="img_continue" alt="1"></img>
                                    </div>
                                 </Link>
                            </div>
                           
                        </div>
						
					</div>
				</div>
			</React.Fragment >
		);
	}
}

export default ServiciosCateg;
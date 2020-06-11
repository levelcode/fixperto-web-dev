import React from 'react';

class CodigoSms extends React.Component {

	componentDidMount() { }

	render() {
		return (
			<React.Fragment>

				<div className="container">					

					<div className="codigo">
                        <h1 className="titleRegister">Ya estás registrado ahora, <br/> verifiquemos tu cuenta</h1>
                        <p>Ingresa el código de verificación que se te envio a tu equipo </p>

						<div className="w3-row">

                            <div className="w3-row cont_cod">
                                <input type="number" className="w3-round-large" min={0}  max={9} maxLength={1}/>
                                <input type="number" className="w3-round-large" min={0} max={9} maxLength={1}/>
                                <input type="number" className="w3-round-large" min={0} max={9} maxLength={1}/>
                                <input type="number" className="w3-round-large" min={0} max={9} maxLength={1}/>
                            </div>

							<div className="w3-row">
								<p className="p_btn"><button className="w3-button btn"
									onClick={(e) => {
										e.preventDefault();
										this.continuar();
									}}>VERIFICAR CUENTA</button></p>

                                    <p>No recibiste el código <a href="#">Reenviar</a></p>

                                    <p><a href="#">CAMBIAR TELÉFONO</a></p>
							</div>
						</div>
					</div>



				</div>
			</React.Fragment >
		);
	}
}

export default CodigoSms;
import React from 'react';

class Registro extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		     departamentos : "",  comentario : ""
		}
	}

    departamentos = [
        { id: 1, denomination: 'Cundinamarca' },
        { id: 3, denomination: 'Medellin' }, 
        { id: 4, denomination: 'Cali' }, 
    ];

	guardar = () => {
		console.log('hola ');
	}

	render() {

		const { departamentos, comentario } = this.state;

		return (
			<React.Fragment>

				<div className="info_perfil_atencion">

					<div className="">
						<h1 className="titleRegister">Nuevo Ticket</h1>
                        <p className=" w3-padding">Por favor, diligencia el siguiente formulario y proporcionemos los datos mas precisos posible, para que podamos atender su solicitud rápidamente </p>

						<form className="w3-container">

                            <div>
                                <label>Departamentos*</label>
                                <div>
                                    <select className="w3-select w3-border w3-round-large w3-margin-bottom size200" name="gender"
                                        value={departamentos} onChange={(e) => this.setState({ departamentos: e.target.departamentos })}>
                                        {this.departamentos.map((departamentos, key) => (
                                            <option key={key} value={departamentos.id} >{departamentos.denomination}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label>Comentario*</label>
							    <input className="w3-input w3-border w3-round-large" type="text" value={comentario}
								onChange={(e) => this.setState({ comentario: e.target.value })} />
                            </div>

                            <div className="btn_atencion_cliente">
                                <p><button className="w3-button btn"
								onClick={(e) => {
									e.preventDefault();
									this.guardar();
								}}>Enviar</button></p>
                                
                            </div>
						</form>
					</div>

                    <div className="table_atencion">

                        <h1 className="titleRegister">Mis tickets</h1>
                        <table className=" w3-table-all w3-margin-bottom">
                            <thead>
                                <tr class="w3-red">
                                    <th>Depto</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                        </table>
                    </div>

				</div>
			</React.Fragment >
		);
	}
}

export default Registro;
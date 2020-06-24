import React from "react";
const Experto = ({ experto, history }) => {
	const typo = (experto["type"] === 0) ? "profesional/" : (experto["type"] === 1) ? "empresa/" : experto["type"];
	let response_time = "";
	if (experto["emergency"] === 1) {
		let hora = experto["response_time"].split(":");
		response_time = hora[0] + "h " + hora[1] + " min";
	}
	//	onPress={() => history.navigate("DatosExperto", { expert: experto["id"] })}
	return (
		<React.Fragment>
			<div className="w3-section w3-cell-row experto" onClick={()=>{alert("OK")}}>
				<div className="w3-cell" style={{ width: 20 + "%" }}>
					<img className="imagen-experto"
						src={"https://api.fixperto.com/uploads/registros/" + typo + "/" + experto["avatar"]} alt="Imagen">
					</img>
				</div>
				<div className="w3-cell">
					<div className="w3-margin-bottom">
						<div className="w3-cell w3-container">
							<b >{experto.name}</b>
							{experto.plan === 1 &&
								<img src="../../../assets/iconos/experto_premium.png" style={{ width: 120 + "px", marginLeft : 10 }} alt="Imagen" />}
						</div>
						<div className="w3-row certif">
							{experto.certification_sena === 1 &&
								<div className="w3-cell">
									<img src="../../../assets/iconos/certificado.png" className="imagen-icono" alt="Imagen" style={{marginLeft : 10}} />
								</div>
							}
							<div className="w3-cell">
								<div className="w3-cell w3-container">
									<img src="../../../assets/iconos/star.png" className="imagen-icono" alt="Imagen" />
								</div>
								<p className="w3-cell">	{(experto.evaluation) ? experto.evaluation : 0}	</p>
							</div>
						</div>
						
					</div>
					<div className="w3-cell-row w3-margin-bottom">
						{(experto.type === 0 && experto.salud_pension) &&
							<div className="w3-cell">
								<div className="w3-cell w3-container">
									<img src="../../../assets/iconos/certificado.png" className="imagen-icono" alt="Imagen" />
								</div>
								<p className="w3-cell">Parafiscales</p>
							</div>
						}
						{(experto.type === 0 && experto.arl) &&
							<div className="w3-cell">
								<div className="w3-cell w3-container">
									<img src="../../../assets/iconos/certificado.png" className="imagen-icono" alt="Imagen" />
								</div>
								<p className="w3-cell">ARL</p>
							</div>
						}
					</div>
					{experto.insured === 1 &&
						<div className="w3-margin-bottom">
							<div className="w3-cell w3-container">
								<img src="../../../assets/iconos/asegurado.png" className="imagen-icono" alt="Imagen" />
							</div>
							<p className="w3-cell">Asegurado</p>
						</div>
					}
					{(experto["emergency"] === 1) && <div className="w3-margin-bottom" >
						<div className="w3-cell w3-container">
							<img src="../../../assets/iconos/emergencia.png" className="imagen-icono" alt="Imagen" />
						</div>
						<p className="w3-cell">{response_time}</p>
					</div>}
				</div>
			</div>
		</React.Fragment >
	);
}
export default Experto;
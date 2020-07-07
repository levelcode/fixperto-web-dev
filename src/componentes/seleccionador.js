import React from 'react';
class Seleccionador extends React.Component {
	constructor(props) { super(props); this.state = { showSelect: false }; }
	remove = (elemento) => { this.props["remove"](elemento); }
	add = (elemento) => { this.props["add"](elemento); }
	confirmar = () => { this.setState({ showSelect: false }); }
	render() {
		return (
			<React.Fragment>
				<div style={{ cursor: "pointer", display: (!this.state["showSelect"]) ? "block" : "none", padding: 10 + "px" }} className="w3-margin-top w3-border"
					onClick={() => { this.setState({ showSelect: true }); }}>
					<label>Seleccione sus categorías...</label>
				</div>
				<ul style={{ display: (!this.state["showSelect"]) ? "block" : "none" }} className="w3-ul w3-border" >
					{this.props["selectedItems"].map((selected, ke) => {
						return (
							<li key={ke}>
								<div className="w3-cell"><label>{selected["label"]}</label></div>
								<div className="w3-cell" style={{ cursor: "pointer" }} onClick={() => { this.remove(selected) }}>
									<img src="../../assets/iconos/eliminar.png"
										style={{ width: 15 + "px", height: 15 + "px", marginLeft : 5 }}
										alt="Imagen" />
								</div>
							</li>
						)
					})}
				</ul>
				<div style={{ display: (this.state["showSelect"]) ? "block" : "none" }}>
					<ul className="w3-ul w3-border">
						{this.props["items"].length > 0 && this.props["items"].map((item, key) => {
							let myRef = React.createRef();
							let ref = React.createRef();
							return <li key={key}>
								<div className="w3-row" style={{cursor : "pointer"}}
									onClick={() => {
										if (myRef.style.display === "none") {
											myRef.style.display = "block";
											ref.removeChild(ref.childNodes[0]);
											var x = document.createElement("div");
											var textnode = document.createTextNode("-");
											x.appendChild(textnode);
											ref.appendChild(x);
										} else {
											myRef.style.display = "none";
											var y = document.createElement("div");
											ref.removeChild(ref.childNodes[0]);
											var text = document.createTextNode("+");
											y.appendChild(text);
											ref.appendChild(y);
										}
									}}>
									<div className="w3-cell w3-left"><b>{item["grouped"]}</b></div>
									<div className="w3-cell w3-right" ref={refs => ref = refs} style={{ cursor: "pointer" }}>
										<div>
											<span className="mas_categor"> + </span>
										</div>
									</div>
								</div>
								<ul ref={refs => myRef = refs} style={{ display: "none", backgroundColor: "#F0F0F0" }} className="w3-ul w3-border" >
									{item["elementos"].map((elemento, ke) => {
										return (
											<li key={ke}>
												<input className="w3-check" type="checkbox" onChange={(e) => {
													if (e.target.checked) { this.add(elemento); }
													else { this.remove(elemento); }
												}} />
												<label> {elemento["label"]}</label>
											</li>
										)
									})}
								</ul>
							</li>
						})}
					</ul>
					<button onClick={() => { this.confirmar(); }}
						className="w3-button w3-block btn w3-round-large">Confirmar</button>
				</div>
			</React.Fragment >
		);
	}
}
export default Seleccionador;
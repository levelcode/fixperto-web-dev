import React from 'react';
class Seleccionador extends React.Component {
	constructor(props) { super(props); this.state = { showSelect: false, showSugerir: false }; }
	remove = (elemento) => { this.props["remove"](elemento); }
	add = (elemento) => { this.props["add"](elemento); }
	confirmar = () => { this.setState({ showSelect: false }); }
	deselectNoExiste = () => {
		let selectedItems = this.props["selectedItems"];
		var i = selectedItems.indexOf({ label: "Mi categoría no existe", value: "0key" });
		selectedItems.splice(i, 1);
		this.props["deselectNoExiste"](selectedItems);
	}
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
										style={{ width: 15 + "px", height: 15 + "px", marginLeft: 5 }}
										alt="Imagen" />
								</div>
							</li>
						)
					})}
				</ul>
				{<div className="w3-margin-bottom w3-margin-top"
					style={{ display: (!this.state["showSelect"] && this.props["category_proposal"] !== "") ? "block" : "none" }}>
					<label>Categorías sugeridas</label>
					<textarea disabled className="w3-input w3-border w3-round-large"
						value={this.props["category_proposal"]} />
				</div>}
				<div style={{ display: (this.state["showSelect"]) ? "block" : "none" }}>
					<ul className="w3-ul w3-border">
						{this.props["items"].length > 0 && this.props["items"].map((item, key) => {
							let myRef = React.createRef();
							let ref = React.createRef();
							return <li key={key}>
								<div className="w3-row" style={{ cursor: "pointer" }}
									onClick={() => {
										if (myRef.style.display === "none") {
											myRef.style.display = "block";
											ref.removeChild(ref.childNodes[0]);
											var x = document.createElement("div");
											var textnode = "<div><span class='mas_categor'> - <span></div>";
											x.innerHTML = textnode
											ref.appendChild(x);
										} else {
											myRef.style.display = "none";
											var y = document.createElement("div");
											ref.removeChild(ref.childNodes[0]);
											var text = "<div><span class='mas_categor'> + <span></div>";
											y.innerHTML = text;
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
						<li style={{ backgroundColor: "#dadde3" }}>
							<input className="w3-check" type="checkbox" value={this.state["showSugerir"]}
								onChange={(e) => {
									if (this.state["showSugerir"] === true) {
										this.setState({ showSugerir: false });
										this.props["cp"](""); this.deselectNoExiste();
									}
									else {
										this.setState({ showSugerir: true });
										this.props["add"]({ label: "Mi categoría no existe", value: "0key" });
									}
								}} />
							<label className="labelCheck w3-margin-left">Mi categoría no existe</label>
							{this.state["showSugerir"] && <div className="w3-margin-bottom w3-margin-top" >
								<label >Agrega los servicios que no aparecen en la lista</label>
								<textarea autoFocus={true} className="w3-input w3-border w3-round-large"
									value={this.props["category_proposal"]} onChange={(e) => this.props["cp"](e.target.value)}
								/>
							</div>}
						</li >
					</ul>
					<button onClick={() => { this.confirmar(); }}
						className="w3-button w3-block btn w3-round-large">Confirmar</button>
				</div>
			</React.Fragment >
		);
	}
}
export default Seleccionador;
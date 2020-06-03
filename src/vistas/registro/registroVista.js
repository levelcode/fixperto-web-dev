import React from 'react';
class Registro extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: "" };
	}
	componentDidMount() { }

	addCliente = () => {

	}
	render() {
		return (
			<React.Fragment>
				<div className="container">
					<form className="w3-container">

						<label>First Name</label>
						<input className="w3-input" type="text"/>

						<label>Last Name</label>
						<input className="w3-input" type="text"/>

						<img src="logo.png" className="w3-round" alt="Norway"/>

					</form>
				</div>
			</React.Fragment >
		);
	}
}

export default Registro;
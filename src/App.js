import React from 'react';
import { Route, Switch } from "react-router";
import Header from "./componentes/header";
class App extends React.Component {
	constructor(props) { super(props); this.state = {}; }
	componentDidMount() { }
	render() {
		return (
			<React.Fragment>
				<Header />
				<Switch>
					{this.props["rutes"].map((route, i) => (
						<Route key={i} path={"/fixperto" + route.path} render={() => (<route.component history={this.props["history"]} rutes={route.sub_routes} />)} />
					))}
				</Switch>
			</React.Fragment >
		);
	}
}
export default App;
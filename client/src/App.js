import React, {Component} from 'react';
import TelaPrincipal from './TelaPrincipal.js'
import VisualizarSensores from './VisualizarSensores.js'
import TelaInicial from './TelaInicial.js'
import { Route, BrowserRouter, Switch} from 'react-router-dom'
import { faEnvelope, faKey, faChevronDown, faChevronUp, faTrash, faEdit, faCheckCircle, faTimesCircle, faBatteryFull, faBatteryQuarter,faTimes, faSignInAlt}  from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faEnvelope,
    faKey,
    faChevronDown,
    faChevronUp,
    faTrash,
    faEdit,
    faCheckCircle,
    faTimesCircle,
    faBatteryFull,
    faBatteryQuarter,
    faTimes,
    faSignInAlt);
class App extends Component {



	render() {
	return (
		<BrowserRouter>
			<Switch>

		<Route path="/sensores"   component={VisualizarSensores} />
		<Route path="/telaPrincipal"  exact={true}  component={TelaPrincipal} />
		<Route path="/"  exact={true}  component={TelaInicial} />

		</Switch>


		</BrowserRouter>

	);
  }
}


export default App;

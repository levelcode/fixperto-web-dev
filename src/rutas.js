import Ingreso from "./vistas/ingreso/ingresoVista";
import App from './App';
import Beneficios from "./vistas/registro/beneficiosVista";
import Registro from "./vistas/registro/registroVista";
const rutas = [
	{ path: "/ingreso", text: 'Ingreso', component: Ingreso },
	{ path: "/beneficios", text: 'Beneficios', component: Beneficios },
	{ path: "/registro", text: 'Registro', component: Registro },
	{ path: "/fixperto", text: 'App', component: App }
];
export default rutas;
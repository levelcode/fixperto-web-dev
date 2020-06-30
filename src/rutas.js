import Ingreso from "./vistas/ingreso/ingresoVista";
import App from './App';
import Beneficios from "./vistas/registro/beneficiosVista";
import Registro from "./vistas/registro/registroVista";
import CodigoVista from "./vistas/registro/codigoVista";
import Fixperto from "./vistas/fixperto/fixperto";
const rutas = [
	{ path: "/ingreso", text: 'Ingreso', component: Ingreso },
	{ path: "/beneficios", text: 'Beneficios', component: Beneficios },
	{ path: "/registro", text: 'Registro', component: Registro },
	{ path: "/fixperto", text: 'App', component: App },
	{ path: "/fixpertos", text: 'App', component: Fixperto },
	{ path: "/codigosms", text: 'Codigo Sms', component: CodigoVista },
];
export default rutas;
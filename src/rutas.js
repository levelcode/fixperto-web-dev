import Ingreso from "./vistas/ingreso/ingresoVista";
import App from './App';
import Beneficios from "./vistas/registro/beneficiosVista";
import Tipo from "./vistas/registro/tipoVista";
import Registro from "./vistas/registro/registroVista";
import Terminos from "./vistas/perfil/perfilTerminos";
import Politicas from "./vistas/perfil/perfilPolitica";
import Independiente from "./vistas/registro/independiente/independiente";
import Independiente1 from "./vistas/registro/independiente/independiente1";
import Independiente2 from "./vistas/registro/independiente/independiente2";
import Independiente3 from "./vistas/registro/independiente/independiente3";
import RegistroCompletado from "./vistas/registro/registroCompletado";
import CodigoVista from "./vistas/registro/codigoVista";
import Fixperto from "./vistas/fixperto/fixperto";
const rutas = [
	{ path: "/ingreso", text: 'Ingreso', component: Ingreso },
	{ path: "/tipo", text: 'Tipo', component: Tipo },
	{ path: "/beneficios", text: 'Beneficios', component: Beneficios },
	{ path: "/registro", text: 'Registro', component: Registro },
	{ path: "/registro-experto", text: 'Independiente', component: Independiente },
	{ path: "/independiente1", text: 'Independiente1', component: Independiente1 },
	{ path: "/independiente2", text: 'Independiente2', component: Independiente2 },
	{ path: "/independiente3", text: 'Independiente3', component: Independiente3 },
	{ path: "/completado", text: 'RegistroCompletado', component: RegistroCompletado },
	{ path: "/fixperto", text: 'App', component: App },
	{ path: "/fixpertos", text: 'App', component: Fixperto },
	{ path: "/codigosms", text: 'Codigo Sms', component: CodigoVista },
	{ path: "/terminos", text: 'Terminos y condiciones', component: Terminos },
	{ path: "/politicas", text: 'Politicas y Privacidad', component: Politicas },
];
export default rutas;
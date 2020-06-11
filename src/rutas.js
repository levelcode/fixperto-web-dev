import Ingreso from "./vistas/ingreso/ingresoVista";
import App from './App';
import Beneficios from "./vistas/registro/beneficiosVista";
import Registro from "./vistas/registro/registroVista";
import Perfil from "./vistas/perfil/perfilVista";
const rutas = [
	{ path: "/ingreso", text: 'Ingreso', component: Ingreso },
	{
		path: "/fixperto", text: 'App', component: App, sub_routes: [
			{ path: "/beneficios", text: 'Beneficios', component: Beneficios },
			{ path: "/registro", text: 'Registro', component: Registro },
			{ path: "/perfil", text: 'Perfil', component: Perfil },

		]
	}
];
export default rutas;
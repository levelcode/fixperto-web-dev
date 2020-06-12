import Ingreso from "./vistas/ingreso/ingresoVista";
import App from './App';
import Beneficios from "./vistas/registro/beneficiosVista";
import Registro from "./vistas/registro/registroVista";
import Perfil from "./vistas/perfil/perfilVista";
import PerfilInformacion from "./vistas/perfil/perfilInformacion";
import PerfilConfig from "./vistas/perfil/perfilConfig";
import PerfilAtencionCliente from "./vistas/perfil/perfilAtencionCliente";
import PerfilTerminos from "./vistas/perfil/perfilTerminos";
const rutas = [
	{ path: "/ingreso", text: 'Ingreso', component: Ingreso },
	{
		path: "/fixperto", text: 'App', component: App, sub_routes: [
			{ path: "/beneficios", text: 'Beneficios', component: Beneficios },
			{ path: "/registro", text: 'Registro', component: Registro },
			{ path: "/perfil", text: 'Perfil', component: Perfil },
			{ path: "/perfil-informacion", text: 'Perfil Informacion', component: PerfilInformacion },
			{ path: "/perfil-config", text: 'Perfil Configuración', component: PerfilConfig },
			{ path: "/perfil-atencion", text: 'Perfil Atencion Cliente', component: PerfilAtencionCliente },
			{ path: "/perfil-terminos", text: 'Perfil Terminos', component: PerfilTerminos },
		]
	}
];
export default rutas;

import Perfil from "./perfilVista";
import PerfilInformacion from "./perfilInformacion";
import PerfilConfig from "./perfilConfig";
import PerfilAtencionCliente from "./perfilAtencionCliente";
import PerfilTerminos from "./perfilTerminos";
const perfil_rutas = [
	{ path: "/perfil", text: 'Perfil', component: Perfil },
	{ path: "/perfil-informacion", text: 'Perfil Informacion', component: PerfilInformacion },
	{ path: "/perfil-config", text: 'Perfil Configuración', component: PerfilConfig },
	{ path: "/perfil-atencion", text: 'Perfil Atención Cliente', component: PerfilAtencionCliente },
	{ path: "/perfil-terminos", text: 'Perfil Términos', component: PerfilTerminos },
];
export default perfil_rutas;
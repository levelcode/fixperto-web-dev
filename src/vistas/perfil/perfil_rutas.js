
import Perfil from "./perfilVista";
import PerfilInformacion from "./perfilInformacion";
import PerfilConfig from "./perfilConfig";
import PerfilAtencionCliente from "./perfilAtencionCliente";
import PerfilTerminos from "./perfilTerminos";
import PerfilCambiarContr from "./perfilCambiarContr";
const perfil_rutas = [
	{ path: "/perfil", text: 'Perfil', component: Perfil },
	{ path: "/perfil-informacion", text: 'Perfil Informacion', component: PerfilInformacion },
	{ path: "/perfil-config", text: 'Perfil Configuración', component: PerfilConfig },
	{ path: "/perfil-atencion", text: 'Perfil Atencion Cliente', component: PerfilAtencionCliente },
	{ path: "/perfil-terminos", text: 'Perfil Terminos', component: PerfilTerminos },
	{ path: "/perfil-contrasena", text: 'Perfil Cambiar Contraseña', component: PerfilCambiarContr },
];
export default perfil_rutas;
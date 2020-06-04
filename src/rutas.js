import Ingreso from "./vistas/ingreso/ingresoVista";
import Beneficios from "./vistas/ingreso/beneficiosVista";
import Registro from "./vistas/registro/registroVista";
import Core from './vistas/servicios/servicioVista';
import Usuario from '../modulos/usuario/usuario';
const rutas = [
    { path: "/login", text: 'Ingreso', component: Ingreso },
    { path: "/beneficios", text: 'Beneficios', component: Beneficios },
    { path: "/registro", text: 'Registro', component: Registro },
    {
        path: "/core", text: 'Core', component: Core, sub_routes: [
            { path: "/usuario", text: 'Usuario', component: Usuario },
        ]
    }
];
export default rutas;
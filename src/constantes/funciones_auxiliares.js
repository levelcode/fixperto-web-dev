const redondeo = (numero, decimales) => {
	var flotante = parseFloat(numero); let potencia = Math.pow(10, decimales);
	return (Math.round(flotante * potencia) / potencia);
};
const convertDate = (inputFormat) => {
	function pad(s) { return (s < 10) ? '0' + s : s; } const d = new Date(inputFormat);
	return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
}
const validateEmail = email => { let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; return reg.test(email.trim()); };

const validateName = name => { let reg = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/; return reg.test(name); }

const validatePhone = phone => { let reg = /^[0-9]{7,10}$/; return reg.test(phone); };

const validateNumber = number => { let reg = /^[0-9]{7,11}$/; return reg.test(number); };

const formatDate = date => {
	let today = new Date(date);
	return today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();

}
const convertDateTime = date => {
	var fecha = new Date(date);
	return fecha.toISOString().split('T')[0] + ' ' + fecha.toTimeString().split(' ')[0];
}

const convertHourUpdate = time => {
	var aux = time.split(":");
	var from = new Date(); from.setHours(aux[0]); from.setMinutes(aux[1]); from.setSeconds(aux[2]); return from;
}

const formatHour = time => {
	let fecha = new Date(time);
	let hora = (fecha.getHours().toString().length === 1) ? "0" + fecha.getHours() : fecha.getHours();
	let minutos = (fecha.getMinutes().toString().length === 1) ? "0" + fecha.getMinutes() : fecha.getMinutes();
	return hora + ":" + minutos + ":00";
}

const fechaAutorizada = () => {
	var fecha = new Date(); fecha.setFullYear(fecha.getFullYear() - 18);
	let ano = fecha.getFullYear();
	let mes = (parseInt(fecha.getMonth() + 1) < 10) ? "0" + parseInt(fecha.getMonth() + 1) : parseInt(fecha.getMonth() + 1)
	let dia = (fecha.getDate() < 10) ? "0" + fecha.getDate() : fecha.getDate();
	return ano + "-" + mes + "-" + dia;
}

const fechaActual = () => {
	var fecha = new Date(); 
	let ano = fecha.getFullYear();
	let mes = (parseInt(fecha.getMonth() + 1) < 10) ? "0" + parseInt(fecha.getMonth() + 1) : parseInt(fecha.getMonth() + 1)
	let dia = (fecha.getDate() < 10) ? "0" + fecha.getDate() : fecha.getDate();
	return ano + "-" + mes + "-" + dia;
}

export { redondeo, convertDate, validateEmail, validateName, validatePhone, validateNumber, formatDate, convertDateTime, convertHourUpdate, formatHour, fechaAutorizada, fechaActual } 
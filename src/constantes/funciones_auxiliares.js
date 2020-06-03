const redondeo = (numero, decimales) => {
	var flotante = parseFloat(numero); let potencia = Math.pow(10, decimales);
	return (Math.round(flotante * potencia) / potencia);
};
const convertDate = (inputFormat) => {
	function pad(s) { return (s < 10) ? '0' + s : s; } const d = new Date(inputFormat);
	return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
}
const validateEmail = email => { let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; return reg.test(email.trim()); };

export { redondeo, convertDate, validateEmail } 
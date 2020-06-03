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

export { redondeo, convertDate, validateEmail, validateName, validatePhone  } 
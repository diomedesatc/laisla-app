export function ValidarRut(rut) {
    // Eliminar puntos y guiones, y convertir a minúsculas para manejar 'k'
    const rutLimpio = rut.replace(/\./g, '').replace('-', '');

    // Separar el cuerpo del RUT del dígito verificador
    const cuerpoRut = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toLowerCase(); // Convertir a minúscula para 'k'

    // Validar longitud mínima y máxima del cuerpo del RUT
    if (cuerpoRut.length < 7 || cuerpoRut.length > 8) {
        return false;
    }

    let suma = 0;
    let multiplicador = 2;

    // Calcular la suma ponderada de los dígitos del cuerpo del RUT
    // Se recorre el RUT de derecha a izquierda
    for (let i = cuerpoRut.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpoRut[i]) * multiplicador;
        multiplicador++;
        if (multiplicador > 7) {
            multiplicador = 2; // Reiniciar el multiplicador a 2
        }
    }

    // Calcular el dígito verificador esperado
    const dvEsperado = 11 - (suma % 11);

    // Comparar el dígito verificador calculado con el proporcionado
    if (dvEsperado === 11) {
        return dv === '0';
    } else if (dvEsperado === 10) {
        return dv === 'k';
    } else {
        return parseInt(dv) === dvEsperado;
    }
}

export function ValidarEmail(email){
    const dominios = ["hotmail.com", "gmail.com", "outlook.com"]
    let dominio_del_usuario = email.split("@");
    
    return dominios.includes(dominio_del_usuario[1])  ? true : false;
    
}
const nombreUsuario = document.getElementById("name");
const emailUsuario = document.getElementById("email");
const contraseñaUsuario = document.getElementById("password");
const telefonoUsuario = document.getElementById("telefono");
const formularioRegistro = document.getElementById("formularioregistro").addEventListener('submit', checkFormulario);

function checkFormulario(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto
    
    if (nombreUsuario.value === "" || nombreUsuario.value === null || nombreUsuario.value.length === 0) {
        alert("Error: Se debe llenar el campo nombre");
        nombreUsuario.focus();
        return false; 
    }

    else if (nombreUsuario.value.length <= 3 || nombreUsuario.value.length >= 20) {
        alert("Error: El nombre del usuario debe tener entre 4 y 19 caracteres");
        nombreUsuario.focus();
        return false;
    }

    else if (!(/^[a-zA-Z]+$/.test(nombreUsuario.value))) {
        alert("Error: solo debe introducir valores alfanuméricos");
        nombreUsuario.focus();
        return false;
    }

    if (emailUsuario.value === "" || emailUsuario.value === null || emailUsuario.value.length === 0) {
        alert("Error: debe llenar este campo");
        emailUsuario.focus();
        return false;
    }

    else if (!(/\S+@\S+\.\S+/.test(emailUsuario.value))) {
        alert("Error: debe ingresar un correo válido");
        emailUsuario.focus();
        return false;
    }

    if (telefonoUsuario.value === "" || telefonoUsuario.value === null || telefonoUsuario.value.length === 0) {
        alert("Error: debe llenar el campo del teléfono");
        telefonoUsuario.focus();
        return false; 
    }

    else if (!(/^\d{9}$/.test(telefonoUsuario.value))) {
        alert("Error: debe ingresar un número de teléfono válido de 9 dígitos");
        telefonoUsuario.focus();
        return false;
    }

    return true;
}

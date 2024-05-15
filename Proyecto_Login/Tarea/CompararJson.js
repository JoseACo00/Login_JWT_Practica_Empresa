// const archivo1 = require('./i18n/es.json');

// console.log(  archivo1);

//OBLIGATORIO PARA PODER REALIZAR ACCIONES COMO :EDITAR , CREAR , BORRAR ARCHIVOS
const fs = require('fs');

// Rutas de los archivos JSON QUE DEBEN SER PEDIDAS POR EL USUARIO
const archivoOriginal = 'D:/Taalentfy/PracticaJson/i18n/en.json';
const archivoComparacion = 'D:/Taalentfy/PracticaJson/ArchivosCreados/enBU.json';

         // LEER EL ARHCIVO JSON
function leerJSON(ruta) {
    const contenido = fs.readFileSync(ruta, 'utf-8');
    return JSON.parse(contenido);
}

        //  ESCRIBIR EL UNO SJON
function escribirJSON(ruta, data) {
    fs.writeFileSync(ruta, JSON.stringify(data, null, 2), 'utf-8');
}

        // COMPARA LAS KEY DEL JSON Y SI ES CONINCIDE
function compararKeys(objeto1, objeto2) {
    const keysObjeto1 = Object.keys(objeto1);
    const keysObjeto2 = Object.keys(objeto2);
    return keysObjeto1.filter(key => keysObjeto2.includes(key));
}

        // LEER LOS JSON
const jsonOriginal = leerJSON(archivoOriginal);
const jsonComparacion = leerJSON(archivoComparacion);

        // LAS KEYS QUE SON COMUNES LAS OBTIENE
const keysComunes = compararKeys(jsonOriginal, jsonComparacion);


const nuevoJSON = {}; // SE CREE UN OBJETO NUEVO DE JSON CON LAS KEYS COMUNES
keysComunes.forEach(key => {
    nuevoJSON[key] = jsonOriginal[key];
});

// RUTA DEL NUEVO ARCHIVO
escribirJSON('./src/assets/ArchivosCreados/nuevo.json', nuevoJSON);

console.log('NUEVO ARCHIVO GENERADO CON LAS KEYS COMUNES .');

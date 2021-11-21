const path = require('path');
const { v4: uuidv4 } =  require('uuid');

const subirArchivo = (files, extensionesValidas = ['png','jpg','jpeg','gif'],carpeta='') => {

    return new Promise((resolve,reject) => {

        //Si es solo uno lo espera como archivo
        const {archivo} = files;

        const nombreCortado = archivo.name.split('.');

        const extension = nombreCortado[nombreCortado.length-1];

        //Validar extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida, se permite ${extensionesValidas}`)
        }

        //Renombrar
        const nombreTemp = uuidv4()+'.'+extension;
        const uploadPath = path.join(__dirname , '../uploads/',carpeta, nombreTemp); //guarda con el nombre del archivo

        //Mueve a la carpeta indicada
        archivo.mv(uploadPath, (err) => {
        if (err) {
            return reject(err)
        }

        resolve(nombreTemp);

        });

    })

     
}

module.exports = {
    subirArchivo
}
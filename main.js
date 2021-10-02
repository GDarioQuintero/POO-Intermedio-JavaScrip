const juan = {
    name: "Juanito",
    age: "18",
    approvedCourses: ["Curso 1"],
    addCourses(newCourse) {
        this.approvedCourses.push(newCourse);
    }
};
//------Principales metodos estaticos del super prototipo Object---------------

// console.log(Object.keys(juan));
// console.log(Object.getOwnPropertyNames(juan));
// console.log(Object.entries(juan));
// console.log(Object.getOwnPropertyDescriptors(juan));

//----Metodo estatico defineProperty() -- Define nuevas caracteristicas de un objeto-
Object.defineProperty(juan, "pruevaNasa", {
    value: "extraterestres",
    enumerable: false,
    writable: false,
    configurable: false,
});

Object.defineProperty(juan, "navigetor", {
    value: "chrome",
    enumerable: false,//No me enumera este atributo 
    writable: true,
    configurable: true,
});

Object.defineProperty(juan, "editor", {
    value: "VScode",
    enumerable: true,
    writable: false,//No permite sobre-escribir el valor de este atributo
    configurable: true,
});

Object.defineProperty(juan, "terminal", {
    value: "WSL",
    enumerable: true,
    writable: true,
    configurable: false,//No permite eliminar este atributo
});

console.log(Object.getOwnPropertyDescriptors(juan));

//-------- Otros metodos estaticos-----------------------

// Si se usan estos metodos, no se podrabn volver hacer modificaciones a las propiedades deL 
// OBJETO. OJO   

// deja todas las propiedades del objeto false en configurable, evita que las propiedades 
// se puedan borrar
Object.seal(juan); 


// deja todas las propiedades del objeto false en configurable y writable, impide que se 
// pueda eliminar o sobreescribir las propiedades del objeto
Object.freeze(juan); 

// ---------------------Metodo shallow copy para copiar objetos ----------------

//Cuando copiamos objetos con atributos normales como variables simples funciona muy bien, puedo copiar mi objeto
//propiedad por propiedad, y si realizo un cambio en un de los objeto no va afectar al otro

//PERO si el objeto tiene como atributo otro objeto no va a funcionar muy bien ya que si cambiamos ese atributo 
//objeto dentro de uno de los objetos tambien va afectar el otro objeto.



// const obj2 = {};

// for (prop in obj1){
//     obj2[prop] = obj1[prop];
// }


//Otros metodos que me permite copiar objetos mejora un poco al copiar objetos que contienen objetos como atributos
//Pero aun sigue generando dificultades al modificar esos atributos objetos, afectanto a los objetos copiados.

// const obj3 = Object.assign({}, obj1);
// const obj4 = Object.create({}, obj1);

//--------METODOS JSON.Parse() y Json.Stringifi() para copiar objetos -------------------------
// Esta es la manera de hacer copias de objetos que sean totalmente independientes uno del otro 
//para que los cambios que se le realicen a uno de ellos no afecte al otro.

//OJO cuando el objeto tiene metodos y funciones esta manera omite este tipo de propiedades no las copia, por que no 
// las entiende.

// estamos copiando el objeto original comno un estring en la memoria stack
// const objetoComplejo = JSON.stringify(obj1);

// // A partir del string que copìamos anteriormente creamos un objeto con este metodo Json.parse()
// const objetoOk = JSON.parse(objetoComplejo);

// console.log(objetoOk);


// ----------------------------------- Recursividad -----------------------------------------------

// const numeritos = [1, 3, 5, 9, 6, 85, 11, 10, 8, 56568, 41, 8754];
// let numerito = 0;

// for (let index = 0; index < numeritos.length; index++){
//     numerito = numeritos[index];
//     console.log({index, numerito});
// }

// la recursividad es hacer lo que hace el anterior ciclo for pero utilizando una funcion recursiva

// function recursiva(numArray) {
//     if(numArray.length != 0) {
//         const primerNum = numArray[0];
//         console.log(primerNum);
//         numArray.shift();
//         recursiva(numArray);
//     }
// }

// console.log(recursiva(numeritos));


//----------------------------Deep copy con recursividad-----------------------------------------------

// const obj1 = {
//     a: "a",
//     b: "b",
//     c: {
//         d: "d",
//         e: "e",
//     },
//     editar() {
//         this.a = "AAAAAAAAAAAAA";
//     }
// };

// //esta funcion determina si el parametro resivido es un objeto
function isObject(subject) {
    return typeof subject == "object";
}

//esta funcion determina si el parametro resivido es un Array
function isArray(subject){
    return Array.isArray(subject);
}

// //Funcion recursiva para copiar objetos sin que halla ningun inconveniente a la hora de copiar objetos con objetos como atributos.
// function deepCopy(subject){
//     let copySubject;

//     const subjectIsObject = isObject(subject);
//     const subjectIsArray = isArray(subject);

//     if (subjectIsArray) {
//         copySubject = [];
//     } else if (subjectIsObject) {
//         copySubject = {};
//     } else {
//         return subject;
//     }

//     for (key in subject) {
//         //en esta linea estamos validando si cada propiedad del objeto es un array o un objeto o un atributo normal
//         const keyIsObject = isObject(subject[key]);
//         if (keyIsObject) {
//             //este es el llamado recursivo
//             copySubject[key] = deepCopy(subject[key]);
//         } else {
//             if (subjectIsArray) {
//                 copySubject.push(subject[key]);
//             } else {
//                 copySubject[key] = subject[key];
//             }
//         }
//     }
//     return copySubject;
// }

//-----------------Abstracion con objetos literales y dep copy--------------------

// const studentBase = {
//     name: undefined,
//     amail: undefined,
//     age: undefined,
//     approvedCourse: undefined,
//     learningPaths: undefined,
//     socialMedia: {
//         twitter: undefined,
//         instagram: undefined,
//         facebook: undefined,
//     },
// };

// //copio todas las propiedades de studentBase a el objeto juan con deepCopy 
// const juan = deepCopy(studentBase);
// //proteje todas las propiedades del objeto de ser borradas
// Object.seal(juan);

// //Comprueba si el objeto a pasado por el metodo seal(). retorna un valor true o false
// Object.isSealed(juan);

// //Comprueba si el objeto esta protegido el writable como false. retorna un valor true o false
// Object.isFrozen(juan);
// juan.name = "German Quintero";


//-------------------Factory pattern y RORO-- Fabricas de objetos---------------------------

//Esta funcion nos tira un error nuevo cuando no enviamos ningun valor en un parametro obligatorio
function requiredParam(param){
    throw new Error(param + " Es obligatorio");
}


//Son patrones que nos permiten crear moldes de objetos pero no a partir de objetos literales si no a partir de funciones, esto nor permite craer objetos sin necesisdad de memorizar el orden de los parametros

function createStudent ({
    name = requiredParam("name"),//forma de hacer un parametro obligatorio
    email  = requiredParam("email"), 
    age,
    twitter,
    facebook,
    instagram,
    approvedCourses = [],
    learningPaths = [],
} = {}) {

    //Declaramos las variables que queramos que sean privadas
    const private = {
        "_name": name,
        "_learningPaths": learningPaths,
    };

    //Declaramos las variables y metodos que queremos que sean publicos
    const public = {
        email,
        age,
        approvedCourses,
        socialMedia: {
            twitter,
            facebook,
            instagram,
        },
        get name(){
            return private["_name"];
        },
        //metodo set para modificar nuestro atributo, este metodo crea una propiedad falsa para poder entrer el atributo privado
        //y poder ser editado con las restricciones que queramos, luego de haberlo modificado la primera ves nos deja automaticamente en false
        //la propiedad writable para asi no poder volver a modificarlo.
        set name(newName){
            //Impedimos que el name sea un string vacio
            if(newName.length != 0) {
                private["_name"] = newName; 
            } else {
                console.warn("Tu nombre debe tener al menos 1 caracter");
            }            
        },

        get learningPaths(){
            return private["_learningPaths"];
        },

        set learningPaths(newLP) {

            //en los if estamos validando que lo que estemos recibiendo realmente sea un leaningPaths 
            //En si validamos que cumpla con las cualidades de un learningPaths pero no de como lo crean
            
            if(!newLP.name) {
                console.warn("Tu LP no tiene la propiedad name");
                return;//si la validacion es falsa el return impide la ejecucion del resto del codigo
            } 

            if(!newLP.courses) {
                console.warn("Tu LP no tiene courses");
                return;
            }

            if(!isArray(newLP.courses)) {
                console.warn("Tu LP no es una lista (*de cursos)");
                return;
            }
            //Si cumple con la validacion entoces agregamos nuesta ruta de aprendizaje
            private["_learningPaths"].push(newLP);
        },

        //Metodo que me permite modificar el name
        // changeName(newName){
        //     private["_name"] = newName;
        // },

        // //,etodo que me retorna el name 
        // readName(){
        //     return private["_name"];
        // },
    };
    //Con este codigo impedimos que nos puedan modificar los metodos pero tambien impideria que podamos trabajar el polimorfismo
    // Object.defineProperty(public, "readName", {
    //     configurable: false,
    //     writable: false,
    // });

    // Object.defineProperty(public, "changeName", {
    //     configurable: false,
    //     writable: false,
    // });
    //retornamos el objeto public
    return public;       
}

function createLearningPaths ({
    name = requiredParam("name"),
    courses = [],
}) {
    const private = {
        "_name": name,
        "_couses": courses,
    };

    const public = {
        
        get name(){
            return private["_name"];
        },

        set name(newName){
            //Impedimos que el name sea un string vacio
            if(newName.length != 0) {
                private["_name"] = newName; 
            } else {
                console.warn("Tu nombre debe tener al menos 1 caracter");
            } 
        },

        get courses(){
            return private["_courses"];
        },
    };
    return public;
}

const juan = createStudent({
    name: "Dayanna",
    email: "lealdayann1994@gmail.com",
});




//----------------------Module pattern y namespaces-----------------------------------

// Todo lo de esta clase esta en el codigo anterior 
//JavaScript no es un lenguaje fuertemente tipado, osea que no hay que definir el tipo de variables 
// lo que hace los namespace es definir el alcance de las variable y metodos y asi poder definir cuando se puedan modificar o no.


//---------------------------duck typing en javaScript--------------------------------------------------------

//es la forma en como identificamos a nuestros elementos dependiendo de los atributos y metodos que tengan por dentro
//Es de gran importancia que tambien cumpla con la validacion de que se cree con las funciones que nosotros desarrollemos. 


//---------------------------Instances of en javaScript--------------------------------------------------------

//Nos ayudan a saber si realmente los objetos  son creados con prototipos que hemos creadoo y no sean impostores.

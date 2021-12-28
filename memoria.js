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

const obj1 = {
    a: "a",
    b: "b",
    c: {
        d: "d",
        e: "e",
    },
    editar() {
        this.a = "AAAAAAAAAAAAA";
    }
};

//esta funcion determina si el parametro resivido es un objeto
function isObject(subject) {
    return typeof subject == "object";
}

//esta funcion determina si el parametro resivido es un Array
function isArray(subject){
    return Array.isArray(subject);
}

//Funcion recursiva para copiar objetos sin que halla ningun inconveniente a la hora de copiar objetos con objetos como atributos.
function deepCopy(subject){
    let copySubject;

    const subjectIsObject = isObject(subject);
    const subjectIsArray = isArray(subject);

    if (subjectIsArray) {
        copySubject = [];
    } else if (subjectIsObject) {
        copySubject = {};
    } else {
        return subject;
    }

    for (key in subject) {
        //en esta linea estamos validando si cada pripiedad del objeto es un array o un objeto o un atributo normal
        const keyIsObject = isObject(subject[key]);
        if (keyIsObject) {
            //este es el llamado recursivo
            copySubject[key] = deepCopy(subject[key]);
        } else {
            if (subjectIsArray) {
                copySubject.push(subject[key]);
            } else {
                copySubject[key] = subject[key];
            }
        }
    }
    return copySubject;
}

//-----------------Abstracion con objetos literales y dep copy--------------------

const studentBase = {
    name: undefined,
    amail: undefined,
    age: undefined,
    approvedCourse: undefined,
    learningPaths: undefined,
    socialMedia: {
        twitter: undefined,
        instagram: undefined,
        facebook: undefined,
    },
};

//copio todas las propiedades de studentBase a el objeto juan con deepCopy 
const juan = deepCopy(studentBase);
//proteje todas las propiedades del objeto de ser borradas
Object.seal(juan);

//Comprueba si el objeto a pasado por el metodo seal()
Object.isSealed(juan);

//Comprueba si el objeto esta protegido el writable como false
Object.isFrozen(juan);
juan.name = "German Quintero";
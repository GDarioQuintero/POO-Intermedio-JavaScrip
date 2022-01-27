
// //esta funcion determina si el parametro resivido es un objeto
function isObject(subject) {
    return typeof subject == "object";
}

//esta funcion determina si el parametro resivido es un Array
function isArray(subject){
    return Array.isArray(subject);
}


//Esta funcion nos tira un error nuevo cuando no enviamos ningun valor en un parametro obligatorio
function requiredParam(param){
    throw new Error(param + " Es obligatorio");
}

//Prototipo students
function Student ({
    name = requiredParam("name"),//forma de hacer un parametro obligatorio
    email  = requiredParam("email"), 
    age,
    twitter,
    facebook,
    instagram,
    approvedCourses = [],
    learningPaths = [],
} = {}) {

    this.name = name;
    this.email = email;
    this.age = age;
    this.approvedCourses = approvedCourses;
    this.socialMedia = {
        twitter,
        instagram,
        facebook,
    };

    const private = {
        "_learningPaths": [],//Protegemos nuestro atributo como privado para que no puedan acceder directamente a el
    }
         
    //Utilizamos el metodo estatico para modificar la estructura del atibuto learningPaths y darle una estructura de objeto y a
    // y agregarle el get y el set
    Object.defineProperty(this, "learningPaths", {
        get() {
            return private["_learningPaths"];//El set me retorna la variable privada
        },
        set(newLP) {
            if( newLP instanceof LearningPaths) { //valida que el nuevo learningPaths sea una instancia de nuestro prototipo
                private["_learningPaths"].push(newLP);  //Agrega el nuevo learningPaths al array con los demas learningPats 
            } else {
                //Si el newLP no es una instancia del prototipo da un menzaje de error
                console.warn("Alguno de los learningPath no es una instancia del prototipo LearningPath ")
            }
        },
    });
    
    for(learningPathIndex in learningPaths) {
        this.learningPaths = learningPaths[learningPathIndex];
    }
};


//Convertimos nuestra fabrica de objetos en un prototipo LearningPaths
function LearningPaths ({
    name = requiredParam("name"),
    courses = [],
}) {
    this.name = name;
    this.courses = courses;

};

//Para crear nuestros objetos utilizamos new
const escuelaWeb = new LearningPaths({name: "Escuela de Desarrollo Web"});
const escuelaBD = new LearningPaths({name: "Escuela de BD"});
const juan = new Student({
    email: "gdarioquintero@gmail.com",
    name: "Salome",
    learningPaths: [
        escuelaBD,
        escuelaWeb,
        //Prueba de una escuela impostora que gracias  ala validacion ya no permite que se agrege sin que 
        //sea creada mediente el prototipo
        // {
        //     name: "Impostor",
        //     courses: [],
        // }
    ],
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

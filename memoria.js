// ---------------------Metodo shallow copy para copiar objetos ----------------

//Cuando copiamos objetos con atributos normales como variables simples funciona muy bien, puedo copiar mi objeto
//propiedad por propiedad, y si realizo un cambio en un de los objeto no va afectar al otro

//PERO si el objeto tiene como atributo otro objeto no va a funcionar muy bien ya que si cambiamos ese atributo 
//objeto dentro de uno de los objetos tambien va afectar el otro objeto.

const obj1 = {
    a: "a",
    b: "b",
    c: {
        d: "d",
        e: "e",
    },
};

const obj2 = {};

for (prop in obj1){
    obj2[prop] = obj1[prop];
}

console.log(obj1, obj2);

//Otros metodos que me permite comiar objetos mejora un poco al copiar objetos que contienen objetos como atributos
//Pero aun sigue generando dificultades al modificar esos atributos objetos, afectanto a los objetos copiados.
const obj3 = Object.assign({}, obj1);
const obj4 = Object.create({}, obj1);

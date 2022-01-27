class superObject {

    static deepCopy(subject){
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
            //en esta linea estamos validando si cada propiedad del objeto es un array o un objeto o un atributo normal
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
    
    static isObject(subject) {
        return typeof subject == "object";
    }

}
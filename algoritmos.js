//1. Crear un algoritmo que muestre los números impares entre el 0 y el 100.

for (let i = 0; i <= 100; i++) {
    if (i % 2 !== 0) {
        console.log(i);
    }
}

//2. Realizar un programa que ingrese los sueldos de 5 operarios en un vector. Realizar la creación y carga del vector en el constructor. Crear un método para imprimir el vector.

class Operario {
    constructor() {
        this.sueldos = [];
        //this.cargarSueldos() //descomentar para ejecución del programa y los prompts en el navegador
    }

    cargarSueldos() {
        for (let i = 0; i < 5; i++) {
            let sueldo;
            let isValid = false;

            while (!isValid) {
                sueldo = prompt(`Ingrese el sueldo del operario ${i + 1}:`);

                if (isNaN(parseFloat(sueldo)) || sueldo.trim() === "") {
                    alert("Ingresá un monto válido.");
                } else {
                    isValid = true;
                }
            }

            this.sueldos.push(parseFloat(sueldo));
        }
    }

    imprimirSueldos() {
        console.log("Sueldos de los operarios:");
        this.sueldos.forEach((sueldo, index) => {
            console.log(`Operario ${index + 1}: $${sueldo.toFixed(2)}`);
        });
    }
}

const operarios = new Operario();

//operarios.imprimirSueldos();

// 3. Plantear una clase llamada Alumno y definir como atributos su nombre y su edad. En el constructor realizar el ingreso de datos. Definir otros dos métodos para imprimir los datos ingresados y un mensaje si es mayor o no de edad (edad >= 18)

class Alumno {
    constructor() {
        //this.nombre = this.obtenerNombre(); //descomentar esta linea y la siguiente para la ejecución del algoritmo
        //this.edad = this.obtenerEdad();
    }

    obtenerNombre() {
        let nombre;
        let isValid = false;

        while (!isValid) {
            nombre = prompt("Ingrese el nombre del alumno:");
            if (nombre.trim() === "") {
                alert("Debe ingresar un nombre válido.");
            } else {
                isValid = true;
            }
        }

        return nombre;
    }

    obtenerEdad() {
        let edad;
        let isValid = false;

        while (!isValid) {
            edad = prompt("Ingrese la edad del alumno:");
            if (isNaN(parseInt(edad)) || edad.trim() === "") {
                alert("Debe ingresar una edad válida.");
            } else {
                isValid = true;
            }
        }

        return parseInt(edad);
    }

    imprimirDatos() {
        alert(`Nombre: ${this.nombre}`);
        alert(`Edad: ${this.edad}`);
    }

    esMayorDeEdad() {
        if (this.edad >= 18) {
            alert(`El alumno ${this.nombre} es mayor de edad.`);
        } else {
            alert(`El alumno ${this.nombre} es menor de edad.`);
        }
    }
}

const alumno = new Alumno();

//alumno.imprimirDatos(); //descomentar esta linea y la siguiente para la ejecución del algoritmo
//alumno.esMayorDeEdad();

// 4. JavaScript ES6: Dados los siguientes array, imprimir por consola los elementos del array “y” que no se encuentran en el array “x” utilizando para tal fin una única línea de código. const x = ["n", "bro", "c", "|"]; const y = ["d", "n", "l", "bro", "g"];

const x = ["n", "bro", "c", "|"];
const y = ["d", "n", "l", "bro", "g"];

console.log(y.filter((item) => !x.includes(item)));

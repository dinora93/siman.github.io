// let puntuacion =78;

// if(puntuacion > 90) {
//     console.log("Excelente A");
// } else if (puntuacion > 80 && puntuacion <= 90) {
//     console.log("Excelente B");
// } else if (puntuacion > 70 && puntuacion <= 80) {
//     console.log("Excelente C");
// } else {
//     console.log("Excelente F");
// }

let day ='jueves'

switch(day){
    case 'lunes':
        console.log('Inicio de semana');
        break;//se sale del ciclo y sigue ejecutando todo lo demas
    case 'martes':
    case 'miercoles':
    case 'jueves':
        console.log('Dias entre semana');
        break;
    case 'viernes':
        console.log('Casi fin de semana');
        break;
    default:
        console.log('El dia es invalido');
}
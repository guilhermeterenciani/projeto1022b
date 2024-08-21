import mysql from 'mysql2/promise';

console.log("TERE LINDO");
// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'banco1022b',
});
connection
.then() // Se deu certo
.catch((erro)=>{ // Se deu Errado
    if(erro.code==='ECONNREFUSED'){
        console.log("LIGA O LARAGON!")
    }else{
        console.log(erro)
    }
})
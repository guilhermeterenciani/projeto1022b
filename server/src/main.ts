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
        console.log("ERRO: FAVOR LIGA O LARAGON!")
    }else if(erro.code==='ER_BAD_DB_ERROR'){
        console.log("ERRO: você não criou o banco de dados 'banco1022B' no workbench!")
    }else{
        console.log(erro)
    }
})
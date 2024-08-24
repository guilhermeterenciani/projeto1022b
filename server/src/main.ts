import mysql from 'mysql2/promise';
// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'banco1022b',
});
connection
.then((conn)=>{ // Se deu certo
    // Preparar uma query para execução.
    const queryPreparada = conn.prepare("SELICT * FROM produtos");
    queryPreparada
    .then((query)=>{})
    .catch((err)=>{
        if(err.code==='ER_NO_SUCH_TABLE'){
            console.log("ERRO: VOCÊ DEVE CRIAR A TABELA PRODUTOS NO WORKBENCH")
        }else if(err.code==='ER_PARSE_ERROR'){
            console.log("ERRO: VOCÊ DIGITOU ALGO ERRADO NA QUERY, CONFIRA A ESCRITA, VIRGULAS,NOME DAS COLUNAS E POSIÇÃO DAS PALAVRAS CHAVES.")
        }
        else{
            console.log("Erro não tratado:",err);
        }
    })
}) 
.catch((erro)=>{ // Se deu Errado
    if(erro.code==='ECONNREFUSED'){
        console.log("ERRO: FAVOR LIGA O LARAGON!")
    }else if(erro.code==='ER_BAD_DB_ERROR'){
        console.log("ERRO: você não criou o banco de dados 'banco1022B' no workbench!")
    }else{
        console.log(erro)
    }
})
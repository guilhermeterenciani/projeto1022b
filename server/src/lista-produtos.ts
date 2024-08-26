import mysql, { RowDataPacket } from 'mysql2/promise';
type Output = {
    id:number,
    nome:string,
    descricao:string,
    preco: number,
    imagem:string
}
class ListaProdutos{
    execute(){
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'banco1022b',
          });
          return connection
          .then((conn)=>{ // Se deu certo
              // Preparar uma query para execução.
              const queryPreparada = conn.prepare("SELECT * FROM produtos");
              return queryPreparada
              .then((query)=>{
                  const queryExecutada = query.execute([])
                  return queryExecutada
                  .then((result)=>{
                      const [linhas ,campus] = result
                      const dados = linhas as RowDataPacket[]
                      const listaProdutos:Output[] = []
                      for(let i=0;i<dados.length;i++){
                          console.log(dados[i].id,dados[i].nome)
                          const produto ={
                            id:dados[i].id,
                            nome: dados[i].nome,
                            descricao: dados[i].descricao,
                            preco: parseFloat(dados[i].preco),
                            imagem: dados[i].imagem,
                          }
                          listaProdutos.push(produto)
                      }
                      return listaProdutos

                  })
                  .catch((err)=>console.log("Erro:",err))
              })
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
    }
}

export default ListaProdutos;
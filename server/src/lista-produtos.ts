import mysql, { RowDataPacket } from 'mysql2/promise';
import 'dotenv/config'
type Output = {
    id:number,
    nome:string,
    descricao:string,
    preco: number,
    imagem:string
}

interface ProdutoRowDataPacket extends RowDataPacket{
    id:number,
    nome:string,
    descricao:string,
    preco: string,
    imagem:string
}
class ListaProdutos{
    async execute(){
        try{
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_BANCO,
            });
            const queryPreparada = await connection.prepare("SELECT * FROM produtos");
            const queryExecutada = await queryPreparada.execute([])
            const [linhas ,campus] = queryExecutada
            const dados = linhas as ProdutoRowDataPacket[]
            const listaProdutos:Output[] = []
            for(let i=0;i<dados.length;i++){
                const produto ={
                    id:         dados[i].id,
                    nome:       dados[i].nome,
                    descricao:  dados[i].descricao,
                    preco:      parseFloat(dados[i].preco),
                    imagem:     dados[i].imagem,
                }
                listaProdutos.push(produto)
            }
            return listaProdutos   
        }
        catch(erro:any){ // Se deu Errado
            if(erro.code==='ER_NO_SUCH_TABLE'){
                console.log("ERRO: VOCÊ DEVE CRIAR A TABELA PRODUTOS NO WORKBENCH")
            }else if(erro.code==='ER_PARSE_ERROR'){
                console.log("ERRO: VOCÊ DIGITOU ALGO ERRADO NA QUERY, CONFIRA A ESCRITA, VIRGULAS,NOME DAS COLUNAS E POSIÇÃO DAS PALAVRAS CHAVES.")
            }else if(erro.code==='ECONNREFUSED'){
                console.log("ERRO: FAVOR LIGA O LARAGON!")
            }else if(erro.code==='ER_BAD_DB_ERROR'){
                console.log("ERRO: você não criou o banco de dados 'banco1022B' no workbench!")
            }else{
                console.log(erro)
            }
        }
    }
}

export default ListaProdutos;
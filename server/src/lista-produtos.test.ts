import {test,expect,beforeEach} from 'vitest'
import ListaProdutos from './lista-produtos'
import mysql from 'mysql2/promise';
import 'dotenv/config'
beforeEach(async()=>{
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_BANCO,
    });
    await connection.query("DELETE FROM produtos")
    await connection.query("INSERT INTO produtos VALUES (?,?,?,?,?)",
        ["1","Iphone","Celular RUIM","5000.50","SEM IMAGEM"])
})
test("Deve listar produtos do banco de dados",async()=>{
    //GIVEN   -> DADO ALGO INICIAL
    const listaProdutos = new ListaProdutos()
    const listaPreCadastrada =[
        {
            id: 1,
            nome: 'Iphone',
            descricao: 'Celular RUIM',
            preco: 5000.50,
            imagem: 'SEM IMAGEM'
        }
    ]
    //WHEN    -> QUANDO EU EXECUTAR ALGO
    const produtosDoBanco = await listaProdutos.execute()
    //THEN    -> EU ESPERO QUE ISSO ACONTEÇA
    expect(produtosDoBanco).toEqual(listaPreCadastrada)
})
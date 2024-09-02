import {test,expect, afterEach} from 'vitest'
import ListaProdutos from './lista-produtos'
import mysql from 'mysql2/promise';
import 'dotenv/config'
import InserirProdutos from './inserir-produtos';
afterEach(async()=>{
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_BANCO,
    });
    await connection.query("DELETE FROM produtos WHERE id=?",[2])
})
test("Deve inserir um produto no banco de dados",async()=>{
    //GIVEN
    const produto = {
        id:2,
        nome: "Samsung",
        descricao:"Celular melhor que Iphone",
        preco:1500.50,
        imagem:"SEM IMAGEM"
    }
    //WHEN  => Quando eu fizer algo.
    const inserirProdutos = new InserirProdutos()
    const produtoDoBanco = await inserirProdutos.execute(produto)
    //THEN
    const listaProdutos = new ListaProdutos()
    const listaBanco = await listaProdutos.execute()
    expect(produtoDoBanco).toEqual(produto)
    expect(listaBanco).toContainEqual(produto)
})
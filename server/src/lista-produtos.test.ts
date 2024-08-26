import {test,expect,describe} from 'vitest'
import ListaProdutos from './lista-produtos'

test("Deve listar produtos do banco de dados",async()=>{
    //GIVEN   -> DADO ALGO INICIAL
    const listaProdutos = new ListaProdutos()
    const listaPreCadastrada = [
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
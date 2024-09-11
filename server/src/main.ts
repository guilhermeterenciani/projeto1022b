
import Express , {Request,Response} from 'express';
import Cors from 'cors'
import ListaProdutos from "./lista-produtos";
import InserirProdutos from './inserir-produtos';
const app = Express();

app.use(Cors())
app.use(Express.json())

app.get("/",(req:Request,res:Response)=>{
    res.send("Respondido.").status(200);
})
app.get("/produtos", async (req:Request,res:Response)=>{
    const objListaProdutos = new ListaProdutos();
    //O tipo do produto tem que ser o mesmo do fetch
    const produtos = await objListaProdutos.execute();
    res.send(produtos).status(200);
})
app.post("/produtos", async (req:Request,res:Response)=>{
    const {id,nome,descricao,preco,imagem} = req.body
    //Esse produto tem que ser igual ao do fetch
    const produto = {id,nome,descricao,preco,imagem}
    const objInserirProdutos = new InserirProdutos()
    try{
        const produtoInserido =await objInserirProdutos.execute(produto)
        res.status(201).send(produtoInserido);
    }catch(e:any){
        //console.log(e)
        res.status(400).send({mensagem:"Não foi possível cadastrar ERRO: "+e.message});
    }
})

app.listen(8000,()=>{
    console.log("Server rodando na porta 8000")
})


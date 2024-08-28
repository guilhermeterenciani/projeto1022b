
import Express , {Request,Response} from 'express';

import ListaProdutos from "./lista-produtos";
const app = Express();

app.get("/",(req:Request,res:Response)=>{
    res.send("Respondido.").status(200);
})
app.get("/produtos", async (req:Request,res:Response)=>{
    const objListaProdutos = new ListaProdutos();
    const produtos = await objListaProdutos.execute();
    res.send(produtos).status(200);
})

app.listen(8000,()=>{
    console.log("Server rodando na porta 8000")
})


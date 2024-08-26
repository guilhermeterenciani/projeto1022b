import ListaProdutos from "./lista-produtos";

async function main(){
    const objListaProdutos = new ListaProdutos();
    const produtos = await objListaProdutos.execute();
    console.log("Produtos:",produtos)
}
main()
import Config from "../../config/config";
import api from "../../../api";

class serviceProduto{

    async getProduto(){  
        
        const response = await fetch(Config+'produto/listar/1');
        const json = await response.json();
        //console.log(json);
        return json;
    };

    async getClienteID(codigo){  
        
        const response = await fetch(Config+'produto/listar/unico/'+codigo);
        const json = await response.json();
        
        return json;
    };

    async deletar(codigo){  
        const response = await fetch(Config+'produto/deletar/'+codigo);
    };

    async criarProduto(data){
        console.log(data);
        
        return api.post("/produto/inserir",data)
        .then((response) => {
            return response.status;
        }).catch((error) => {
            return error.status;
        }); 
    }

}

const produtoService = new serviceProduto();
export default produtoService;
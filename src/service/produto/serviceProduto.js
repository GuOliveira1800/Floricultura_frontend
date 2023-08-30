import Config from "../../config/config";
import api from "../../../api";

class serviceProduto{

    async request(endPoint){
        try{
            const response = await fetch(Config+endPoint);
            const json = await response.json();        
            return json;
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    async getProduto(){          
        return await this.request('produto/listar/1');
    };

    async getClienteID(codigo){  
        return await this.request('produto/listar/unico/'+codigo);
    };

    async getProdutoNome(nome){  
        return await this.request('produto/procura/'+nome);
    };

    async deletar(codigo){  
        try{
            const response = await fetch(Config+'produto/deletar/'+codigo);
        }catch(error){
            console.log(error);
        }
    };

    async criarProduto(data){
        console.log(data);
        
        return api.post("/produto/inserir",data)
        .then((response) => {
            return response.status;
        }).catch((error) => {
            console.log(error);
        }); 
    }
}

const produtoService = new serviceProduto();
export default produtoService;
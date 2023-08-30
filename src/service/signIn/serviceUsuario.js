import Config from "../../config/config";
import api from '../../../api';

class serviceUsuario{

    async login(data){        
        return api.post("/usuario/logar",data)
        .then((response) => {            
            const retorno = {
                codigo: response.data.codigo_usu,
                httpStatus: response.status
            }
            console.log(retorno);
            return retorno;
        }).catch((error) => {            
            const retorno = {
                codigo: 0,
                httpStatus: 400
            }
            return retorno;
        });        
    };

    async request(endPoint){
        try{
            const response = await fetch(Config+endPoint);
            const json = await response.json();   
            //console.log(json);     
            return json;
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    async getCliente(){  
        return await this.request('cliente/listar');
    };

    async getFornecedor(){  
        return await this.request('fornecedor/listar');
    };

    async getFornecedorPorNome(nome){          
        return await this.request('fornecedor/listar/filtro/'+nome);
    };

    async getClienteID(codigo){  
        return await this.request('cliente/listar/'+codigo);
    };

    async getFornecedorID(codigo){  
        return await this.request('fornecedor/listar/'+codigo);
    };

    async deletar(codigo){          
        try{
            const response = await fetch(Config+'cliente/deletar/'+codigo);
        } catch(error){
            console.log(error)
        }
    };

    async deletarFornecedor(codigo){  
        try{
            const response = await fetch(Config+'fornecedor/deletar/'+codigo);
        } catch(error){
            console.log(error)
        }        
    };

    async criarCliente(data){        
        return api.post("/cliente/inserir",data)
        .then((response) => {
            return response.status;
        }).catch((error) => {
            return error.status;
        }); 
    }

    async criarFornecedor(data){
        return api.post("/fornecedor/salvar",data)
        .then((response) => {
            return response.status;
        }).catch((error) => {
            return error.status;
        }); 
    }

    async criaUsuario(data){        
        return api.post("/usuario/salvar",data)
        .then((response) => {
            return response.status;
        }).catch((error) => {
            return error.status;
        }); 
    }

    async buscaNomeUsuario(codigo){          
        return await this.request('usuario/pegar/'+codigo);
    };

}

const usuarioService = new serviceUsuario();
export default usuarioService;
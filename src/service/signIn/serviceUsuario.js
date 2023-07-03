import axios from "axios";
import Config from "../../config/config";
import api from '../../../api';
import React from "react";

class serviceUsuario{

    async login(data){
        
        console.log(data);
        
        return api.post("/usuario/logar",data)
        .then((response) => {
            console.log(response.data);
            const retorno = {
                codigo: response.data,
                httpStatus: response.status
            }
            return retorno;
        }).catch((error) => {
            const retorno = {
                codigo: 0,
                httpStatus: response.status
            }
            return error.status;
        });        
    };

    async getCliente(){  
        
        const response = await fetch(Config+'cliente/listar');
        const json = await response.json();
        return json;
    };

    async getFornecedor(){  
        
        const response = await fetch(Config+'fornecedor/listar');
        const json = await response.json();
        return json;
    };

    async getFornecedorPorNome(nome){          
        const response = await fetch(Config+'fornecedor/listar/filtro/'+nome);
        const json = await response.json();
        return json;
    };

    //http://localhost:8080/fornecedor/listar/filtro/

    async getClienteID(codigo){  
        
        const response = await fetch(Config+'cliente/listar/'+codigo);
        const json = await response.json();
        //console.log(json);
        return json;
    };

    async getFornecedorID(codigo){  
        
        const response = await fetch(Config+'fornecedor/listar/'+codigo);
        const json = await response.json();
        //console.log(json);
        return json;
    };

    async deletar(codigo){  
        
        const response = await fetch(Config+'cliente/deletar/'+codigo);
    };

    async deletarFornecedor(codigo){  
        
        const response = await fetch(Config+'fornecedor/deletar/'+codigo);
    };

    async criarCliente(data){
        console.log(data);
        
        return api.post("/cliente/inserir",data)
        .then((response) => {
            return response.status;
        }).catch((error) => {
            return error.status;
        }); 
    }

    async criarFornecedor(data){
        console.log(data);
        
        return api.post("/fornecedor/salvar",data)
        .then((response) => {
            return response.status;
        }).catch((error) => {
            return error.status;
        }); 
    }

    async criaUsuario(data){
        console.log(data);
        
        return api.post("/usuario/salvar",data)
        .then((response) => {
            return response.status;
        }).catch((error) => {
            return error.status;
        }); 
    }

    async buscaNomeUsuario(codigo){          
        const response = await fetch(Config+'usuario/pegar/'+codigo);
        const json = await response.json();
        //console.log(json);
        return json;
    };

}

const usuarioService = new serviceUsuario();
export default usuarioService;
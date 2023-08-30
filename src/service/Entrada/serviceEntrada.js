import Config from "../../config/config";
import api from "../../../api";

class serviceEntrada{

    async criarProduto(data){
        
        return api.post("/entrada/salvar",data)
        .then((response) => {
            return response.status;
        }).catch((error) => {
            console.log(error);
        }); 
    }

}

const entradaService = new serviceEntrada();
export default entradaService;
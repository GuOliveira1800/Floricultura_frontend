import Config from "../../config/config";
import api from "../../../api";
import { Linking } from 'react-native';

class servicePedido{

    async request(endPoint){
        try{
            const response = await fetch(Config+endPoint);
            const json = await response.json();        
            return json;
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    async getPedido(){          
        return await this.request('pedido/listar');
    };

    async deletarProduto(codigoPedido,codigoProduto){  
        try{
            const response = await fetch(Config+'pedido/remover/'+codigoPedido+'/'+codigoProduto);
        }catch(error){
            console.log(error);
        }
    };

    async criarPedido(data){
        console.log(data);
        
        return api.post("/pedido/salva",data)
        .then((response) => {
            console.log(response);
            return response;
        }).catch((error) => {
            console.log(error);
        }); 
    }

    abrirWhatsApp (phone,msg) {
        const numeroTelefone = '+55 47 8857-1161'; // Substitua pelo número desejado
        const mensagem = 'teste mensagem'; // Opcional: mensagem pré-definida
    
        const url = `whatsapp://send?phone=${numeroTelefone}&text=${mensagem}`;
    
        Linking.canOpenURL(url)
          .then((supported) => {
            if (!supported) {
              console.log('Não é possível abrir o WhatsApp. Certifique-se de tê-lo instalado no seu dispositivo.');
            } else {
              return Linking.openURL(url);
            }
          })
          .catch((err) => console.error('Erro ao tentar abrir o WhatsApp:', err));
    };
}

const pedidoService = new servicePedido();
export default pedidoService;
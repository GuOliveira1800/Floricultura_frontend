import { Linking } from 'react-native';

const abrirWhatsApp = () => {
  const numeroTelefone = '554788571161'; // Substitua pelo número desejado
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

// Em algum lugar no seu código, chame a função abrirWhatsApp quando desejar abrir o WhatsApp.

import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import usuarioService from "../../service/signIn/serviceUsuario";

export default function ClientePesquisaScreen ({ navigation, route }) {
  const [pesquisa, setPesquisa] = useState('');
  const [cliente, setCliente] = useState(null);

    const handlePesquisar = async () => {
        const lista = await usuarioService.getClientePorNome(pesquisa);

        setProdutos(lista);
    };

    const pegar = async () => {
        if(!cliente){
            const todos = await usuarioService.getCliente();
            setCliente(todos); 
        }       
    }

    pegar();

    const handleProdutoSelecionado = (cliente) => {
    
    route.params.onProdutoSelecionado(cliente);
    navigation.goBack();
  };

  return (
    <View
        style={{marginTop: 50}}
    >
      <TextInput
        placeholder="Pesquisar Cliente"
        value={pesquisa}
        onChangeText={setPesquisa}
        style={{
            fontSize: 20
        }}
      />
      <Button title="Pesquisar" onPress={handlePesquisar} />

      <FlatList
        data={cliente}
        keyExtractor={(item) => item.codigo_usu.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProdutoSelecionado(item)}>
            <Text style={{
                fontSize: 20,
                padding: 5,
                borderBottomColor: 'rgb(0,0,0)',
                borderBottomWidth: 1
            }}>{item.nome_cli}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

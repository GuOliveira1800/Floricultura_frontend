import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import usuarioService from "../../service/signIn/serviceUsuario";

export default function FornecedorPesquisaScreen ({ navigation, route }) {
  const [pesquisa, setPesquisa] = useState('');
  const [fornecedor, setProdutos] = useState(null);

  const handlePesquisar = async () => {
    const lista = await usuarioService.getFornecedorPorNome(pesquisa);

    setProdutos(lista);
  };

  const pegar = async () => {
        if(!fornecedor){
            const todos = await usuarioService.getFornecedor();
            setProdutos(todos); 
        }       
    }

pegar();

  const handleProdutoSelecionado = (produtoId) => {
    
    route.params.onProdutoSelecionado(produtoId);
    navigation.goBack();
  };

  return (
    <View
        style={{marginTop: 50}}
    >
      <TextInput
        placeholder="Pesquisar Produto"
        value={pesquisa}
        onChangeText={setPesquisa}
        style={{
            fontSize: 20
        }}
      />
      <Button title="Pesquisar" onPress={handlePesquisar} />

      <FlatList
        data={fornecedor}
        keyExtractor={(item) => item.codigo_for.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProdutoSelecionado(item)}>
            <Text style={{
                fontSize: 20,
                padding: 5,
                borderBottomColor: 'rgb(0,0,0)',
                borderBottomWidth: 1
            }}>{item.nomeFor}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

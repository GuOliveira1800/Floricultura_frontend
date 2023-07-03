import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import serviceProduto from '../../service/produto/serviceProduto';

export default function ProdutoPesquisaScreen ({ navigation, route }) {
  const [pesquisa, setPesquisa] = useState('');
  const [produtos, setProdutos] = useState(null);

  const handlePesquisar = async () => {
    const lista = await serviceProduto.getProdutoNome(pesquisa);

    setProdutos(lista);
  };

  const pegar = async () => {
        if(!produtos){
            const todos = await serviceProduto.getProduto();
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
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProdutoSelecionado(item)}>
            <Text style={{
                fontSize: 20,
                padding: 5,
                borderBottomColor: 'rgb(0,0,0)',
                borderBottomWidth: 1
            }}>{item.nome_prd}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

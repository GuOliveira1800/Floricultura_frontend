import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { TextInputMask } from "react-native-masked-text";
import serviceEntrada from '../../service/Entrada/serviceEntrada';

export default function CadastroScreen ({ navigation, route }) {
  const [produto, setProduto] = useState(null);
  const [nomeProduto, setNomeProduto] = useState('');
  const [fornecedor, setFornecedor] = useState(null);
  const [nomeFornecedor, setNomeFornecedor] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [valorUnitario, setValorUnitario] = useState(0);
  const [dataEntrada, setDataEntrada] = useState('');

  const handleProdutoPress = () => {
    navigation.navigate('ProdutoPesquisa', { onProdutoSelecionado: handleProdutoSelecionado });
  };

  const handleFornecedorPress = () => {
    navigation.navigate('FornecedorPesquisa', { onProdutoSelecionado: handleFornecedorSelecionado });
  };

  const handleProdutoSelecionado = (produto) => {
    setProduto(produto);
    setNomeProduto(produto.nome_prd);
  };

  const handleFornecedorSelecionado = (fornecedor) => {
    setFornecedor(fornecedor);
    setNomeFornecedor(fornecedor.nomeFor);
  };

  const handleCadastroPress = () => {
    let codprd_ent = produto;
    let codfor_ent = fornecedor;
    let quanti_ent = quantidade;
    let valuni_ent = valorUnitario;
    let datent_ent = dataEntrada.substring(6,10)+'-'+dataEntrada.substring(3,5)+'-'+dataEntrada.substring(0,2);

    const cadastroData = {
        quanti_ent,
        valuni_ent,
        datent_ent,
        codprd_ent,
        codfor_ent
    };
    console.log(cadastroData);
    serviceEntrada.criarProduto(cadastroData);

    setProduto(null);
    setFornecedor(null);
    setNomeFornecedor('');
    setNomeProduto('');
    setQuantidade(0);
    setValorUnitario(0);
    setDataEntrada('');

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
  };

  // Acessar a função onProdutoSelecionado
  const onProdutoSelecionado = route.params?.onProdutoSelecionado;

  return (
    <View>
      <View style={{flexDirection: 'row', padding: 3}}>        
      <Button title="Produto" onPress={handleProdutoPress} />
        <TextInput            
            value={nomeProduto}      
            editable={false}      
            style={{
                width: 294,
                borderBottomWidth: 1,
                padding: 2,
                marginEnd: 3,
                marginStart: 2,
                color: 'rgb(0,0,0)'
            }}            
        />        
      </View>
      <View style={{flexDirection: 'row', padding: 3}}>
        <Button title="Fornecedor" onPress={handleFornecedorPress} />
        <TextInput            
            value={nomeFornecedor}      
            editable={false}      
            style={{
                width: 270,
                borderBottomWidth: 1,
                padding: 2,
                marginEnd: 3,
                marginStart: 2,
                color: 'rgb(0,0,0)'
            }}            
        />
        
      </View>
      <View style={{flexDirection: 'row', padding: 3}}>
        <Text
            style={{
                fontSize: 20, 
                textAlign: 'center', 
                verticalAlign: 'middle'
            }}>Quantidade:</Text>
        <TextInput            
            value={quantidade.toString()}
            onChangeText={value => setQuantidade(value)}                    
            style={{
                width: 270,
                borderBottomWidth: 1,
                padding: 2,
                marginEnd: 3,
                marginStart: 2,
                color: 'rgb(0,0,0)'
            }}            
        />        
      </View>
      <View style={{flexDirection: 'row', padding: 3}}>
        <Text
            style={{
                fontSize: 20, 
                textAlign: 'center', 
                verticalAlign: 'middle'
            }}>Valor Unitario:</Text>
        <TextInputMask            
            value={valorUnitario.toString()}
            onChangeText={value => setValorUnitario(parseFloat(value.replace('R$','').replace(',','.')))}    
            keyboardType='decimal-pad'
            type='money'                
            style={{
                width: 250,
                borderBottomWidth: 1,
                padding: 2,
                marginEnd: 3,
                marginStart: 2,
                color: 'rgb(0,0,0)'
            }}            
        />        
      </View>
      <View style={{flexDirection: 'row', padding: 3}}>
        <Text
            style={{
                fontSize: 20, 
                textAlign: 'center', 
                verticalAlign: 'middle'
            }}>Data de Entrada:</Text>
        <TextInputMask            
            value={dataEntrada}
            onChangeText={value => setDataEntrada(value)}
            keyboardType='number-pad'
            type='datetime'
            maxLength={10}       
            style={{
                width: 230,
                borderBottomWidth: 1,
                padding: 2,
                marginEnd: 3,
                marginStart: 2,
                color: 'rgb(0,0,0)'
            }}            
        />                
      </View>
      <View
        style={{
            marginTop : 20,            
            alignContent: 'center',
            alignItems: 'center'
        }}
      >
        <Button
            onPress={handleCadastroPress}
            title='Salvar'            
        />
      </View>
    </View>
  );
};


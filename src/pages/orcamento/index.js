import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, StyleSheet,FlatList, TouchableOpacity, Text, TextInput } from "react-native";
import { Button, FAB,Icon,Image,ListItem } from 'react-native-elements';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Orcamento(){

    const [items, setItems] = useState([]);
    const [valorTotal, setValorTotal] = useState(0.00);
    const navigation = useNavigation();

    const addItem = (newItem) => {
        setItems([...items, newItem]);
        handleProdutoSetaQtd(newItem,0);
    };    

    const handleProdutoPress = () => {
        navigation.navigate('ProdutoPesquisaOrcamento', { onProdutoSelecionado: handleProdutoSelecionado, listaIncluido : items });
    };
    
    const handleProdutoSelecionado = (produto) => {
        addItem(produto);
    };

    const removeProduct = (productId) => {
        setItems((items) => items.filter((product) => product.id !== productId));
    };

    const handleProdutoSetaQtd = (productLista, novaQtd) => {
        setItems((items) =>
        items.map((product) =>
            product.id === productLista.id ? { ...product, qtd_prd: novaQtd } : product
          )
        );
    };

    const handleProdutoCalc = () => {
        const total = items.reduce(
            (accumulator, product) => accumulator + (product.valuni_prd * product.qtd_prd), 0
          );
          setValorTotal(total);
    };

    return(        
        <View>
            <FlatList    
                style={{maxHeight: 340}}                  
                keyExtractor={ items => items.id.toString()}
                data={items}
                renderItem={({item}) => 
                    <ListItem
                        bottomDivider                        
                    >
                        <Image source={{uri: "data:image/png;base64,"+item.foto_prd, scale: 5}} style={{height: 50, width: 50, borderRadius: 15}}/>
                        <ListItem.Content>
                            
                            <View style={styles.container}>
                                <ListItem.Title style={{fontSize: 25}} >{item.nome_prd}</ListItem.Title>                            
                                <Icon name="delete" style={styles.icon} onPress={() => removeProduct(item.id)} />                                
                            </View>
                            <ListItem.Subtitle>{item.descri_prd}</ListItem.Subtitle>
                            <TextInput
                                style={styles.qtd}
                                editable
                                numberOfLines={1}
                                keyboardType='number-pad'
                                placeholder="Quantidade"
                                onChangeText={value => {
                                    if(value.length > 0){
                                        handleProdutoSetaQtd(item,Number.parseInt(value))
                                    }
                                }}
                                value={item.qtd_prd.toString()}
                            />                       
                        </ListItem.Content>
                    </ListItem>
                }
            />
            <View
                style={{flexDirection: "row"}}            
            >
                <TouchableOpacity 
                    style={styles.botaoAdd}
                    onPress={handleProdutoPress}
                >
                    <Text style={styles.textoDeleta} >Adicionar Produto</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.botaoAdd}
                    onPress={() => {
                        setItems([]);
                        setValorTotal(0);
                    }}
                >
                    <Text style={styles.textoDeleta} >Limpar Lista</Text>
                </TouchableOpacity>                
            </View>
            <TouchableOpacity 
                style={styles.botaoLimpar}
                onPress={handleProdutoCalc}
            >
                <Text style={styles.textoDeleta} >Calcular</Text>
            </TouchableOpacity>
            <View>
                <Text
                    style={{fontSize: 25, textAlign: "center"}}
                >
                    Valor Total: R$ {valorTotal},00
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Alinha os elementos em linha
        justifyContent: 'space-between', // Alinha os elementos no começo e fim da linha
        alignItems: 'center', // Alinha verticalmente no centro        
        minWidth: 300,
        maxHeight: 300
      },
      icon: {
        marginLeft: 'auto', // Move o ícone para a direita
      },
      botaoAdd:{
        marginTop: 2,
        backgroundColor: 'rgb(0,0,255)',
        borderRadius: 2,
        height: 35,
        verticalAlign: "middle",
        marginBottom: 5,
        minWidth: 190,        
        marginLeft: 5
    },
    botaoLimpar:{
        marginTop: 2,
        backgroundColor: 'rgb(0,0,255)',
        borderRadius: 2,
        height: 35,
        verticalAlign: "middle",
        marginBottom: 5,
        minWidth: 190,      
        marginLeft: 5,
        marginRight: 3
    },
    textoDeleta:{
        fontSize: 14,
        textAlign: "center",
        color: 'rgb(255,255,255)',
        marginTop: 6
    }
})
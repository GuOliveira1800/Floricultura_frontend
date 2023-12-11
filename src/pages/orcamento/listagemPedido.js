import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect} from "react";
import { View, StyleSheet,FlatList } from "react-native";
import { FAB,Image,ListItem } from 'react-native-elements';
import { useNavigation, useRoute } from "@react-navigation/native";

import pedidoService from '../../service/pedido/servicePedido';


export default function ListaPedido({ navigation, route }){

    const [todos, setTodos] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const todosPedido = await pedidoService.getPedido();
            setTodos(todosPedido); 
          } catch (error) {
            console.error('Erro ao obter dados do serviço:', error);
          }
        };
      
        fetchData(); // Chama a função assíncrona imediatamente
      
        // Por exemplo, você pode recarregar dados ou fazer outras operações aqui
      },  [route.params]);

    const HandleProdutoCadastrado = (produto) => {        
        setTodos(produto);        
    };

    return(
        
            <View>
                <FlatList
                    keyExtractor={ todos => todos.id.toString()}
                    data={todos}
                    renderItem={({item}) => 
                        <ListItem
                            bottomDivider
                            onPress={() =>{
                                navigation.navigate('CadOrc',{idPedido: item.id});
                            }}
                        >                            
                            <ListItem.Content>
                                <ListItem.Title style={{fontSize: 25}} >{item.id} - {item.codigoCliente.nome_cli}</ListItem.Title>
                                <ListItem.Subtitle>Valor total: {item.valorTotal}</ListItem.Subtitle>                            
                            </ListItem.Content>
                        </ListItem>
                    }
                />
                <FAB 
                    icon={{ name: 'add', color: 'white' }}
                    style={styles.botaoFAB}
                    onPress={() =>{
                        navigation.navigate('CadOrc',{idPedido: 0});
                    }}
                />
            </View>                    
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
    botaoFAB:{
        position: "absolute",
        top: 560,
        left: 340
    }
})
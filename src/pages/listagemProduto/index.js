import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, StyleSheet,FlatList } from "react-native";
import { FAB,Image,ListItem } from 'react-native-elements';
import { useNavigation, useRoute } from "@react-navigation/native";

import produtoService from '../../service/produto/serviceProduto';


export default function ListaProduto(){

    const [todos, setTodos] = useState(null);
    const navigation = useNavigation();

    const pegar = async () => {
        
        const todoClientes = await produtoService.getProduto();

        setTodos(todoClientes);        
    }

    pegar();

    return(
        
            <View>
                <FlatList
                    keyExtractor={ todos => todos.id.toString()}
                    data={todos}
                    renderItem={({item}) => 
                        <ListItem
                            bottomDivider
                            onPress={() =>{
                                navigation.navigate('CadPrd',{id: item.id})
                            }}
                        >
                            <Image source={{uri: "data:image/png;base64,"+item.foto_prd, scale: 5}} style={{height: 50, width: 50, borderRadius: 15}}/>
                            <ListItem.Content>
                                <ListItem.Title style={{fontSize: 25}} >{item.nome_prd}</ListItem.Title>
                                <ListItem.Subtitle>{item.descri_prd}</ListItem.Subtitle>                            
                            </ListItem.Content>
                        </ListItem>
                    }
                />
                <FAB 
                    icon={{ name: 'add', color: 'white' }}
                    style={styles.botaoFAB}
                    onPress={() =>{
                        navigation.navigate('CadPrd',{id: 0})
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
    container: {
        
    },
    containerLogo: {
        
    },
    botaoFAB:{
        position: "absolute",
        top: 560,
        left: 340
    }
})
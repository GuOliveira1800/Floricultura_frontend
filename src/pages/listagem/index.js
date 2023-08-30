import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, StyleSheet,FlatList } from "react-native";
import { Avatar, FAB,Image,ListItem } from 'react-native-elements';
import usuarioService from "../../service/signIn/serviceUsuario";
import { useNavigation, useRoute } from "@react-navigation/native";


export default function Lista(){

    const [todos, setTodos] = useState(null);    
    const navigation = useNavigation();

    const pegar = async () => {
        if (todos === null){
            const todoClientes = await usuarioService.getCliente();
            setTodos(todoClientes);        
        }
    }

    const HandleClienteCadastrado = (clientes) => {        
        setTodos(clientes);        
    };

    pegar();
    
    return(
        
            <View>
                <FlatList
                    keyExtractor={ todos => todos.codigo_usu.toString()}
                    data={todos}
                    renderItem={({item}) => 
                        <ListItem
                            bottomDivider
                            onPress={() =>{                                                                
                                navigation.navigate('CadCli',{idCliente: item.codigo_usu, onClienteCadastrado: HandleClienteCadastrado});
                            }}
                        >
                            <Image source={{uri: "data:image/png;base64,"+item.foto_cli, scale: 5}} style={{height: 50, width: 50, borderRadius: 15}}/>
                            <ListItem.Content>
                                <ListItem.Title style={{fontSize: 25}} >{item.nome_cli}</ListItem.Title>
                                <ListItem.Subtitle>{item.docume_cli}</ListItem.Subtitle>                            
                            </ListItem.Content>
                        </ListItem>
                    }
                />
                <FAB 
                    icon={{ name: 'add', color: 'white' }}
                    style={styles.botaoFAB}
                    onPress={() =>{
                        navigation.navigate('CadCli',{idCliente: 0, onClienteCadastrado: HandleClienteCadastrado});                        
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
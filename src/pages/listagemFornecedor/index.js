import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, StyleSheet,FlatList } from "react-native";
import { Avatar, FAB,Image,ListItem } from 'react-native-elements';
import usuarioService from "../../service/signIn/serviceUsuario";
import { useNavigation, useRoute } from "@react-navigation/native";


export default function ListaFornecedor(){

    const [todos, setTodos] = useState(null);    
    const navigation = useNavigation();

    const pegar = async () => {

        const todos = await usuarioService.getFornecedor();

        setTodos(todos);        
    }

    pegar();
    
    return(
        
            <View>
                <FlatList
                    keyExtractor={ todos => todos.codigo_for.toString()}
                    data={todos}
                    renderItem={({item}) => 
                        <ListItem
                            bottomDivider
                            onPress={() =>{
                                setTodos(null);
                                navigation.navigate('CadFor',{id: item.codigo_for})
                            }}
                        >
                            <Image source={{uri: "data:image/png;base64,"+item.foto_for, scale: 5}} style={{height: 50, width: 50, borderRadius: 15}}/>
                            <ListItem.Content>
                                <ListItem.Title style={{fontSize: 25}} >{item.nome_for}</ListItem.Title>
                                <ListItem.Subtitle>{item.docume_for}</ListItem.Subtitle>                            
                            </ListItem.Content>
                        </ListItem>
                    }
                />
                <FAB 
                    icon={{ name: 'add', color: 'white' }}
                    style={styles.botaoFAB}
                    onPress={() =>{
                        navigation.navigate('CadFor',{id: 0});
                        setTodos(null);
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
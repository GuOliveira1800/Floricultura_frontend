import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button,TouchableOpacity } from "react-native";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import usuarioService from "../../service/signIn/serviceUsuario";
import { CheckBox } from "react-native-elements";

export default function Welcome(){

    const [usuario, setUsuario] = useState(null);
    const [senha, setSenha] = useState(null);
    const [aparece, setAparece] = useState(true);

    const navigation = useNavigation();
    
    const entrar = async () => {

        let data = {
            login_usu: usuario,
            senha_usu: senha
        }
        
        const status = await usuarioService.login(data);
        console.log(status)
        if (status.httpStatus == 200){

            setSenha("");
            setUsuario("");

            navigation.navigate('SignIn',{'codigoUsu': status.codigo});
        }
    }

    const cadastra = async () => {
        navigation.navigate('CadUsu');
    }

    return(
        <View style={styles.container} >
            <View style={styles.containerLogo} >
                <Image
                source={require('../../../assets/flor.jpg')}
                style={styles.foto}
                />
            </View>
            <View style={styles.containerTexto}>
            <TextInput
                    style={styles.usuario}
                    editable
                    multiline
                    numberOfLines={1}
                    maxLength={50}
                    placeholder="Usuario"
                    id="usuario"
                    value={usuario}
                    onChangeText={value => setUsuario(value)}
                />
                <TextInput
                    style={styles.senha}
                    editable                    
                    placeholder="senha"
                    secureTextEntry={aparece}                    
                    value={senha}
                    onChangeText={value => setSenha(value)}
                />
                <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'flex-start'}} >
                    <CheckBox containerStyle ={{backgroundColor: 'transparent', borderWidth: 0}} title={"Mostra senha"} onPress={() => {
                        setAparece(!aparece);
                    }} checked={!aparece} />
                </View>
                <Button 
                    title="Entrar"
                    style={styles.botao}
                    onPress={() => entrar()}
                />
                <TouchableOpacity onPress={(cadastra)} style={styles.botaoCad}>
                    <Text style={{textAlign: "center", color: "#ffff"}} >
                        Cadastrar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    botao: {
        
    },
    botaoCad: {
        marginTop: 10,
        top: 10,
        textAlign: "center",
        borderColor: "#fcf",
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        backgroundColor: "#fcff"
    },
    usuario: {
        fontSize: 20,
        padding: 10,
        borderBottomWidth: 1
    },
    senha: {
        fontSize: 20,
        marginTop: 30,
        padding: 10,
        marginBottom: 15,
        borderBottomWidth: 1
    },
    container: {
        alignSelf: "center",
        width: 300
    },
    containerLogo: {
        width: 300
    },
    containerTexto: {
        marginTop: 50,
        width: 300
    },
    foto:{
        width: 120,
        height: 120,
        marginTop: 50 ,
        resizeMode: "stretch",
        margin: "auto",
        borderRadius: 500,
        marginLeft: 100
    }
})
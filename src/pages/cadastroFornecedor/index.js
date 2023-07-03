import React, { useState } from "react";
import { Button } from "react-native";
import { View, StyleSheet, TextInput } from "react-native";
import usuarioService from "../../service/signIn/serviceUsuario";
import { useNavigation } from "@react-navigation/native";

import CameraComponent from "./cameraComponent";
import { binary } from "./cameraComponent";
import { TextInputMask } from "react-native-masked-text";
import { CheckBox } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

export default function CadastroFornecedor(props){

    const [codigo, setCodigo] = useState(null);

    const [nome, setNome] = useState(null);
    const [documento, setDocumento] = useState(null);
    const [cep, setCep] = useState(null);
    const [telefone, setTelefone] = useState(null);

    const [isCnpj, setIsCnpj] = useState(false);
    const [typeMask, setTypeMask] = useState('cpf');
    
    const setarMaskDoc = () =>{
        setIsCnpj(!isCnpj);
        setDocumento("");
        if(isCnpj){
            setTypeMask("cpf");               
        }else{
            setTypeMask("cnpj");    
        }
        
    };

    const [foto, setFoto] = useState(null);

    const setaImg = (item) =>{
        setFoto(item);
    }

    const [todos, setTodos] = useState(null);
    const navigation = useNavigation();

    const pegar = async () => {
        console.log(props.route.params.id);
        if(props.route.params.id != 0 && codigo == null){

        const fornecedor = await usuarioService.getFornecedorID(props.route.params.id);
        
        setCodigo(String(props.route.params.id));
        setNome(fornecedor.nomeFor);
        setTelefone(fornecedor.telefo_for);
        console.log(fornecedor.docume_for);
        setDocumento(fornecedor.docume_for);
        setCep(fornecedor.codend_for.cep_end);
        setFoto(fornecedor.foto_for);

        props.route.params.id = 0;

        }
    }

    pegar();

    const cadastra = async () => {
        let data;

        if(codigo){
            data = {
                codigo_for: codigo,
                nome_for: nome,
                docume_for: documento,
                cep_end: cep,
                telefo_for: telefone,
                foto_for: foto
            }
        }else{
            data = {
                nome_for: nome,
                docume_for: documento,
                cep_end: cep,
                telefo_for: telefone,
                foto_for: foto
            }
        }

        const status = await usuarioService.criarFornecedor(data);
        
        
        navigation.navigate('SignIn',{'atualizar': true});
        
    }

    const deleta = async () => {

        const status = await usuarioService.deletarFornecedor(codigo);
        
        navigation.navigate('SignIn',{'atualizar': true});
        
    }

    function exibirDeleta (){
        if(codigo){
            return(
                <TouchableOpacity
                style={styles.botaoDeletar}
                onPress={() => deleta()}
                >
                    <Text style={styles.textoDeleta} >DELETAR</Text>
                </TouchableOpacity>
            )
        }
    }

    return(
        <View style={styles.container} >
            
            <CameraComponent setFotoCarrega={setaImg} fotoCarrega={foto}/>

            <View style={styles.containerTexto}>

            <View style={{flexDirection: "row"}}>
                    <Text style={styles.label}>Nome:</Text>
                    <TextInput
                        style={styles.usuario}
                        editable
                        numberOfLines={1}
                        maxLength={250}
                        placeholder="Nome"
                        id="nome"
                        onChangeText={value => setNome(value)}
                        value={nome}
                    />
                </View>

                <View style={{flexDirection: "row"}}>
                    <Text style={styles.label}>Documento:</Text>
                    <TextInputMask
                        style={styles.inputCheckCima}
                        editable                    
                        numberOfLines={1}                    
                        type={typeMask}
                        keyboardType='number-pad'
                        placeholder="Documento"
                        id="documento"
                        onChangeText={value => setDocumento(value)}
                        value={documento}
                    />
                </View>
                <CheckBox title={"É cnpj ?"} checked={isCnpj} onPress={setarMaskDoc}/>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.label}>Cep:</Text>
                    <TextInput
                        style={styles.inputCheckBaixo}
                        editable                    
                        numberOfLines={1}
                        maxLength={14}
                        keyboardType='number-pad'
                        placeholder="Cep"
                        id="cep"
                        onChangeText={value => setCep(value)}
                        value={cep}
                    />
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.label}>Telefone:</Text>
                    <TextInput
                        style={styles.senha}
                        editable
                        multiline
                        numberOfLines={1}
                        maxLength={14}
                        keyboardType='phone-pad'
                        placeholder="Telefone"
                        id="Telefone"
                        onChangeText={value => setTelefone(value)}
                        value={telefone}
                    />
                </View>
                <Button 
                    title="Cadastrar"
                    style={styles.botao}
                    onPress={() => cadastra()}
                />

                {exibirDeleta()}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    usuario: {
        fontSize: 20,
        padding: 2,
        width: 230,
        borderBottomWidth: 1
    },
    label:{
        fontSize: 20,
        marginEnd: 10,
        marginTop: 3
    },
    senha: {
        fontSize: 20,        
        padding: 2,  
        width: 208,
        marginBottom: 10,      
        borderBottomWidth: 1
    },
    inputCheckCima: {
        fontSize: 20,  
        width: 180,      
        padding: 2,        
        borderBottomWidth: 1
    },    
    inputCheckBaixo: {
        fontSize: 20,   
        width: 250,             
        padding: 2,        
        borderBottomWidth: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
    containerTexto: {
        marginTop: 50,
        width: 300
    },
    foto:{
        width: 50,
        height: 50,
        marginTop: 50 ,
        resizeMode: "stretch",
        margin: "auto",
        borderRadius: 500,
        marginLeft: 50
    },    
    botaoDeletar:{
        marginTop: 2,
        backgroundColor: 'rgb(255,0,0)',
        borderRadius: 2,
        height: 35,
        verticalAlign: "middle"
    },
    textoDeleta:{
        fontSize: 14,
        textAlign: "center",
        color: 'rgb(255,255,255)',
        marginTop: 6
    }
})
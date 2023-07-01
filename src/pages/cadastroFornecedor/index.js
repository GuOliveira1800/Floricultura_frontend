import React, { useState } from "react";
import { Button } from "react-native";
import { View, StyleSheet, TextInput } from "react-native";
import usuarioService from "../../service/signIn/serviceUsuario";
import { useNavigation } from "@react-navigation/native";

import CameraComponent from "./cameraComponent";
import { binary } from "./cameraComponent";
import { TextInputMask } from "react-native-masked-text";
import { CheckBox } from "react-native-elements";

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
        setNome(fornecedor.nome_prd);
        setTelefone(fornecedor.telefo_prd);
        setDocumento(fornecedor.docume_prd);
        setCep(fornecedor.codend_cli.cep_end);
        setFoto(fornecedor.foto_prd);

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
                <Button 
                title="Deletar"
                style={{
                    marginTop: 52,
                    backgroundColor: 'rgb(255,0,0)',
                    top: 200,
                    color: 'rgb(255,0,0)'
                }}
                onPress={() => deleta()}
                />
            )
        }
    }

    return(
        <View style={styles.container} >
            
            <CameraComponent setFotoCarrega={setaImg} fotoCarrega={foto}/>

            <View style={styles.containerTexto}>

            <TextInput
                    style={styles.usuario}
                    editable
                    multiline
                    numberOfLines={1}
                    maxLength={250}
                    placeholder="Nome"
                    id="nome"
                    onChangeText={value => setNome(value)}
                    value={nome}
                />
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
                <CheckBox title={"É cnpj ?"} checked={isCnpj} onPress={setarMaskDoc} />
                <TextInput
                    style={styles.inputCheckBaixo}
                    editable                    
                    numberOfLines={1}
                    maxLength={14}
                    keyboardType='number-pad'
                    placeholder="cep"
                    id="cep"
                    onChangeText={value => setCep(value)}
                    value={cep}
                />
                                <TextInput
                    style={styles.senha}
                    editable                    
                    numberOfLines={1}
                    maxLength={14}
                    keyboardType='phone-pad'
                    placeholder="Telefone"
                    id="Telefone"
                    onChangeText={value => setTelefone(value)}
                    value={telefone}
                />
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
    inputCheckCima: {
        fontSize: 20,
        marginTop: 5,
        marginBottom: 0,
        padding: 10,        
        borderBottomWidth: 1
    },    
    inputCheckBaixo: {
        fontSize: 20,        
        marginBottom: 5,
        padding: 10,        
        borderBottomWidth: 1
    }, 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
    containerLogo: {
        width: 300
    },
    containerTexto: {
        marginTop: 50,
        width: 300
    },
    foto:{
        width: 200,
        height: 200,
        marginTop: 50 ,
        resizeMode: "stretch",
        margin: "auto",
        borderRadius: 500,
        marginLeft: 50
    },
    botaoDeletar:{
        marginTop: 52,
        backgroundColor: 'rgb(255,0,0)',
        top: 200,
        color: 'rgb(255,0,0)'
    }
})
import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Button, Image } from "react-native";
import produtoService from "../../service/produto/serviceProduto";
import { useNavigation } from "@react-navigation/native";

import CameraComponent from "./cameraComponent";
import { binary } from "./cameraComponent";


export default function CadastroProduto(props){

    const [codigo, setCodigo] = useState(null);

    const [nome, setNome] = useState(null);
    const [descricao, setDescricao] = useState(null);
    const [quantidade, setQuantidade] = useState(null);
    const [valorUnitario, setValorUnitario] = useState(null);
    

    const navigation = useNavigation();

    const [foto, setFoto] = useState(null);
    const setaImg = (item) =>{
        setFoto(item);
    }

    const pegar = async () => {

        if(props.route.params.id !== 0 && codigo == null){
            const todoClientes = await produtoService.getClienteID(props.route.params.id);
            
            setCodigo(String(props.route.params.id));
            setNome(todoClientes.nome_prd);
            setDescricao(todoClientes.descri_prd);
            setQuantidade(String(todoClientes.qtd_prd));
            setValorUnitario(String(todoClientes.valuni_prd));
            setFoto(todoClientes.foto_prd);
            
            props.route.params.id = 0;
        }
    }

    pegar();

    const cadastra = async () => {

        let data;
        if(codigo){
            data = {
                codigo_prd: codigo,
                nome_prd: nome,
                descri_prd: descricao,
                qtd_prd: quantidade,
                valuni_prd: valorUnitario,
                foto_prd: foto
            }
        }else{
            data = {
                nome_prd: nome,
                descri_prd: descricao,
                qtd_prd: quantidade,
                valuni_prd: valorUnitario,
                foto_prd: foto
            }
        }

        const status = await produtoService.criarProduto(data);
        
        navigation.navigate('SignIn');
        
    }

    const deleta = async () => {

        const status = await produtoService.deletar(codigo);
        
        navigation.navigate('SignIn',{'atualizar': true});
        
    }

    function exibirDeleta (){
        if(codigo){
            return(
                <TouchableOpacity 
                style={styles.botaoDeletar}
                onPress={() => deleta()}
                >
                    <Text style={styles.textoDeleta} >Deletar</Text>
                </TouchableOpacity>
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
                <TextInput
                    style={styles.senha}
                    editable
                    multiline
                    numberOfLines={1}
                    maxLength={14}
                    placeholder="Drescrição"
                    id="descricao"
                    onChangeText={value => setDescricao(value)}
                    value={descricao}
                />
                <TextInput
                    style={styles.senha}
                    editable
                    numberOfLines={1}
                    maxLength={14}
                    keyboardType='number-pad'
                    placeholder="Quantidade"
                    id="quantidade"
                    onChangeText={value => setQuantidade(value)}
                    value={quantidade}
                />
                <TextInput
                    style={styles.senha}
                    editable
                    numberOfLines={1}
                    maxLength={16}
                    keyboardType='number-pad'
                    placeholder="Valor Unitario"
                    id="valorUnitario"
                    onChangeText={value => setValorUnitario(value)}
                    value={valorUnitario}
                />
                <Button 
                    title="Cadastrar"
                    style={{
                        marginTop: 52,
                        backgroundColor: 'rgb(255,0,0)',
                        top: 200,
                        color: 'rgb(255,0,0)'
                    }}
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
        marginTop: 2,
        backgroundColor: 'rgb(255,0,0)'
    },
    textoDeleta:{
        fontSize: 15,
        textAlign: "center"
    }
})
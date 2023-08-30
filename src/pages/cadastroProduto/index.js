import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Button, Image } from "react-native";
import produtoService from "../../service/produto/serviceProduto";
import { useNavigation } from "@react-navigation/native";

import CameraComponent from "./cameraComponent";
import { binary } from "./cameraComponent";


export default function CadastroProduto({ navigation, route }){

    const [codigo, setCodigo] = useState(null);

    const [nome, setNome] = useState(null);
    const [descricao, setDescricao] = useState(null);
    const [quantidade, setQuantidade] = useState(null);
    const [valorUnitario, setValorUnitario] = useState(null);
    
    const [foto, setFoto] = useState(null);
    const setaImg = (item) =>{
        setFoto(item);
    }

    const pegar = async () => {
        
        if(route.params.idProduto != 0 && codigo == null){
            const todoClientes = await produtoService.getClienteID(route.params.idProduto);
            
            setCodigo(String(route.params.idProduto));
            setNome(todoClientes.nome_prd);
            setDescricao(todoClientes.descri_prd);
            setQuantidade(String(todoClientes.qtd_prd));
            setValorUnitario(String(todoClientes.valuni_prd));
            setFoto(todoClientes.foto_prd);
            
            route.params.idProduto = 0;
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
        route.params.onProdutoCadastrado( await produtoService.getProduto());  
        navigation.goBack();
        
    }

    const deleta = async () => {
        const status = await produtoService.deletar(codigo);   
        route.params.onProdutoCadastrado( await produtoService.getProduto());     
        navigation.goBack();        
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
                        multiline
                        numberOfLines={1}
                        maxLength={250}
                        placeholder="Nome"
                        id="nome"
                        onChangeText={value => setNome(value)}
                        value={nome}
                    />
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.label}>Drescrição:</Text>
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
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.label}>Quantidade:</Text>
                    <TextInput
                        style={styles.qtd}
                        editable
                        numberOfLines={1}
                        maxLength={14}
                        keyboardType='number-pad'
                        placeholder="Quantidade"
                        id="quantidade"
                        onChangeText={value => setQuantidade(value)}
                        value={quantidade}
                    />
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.label}>Valor Unitario:</Text>
                        <TextInput
                        style={styles.valuni}
                        editable
                        numberOfLines={1}
                        maxLength={16}
                        keyboardType='number-pad'
                        placeholder="Valor Unitario"
                        id="valorUnitario"
                        onChangeText={value => setValorUnitario(value)}
                        value={valorUnitario}
                    />
                </View>
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
        padding: 2,
        borderBottomWidth: 1,
        minWidth: 230,
    },
    label:{
        fontSize: 20,
        marginEnd: 10,
        marginTop: 3
    },
    senha: {
        fontSize: 20,
        minWidth: 190,        
        padding: 2,
        marginBottom: 5,
        borderBottomWidth: 1
    },
    qtd: {
        fontSize: 20,
        minWidth: 185,        
        padding: 2,
        marginBottom: 5,
        borderBottomWidth: 1
    },
    valuni: {
        fontSize: 20,
        minWidth: 165,        
        padding: 2,
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
        width: 300,
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
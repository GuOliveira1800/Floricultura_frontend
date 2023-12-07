import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, DrawerSlideEvent } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createAppContainer } from "react-navigation";
import { useNavigation } from "@react-navigation/native";


import Lista from "../listagem";
import ListaProduto from "../listagemProduto";
import ListaFornecedor from "../listagemFornecedor";
import UsuarioTela from "../usuarioTela/usuarioTela";
import usuarioService from "../../service/signIn/serviceUsuario";
import CadastroScreen from "../cadastroEntrada/cadastroEntrada";
import Orcamento from "../orcamento";
import ListaPedido from "../orcamento/listagemPedido";

export default function SignIn(codigoUsu){
  
  const navigation = useNavigation();

  const [usuario, setUsuario] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState("Usuario");

  const pegaUsuario = async () => {    
    if(usuario === null){
      const usuarioUnico = await usuarioService.buscaNomeUsuario(codigoUsu.route.params.codigoUsu);
      setUsuario(usuarioUnico);

      setNomeUsuario(usuarioUnico.nome_usu);
    }    
  } 

  pegaUsuario();

  const Drawer = createDrawerNavigator();

    return(
      <Drawer.Navigator>  
        <Drawer.Screen name="Cliente" component={Lista} initialParams={ {CliqueAtualizar : true}} />        
        <Drawer.Screen name="Produtos" component={ListaProduto} />
        <Drawer.Screen name="Fornecedor" component={ListaFornecedor} />                
        <Drawer.Screen name="Entradas" component={CadastroScreen} />
        <Drawer.Screen name="Criar Pedido" component={ListaPedido} />
        <Drawer.Screen name={nomeUsuario} component={UsuarioTela} />        
      </Drawer.Navigator>
    );
}

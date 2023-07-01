import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";


export default function UsuarioTela() {
  
  const navigation = useNavigation();

  const logOut = () =>{
    navigation.navigate("Welcome");
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem vindo</Text>
      <Button title={"Sair"} onPress={logOut} ></Button>      
    </View>
  );
}

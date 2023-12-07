import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as Contacts from 'expo-contacts';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import usuarioService from '../../service/signIn/serviceUsuario';

export default function UsuarioTela({ navigation, route }) {
  
  const [error, setError] = useState(undefined);
  const [contacts, setContacts] = useState(undefined);
  const [result, setResult] = useState(undefined);
  const [cliente, setCliente] = useState(undefined);

  const logOut = () =>{
    navigation.navigate("Welcome");
  }

  const importarContatos = () => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
                    Contacts.Fields.FirstName,
                    Contacts.Fields.LastName,                                   
                    Contacts.Fields.Addresses,
                    Contacts.Fields.Image,
                    Contacts.Fields.PhoneNumbers,                    
                  ]
        });

        if (data.length > 0) {          
          let cli = null;
          let listaEnd = null;
          for (let i = 0; i < data.length; i++) {
            if(data[i].image !== undefined){                          
              const tempUri = FileSystem.cacheDirectory + 'temp_img';
              await FileSystem.copyAsync({from: data[i].image.uri , to: tempUri});

              const img = await FileSystem.readAsStringAsync(tempUri, {
                  encoding: FileSystem.EncodingType.Base64,
              });

              await FileSystem.deleteAsync(tempUri);
            
              listaEnd = data[i].addresses[0].street.split(',');
            
              cli = {
                nome_cli: data[i].firstName + ' ' + data[i].lastName,
                docume_cli: '',
                cep_end: listaEnd[listaEnd.length - 2],
                telefo_cli: data[i].phoneNumbers[0].number.replace('+','').replace('-',''),
                foto_cli: img
              };
              
              usuarioService.criarCliente(cli);
            }else{                            
              listaEnd = data[i].addresses[0].street.split(',');
              
              cli = {
                nome_cli: data[i].firstName + ' ' + data[i].lastName,
                docume_cli: '',
                cep_end: listaEnd[listaEnd.length - 2],
                telefo_cli: data[i].phoneNumbers[0].number.replace('+','').replace('-',''),
                foto_cli: null
              };              
              
              usuarioService.criarCliente(cli);
            } 
          }
          
        } else {
          setError("No contacts found");
        }
      } else {
        setError("Permission to access contacts denied.");
      }
    })();
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem vindo</Text>
      <Button title={"Sair"} onPress={logOut} ></Button>  

      <Button title={"Importa Contatos"} onPress={importarContatos} ></Button>
      
    </View>
  );
}

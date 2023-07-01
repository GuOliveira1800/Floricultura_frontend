import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";


import usuarioService from '../../service/signIn/serviceUsuario';

const CadastroTela = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [login, setLogin] = useState('');

  const [aparece, setAparece] = useState(true);

  const navigation = useNavigation();

  const handleCadastro = () => {

    const data = {
      nome_usu: nome,
      email_usu: email,
      senha_usu: senha,
      login_usu: login
    }

    usuarioService.criaUsuario(data);

    navigation.navigate('Welcome');

  };

  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}        
        placeholder="Nome"
        value={nome}
        onChangeText={text => setNome(text)}
      />
      <TextInput
        keyboardType='email-address'
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}        
        placeholder="Login"
        value={login}
        onChangeText={text => setLogin(text)}
      />
      <TextInput
        style={styles.inputSenha}
        placeholder="Senha"
        secureTextEntry={aparece}
        value={senha}
        onChangeText={text => setSenha(text)}
      />
      <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'flex-start'}} >
        <CheckBox title={"Mostra senha"} onPress={() => {
            setAparece(!aparece);
        }} checked={!aparece} />
      </View>
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    fontSize: 20,
    marginTop: 30,
    padding: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    width: 330
  },
  inputSenha: {
    fontSize: 20,
    marginTop: 30,
    padding: 10,
    marginBottom: 2,
    borderBottomWidth: 1,
    width: 330
  },
});

export default CadastroTela;

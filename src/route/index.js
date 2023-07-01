import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/signIn/index';
import Welcome from '../pages/welcome';
import CadastroCliente from '../pages/cadastroCliente';
import CadastroProduto from '../pages/cadastroProduto';
import CadastroFornecedor from '../pages/cadastroFornecedor';
import CadastroUsuario from '../pages/cadastroUsuario/cadastroUsuario';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator
        initialRouteName='Welcome'
        screenOptions={{ headerShown: false }}
        >

            <Stack.Screen
            name="Welcome"
            component={Welcome}
            />

            <Stack.Screen
            name="SignIn"
            component={SignIn}
            />

            <Stack.Screen
            name="CadCli"
            component={CadastroCliente}
            />

            <Stack.Screen
            name="CadPrd"
            component={CadastroProduto}
            />

            <Stack.Screen
            name="CadFor"
            component={CadastroFornecedor}
            />

            <Stack.Screen
            name="CadUsu"
            component={CadastroUsuario}
            />

        </Stack.Navigator>
    );
}
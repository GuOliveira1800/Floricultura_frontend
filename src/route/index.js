import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/signIn/index';
import Welcome from '../pages/welcome';
import CadastroCliente from '../pages/cadastroCliente';
import CadastroProduto from '../pages/cadastroProduto';
import CadastroFornecedor from '../pages/cadastroFornecedor';
import CadastroUsuario from '../pages/cadastroUsuario/cadastroUsuario';
import ProdutoPesquisaScreen from '../pages/cadastroEntrada/pesquisaProduto';
import FornecedorPesquisaScreen from '../pages/cadastroEntrada/pesquisaFornecedor'; 
import ProdutoPesquisaOrcamentoScreen from '../pages/orcamento/pesquisaProduto';
import CadastroOrcamento from '../pages/orcamento/cadastroOrcamento';
import ClientePesquisaScreen from '../pages/pesquisas/pesquisaCliente';

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

            <Stack.Screen
            name="ProdutoPesquisa"
            component={ProdutoPesquisaScreen}
            />

            <Stack.Screen
            name="ProdutoPesquisaOrcamento"
            component={ProdutoPesquisaOrcamentoScreen}
            />            

            <Stack.Screen
            name="FornecedorPesquisa"
            component={FornecedorPesquisaScreen}
            />

            <Stack.Screen
            name="ClientePesquisa"
            component={ClientePesquisaScreen}
            />

            <Stack.Screen
                name="CadOrc"
                component={CadastroOrcamento}
            />

        </Stack.Navigator>
    );
}
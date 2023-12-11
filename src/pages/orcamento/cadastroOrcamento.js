import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from "react";
import { View, StyleSheet,FlatList, TouchableOpacity, Text, TextInput, Linking } from "react-native";
import { Button, FAB,Icon,Image,ListItem } from 'react-native-elements';
import pedidoService from "../../service/pedido/servicePedido";

export default function CadastroOrcamento({ navigation, route }){

    const [items, setItems] = useState([]);
    const [itemsDelete, setDelete] = useState([]);
    const [valorTotal, setValorTotal] = useState(0.00);    
    const [codigo,setCodigo] = useState(null);
    const [cliente,setCliente] = useState(null);
    const [pedido,setPedido] = useState(null);

    const addItem = (newItem) => {
        setItems([...items, newItem]);
        handleProdutoSetaQtd(newItem,0);
    };   

    const addItemDelete = (newItem) => {
        setDelete([...items, newItem]);
    };  

    const handleProdutoPress = () => {
        navigation.navigate('ProdutoPesquisaOrcamento', { onProdutoSelecionado: handleProdutoSelecionado, listaIncluido : items });
    };
    
    const handleProdutoSelecionado = (produto) => {
        addItem(produto);
    };

    const removeProduct = (productId) => {
        setItems((items) => items.filter((product) => product.id !== productId));
        addItemDelete(productId);
    };

    const handleProdutoSetaQtd = (productLista, novaQtd) => {
        setItems((items) =>
        items.map((product) =>
            product.id === productLista.id ? { ...product, qtd_prd: novaQtd } : product
          )
        );
    };

    const handleProdutoCalc = () => {
        const total = items.reduce(
            (accumulator, product) => accumulator + (product.valuni_prd * product.qtd_prd), 0);
          setValorTotal(total);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            if(route.params.idPedido != 0 && codigo == null){
                setCodigo(route.params.idPedido);
                console.log(route.params.idPedido);
                const todoClientes = await pedidoService.request('pedido/listar/unico/'+route.params.idPedido);
                
                setPedido(todoClientes);
                setItems(todoClientes.codigoProduto);
                console.log(todoClientes);
                handleFornecedorSelecionado(todoClientes.codigoPedido.codigoCliente);
            }
          } catch (error) {
            console.error('Erro ao obter dados do serviço:', error);
          }
        };
      
        fetchData(); // Chama a função assíncrona imediatamente
      
        // Por exemplo, você pode recarregar dados ou fazer outras operações aqui
      }, [route.params]);

    const handleFornecedorPress = () => {
        navigation.navigate('ClientePesquisa', { onProdutoSelecionado: handleFornecedorSelecionado });
    };

    const handleFornecedorSelecionado = (Cliente) => {
        setCliente(Cliente);        
    };

    const salvar = () => {

        if (codigo !== null){
            itemsDelete.map(produto => {
                pedidoService.request("pedido/remover/"+codigo+"/"+produto.id);
            })
            
        }
       
        let quantidadeTotal = items.reduce((accumulator, product) => accumulator +product.qtd_prd, 0);
        


        if (codigo === null){

            let ped = {
                codigoPedido :  {
                    codigoCliente : null
                }
            };

            ped.codigoPedido.codigoCliente = {
                "codigo_usu": cliente.codigo_cli,
                "nome_cli" : cliente.nome_cli,
                "docume_cli" : cliente.docume_cli,
                "telefo_cli" : cliente.telefo_cli,
                "foto_cli" : cliente.foto_cli,
                "codend_cli" : cliente.codend_cli
            }

            const data = {
                "valorTotal": valorTotal,
                "quantidadeProduto" : quantidadeTotal,
                "codigoPedido": ped,
                "codigoProduto" : items
            };

            pedidoService.criarPedido(data);
            navigation.goBack();
        }else{

            console.log(pedido);
            pedido.codigoPedido.id = codigo;

            pedido.codigoPedido.codigoCliente = {
                "codigo_usu": cliente.codigo_cli,
                "nome_cli" : cliente.nome_cli,
                "docume_cli" : cliente.docume_cli,
                "telefo_cli" : cliente.telefo_cli,
                "foto_cli" : cliente.foto_cli,
                "codend_cli" : cliente.codend_cli
            }
            const data = {
                "valorTotal": valorTotal,
                "quantidadeProduto" : quantidadeTotal,
                "codigoPedido": pedido.codigoPedido,
                "codigoProduto" : items
            };

            pedidoService.criarPedido(data);
            navigation.goBack();
        }
    }

    const abrirWhatsApp = () => {
        const numeroTelefone = cliente.telefo_cli; // Substitua pelo número desejado
        let mensagem = 'Orçamento do pedido: '; // Opcional: mensagem pré-definida

        pedido.codigoProduto.forEach((item) => {
            mensagem += `%0a${item.qtd_prd}x - ${item.descri_prd}`;
        });

        mensagem += `%0aValor Total: ${valorTotal}.`;

        const url = `whatsapp://send?phone=${numeroTelefone}&text=${mensagem}`;
      
        Linking.canOpenURL(url)
          .then((supported) => {
            if (!supported) {
              console.log('Não é possível abrir o WhatsApp. Certifique-se de tê-lo instalado no seu dispositivo.');
            } else {
              return Linking.openURL(url);
            }
          })
          .catch((err) => console.error('Erro ao tentar abrir o WhatsApp:', err));
    };

    return(        
        <View>

            <View>
                <Text style={styles.tituloTela}>Novo Pedido</Text>
            </View>

            <View style={{flexDirection: 'row', padding: 3}}>
                <Button title="Cliente" onPress={handleFornecedorPress} />
                <TextInput            
                    value={(cliente?.nome_cli ? cliente.nome_cli : '')}      
                    editable={false}      
                    style={{
                        width: 270,
                        borderBottomWidth: 1,
                        padding: 2,
                        marginEnd: 3,
                        marginStart: 2,
                        color: 'rgb(0,0,0)'
                    }}            
            />        
            </View>            

            <FlatList    
                style={{maxHeight: 340}}                  
                keyExtractor={ items => items.id.toString()}
                data={items}
                renderItem={({item}) => 
                    <ListItem
                        bottomDivider                        
                    >
                        <Image source={{uri: "data:image/png;base64,"+item.foto_prd, scale: 5}} style={{height: 50, width: 50, borderRadius: 15}}/>
                        <ListItem.Content>
                            
                            <View style={styles.container}>
                                <ListItem.Title style={{fontSize: 25}} >{item.nome_prd}</ListItem.Title>                            
                                <Icon name="delete" style={styles.icon} onPress={() => removeProduct(item.id)} />                                
                            </View>
                            <ListItem.Subtitle>{item.descri_prd}</ListItem.Subtitle>
                            <View 
                                style={{
                                    display: "flex",
                                    flexDirection: "row",                                    
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() =>{
                                        handleProdutoSetaQtd(item,item.qtd_prd + 1);
                                    }}
                                >
                                    <Icon name="add" style={styles.icon}/>
                                </TouchableOpacity>
                                <Text                                    
                                    style={{padding: 5, fontSize: 15}}
                                    >
                                {item.qtd_prd.toString()}
                                </Text>
                                <TouchableOpacity
                                    onPress={() =>{
                                        if (item.qtd_prd > 0){
                                            handleProdutoSetaQtd(item,item.qtd_prd - 1);
                                        }                                        
                                    }}
                                >
                                    <Icon name="remove" style={styles.icon}/>
                                </TouchableOpacity>
                            </View>
                        </ListItem.Content>
                    </ListItem>
                }
            />
            <View
                style={{flexDirection: "row"}}            
            >
                <TouchableOpacity 
                    style={styles.botaoAdd}
                    onPress={handleProdutoPress}
                >
                    <Text style={styles.textoDeleta} >Adicionar Produto</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.botaoAdd}
                    onPress={() => {
                        setItems([]);
                        setValorTotal(0);
                    }}
                >
                    <Text style={styles.textoDeleta} >Limpar Lista</Text>
                </TouchableOpacity>                
            </View>
            <TouchableOpacity 
                style={styles.botaoLimpar}
                onPress={handleProdutoCalc}
            >
                <Text style={styles.textoDeleta} >Calcular</Text>
            </TouchableOpacity>
            <View>
                <Text
                    style={{fontSize: 25, textAlign: "center"}}
                >
                    Valor Total: R$ {valorTotal},00
                </Text>
            </View>
            <TouchableOpacity 
                style={styles.botaoLimpar}
                onPress={salvar}
            >
                <Text style={styles.textoDeleta} >Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.botaoOrc}
                onPress={abrirWhatsApp}
            >
                <Text style={styles.textoDeleta} >Enviar Orçamento</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Alinha os elementos em linha
        justifyContent: 'space-between', // Alinha os elementos no começo e fim da linha
        alignItems: 'center', // Alinha verticalmente no centro        
        minWidth: 300,
        maxHeight: 300
      },
      icon: {
        marginLeft: 'auto', // Move o ícone para a direita
      },
      botaoAdd:{
        marginTop: 2,
        backgroundColor: 'rgb(0,0,255)',
        borderRadius: 2,
        height: 35,
        verticalAlign: "middle",
        marginBottom: 5,
        minWidth: 190,        
        marginLeft: 5
    },
    botaoLimpar:{
        marginTop: 2,
        backgroundColor: 'rgb(0,0,255)',
        borderRadius: 2,
        height: 35,
        verticalAlign: "middle",
        marginBottom: 5,
        minWidth: 190,      
        marginLeft: 5,
        marginRight: 3
    },
    botaoOrc:{
        marginTop: 2,
        backgroundColor: 'rgb(0,100,0)',
        borderRadius: 2,
        height: 35,
        verticalAlign: "middle",
        marginBottom: 5,
        minWidth: 190,      
        marginLeft: 5,
        marginRight: 3
    },
    textoDeleta:{
        fontSize: 14,
        textAlign: "center",
        color: 'rgb(255,255,255)',
        marginTop: 6
    },
    tituloTela:{
        fontSize: 25,
        textAlign: "center",
        height: 80,
        top: 35
    }
})
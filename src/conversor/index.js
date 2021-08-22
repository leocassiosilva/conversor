import React, {Component} from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../services/api';

class Conversor extends Component{

    constructor (props){
        super(props); 
        this.state ={
            moedaA: props.moedaA, 
            moedaB: props.moedaB, 
            moedaB_valor: 0, 
            valorConvertido:0
        };

        this.converter = this.converter.bind(this);
    }

    async converter(){
        let de_para = this.state.moedaA + '_' + this.state.moedaB
        const response = await api.get(`convert?q=${de_para}&compact=ultra&apiKey=51829653b2545f3b3741`)
        let cotacao = response.data[de_para];
        
        let resultado = (cotacao * parseFloat(this.state.moedaB_valor))
        
        this.setState({
            valorConvertido:resultado.toFixed(2)
        });

        Keyboard.dismiss();
    }
    
    render(){
        const{moedaA, moedaB} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>
                    {moedaA} para {moedaB}
                </Text>
                <TextInput
                    placeholder="Valor a ser convertido"
                    style={styles.areaInput}
                    onChangeText={(moedaB_valor) =>this.setState({moedaB_valor})}
                    keyboardType="numeric"
                /> 

                <TouchableOpacity style={styles.botaoArea} onPress={this.converter}>
                    <Text  style={styles.botaoTexto}>
                        Converter
                    </Text>
                </TouchableOpacity>


                <Text style={styles.valorConvertido}>
                    {(this.state.valorConvertido == 0) ? '' : this.state.valorConvertido }
                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    botaoArea:{
        marginTop:30,
        backgroundColor:"#1D438A", 
        width:250,
        height:40,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
    },
    botaoTexto:{
        color:'#ffffff',
        fontSize:20
    }, 
    areaInput:{
        width:250,
        height:55,
        paddingLeft: 20,
        fontSize: 17,
        borderWidth: 1,
        borderRadius:5,
        marginTop:20
    },
    titulo:{
        fontSize: 30,
    }, 
    valorConvertido:{
        fontSize:30, 
        fontWeight:'bold', 
        color:'#000',
        marginTop:15
    }
  });


  export default Conversor;
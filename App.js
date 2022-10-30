import React, { useState } from 'react';
import { Button, FlatList, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import PrevisaoItem from './components/PrevisaoItem';
import {API_KEY} from '@env';
//crie o arquivo .env na mesma pasta que o App.js e coloque lá sua API_KEY
//não se esqueça de configurar o babel.config.js
//instale o react-native-dotenv com npm install

export default function App() {
  // definição de variaveis
  const endPoint = "https://api.openweathermap.org/data/2.5/forecast?lang=pt&units=metric&q=";
  const apiKey = `${API_KEY}`;
  // hook para controlar estado da variavel cidade
  const [cidade, setCidade] = useState('');
  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }
  // hook para controlar estado da variavel previsoes
  const [previsoes, setPrevisoes] = useState([])
  const obtemPrevisoes = () => {
    setPrevisoes([]);
    const target = endPoint + cidade + "&appid=" + apiKey;
    fetch(target)
    .then((dados) => dados.json())
    .then((dados) => {
      setPrevisoes(dados['list'])
    })
    .catch((err) => {
      console.log(err);
      console.log('Deu erro.');
    });
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput 
          style={styles.nomeCidade} 
          placeholder="Digite o nome de uma cidade"
          value={cidade}
          onChangeText={capturarCidade}
        />
        <Button 
          title="Ok"
          onPress={obtemPrevisoes}
        />
      </View>
      <View>
        <FlatList
          data={previsoes}
          renderItem={
            previsao => (
              <PrevisaoItem previsao={previsao} />
            )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff'
  },
  nomeCidade: {
    padding: 10,
    borderBottomColor: '#BB96F3',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.9
  },
  entrada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  }
});
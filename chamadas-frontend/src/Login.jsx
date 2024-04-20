import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigate } from 'react-router-native';
import loginService from '../services/login';
import AppBar from './AppBar';


export default function Login() {

  window.localStorage.removeItem('cpf_logged_user')
  window.localStorage.removeItem('name_logged_user')
  window.localStorage.removeItem('role_logged_user')
  window.localStorage.removeItem('id_logged_user')

  const navigate = useNavigate();
  const [cpf, setCPF] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleCPFChange = (text) => {
    /*const numericValue = text.replace(/\D/g, '');

    const maxLength = 11;
    const truncatedCPF = numericValue.slice(0, maxLength);

    let formattedCPF = '';
    for (let i = 0; i < maxLength; i++) {
      if (i === 3 || i === 6) {
        formattedCPF += '.';
      } else if (i === 9) {
        formattedCPF += '-';
      }
      formattedCPF += truncatedCPF.charAt(i);
    }

  setCPF(formattedCPF);*/
  setCPF(text)
};

  const handleLogin = async () => {
    const credentials = { cpf, senha };
    const user = await loginService.getUser(credentials);

    window.localStorage.setItem('cpf_logged_user', user.cpf)
    window.localStorage.setItem('name_logged_user', user.nome)
    window.localStorage.setItem('role_logged_user', user.tipo)
    window.localStorage.setItem('id_logged_user', user.id)

    const id = user.id;
    const tipo = user.tipo;
    if(tipo === "professor") {
      navigate(`/turmas/professor/${id}`)
    }
    if(tipo === "aluno") {
      navigate(`/turmas/aluno/${id}`)
    }

    
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (


    <ImageBackground
      //source={require('C:/UFF/ES2/gngn/sistemaDeChamadas-new-appbar/sistemaDeChamadas-new-appbar/chamadas-frontend/assets/uff-logo.png')}
      source={require('/assets/uff-logo.png')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.loginText}>Bem-vindo à UFF</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="CPF"
            onChangeText={handleCPFChange}
            value={cpf}
            keyboardType="numeric"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              onChangeText={(text) => setSenha(text)}
              value={senha}
              secureTextEntry={!mostrarSenha}
            />
            <TouchableOpacity onPress={toggleMostrarSenha}>
              <Icon
                name={mostrarSenha ? 'eye-slash' : 'eye'}
                size={20}
                color="blue"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    padding: 20, 
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20, 
    color: '#002b5e', 
  },
  formContainer: {
    flex: 2,
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  loginButton: {
    width: '100%', 
    height: 50, 
    backgroundColor: 'blue', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 5,
    marginTop: 20, 
  },
  loginButtonText: {
    fontSize: 18,
    color: 'white', 
    fontWeight: 'bold',
  },
});

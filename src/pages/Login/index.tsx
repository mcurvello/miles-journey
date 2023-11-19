import { View, Text, Image, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import useSnackbar from "../../contexts/Snackbar";
// import { useHeaderHeight } from "@react-navigation/elements";
import { login } from "../../services/users";
import { LoginProps } from "./types";
import styles from "./styles";

import banner from "../../../assets/login/banner.png";
import icon from "../../../assets/login/icon.png";
import { Button, Card, TextInput, Title } from "react-native-paper";

export default function Login({ navigation, setUserLogged }: LoginProps) {
  const [emailOrCpf, setEmailOrCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { criarMensagem } = useSnackbar();
  // const height = useHeaderHeight();

  const handleLogin = () => {
    if (!emailOrCpf) return criarMensagem.erro("Informe o email ou CPF");
    if (!password) return criarMensagem.erro("Informe a senha");
    const userFounded = login(emailOrCpf, password);
    if (!userFounded)
      return criarMensagem.erro("Email/CPF ou senha incorretos");
    setUserLogged(userFounded);
    criarMensagem.sucesso("Login realizado com sucesso!");
    navigation.navigate("Home");
  };

  return (
    <View>
      <Image source={banner} style={styles.banner} />
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
        <Card style={styles.card}>
          <View style={styles.loginContainer}>
            <Image source={icon} style={styles.icon} />
            <Title style={styles.titulo}>Login</Title>
            <View style={styles.loginContent}>
              <View style={styles.loginForm}>
                <TextInput
                  label="Email ou CPF"
                  mode="outlined"
                  value={emailOrCpf}
                  onChangeText={setEmailOrCpf}
                />
                <TextInput
                  label="Senha"
                  mode="outlined"
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon="eye"
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  value={password}
                  onChangeText={setPassword}
                />
                <Button mode="contained" onPress={handleLogin}>
                  Acessar minha conta
                </Button>
              </View>
            </View>
            <Text style={styles.cadastrar}>Ainda não possui sua conta?</Text>
            <Text
              style={styles.cadastrarLink}
              onPress={() => navigation.navigate("Register")}
            >
              Clique aqui para se cadastrar!
            </Text>
          </View>
        </Card>
      </KeyboardAvoidingView>
    </View>
  );
}

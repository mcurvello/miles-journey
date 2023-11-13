import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { ProfileProps } from "./types";
import Icon from "@expo/vector-icons/MaterialIcons";

import useSnackbar from "../../contexts/Snackbar";
import { User } from "../../types/user";
import { changeUserData, deleteUser } from "../../services/users";
import { Button, Card, Divider, TextInput, Title } from "react-native-paper";
import styles from "./styles";
import theme from "../../config/theme";

export default function Profile({
  userLogged,
  navigation,
  setUserLogged,
}: ProfileProps) {
  const [name, setName] = useState(userLogged?.name);
  const [birthDate, setBirthDate] = useState(userLogged?.birthDate);
  const [gender, setGender] = useState(userLogged?.gender);
  const [cpf, setCpf] = useState(userLogged?.cpf);
  const [phone, setPhone] = useState(userLogged?.phone);
  const [city, setCity] = useState(userLogged?.city);
  const [state, setState] = useState(userLogged?.state);
  const [email, setEmail] = useState(userLogged?.email);
  const [confirmEmail, setConfirmEmail] = useState(userLogged?.email);
  const [password, setPassword] = useState(userLogged?.password);
  const [confirmPassword, setConfirmPassword] = useState(userLogged?.password);
  const { criarMensagem } = useSnackbar();

  const handleSubmit = () => {
    const newData: User = {
      id: userLogged.id,
      name,
      birthDate,
      gender,
      cpf,
      phone,
      city,
      state,
      email,
      password,
    };
    changeUserData(newData);
    setUserLogged(newData);
    criarMensagem.sucesso("Dados alterados com sucesso!");
    navigation.navigate("Home");
  };

  const handleRemove = () => {
    deleteUser(userLogged.id);
    setUserLogged(undefined);
    criarMensagem.sucesso("Usuário removido com sucesso!");
    navigation.navigate("Home");
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Icon name="account-circle" size={30} color="white" />
        <Title style={styles.headerTitulo}>Meu Perfil</Title>
      </View>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.tituloContainer}>
            <Title style={styles.ola}>Olá, {userLogged?.name}!</Title>
            <Button
              mode="contained"
              buttonColor={theme.colors.error}
              onPress={handleRemove}
            >
              Excluir conta
            </Button>
          </View>
          <View style={styles.secao}>
            <Title style={styles.secaoTitulo}>Dados pessoais</Title>
            <TextInput
              value={name}
              onChangeText={setName}
              mode="outlined"
              label="Nome completo"
            />
            <TextInput
              value={cpf}
              onChangeText={setCpf}
              mode="outlined"
              label="CPF"
            />
            <TextInput
              value={phone}
              onChangeText={setPhone}
              mode="outlined"
              label="Telefone"
            />
            <TextInput
              value={city}
              onChangeText={setCity}
              mode="outlined"
              label="Cidade"
            />
            <TextInput
              value={state}
              onChangeText={setState}
              mode="outlined"
              label="Estado"
            />
            <Divider style={styles.secaoDivider} />
          </View>
          <View style={styles.secao}>
            <Title style={styles.secaoTitulo}>Dados de acesso</Title>
            <TextInput
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              label="Email"
            />
            <TextInput
              value={confirmEmail}
              onChangeText={setConfirmEmail}
              mode="outlined"
              label="Confirmar email"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              label="Senha"
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              label="Confirmar senha"
            />
          </View>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.atualizar}
          >
            Atualizar
          </Button>
        </Card>
      </View>
    </ScrollView>
  );
}

import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { RegisterProps } from "./types";
import { Gender, User } from "../../types/user";
import useSnackbar from "../../contexts/Snackbar";
import { addUser } from "../../services/users";
import styles from "./styles";

import banner from "../../../assets/cadastrar/banner.png";
import { Button, Card, Checkbox, TextInput, Title } from "react-native-paper";
import DatePicker from "../../components/DatePicker";
import { set } from "react-native-reanimated";

export default function Register({ setUserLogged, navigation }: RegisterProps) {
  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [gender, setGender] = useState<Gender | undefined>();
  const [cpf, setCpf] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [hasRead, setHasRead] = useState<boolean>(false);

  const { criarMensagem } = useSnackbar();

  const handleSubmit = () => {
    if (!hasRead)
      return criarMensagem.erro("Você precisa ler e aceitar os termos de uso");
    if (!name) return criarMensagem.erro("Você precisa informar seu nome");

    const newUser: Omit<User, "id"> = {
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

    const userAdded = addUser(newUser);
    setUserLogged(userAdded);
    criarMensagem.sucesso("Cadastro efetuado com sucesso");
    navigation.navigate("Home");
  };

  return (
    <ScrollView>
      <Image source={banner} style={styles.banner} />
      <Card style={styles.card}>
        <Title>Crie sua conta</Title>
        <View style={styles.form}>
          <TextInput
            label="Nome completo"
            mode="outlined"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            label="CPF"
            mode="outlined"
            placeholder="Digite seu CPF"
            value={cpf}
            onChangeText={setCpf}
            style={styles.input}
          />
          <TextInput
            label="Telefone"
            placeholder="+XX XXXXX-XXXX"
            mode="outlined"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
          <TextInput
            label="Cidade"
            placeholder="Digite sua cidade"
            mode="outlined"
            value={city}
            onChangeText={setCity}
            style={styles.input}
          />
          <TextInput
            label="Estado"
            placeholder="Digite sua estado"
            mode="outlined"
            value={state}
            onChangeText={setState}
            style={styles.input}
          />
          <TextInput
            label="Email"
            placeholder="Digite sua email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            label="Confirmar email"
            placeholder="Digite sua email novamente"
            mode="outlined"
            value={confirmEmail}
            onChangeText={setConfirmEmail}
            style={styles.input}
          />
          <TextInput
            label="Senha"
            placeholder="Digite sua senha"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            label="Confirmar senha"
            placeholder="Digite sua senha novamente"
            mode="outlined"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            secureTextEntry
          />
          <Pressable onPress={() => setHasRead(!hasRead)}>
            <View style={styles.termosContainer}>
              <Checkbox status={hasRead ? "checked" : "unchecked"} />
              <Text>Li e aceito os termos deste cadastro</Text>
            </View>
          </Pressable>
          <Button mode="contained" onPress={handleSubmit}>
            Criar minha conta
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
}

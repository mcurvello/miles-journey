import React, { startTransition, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";
import { Filters, HomeProps } from "./types";
import Icon from "@expo/vector-icons/Ionicons";

import banner from "../../../assets/home/banner.png";
import loading from "../../../assets/loading.png";
import styles from "./styles";
import {
  Button,
  Card,
  Modal,
  Portal,
  SegmentedButtons,
  TextInput,
  Title,
  TouchableRipple,
} from "react-native-paper";
import { Trip, TripTypes } from "../../types/trip";
import { defaulltFilters } from "./consts";
import StringPicker from "../../components/StringPicker";
import { filtrarViagens, filtrosEstaoVazios } from "./utils/filters";
import useSnackbar from "../../contexts/Snackbar";
import {
  carregarDestinos,
  carregarOrigens,
  getViagens,
} from "../../services/trips";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import theme from "../../config/theme";

export default function Home({ userLogged }: HomeProps) {
  const allTrips = useRef<Trip[]>([]);
  const allPages = useRef<number>(1);

  const [actualPage, setActualPage] = useState<number>(1);
  const [trip, setTrip] = useState<Trip[]>([]);
  const [type, setType] = useState<Filters["type"]>(defaulltFilters.type);
  const [people, setPeople] = useState<Filters["person"]>(
    defaulltFilters.person
  );
  const [origin, setOrigin] = useState<Filters["origin"]>(
    defaulltFilters.origin
  );
  const [destination, setDestination] = useState<Filters["destination"]>(
    defaulltFilters.destination
  );
  const [origins, setOrigins] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [filterPerUser, setFilterPerUser] = useState<Filters["filterPerUser"]>(
    defaulltFilters.filterPerUser
  );
  const [departureDate, setDepartureDate] = useState<Filters["dateDeparture"]>(
    defaulltFilters.dateDeparture
  );
  const [returnDate, setReturnDate] = useState<Filters["dateReturn"]>(
    defaulltFilters.dateReturn
  );
  const [searching, setSearching] = useState<boolean>(false);

  const { criarMensagem } = useSnackbar();
  const { city = "", state = "" } = userLogged || {};
  const filters: Filters = {
    type,
    person: people,
    origin,
    destination,
    dateDeparture: departureDate,
    dateReturn: returnDate,
    filterPerUser,
  };
  const showAllTrips = filterPerUser === "todas";
  const showTripsAroundCity = filterPerUser === "cidade";
  const showTripsAroundState = filterPerUser === "estado";
  const isLastPage = actualPage === allPages.current;

  const changeType = (newType: TripTypes) => () =>
    setType((actualType) => (actualType === newType ? undefined : newType));

  const changeOriginAndDestination = () => {
    const tmp = origin;
    setOrigin(destination);
    setDestination(tmp);
  };

  const handleFilterPerUser =
    (newFilterPerUser: Filters["filterPerUser"]) => () => {
      const newOrigin = newFilterPerUser === "cidade" ? city : state;
      const mustFilterPerUser = showAllTrips || newOrigin !== origin;
      setFilterPerUser(mustFilterPerUser ? newFilterPerUser : "todas");
      setOrigin(mustFilterPerUser ? newOrigin : "");
    };

  const handleReset = () =>
    startTransition(() => {
      setType(defaulltFilters.type);
      setPeople(defaulltFilters.person);
      setOrigin(defaulltFilters.origin);
      setDestination(defaulltFilters.destination);
      setDepartureDate(defaulltFilters.dateDeparture);
      setReturnDate(defaulltFilters.dateReturn);
      setFilterPerUser(defaulltFilters.filterPerUser);
    });

  const handleSearch = async () => {
    setSearching(true);
    let newTrips = [];
    const emptyFilters = filtrosEstaoVazios(filters);
    if (emptyFilters) newTrips = allTrips.current;
    else
      newTrips = await filtrarViagens(allTrips.current, filters, city, state);
    setTrip(newTrips);
    if (!newTrips.length)
      return criarMensagem.erro("nenhuma viagem encontrada");
    if (!emptyFilters)
      criarMensagem.sucesso(`${newTrips.length} viagens encontradas`);
    setSearching(false);
  };

  const carregarMais = async () => {
    setSearching(true);
    const { novasViagens, pagina } = await getViagens(actualPage + 1);
    allTrips.current = [...allTrips.current, ...novasViagens];
    startTransition(() => {
      setActualPage(pagina);
      setTrip((actualTrip) => [...actualTrip, ...novasViagens]);
    });
    setSearching(false);
  };

  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  const onChange = (selectedDate?: Date) => {
    setOpen(false);
    if (selectedDate) {
      selectedDate.toLocaleDateString?.("pt-BR");
    }
    setDate(selectedDate);
  };

  const loadData = async () => {
    const [viagens, novasOrigens, novosDestinos] = await Promise.all([
      getViagens(),
      carregarOrigens(),
      carregarDestinos(),
    ]);
    const { pagina, totalPaginas, novasViagens } = viagens;
    allTrips.current = novasViagens;
    allPages.current = totalPaginas;
    startTransition(() => {
      setActualPage(pagina);
      setTrip(novasViagens);
      setOrigins(novasOrigens);
      setDestinations(novosDestinos);
    });
  };

  useEffect(() => {
    void loadData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={banner} style={styles.bannerImage} />
        </View>
        <View style={styles.content}>
          <Card style={styles.passagensContent}>
            <Title style={styles.passagensTitulo}>Passagens</Title>
            <View style={styles.tipoContainer}>
              <Button
                icon={type === TripTypes.ROUND_TRIP ? "check" : ""}
                style={[
                  styles.tipoIda,
                  type === TripTypes.ROUND_TRIP && styles.tipoSelecionado,
                ]}
                onPress={changeType(TripTypes.ROUND_TRIP)}
              >
                Ida e volta
              </Button>
              <Button
                icon={type === TripTypes.ONE_WAY ? "check" : ""}
                style={[
                  styles.tipoIdaEVolta,
                  type === TripTypes.ONE_WAY && styles.tipoSelecionado,
                ]}
                onPress={changeType(TripTypes.ONE_WAY)}
              >
                Somente ida
              </Button>
            </View>
            <View style={styles.pessoasPicker}>
              <SegmentedButtons
                value={people.toString()}
                onValueChange={(t) => setPeople(t as any)}
                buttons={[
                  { label: "1 adulto", value: "1" },
                  { label: "2 adultos", value: "2" },
                  { label: "3 adultos", value: "3" },
                ]}
              />
            </View>
            <View style={styles.origemContainer}>
              <StringPicker
                value={origin}
                placeholder="Origem"
                editable={showAllTrips}
                selectTextOnFocus={showAllTrips}
                onChangeText={setOrigin}
                icon="airplane-takeoff"
                style={[styles.origem, !showAllTrips && styles.inputDisabled]}
                options={origins}
              />
              <TouchableRipple
                style={styles.trocar}
                onPress={changeOriginAndDestination}
              >
                <Icon name="swap-vertical" size={20} color="white" />
              </TouchableRipple>
              <StringPicker
                value={destination}
                placeholder="Destino"
                onChangeText={setDestination}
                icon="airplane-landing"
                style={styles.destino}
                options={destinations}
              />
            </View>
            <View style={styles.datas}>
              <TextInput
                right={
                  <TextInput.Icon
                    icon="calendar"
                    onPress={() => setOpen(!open)}
                  />
                }
                mode="outlined"
                dense
                value={date?.toLocaleDateString("pt-BR")}
                showSoftInputOnFocus={false}
                placeholder="mm/dd/yyyy"
                outlineColor={theme.colors.primary}
                onPressIn={(evento: NativeSyntheticEvent<NativeTouchEvent>) => {
                  evento.preventDefault();
                  setOpen(true);
                }}
                label="Data da ida"
                onChangeText={setDepartureDate}
              />

              <TextInput
                right={
                  <TextInput.Icon
                    icon="calendar"
                    onPress={() => setOpen(!open)}
                  />
                }
                mode="outlined"
                dense
                value={date?.toLocaleDateString("pt-BR")}
                showSoftInputOnFocus={false}
                placeholder="mm/dd/yyyy"
                outlineColor={theme.colors.primary}
                onPressIn={(evento: NativeSyntheticEvent<NativeTouchEvent>) => {
                  evento.preventDefault();
                  setOpen(true);
                }}
                label="Data da volta"
                onChangeText={setReturnDate}
              />
              <DateTimePickerModal
                isVisible={open}
                mode="date"
                onConfirm={onChange}
                onCancel={() => setOpen(false)}
              />
            </View>
            {userLogged?.city && (
              <Button
                mode="contained"
                textColor="black"
                icon={showTripsAroundCity ? "check" : ""}
                onPress={handleFilterPerUser("cidade")}
                style={styles.viagemPor}
              >
                Viagens na minha cidade
              </Button>
            )}
            {userLogged?.state && (
              <Button
                mode="contained"
                textColor="black"
                icon={showTripsAroundState ? "check" : ""}
                onPress={handleFilterPerUser("estado")}
                style={styles.viagemPor}
              >
                Viagens no meu estado
              </Button>
            )}
            <View style={styles.buscarContainer}>
              <Button
                mode="contained"
                style={styles.botaoResetarBusca}
                onPress={handleReset}
              >
                Resetar busca
              </Button>
              <Button
                mode="contained"
                style={styles.botaoBuscar}
                onPress={handleSearch}
              >
                Buscar
              </Button>
            </View>
          </Card>
          <Title style={styles.viagensTitulo}> Promoções </Title>
          <View style={styles.viagens}>
            {trip.map((viagem, index) => (
              <Card key={index} style={styles.viagemContainer}>
                <Image source={viagem.photo} style={styles.viagemImagem} />
                <View style={styles.viagemDescricao}>
                  <Title style={styles.viagemTitulo}>{viagem.title}</Title>
                  <View style={styles.viagemDetalhes}>
                    <Text>
                      <Text style={styles.detalheTitulo}>Data de ida: </Text>{" "}
                      {viagem.dateDeparture}{" "}
                    </Text>
                    <Text>
                      <Text style={styles.detalheTitulo}>Data de volta: </Text>
                      {viagem.dateReturn}{" "}
                    </Text>
                    <Text>
                      <Text style={styles.detalheTitulo}>Origem: </Text>{" "}
                      {viagem.origin}{" "}
                    </Text>
                    <Text>
                      <Text style={styles.detalheTitulo}>Destino: </Text>{" "}
                      {viagem.destination}{" "}
                    </Text>
                    <Text>
                      <Text style={styles.detalheTitulo}>Tipo: </Text>{" "}
                      {viagem.type === TripTypes.ONE_WAY
                        ? "ida"
                        : "ida e volta"}{" "}
                    </Text>
                  </View>
                  <View style={styles.viagemValorContainer}>
                    <Text style={styles.viagemValor}>
                      R${" "}
                      {(
                        viagem.value *
                        (type === TripTypes.ROUND_TRIP ? 2 : 1) *
                        Number(people)
                      )
                        .toFixed(2)
                        .replace(".", ",")}
                    </Text>
                  </View>
                </View>
                <Button mode="contained" style={styles.verDetalhes}>
                  {" "}
                  Ver detalhes{" "}
                </Button>
              </Card>
            ))}
            {!isLastPage && (
              <Button onPress={carregarMais}>
                <Text style={{ fontSize: 20 }}>Ver mais</Text>
              </Button>
            )}
          </View>
        </View>
        <Portal>
          <Modal visible={searching}>
            <View style={styles.buscandoContainer}>
              <Text style={styles.buscandoText}>
                Aguarde uns instantes, estamos viajando o mundo das milhas para
                encontrar a melhor solução pra você!
              </Text>
              <Image source={loading} />
            </View>
          </Modal>
        </Portal>
      </ScrollView>
    </SafeAreaView>
  );
}

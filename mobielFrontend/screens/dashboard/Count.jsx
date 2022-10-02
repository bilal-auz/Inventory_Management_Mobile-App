import React, { useEffect, useState } from "react";
import {
  Fab,
  Icon,
  Box,
  Center,
  VStack,
  HStack,
  Heading,
  Flex,
  Divider,
  Text,
  Button,
  useToast,
  Select,
  Modal,
  FormControl,
  Input,
  Skeleton,
} from "native-base";
import { AuthContext } from "../../Context/AuthContext";
import { AsyncStorage } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

import moment from "moment";
import "moment/locale/fr";
moment().locale("fr");

import axios from "axios";

function Count({ navigation }) {
  const { signOut } = React.useContext(AuthContext);

  const [change, setChange] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const toast = useToast();
  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useState(null);

  const [date, setData] = useState("date");

  const [egg_w1, setEggW1] = useState(0);
  const [egg_w2, setEggW2] = useState(0);
  const [egg_w3, setEggW3] = useState(0);
  const [egg_total, setEggTotal] = useState(0);

  const [selectedFarm, setSelectedFarm] = useState("");
  const [eggs_w1_input, setW1Input] = useState("");
  const [eggs_w2_input, setW2Input] = useState("");
  const [eggs_w3_input, setW3Input] = useState("");

  const refreshHandler = () => {
    setChange(!change);
    toast.show({
      description: "Reloading",
    });
  };

  const resetHandler = async () => {
    setChange(!change);
    // setIsLoaded(false);

    console.log("reset");
    toast.show({
      description: "resetting",
    });

    try {
      const user = JSON.parse(await AsyncStorage.getItem("userInfo"));
      // setUser(user);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "http://192.168.56.1:5551/api/egg/resetEggs",
        { Hello: "value" },
        config
      );

      user.farms.map(
        (farm) => (
          (farm.eggs_w1 = 0),
          (farm.eggs_w2 = 0),
          (farm.eggs_w3 = 0),
          (farm.submitted = false)
        )
      );

      await AsyncStorage.setItem("userInfo", JSON.stringify(user));

      setUser(user);
      // var index = user.farms.findIndex((farm) => farm._id == data._id);

      // user.farms[index] = data;

      // await AsyncStorage.setItem("userInfo", JSON.stringify(user));
      refreshHandler();
      console.log("DDDONE");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOutHandler = async () => {
    //logout logic
    signOut();
  };

  const getEggsCount = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("userInfo"));
      setUser(user);

      const userToken = user.token;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.get(
        "https://egg-backend.herokuapp.com/api/egg/getEggs",
        config
      );

      console.log("call API Eggs");
      setEggW1(data.total_eggs_w1.toLocaleString("en"));
      setEggW2(data.total_eggs_w2.toLocaleString("en"));
      setEggW3(data.total_eggs_w3.toLocaleString("en"));
      setEggTotal(data.total.toLocaleString("en"));

      setIsLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addEggHandler = async () => {
    if (!selectedFarm || !eggs_w1_input || !eggs_w2_input || !eggs_w3_input) {
      return toast.show({
        description: "Fill all fields",
      });
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const body = {
        farmId: selectedFarm,
        eggs_w1: eggs_w1_input,
        eggs_w2: eggs_w2_input,
        eggs_w3: eggs_w3_input,
      };

      const { data } = await axios.post(
        "https://egg-backend.herokuapp.com/api/egg/addEggs",
        body,
        config
      );

      var index = user.farms.findIndex((farm) => farm._id == data._id);

      user.farms[index] = data;

      await AsyncStorage.setItem("userInfo", JSON.stringify(user));
      cancelHandler();

      setChange(!change);

      toast.show({
        description: "Eggs Added",
      });
    } catch (error) {
      console.log(error.message);
      toast.show({
        description: "Error",
      });
    }
  };

  // const selectFarmHandler = (selected) => {
  //   setSelectedFarm(selected);

  //   console.log(selectedFarm);
  // };

  const cancelHandler = () => {
    toast.show({
      description: "canceling",
    });
    setW1Input("");
    setW2Input("");
    setW3Input("");
    setSelectedFarm("");
    setShowModal(false);
  };

  useEffect(() => {
    setIsLoaded(false);

    getEggsCount();

    const dateString = moment().format("Do MMMM YYYY  h:mm A");

    setData(dateString);
  }, [change]);

  return (
    <Center
      safeArea
      w="100%"
      h="100%"
      justifyContent="flex-start"
      alignItems={"center"}
      pt={5}
    >
      <Box
        px="2"
        py="8"
        pt="12"
        w="90%"
        alignItems={"center"}
        justifyContent={"flex-start"}
        bg="#5c7f67"
        rounded={"2xl"}
      >
        <HStack
          position={"absolute"}
          alignItems="center"
          width={"99%"}
          maxWidth="100%"
          top="2"
          // right={"2"}
          justifyContent={"space-between"}
          // bg="black"
        >
          <Button
            isLoading={!isLoaded}
            backgroundColor="red.600"
            rounded={"md"}
            // endIcon={<FontAwesome name="refresh" size={24} color="white" />}
            onPress={resetHandler}
          >
            <Text fontWeight={"800"} color="white">
              RESET
            </Text>
          </Button>
          <Button
            isLoading={!isLoaded}
            backgroundColor="gray.600"
            rounded={"md"}
            endIcon={<FontAwesome name="refresh" size={24} color="white" />}
            onPress={refreshHandler}
          ></Button>
        </HStack>

        <Box>
          <Text fontSize={20} noOfLines={1} color="white">
            Le nombre d’œufs jusqu’à présent:
          </Text>
        </Box>

        {isLoaded ? (
          <>
            <Box mt="2">
              <Heading color="white" fontSize={25}>
                {date}
              </Heading>
            </Box>
            <VStack space={4} mt="4" w="95%">
              <Flex
                py="3"
                rounded={"xl"}
                direction="row"
                justifyContent={"center"}
                alignItems={"center"}
                w="100%"
                bg="white"
              >
                <Box>
                  <Text fontWeight={900} fontSize={"4xl"}>
                    {egg_w1}
                  </Text>
                </Box>
                <Divider
                  bg="#5c7f67"
                  thickness="2"
                  mx="2"
                  orientation="vertical"
                />
                <Box>
                  <Text fontWeight={500} fontSize={"xl"}>
                    1500g-1550g
                  </Text>
                </Box>
              </Flex>
              <Flex
                py="3"
                rounded={"xl"}
                direction="row"
                justifyContent={"center"}
                alignItems={"center"}
                w="100%"
                bg="white"
              >
                <Box>
                  <Text fontWeight={900} fontSize={"4xl"}>
                    {egg_w2}
                  </Text>
                </Box>
                <Divider
                  bg="#5c7f67"
                  thickness="2"
                  mx="2"
                  orientation="vertical"
                />
                <Box>
                  <Text fontWeight={500} fontSize={"xl"}>
                    1760g-1870g
                  </Text>
                </Box>
              </Flex>
              <Flex
                py="3"
                rounded={"xl"}
                direction="row"
                justifyContent={"center"}
                alignItems={"center"}
                w="100%"
                bg="white"
              >
                <Box>
                  <Text fontWeight={900} fontSize={"4xl"}>
                    {egg_w3}
                  </Text>
                </Box>
                <Divider
                  bg="#5c7f67"
                  thickness="2"
                  mx="2"
                  orientation="vertical"
                />
                <Box>
                  <Text fontWeight={500} fontSize={"xl"}>
                    1890g-2000g
                  </Text>
                </Box>
              </Flex>
              <Flex
                py="3"
                rounded={"xl"}
                direction="row"
                justifyContent={"center"}
                alignItems={"center"}
                w="100%"
                bg="white"
              >
                <Box>
                  <Text fontWeight={900} fontSize={"4xl"}>
                    {egg_total}
                  </Text>
                </Box>
              </Flex>
            </VStack>

            {/* Modal */}
            <Center>
              <Modal
                isOpen={showModal}
                onClose={cancelHandler}
                size="xl"
                rounded={"5"}
              >
                <Modal.Content marginBottom="auto" marginTop={"40%"}>
                  <Modal.Body p={5}>
                    <Select
                      rounded={"xl"}
                      size="1xl"
                      placeholder="Sélectionnez la ferme"
                      selectedValue={selectedFarm}
                      onValueChange={(selected) => {
                        setSelectedFarm(selected);

                        console.log(selected);
                      }}
                    >
                      {user.farms.map((farm, index) => (
                        <Select.Item
                          isDisabled={farm.submitted}
                          key={farm._id}
                          label={
                            "Farm " +
                            (index + 1) +
                            (farm.submitted ? "(Deja ajoute)" : "")
                          }
                          value={farm._id}
                        ></Select.Item>
                      ))}
                    </Select>
                    <FormControl mt="3">
                      <Input
                        isDisabled={!selectedFarm}
                        keyboardType="numeric"
                        value={eggs_w1_input}
                        placeholder="Tapez ici"
                        rounded={"xl"}
                        size="1xl"
                        onChangeText={(text) =>
                          setW1Input(text.replace(/[^0-9]/g, ""))
                        }
                        InputRightElement={
                          <Center bg="gray.300" h="50" px="3">
                            <Text>1500g-1550g</Text>
                          </Center>
                        }
                      />
                    </FormControl>

                    <FormControl mt="3">
                      <Input
                        isDisabled={!selectedFarm}
                        keyboardType="numeric"
                        value={eggs_w2_input}
                        placeholder="Tapez ici"
                        rounded={"xl"}
                        size="1xl"
                        onChangeText={(text) =>
                          setW2Input(text.replace(/[^0-9]/g, ""))
                        }
                        InputRightElement={
                          <Center bg="gray.300" h="50" px="3">
                            <Text>1760g-1870g</Text>
                          </Center>
                        }
                      />
                    </FormControl>

                    <FormControl mt="3">
                      <Input
                        isDisabled={!selectedFarm}
                        keyboardType="numeric"
                        value={eggs_w3_input}
                        placeholder="Tapez ici"
                        rounded={"xl"}
                        size="1xl"
                        onChangeText={(text) =>
                          setW3Input(text.replace(/[^0-9]/g, ""))
                        }
                        InputRightElement={
                          <Center bg="gray.300" h="50" px="3">
                            <Text>1890g-2000g</Text>
                          </Center>
                        }
                      />
                    </FormControl>
                  </Modal.Body>
                  <Center my={4} mt="0">
                    <Button.Group space={2}>
                      <Button colorScheme="blueGray" onPress={cancelHandler}>
                        ANNULER
                      </Button>
                      <Button
                        onPress={addEggHandler}
                        bg="#5c7f67"
                        size="lg"
                        isDisabled={!selectedFarm}
                      >
                        AJOUTEZ
                      </Button>
                    </Button.Group>
                  </Center>
                </Modal.Content>
              </Modal>
            </Center>
          </>
        ) : (
          <>
            <Skeleton.Text p="4" lines={2} alignItems="center" />
            <VStack
              mt="5"
              w="90%"
              maxW="400"
              space={8}
              overflow="hidden"
              rounded="md"
              _dark={{
                borderColor: "coolGray.500",
              }}
              _light={{
                borderColor: "coolGray.200",
              }}
            >
              <Skeleton rounded="10" startColor="primary.100" h="35" />
              <Skeleton rounded="10" startColor="primary.100" h="30" />
              <Skeleton rounded="10" startColor="primary.100" h="30" />
              <Skeleton rounded="10" startColor="primary.100" h="30" />
            </VStack>
          </>
        )}
      </Box>
      {user && (
        <Box mt="5" bg="red">
          <Button
            isDisabled={!user.farms.some((farm) => farm.submitted === false)}
            isLoading={!isLoaded}
            bg="#5c7f67"
            px="5"
            py="3"
            rounded={"xl"}
            size="md"
            _text={{
              fontSize: 15,
              numberOfLines: 1,
              textTransform: "uppercase",
            }}
            endIcon={<Icon as={Ionicons} name="egg-outline" size={8} />}
            onPress={() => setShowModal(true)}
          >
            Ajoutez votre œufs
          </Button>
        </Box>
      )}

      <Fab
        right={5}
        bottom={110}
        shadow={0}
        size="sm"
        icon={<MaterialIcons name="logout" size={24} color="white" />}
        onPress={logOutHandler}
      />
    </Center>
  );
}

export default Count;

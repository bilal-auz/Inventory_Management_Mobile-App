import React from "react";

import { useState } from "react";
import { AsyncStorage } from "react-native";

import axios from "axios";

import {
  Box,
  Center,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Image,
} from "native-base";

import { AuthContext } from "../../Context/AuthContext";

function Login({ navigation }) {
  const [userId, setUserId] = useState("AA0000");
  const [userPassword, setUserPassword] = useState("123456");
  const [show, setShow] = useState(false);

  const { signIn } = React.useContext(AuthContext);

  const loginHandler = async () => {
    // login Logic
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post(
        "http://192.168.11.102:5550/api/user/login",
        { userId, password: userPassword },
        config
      );
      await AsyncStorage.setItem("userInfo", JSON.stringify(data));
      signIn(data);
    } catch (error) {
      console.log("ERROR:");

      console.log(error.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <Center safeArea w="100%" h="100%" justifyContent="flex-start" pt={10}>
      <Box
        pt={0}
        p="3"
        w="90%"
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Box>
          <Image
            source={require("../../assets/logos/So9_lbayd.png")}
            alt="سوق البيض"
          />
        </Box>
        <Box mt="5">
          <Image
            source={require("../../assets/logos/ANPO.png")}
            alt="ANPO Logo"
          />
        </Box>
        <Box mt="5">
          <Heading fontSize={40} fontWeight="medium">
            Connexion
          </Heading>
        </Box>

        <VStack
          space={3}
          mt="5"
          w="90%"
          alignContent={"center"}
          alignItems={"center"}
        >
          <FormControl w="90%">
            <FormControl.Label></FormControl.Label>
            <Input
              value={userId}
              size="2xl"
              variant="underlined"
              placeholder="Identifiant"
              onChangeText={(text) => setUserId(text)}
            />
          </FormControl>

          <FormControl w="90%">
            <FormControl.Label></FormControl.Label>
            <Input
              value={userPassword}
              type={show ? "text" : "password"}
              size="2xl"
              variant="underlined"
              placeholder="Mot de passe"
              InputRightElement={
                <Button
                  variant="unstyled"
                  size="xs"
                  h="full"
                  onPress={(e) => setShow(!show)}
                  _text={{
                    fontSize: 18,
                    numberOfLines: 1,
                  }}
                >
                  {show ? "Masquer" : "Afficher"}
                </Button>
              }
              onChangeText={(text) => setUserPassword(text)}
            />
          </FormControl>

          <Button
            w={"60%"}
            mt="5"
            size="md"
            bg="gray.600"
            _text={{
              fontSize: 22,
              numberOfLines: 1,
            }}
            onPress={loginHandler}
          >
            Connexion
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default Login;

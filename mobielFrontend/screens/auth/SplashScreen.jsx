import { Box, Text, Center, Image, Button, Heading } from "native-base";
import React from "react";

function SplashScreen({ navigation }) {
  const toLoginHandler = () => {
    navigation.navigate("Login");
  };
  return (
    <Center safeArea w="100%" h="100%" justifyContent="center">
      <Box pt={0} p="3" w="90%" alignItems={"center"} justifyContent={"center"}>
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

        <Button
          w={"60%"}
          mt="5"
          size="md"
          bg="gray.600"
          _text={{
            fontSize: 20,
            numberOfLines: 1,
          }}
          onPress={toLoginHandler}
        >
          Enter the market
        </Button>
      </Box>
    </Center>
  );
}

export default SplashScreen;

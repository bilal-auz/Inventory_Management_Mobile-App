import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  VStack,
  Flex,
  Divider,
  Text,
  Button,
  useToast,
  Skeleton,
} from "native-base";

import { FontAwesome } from "@expo/vector-icons";

import { AsyncStorage } from "react-native";

import axios from "axios";

export default function Price() {
  const toast = useToast();
  const [change, setChange] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [price_w1, setPriceW1] = useState(0);
  const [price_w2, setPriceW2] = useState(0);
  const [price_w3, setPriceW3] = useState(0);

  const refreshHandler = () => {
    setChange(!change);

    toast.show({
      description: "Reloading",
    });
  };

  const getPrices = async () => {
    console.log("call API price");
    try {
      const user = JSON.parse(await AsyncStorage.getItem("userInfo"));
      const userToken = user.token;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "https://egg-backend.herokuapp.com/api/price/getPrices",
        config
      );

      setPriceW1(data.price_w1);
      setPriceW2(data.price_w2);
      setPriceW3(data.price_w3);

      setIsLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setIsLoaded(false);
    getPrices();
  }, [change]);

  return (
    <Center
      safeArea
      w="100%"
      bg={"gray.300"}
      h="100%"
      justifyContent="flex-start"
      pt={5}
    >
      <Box
        px="2"
        py="7"
        w="90%"
        alignItems={"center"}
        justifyContent={"flex-start"}
        bg="#5c7f67"
        rounded={"2xl"}
      >
        <Box position={"absolute"} top="2" right={"2"}>
          <Button
            isLoading={!isLoaded}
            backgroundColor="gray.600"
            rounded={"md"}
            endIcon={<FontAwesome name="refresh" size={24} color="white" />}
            onPress={refreshHandler}
          ></Button>
        </Box>
        <Box>
          <Text fontSize={30} noOfLines={1} color="white">
            Prices
          </Text>
        </Box>

        {isLoaded ? (
          <VStack space={3} mt="4" w="90%">
            <Flex
              p="3"
              rounded={"xl"}
              direction="row"
              justifyContent={"flex-start"}
              alignItems={"center"}
              w="100%"
              bg="white"
            >
              <Box w="50%" alignItems={"center"}>
                <Text fontWeight={900} fontSize={"4xl"}>
                  {price_w1}
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
              p="3"
              rounded={"xl"}
              direction="row"
              justifyContent={"flex-start"}
              alignItems={"center"}
              w="100%"
              bg="white"
            >
              <Box w="50%" alignItems={"center"}>
                <Text fontWeight={900} fontSize={"4xl"}>
                  {price_w2}
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
              p="3"
              rounded={"xl"}
              direction="row"
              justifyContent={"flex-start"}
              alignItems={"center"}
              w="100%"
              bg="white"
            >
              <Box w="50%" alignItems={"center"}>
                <Text fontWeight={900} fontSize={"4xl"}>
                  {price_w3}
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
          </VStack>
        ) : (
          <>
            <VStack
              mt="5"
              w="90%"
              maxW="400"
              space={10}
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
              <Skeleton rounded="10" startColor="primary.100" h="35" />
              <Skeleton rounded="10" startColor="primary.100" h="35" />
            </VStack>
          </>
        )}
      </Box>
    </Center>
  );
}

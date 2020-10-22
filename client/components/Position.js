import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
  Dimensions,
} from "react-native";
import { Avatar, Divider } from "react-native-elements";
import CardPosition from "./CardPosition";
import MenuOperation from "./MenuOperation";

import { View, Text, Container, Card } from "native-base";
import styles from "../Styles/positionStyles";
import CustomButton from "./customButton";
import axios from "axios";
import { api } from "./Constants/constants";
import { getUserLogged } from "../redux/actions/authActions";
import { getContactList } from "../redux/actions/contactsActions";
import * as Font from "expo-font";
import { BarChart } from "react-native-chart-kit";

export default Position = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    if (!fontLoaded) {
      Font.loadAsync({
        BreeSerifRegular: require("../assets/fonts/BreeSerif-Regular.ttf"),
      });
    }
  },[]);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    const response = await axios(`${api}/auth/logout`);
    dispatch(getUserLogged());
    response.data.success
      ? // ? navigation.navigate("home")
        console.log("Signed Out")
      : Alert.alert("Error", "Something went wrong, try again");
  };

  useEffect(() => {
    dispatch(getUserLogged());
    dispatch(getContactList());
  }, []);

  const userLogged = useSelector((state) => state.auth);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      {userLogged.success ? (
        <Container>
          <View style={styles.headerSection}>
            <View style={styles.avatarSection}>
              <Avatar
                size="large"
                icon={{ color: "black", name: "user", type: "font-awesome" }}
                activeOpacity={0.7}
                containerStyle={{
                  backgroundColor: "#ffff6d",
                  alignSelf: "center",
                }}
              />
            </View>
            <View style={styles.nameSection}>
              <Text
                style={styles.moneySection}
              >{`Hello ${userLogged.user.name} ${userLogged.user.surname}`}</Text>

              <CustomButton
                style={{
                  color: "black",
                  backgroundColor: "#ffff6d",
                  fontSize: 18,
                }}
                title="LOG OUT"
                onPress={handleLogOut}
              />
            </View>
          </View>

          <View style={styles.cardPosition}>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <View style={{ marginHorizontal: 15 }}>
                <CardPosition user={userLogged} />
              </View>
              <View style={{ marginHorizontal: 15 }}>
                <Card>
                  <BarChart
                    data={{
                      labels: ["Mon", "Tue", "Wed", "Tue", "Fri"],
                      datasets: [
                        {
                          data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                          ],
                        },
                      ],
                    }}
                    width={Dimensions.get("window").width - 40} // from react-native
                    height={200}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: "#ffff57",
                      backgroundGradientFrom: "whitesmoke",
                      backgroundGradientTo: "whitesmoke",
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 10) => `rgba(0, 0, 0, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726",
                      },
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      elevation: 15,
                    }}
                  />
                </Card>
              </View>
            </View>
            <View style={styles.buttonsView}>
              <TouchableOpacity
                onPress={() => navigation.navigate("sendMoney")}
                style={styles.sendMoneyButton}
              >
                <Text style={styles.sendMoneyText}>SEND MONEY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("recharge", userLogged)}
                style={styles.sendMoneyButton}
              >
                <Text style={styles.sendMoneyText}>RECHARGE MONEY</Text>
              </TouchableOpacity>

              {userLogged.user.role === "admin" ? (
                <>
                  <View style={{marginVertical: 10}}>
                    <CustomButton
                      style={{
                        color: "white",
                        backgroundColor: "#151515",
                        fontSize: 15,
                        width: 150,
                      }}
                      title="ADMIN PANEL"
                      onPress={() => navigation.navigate("adminPanel")}
                    />
                  </View>
                </>
              ) : null}
            </View>
          </View>
          <View style={styles.menuOp}>
            <MenuOperation navigation={navigation} screen={'position'} />
          </View>
        </Container>
      ) : (
        <View
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Wait for data to load...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

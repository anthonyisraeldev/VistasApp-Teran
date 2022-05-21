import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CategoriesScreen from "../../Screens/CategoriesScreen";
import ProductsScreen from "../../Screens/ProductsScreen";
import DetailScreen from "../../Screens/DetailScreen";
import { colors } from "../../Styles/colors";

const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Categories"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.lightGreen,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "OpenSansRegular",
            fontSize: 22,
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ title: "Categorias" }}
        />
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={({ route }) => ({
            title: route.params.categoryTitle,
            headerStyle: {
              backgroundColor:
                route.params.categoryTitle === "Sillas"
                  ? colors.regularBlue
                  : colors.darkBlue,
            },
          })}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({
            title: route.params.productTitle,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import Searcher from "../Components/Searcher";
import { Entypo } from "@expo/vector-icons";
import { PRODUCTS } from "../Data/products";
import { colors } from "../Styles/colors";
import List from "../Components/List";

const ProductsScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [initialProducts, setInitialProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const { categoryId } = route.params;

  const handleErase = () => {
    setInput("");
  };

  //Buscar productos según el input.
  useEffect(() => {
    if (initialProducts.length !== 0) {
      if (input === "") setProductsFiltered(initialProducts);
      else {
        const productosFiltrados = initialProducts.filter((product) =>
          product.title.toLowerCase().includes(input.toLowerCase())
        );
        setProductsFiltered(productosFiltrados);
      }
    }
  }, [input, initialProducts]);

  //Realiza el filtro inicial de productos por categoría
  useEffect(() => {
    const productosIniciales = PRODUCTS.filter(
      (product) => product.category === categoryId
    );
    setInitialProducts(productosIniciales);
  }, [categoryId]);

  const handleDetailProduct = (product) => {
    console.log(product);
    navigation.push("Detail", {
      productId: product.id,
      productTitle: product.title.toUpperCase(),
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoid}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Searcher
            additionalStyles={{
              backgroundColor: colors.lightGreen,
            }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              keyboardType="default"
              style={styles.input}
              placeholder="Ingrese producto a buscar..."
              placeholderTextColor="#4a4a4a"
            />
            <TouchableOpacity onPress={handleErase}>
              <Entypo name="erase" size={30} color="white" />
            </TouchableOpacity>
          </Searcher>
          <View style={styles.listContainer}>
            <List
              data={productsFiltered}
              itemType={"Producto"}
              onPress={handleDetailProduct}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  backBtn: {
    backgroundColor: "#6200ff",
    width: 300,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  textBtn: {
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "OpenSansBold",
  },
  input: {
    width: "80%",
    padding: 10,
    margin: 10,
    backgroundColor: "#cccccc",
    borderRadius: 10,
    color: "black",
    height: 50,
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.lightBeige,
    width: "100%",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
  },
});

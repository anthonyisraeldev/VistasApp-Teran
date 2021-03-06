import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../Styles/colors";
import { PRODUCTS } from "../Data/products";

const DetailScreen = ({ navigation, route }) => {
  const { productId } = route.params;
  const { height, width } = useWindowDimensions();
  const [product, setProduct] = useState([]);
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    setOrientation(height > width ? "portrait" : "landscape");
  }, [height, width]);

  useEffect(() => {
    const productSelected = PRODUCTS.find(
      (product) => product.id === productId
    );
    console.log(productSelected);
    setProduct(productSelected);
  }, [productId]);

  console.log(product);
  return (
    <>
      <Image source={product.image} style={styles.image} />
      <View style={styles.containerContent}>
        <ScrollView
          style={
            orientation === "portrait"
              ? styles.containerVertical
              : styles.containerHorizontal
          }
        >
          {product.offer && (
            <View style={styles.boxOffer}>
              <Text style={styles.offer}>Oferta</Text>
            </View>
          )}
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>$ {product.price}</Text>
        </ScrollView>
      </View>
    </>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  containerVertical: {
    flex: 1,
    flexDirection: "column",
  },
  containerContent: {
    backgroundColor: colors.lightBeige,
    width: "100%",
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    alignSelf: "center",
  },
  containerHorizontal: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: 0.8 * Dimensions.get("window").width,
    height: 300,
    marginTop: 30,
    alignSelf: "center",
    borderRadius: 18,
    marginBottom: 30,
    shadowColor: "#cccccc",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.42,
    shadowRadius: 4.22,
  },
  backBtn: {
    backgroundColor: "#6200ff",
    width: 300,
    borderRadius: 5,
    padding: 10,
    alignSelf: "center",
  },
  textBtn: {
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "OpenSansBold",
  },
  title: {
    fontSize: 20,
    fontFamily: "OpenSansBold",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontFamily: "OpenSansBold",
    paddingBottom: 20,
  },
  boxOffer: {
    borderRadius: 4,
    backgroundColor: "#b8ceff",
    marginTop: 10,
    width: 60,
    marginBottom: 10,
  },
  offer: {
    textAlign: "center",
    color: "#407bff",
    fontFamily: "OpenSansBold",
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 12,
  },
});

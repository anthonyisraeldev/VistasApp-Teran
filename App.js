import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import MainNavigator from "./Navigation/Shop";

export default function App() {
  const [loaded] = useFonts({
    OpenSansRegular: require("./assets/Fonts/OpenSans/OpenSans-Regular.ttf"),
    OpenSansBold: require("./assets/Fonts/OpenSans/OpenSans-Bold.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainNavigator />
    </SafeAreaView>
  );
}

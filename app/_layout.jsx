import { Stack } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { store } from "../src/store";

function RootNavigator() {
  const name = useSelector((state) => state.health.patientProfile.name);

  if (name === "") {
    return <Stack screenOptions={{ headerShown: false }} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

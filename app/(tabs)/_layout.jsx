// import { Tabs } from "expo-router";

// export default function TabsLayout() {
//   return (
//     <Tabs>
//       <Tabs.Screen name="index" options={{ title: "ملفي الصحي" }} />
//     </Tabs>
//   );
// }


import { Tabs } from "expo-router";

export default function TabsLayout() {
  return <Tabs screenOptions={{ headerShown: false }} />;
}
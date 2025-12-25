// import { Tabs } from "expo-router";

// export default function TabsLayout() {
//   return <Tabs screenOptions={{ headerShown: false }} />;
// }


import { Tabs, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function TabsLayout() {
  const router = useRouter();
  const patientProfile = useSelector((state) => state.health.patientProfile);
  const [mounted, setMounted] = useState(false);

  // تأكيد أن الـ component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // توجيه المستخدم إذا لم يكن لديه اسم
  useEffect(() => {
    if (mounted && !patientProfile?.name) {
      router.replace("/profile/setup");
    }
  }, [mounted, patientProfile?.name]);

  // حتى لو لم يوجد الاسم، نعرض الـ Tabs فارغ مؤقتًا
  return <Tabs screenOptions={{ headerShown: false }} />;
}


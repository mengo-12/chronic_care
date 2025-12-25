import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setProfile } from "../../src/core/health/healthSlice";

const CONDITIONS = [
  "الصرع",
  "السكري",
  "ضغط الدم",
  "أمراض القلب",
  "الربو",
  "الاكتئاب / القلق",
  "أمراض الغدة الدرقية",
  "أخرى",
];

export default function ProfileSetupScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  const toggleCondition = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const saveProfile = () => {
    if (!name || !age) {
      alert("الاسم والعمر مطلوبان");
      return;
    }

    dispatch(
      setProfile({
        name,
        age: Number(age),
        chronicConditions: selectedConditions,
        emergencyContact: {
          name: emergencyName,
          phone: emergencyPhone,
        },
      })
    );

    router.replace("/(tabs)");
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>
        إعداد ملف المريض
      </Text>

      <Text>الاسم الكامل</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="اسم المريض"
        style={styles.input}
      />

      <Text>العمر</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        placeholder="العمر"
        style={styles.input}
      />

      <Text style={{ marginTop: 10 }}>الأمراض المزمنة</Text>
      {CONDITIONS.map((condition) => (
        <TouchableOpacity
          key={condition}
          onPress={() => toggleCondition(condition)}
          style={styles.checkboxRow}
        >
          <View
            style={[
              styles.checkbox,
              selectedConditions.includes(condition) && styles.checked,
            ]}
          />
          <Text>{condition}</Text>
        </TouchableOpacity>
      ))}

      <Text style={{ marginTop: 12 }}>جهة اتصال طارئة</Text>
      <TextInput
        value={emergencyName}
        onChangeText={setEmergencyName}
        placeholder="الاسم"
        style={styles.input}
      />
      <TextInput
        value={emergencyPhone}
        onChangeText={setEmergencyPhone}
        placeholder="رقم الهاتف"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          حفظ الملف
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#333",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#4caf50",
  },
  saveButton: {
    backgroundColor: "#2196f3",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
};

import { setProfile } from "@/src/core/health/healthSlice";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

const CHRONIC_CONDITIONS = [
  "Epilepsy",
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart Disease",
  "Kidney Disease",
];

export default function ProfileSetup() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [conditions, setConditions] = useState([]);

  const toggleCondition = (condition) => {
    setConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const handleSubmit = () => {
    if (!name || !age || !gender) return;

    dispatch(
      setProfile({
        name,
        age: Number(age),
        gender,
        chronicConditions: conditions,
        emergencyContact: {},
      })
    );

    router.replace("/(tabs)");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Patient Profile</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter full name"
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        placeholder="Enter age"
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={setGender}
        placeholder="Male / Female"
      />

      <Text style={styles.subTitle}>Chronic Conditions</Text>
      <View style={styles.conditionsContainer}>
        {CHRONIC_CONDITIONS.map((condition) => (
          <TouchableOpacity
            key={condition}
            onPress={() => toggleCondition(condition)}
            style={[
              styles.conditionButton,
              conditions.includes(condition) && styles.conditionSelected,
            ]}
          >
            <Text
              style={[
                styles.conditionText,
                conditions.includes(condition) && styles.conditionTextSelected,
              ]}
            >
              {condition}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Save & Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1e40af",
  },
  label: {
    marginBottom: 6,
    fontWeight: "500",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#f9fafb",
  },
  subTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  conditionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  conditionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  conditionSelected: {
    backgroundColor: "#2563eb",
  },
  conditionText: {
    color: "#111827",
  },
  conditionTextSelected: {
    color: "#ffffff",
  },
  submitButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 10,
  },
  submitText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

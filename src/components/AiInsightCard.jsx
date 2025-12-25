import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectHealthStatus } from "../core/health/healthSlice";

export default function AiInsightCard() {
  const ai = useSelector(selectHealthStatus);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>🤖 تحليل ذكي (AI)</Text>

      <Text>
        مستوى الخطر:{" "}
        <Text style={styles[ai.riskLevel]}>
          {ai.riskLevel === "high"
            ? "مرتفع"
            : ai.riskLevel === "medium"
            ? "متوسط"
            : "منخفض"}
        </Text>
      </Text>

      <Text style={{ marginTop: 6 }}>
        التوصية: {ai.recommendation}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eef6ff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  high: { color: "#d32f2f", fontWeight: "bold" },
  medium: { color: "#f9a825", fontWeight: "bold" },
  low: { color: "#388e3c", fontWeight: "bold" },
});

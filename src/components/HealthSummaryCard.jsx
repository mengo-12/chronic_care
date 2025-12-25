import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectSeizureStats } from "../core/health/healthSlice";

export default function HealthSummaryCard() {
  const stats = useSelector(selectSeizureStats);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>🧠 الملخص الصحي</Text>

      <Text>عدد النوبات: {stats.count}</Text>
      <Text>آخر نوبة: {stats.lastDate ? new Date(stats.lastDate).toLocaleDateString() : "—"}</Text>
      <Text>متوسط الشدة: {stats.avgSeverity ?? "—"}</Text>
      <Text style={styles.status}>
        الحالة: {stats.status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  status: { marginTop: 6, fontWeight: "bold" },
});

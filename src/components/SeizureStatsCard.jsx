import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectSeizureStats } from "../core/health/healthSlice";

export default function SeizureStatsCard() {
  const stats = useSelector(selectSeizureStats);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📊 إحصائيات نوبات الصرع</Text>

      <Text>عدد النوبات: {stats.count}</Text>
      <Text>
        آخر نوبة:{" "}
        {stats.lastDate
          ? new Date(stats.lastDate).toLocaleString()
          : "—"}
      </Text>
      <Text>متوسط الشدة: {stats.avgSeverity ?? "—"}</Text>

      <Text style={[styles.status, statusStyle(stats.status)]}>
        الحالة: {stats.status}
      </Text>
    </View>
  );
}

const statusStyle = (status) => {
  switch (status) {
    case "غير مستقرة":
      return { color: "#d32f2f" };
    case "تحت المراقبة":
      return { color: "#f9a825" };
    default:
      return { color: "#388e3c" };
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
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
  status: {
    marginTop: 6,
    fontWeight: "bold",
  },
});

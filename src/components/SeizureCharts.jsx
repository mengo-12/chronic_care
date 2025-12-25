import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { selectSeizures } from "../core/health/healthSlice";

const screenWidth = Dimensions.get("window").width - 32;

export default function SeizureCharts() {
  const seizures = useSelector(selectSeizures);

  // آخر 7 نوبات فقط
  const recent = seizures.slice(0, 7).reverse();

  const labels = recent.map((s) =>
    new Date(s.date).toLocaleDateString("ar")
  );

  const severityMap = {
    mild: 1,
    moderate: 2,
    severe: 3,
  };

  const severityData = recent.map(
    (s) => severityMap[s.severity] ?? 0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 تطور شدة النوبات</Text>

      {recent.length === 0 ? (
        <Text style={{ textAlign: "center" }}>
          لا توجد بيانات كافية
        </Text>
      ) : (
        <>
          {/* Line Chart */}
          <LineChart
            data={{
              labels,
              datasets: [{ data: severityData }],
            }}
            width={screenWidth}
            height={220}
            yAxisInterval={1}
            chartConfig={chartConfig}
            style={styles.chart}
          />

          <Text style={styles.subtitle}>📊 شدة كل نوبة</Text>

          {/* Bar Chart */}
          <BarChart
            data={{
              labels,
              datasets: [{ data: severityData }],
            }}
            width={screenWidth}
            height={220}
            fromZero
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </>
      )}
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  labelColor: () => "#333",
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#1976d2",
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 20,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    marginTop: 12,
    fontWeight: "bold",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

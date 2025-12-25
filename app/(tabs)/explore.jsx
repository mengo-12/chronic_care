import { ScrollView, Text } from "react-native";
import AiInsightCard from "../../src/components/AiInsightCard";
import HealthSummaryCard from "../../src/components/HealthSummaryCard";
import SeizureCharts from "../../src/components/SeizureCharts";
import SeizureStatsCard from "../../src/components/SeizureStatsCard";


export default function DoctorDashboard() {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>
        لوحة الطبيب
      </Text>

      <HealthSummaryCard />
      <SeizureStatsCard />
      <AiInsightCard />
      <SeizureCharts />

    </ScrollView>
  );
}

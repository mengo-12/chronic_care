import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTimelineEvent, selectTimelineByType } from "../../src/core/health/healthSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [filterType, setFilterType] = useState(""); 
  const [expandedId, setExpandedId] = useState(null);

  const timeline = useSelector(selectTimelineByType(filterType));

  const addTestEvent = (type) => {
    const titleMap = {
      note: "ملاحظة صحية",
      seizure: "نوبة صرع",
      medication: "دواء",
    };

    dispatch(
      addTimelineEvent({
        id: Date.now().toString(),
        type,
        date: new Date().toISOString(),
        data: {
          title: titleMap[type],
          description: `حدث من نوع ${type}`,
        },
      })
    );
  };

  const getEventStyle = (type) => {
    switch(type) {
      case "seizure":
        return { backgroundColor: "#ffe5e5", borderLeftWidth:5, borderLeftColor:"#ff4d4d", padding:12, marginVertical:6, borderRadius:10 };
      case "medication":
        return { backgroundColor: "#e5ffe5", borderLeftWidth:5, borderLeftColor:"#4caf50", padding:12, marginVertical:6, borderRadius:10 };
      case "note":
      default:
        return { backgroundColor: "#e5f0ff", borderLeftWidth:5, borderLeftColor:"#2196f3", padding:12, marginVertical:6, borderRadius:10 };
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  // مكون الأزرار المصممة
  const EventButton = ({ title, color, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 12,
        backgroundColor: color,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 3,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>السجل الصحي</Text>

      {/* أزرار الأحداث التجريبية */}
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <EventButton title="نوبة صرع" color="#ff4d4d" onPress={() => addTestEvent("seizure")} />
        <EventButton title="دواء" color="#4caf50" onPress={() => addTestEvent("medication")} />
        <EventButton title="ملاحظة" color="#2196f3" onPress={() => addTestEvent("note")} />
      </View>

      <EventButton 
        title="تسجيل نوبة صرع حقيقية" 
        color="#ff5555" 
        onPress={() => router.push("/(tabs)/epilepsy")} 
      />

      {/* فلترة الأحداث */}
      <Text style={{ marginTop: 20 }}>فلترة حسب النوع:</Text>
      <Picker
        selectedValue={filterType}
        onValueChange={(itemValue) => setFilterType(itemValue)}
        style={{ marginVertical: 10 }}
      >
        <Picker.Item label="كل الأحداث" value="" />
        <Picker.Item label="نوبات" value="seizure" />
        <Picker.Item label="أدوية" value="medication" />
        <Picker.Item label="ملاحظات" value="note" />
      </Picker>

      {/* Timeline */}
      <FlatList
        data={timeline}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleExpand(item.id)} style={getEventStyle(item.type)}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.data.title}</Text>
            <Text style={{ color:"#555", marginBottom:2 }}>{new Date(item.date).toLocaleString()}</Text>
            <Text numberOfLines={expandedId === item.id ? undefined : 1}>{item.data.description}</Text>

            {expandedId === item.id && (
              <View style={{ marginTop:6 }}>
                {item.data.duration && <Text>مدة: {item.data.duration} دقيقة</Text>}
                {item.data.severity && <Text>شدة: {item.data.severity}</Text>}
                {item.data.triggers && <Text>العوامل المحفزة: {item.data.triggers.join(", ")}</Text>}
                {item.data.notes && <Text>ملاحظات: {item.data.notes}</Text>}
              </View>
            )}
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

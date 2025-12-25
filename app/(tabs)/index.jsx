// import { MaterialIcons } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";
// import { useRouter } from "expo-router";
// import { useState } from "react";
// import { FlatList, Text, TouchableOpacity, View } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import HealthSummaryCard from "../../src/components/HealthSummaryCard";
// import {
//   addTimelineEvent,
//   selectTimelineByType,
// } from "../../src/core/health/healthSlice";

// export default function HomeScreen() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [filterType, setFilterType] = useState("");
//   const [expandedId, setExpandedId] = useState(null);

//   const timeline = useSelector(selectTimelineByType(filterType));
//   const patientProfile = useSelector((state) => state.health.patientProfile);

//   const toggleExpand = (id) =>
//     setExpandedId((prev) => (prev === id ? null : id));

//   const addTestEvent = (type) => {
//     const titleMap = {
//       note: "ملاحظة صحية",
//       seizure: "نوبة صرع",
//       medication: "دواء",
//     };
//     const iconMap = {
//       note: "note",
//       seizure: "flash-on",
//       medication: "local-pharmacy",
//     };

//     dispatch(
//       addTimelineEvent({
//         id: Date.now().toString(),
//         type,
//         date: new Date().toISOString(),
//         data: {
//           title: titleMap[type],
//           icon: iconMap[type],
//           description: `حدث من نوع ${type}`,
//         },
//       })
//     );
//   };

//   const getEventStyle = (type) => {
//     const baseStyle = {
//       padding: 14,
//       marginVertical: 6,
//       borderRadius: 12,
//       shadowColor: "#000",
//       shadowOpacity: 0.1,
//       shadowOffset: { width: 0, height: 2 },
//       shadowRadius: 4,
//       elevation: 2,
//     };
//     switch (type) {
//       case "seizure":
//         return {
//           ...baseStyle,
//           backgroundColor: "#fff0f0",
//           borderLeftWidth: 6,
//           borderLeftColor: "#ff4d4d",
//         };
//       case "medication":
//         return {
//           ...baseStyle,
//           backgroundColor: "#f0fff0",
//           borderLeftWidth: 6,
//           borderLeftColor: "#4caf50",
//         };
//       default:
//         return {
//           ...baseStyle,
//           backgroundColor: "#f0f4ff",
//           borderLeftWidth: 6,
//           borderLeftColor: "#2196f3",
//         };
//     }
//   };

//   const EventButton = ({ title, color, icon, onPress, fullWidth = false }) => (
//     <TouchableOpacity
//       activeOpacity={0.7}
//       onPress={onPress}
//       style={{
//         flex: fullWidth ? 0 : 1,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//         marginHorizontal: fullWidth ? 0 : 5,
//         paddingVertical: 16,
//         backgroundColor: color,
//         borderRadius: 12,
//         shadowColor: "#000",
//         shadowOpacity: 0.2,
//         shadowOffset: { width: 0, height: 3 },
//         shadowRadius: 3,
//         elevation: 3,
//         marginVertical: fullWidth ? 10 : 0,
//       }}
//     >
//       <MaterialIcons
//         name={icon}
//         size={20}
//         color="#fff"
//         style={{ marginRight: 6 }}
//       />
//       <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={{ flex: 1, padding: 16, backgroundColor: "#f9f9f9" }}>
//       <HealthSummaryCard />

//       {/* بطاقة بيانات المريض */}
//       <View
//         style={{
//           backgroundColor: "#fff",
//           padding: 16,
//           borderRadius: 14,
//           shadowColor: "#000",
//           shadowOpacity: 0.1,
//           shadowOffset: { width: 0, height: 2 },
//           shadowRadius: 4,
//           elevation: 3,
//           marginBottom: 16,
//         }}
//       >
//         <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 6 }}>
//           {patientProfile.name || "اسم المريض"}
//         </Text>
//         {patientProfile.age != null && <Text>العمر: {patientProfile.age}</Text>}
//         {patientProfile.gender && <Text>الجنس: {patientProfile.gender}</Text>}
//         {patientProfile.chronicConditions?.length > 0 && (
//           <Text>
//             الأمراض المزمنة: {patientProfile.chronicConditions.join(", ")}
//           </Text>
//         )}
//         {patientProfile.emergencyContact?.name && (
//           <Text>
//             جهة الاتصال الطارئة: {patientProfile.emergencyContact.name} (
//             {patientProfile.emergencyContact.phone})
//           </Text>
//         )}
//       </View>

//       {/* أزرار الأحداث */}
//       <View style={{ flexDirection: "row", marginBottom: 16 }}>
//         <EventButton
//           title="نوبة صرع"
//           color="#ff4d4d"
//           icon="flash-on"
//           onPress={() => addTestEvent("seizure")}
//         />
//         <EventButton
//           title="دواء"
//           color="#4caf50"
//           icon="local-pharmacy"
//           onPress={() => addTestEvent("medication")}
//         />
//         <EventButton
//           title="ملاحظة"
//           color="#2196f3"
//           icon="note"
//           onPress={() => addTestEvent("note")}
//         />
//       </View>

//       {/* زر تسجيل نوبة صرع حقيقية بعرض كامل */}
//       <EventButton
//         fullWidth
//         title="تسجيل نوبة صرع حقيقية"
//         color="#ff5555"
//         icon="add-alert"
//         onPress={() => router.push("/(tabs)/epilepsy")}
//       />

//       {/* فلترة الأحداث */}
//       <Text style={{ marginTop: 20, fontSize: 16 }}>فلترة حسب النوع:</Text>
//       <Picker
//         selectedValue={filterType}
//         onValueChange={setFilterType}
//         style={{ marginVertical: 10 }}
//       >
//         <Picker.Item label="كل الأحداث" value="" />
//         <Picker.Item label="نوبات" value="seizure" />
//         <Picker.Item label="أدوية" value="medication" />
//         <Picker.Item label="ملاحظات" value="note" />
//       </Picker>

//       {/* Timeline */}
//       <FlatList
//         data={timeline}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => toggleExpand(item.id)}
//             style={getEventStyle(item.type)}
//           >
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <MaterialIcons
//                 name={item.data.icon || "event"}
//                 size={20}
//                 color="#333"
//                 style={{ marginRight: 6 }}
//               />
//               <Text style={{ fontWeight: "bold", fontSize: 16 }}>
//                 {item.data.title}
//               </Text>
//             </View>
//             <Text style={{ color: "#555", marginVertical: 2 }}>
//               {new Date(item.date).toLocaleString()}
//             </Text>
//             <Text numberOfLines={expandedId === item.id ? undefined : 1}>
//               {item.data.description}
//             </Text>
//             {expandedId === item.id && (
//               <View style={{ marginTop: 6 }}>
//                 {item.data.duration && (
//                   <Text>مدة: {item.data.duration} دقيقة</Text>
//                 )}
//                 {item.data.severity && <Text>شدة: {item.data.severity}</Text>}
//                 {item.data.triggers && (
//                   <Text>العوامل المحفزة: {item.data.triggers.join(", ")}</Text>
//                 )}
//                 {item.data.notes && <Text>ملاحظات: {item.data.notes}</Text>}
//               </View>
//             )}
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// }




import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HealthSummaryCard from "../../src/components/HealthSummaryCard";
import { addTimelineEvent, selectTimelineByType } from "../../src/core/health/healthSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [filterType, setFilterType] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const timeline = useSelector(selectTimelineByType(filterType));
  const patientProfile = useSelector(state => state.health.patientProfile);

  const toggleExpand = (id) => setExpandedId(prev => prev === id ? null : id);

  const addTestEvent = (type) => {
    const titleMap = {
      note: "ملاحظة صحية",
      seizure: "نوبة صرع",
      medication: "دواء",
    };
    const iconMap = {
      note: "note",
      seizure: "flash-on",
      medication: "local-pharmacy",
    };

    dispatch(
      addTimelineEvent({
        id: Date.now().toString(),
        type,
        date: new Date().toISOString(),
        data: {
          title: titleMap[type],
          icon: iconMap[type],
          description: `حدث من نوع ${type}`,
        },
      })
    );
  };

  const getEventStyle = (type) => {
    const baseStyle = { 
      padding: 14, marginVertical: 6, borderRadius: 12, 
      shadowColor: "#000", shadowOpacity:0.1, shadowOffset:{width:0,height:2}, shadowRadius:4, elevation:2 
    };
    switch(type) {
      case "seizure": return {...baseStyle, backgroundColor:"#fff0f0", borderLeftWidth:6, borderLeftColor:"#ff4d4d"};
      case "medication": return {...baseStyle, backgroundColor:"#f0fff0", borderLeftWidth:6, borderLeftColor:"#4caf50"};
      default: return {...baseStyle, backgroundColor:"#f0f4ff", borderLeftWidth:6, borderLeftColor:"#2196f3"};
    }
  };

  const EventButton = ({ title, color, icon, onPress, fullWidth = false }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        flex: fullWidth ? 0 : 1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal: fullWidth ? 0 : 5,
        paddingVertical:16,
        backgroundColor: color,
        borderRadius:12,
        shadowColor:"#000",
        shadowOpacity:0.2,
        shadowOffset:{width:0,height:3},
        shadowRadius:3,
        elevation:3,
        marginVertical: fullWidth ? 10 : 0
      }}
    >
      <MaterialIcons name={icon} size={20} color="#fff" style={{ marginRight:6 }} />
      <Text style={{ color:"#fff", fontWeight:"bold", fontSize:16 }}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor:"#f9f9f9" }}>

      {/* بطاقة ملخص الصحة (AI/Stats) */}
      <HealthSummaryCard />

      {/* بطاقة بيانات المريض */}
      <View style={{
        backgroundColor:"#fff", padding:16, borderRadius:14,
        shadowColor:"#000", shadowOpacity:0.1, shadowOffset:{width:0,height:2}, shadowRadius:4, elevation:3,
        marginBottom:16
      }}>
        <Text style={{ fontSize:22, fontWeight:"bold", marginBottom:6 }}>
          {patientProfile.name || "اسم المريض"}
        </Text>
        {patientProfile.age != null && <Text>العمر: {patientProfile.age}</Text>}
        {patientProfile.gender && <Text>الجنس: {patientProfile.gender}</Text>}
        {patientProfile.chronicConditions?.length > 0 && (
          <Text>الأمراض المزمنة: {patientProfile.chronicConditions.join(", ")}</Text>
        )}
        {patientProfile.emergencyContact?.name && (
          <Text>
            جهة الاتصال الطارئة: {patientProfile.emergencyContact.name} ({patientProfile.emergencyContact.phone})
          </Text>
        )}
      </View>

      {/* أزرار الأحداث */}
      <View style={{ flexDirection:"row", marginBottom:16 }}>
        <EventButton title="نوبة صرع" color="#ff4d4d" icon="flash-on" onPress={() => addTestEvent("seizure")} />
        <EventButton title="دواء" color="#4caf50" icon="local-pharmacy" onPress={() => addTestEvent("medication")} />
        <EventButton title="ملاحظة" color="#2196f3" icon="note" onPress={() => addTestEvent("note")} />
      </View>

      {/* زر تسجيل نوبة صرع حقيقية بعرض كامل */}
      <EventButton
        fullWidth
        title="تسجيل نوبة صرع حقيقية"
        color="#ff5555"
        icon="add-alert"
        onPress={() => router.push("/(tabs)/epilepsy")}
      />

      {/* فلترة الأحداث */}
      <Text style={{ marginTop:20, fontSize:16 }}>فلترة حسب النوع:</Text>
      <Picker selectedValue={filterType} onValueChange={setFilterType} style={{ marginVertical:10 }}>
        <Picker.Item label="كل الأحداث" value="" />
        <Picker.Item label="نوبات" value="seizure" />
        <Picker.Item label="أدوية" value="medication" />
        <Picker.Item label="ملاحظات" value="note" />
      </Picker>

      {/* Timeline */}
      <FlatList
        data={timeline}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleExpand(item.id)} style={getEventStyle(item.type)}>
            <View style={{ flexDirection:"row", alignItems:"center" }}>
              <MaterialIcons name={item.data.icon || "event"} size={20} color="#333" style={{ marginRight:6 }} />
              <Text style={{ fontWeight:"bold", fontSize:16 }}>{item.data.title}</Text>
            </View>
            <Text style={{ color:"#555", marginVertical:2 }}>{new Date(item.date).toLocaleString()}</Text>
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
        contentContainerStyle={{ paddingBottom:20 }}
      />
    </View>
  );
}

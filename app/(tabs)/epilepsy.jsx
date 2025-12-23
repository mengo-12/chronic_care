import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { addTimelineEvent } from "../../src/core/health/healthSlice";
import { addSeizure } from "../../src/modules/epilepsy/epilepsy.slice";

export default function EpilepsyScreen() {
  const dispatch = useDispatch();

  const [startTime, setStartTime] = useState(new Date().toISOString().slice(0,16)); // yyyy-mm-ddTHH:MM
  const [endTime, setEndTime] = useState(new Date().toISOString().slice(0,16));
  const [severity, setSeverity] = useState("moderate");
  const [triggers, setTriggers] = useState({
    sleep: false,
    stress: false,
    medication: false,
    nutrition: false,
    exercise: false,
  });
  const [notes, setNotes] = useState("");

  // حساب مدة النوبة بالدقائق
  const calculateDuration = () => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = (end - start) / 60000; // بالدقائق
    return diff > 0 ? diff : 0;
  };

  const toggleTrigger = (key) => {
    setTriggers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const saveSeizure = () => {
    const duration = calculateDuration();
    const activeTriggers = Object.keys(triggers).filter(k => triggers[k]);

    const seizure = {
      id: Date.now().toString(),
      date: startTime,
      duration,
      severity,
      triggers: activeTriggers,
      notes,
      endTime,
    };

    // إضافة للنواة (Timeline) مع title و description
    dispatch(
      addTimelineEvent({
        id: seizure.id,
        type: "seizure",
        date: seizure.date,
        data: {
          title: "نوبة صرع",
          description: `مدة: ${duration} دقيقة، الشدة: ${severity}, محفزات: ${activeTriggers.join(", ")}`,
          ...seizure,
        },
      })
    );

    // إضافة لوحدة الصرع
    dispatch(addSeizure(seizure));

    // إعادة ضبط الحقول
    setStartTime(new Date().toISOString().slice(0,16));
    setEndTime(new Date().toISOString().slice(0,16));
    setSeverity("moderate");
    setTriggers({ sleep:false, stress:false, medication:false, nutrition:false, exercise:false });
    setNotes("");

    alert("تم تسجيل النوبة بنجاح ✅");
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>تسجيل نوبة صرع متقدمة</Text>

      <Text>وقت بداية النوبة</Text>
      <TextInput
        value={startTime}
        onChangeText={setStartTime}
        placeholder="YYYY-MM-DDTHH:MM"
        style={{ borderWidth:1, borderColor:"#ccc", padding:8, marginBottom:10, borderRadius:6 }}
      />

      <Text>وقت نهاية النوبة</Text>
      <TextInput
        value={endTime}
        onChangeText={setEndTime}
        placeholder="YYYY-MM-DDTHH:MM"
        style={{ borderWidth:1, borderColor:"#ccc", padding:8, marginBottom:10, borderRadius:6 }}
      />

      <Text>شدة النوبة</Text>
      <Picker
        selectedValue={severity}
        onValueChange={(itemValue) => setSeverity(itemValue)}
        style={{ marginBottom: 10 }}
      >
        <Picker.Item label="خفيفة" value="mild" />
        <Picker.Item label="متوسطة" value="moderate" />
        <Picker.Item label="شديدة" value="severe" />
      </Picker>

      <Text>العوامل المحفزة</Text>
      {Object.keys(triggers).map(key => (
        <TouchableOpacity
          key={key}
          onPress={() => toggleTrigger(key)}
          style={{
            flexDirection:"row",
            alignItems:"center",
            marginBottom:5,
          }}
        >
          <View style={{
            width:20, height:20, borderWidth:1, borderColor:"#333", marginRight:10,
            backgroundColor: triggers[key] ? "#4caf50" : "#fff"
          }} />
          <Text>{key}</Text>
        </TouchableOpacity>
      ))}

      <Text>ملاحظات إضافية</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="اكتب أي ملاحظات"
        multiline
        numberOfLines={4}
        style={{ borderWidth:1, borderColor:"#ccc", padding:8, marginBottom:20, borderRadius:6, textAlignVertical:'top' }}
      />

      <Button title="حفظ النوبة" onPress={saveSeizure} color="#ff5555" />
    </ScrollView>
  );
}

import { ScrollView, Text, View } from "react-native";
import { Steps } from "./components/steps";
import { Stepitem } from "./components/steps/step-item";
import { styles } from "./styles";

export const AppointmentCreate = () => {
  return (
    <View style={styles.container}>
      <Steps />

      <ScrollView style={{ paddingTop: 40 }}>
        <View style={{ gap: 16 }}>
          <Text
            style={{
              fontWeight: "600",
            }}
          >
            Select the type of visit
          </Text>

          <View
            style={{
              flexGrow: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <Stepitem icon="massage" title="Massage" isActive={false} />
            <Stepitem icon="massage" title="Manual therapy" isActive={true} />
            <Stepitem icon="massage" title="Kinesitherapia" isActive={false} />
            <Stepitem icon="massage" title="Osteopathy" isActive={true} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

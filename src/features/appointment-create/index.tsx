import { ScrollView, Text, View } from "react-native"

import { Steps } from "./components/steps"
import { Stepitem } from "./components/steps/step-item"
import { styles } from "./styles"

export const AppointmentCreate = () => {
  return (
    <View style={styles.container}>
      <Steps />

      <ScrollView style={styles.pt40}>
        <View style={styles.stepsContainer}>
          <Text style={styles.stepsContainerTitle}>Select the type of visit</Text>

          <View style={styles.stepsItemsContainer}>
            <Stepitem icon="massage" title="Massage" isActive={true} />
            <Stepitem icon="manual_terapy" title="Manual therapy" isActive={false} />
            <Stepitem icon="kinesitherapie" title="Kinesitherapia" isActive={false} />
            <Stepitem icon="osteopat" title="Osteopathy" isActive={false} />
            <Stepitem
              icon="neurokinetic_therapy"
              title="Neurokinetička terapija"
              isActive={false}
            />
            <Stepitem
              icon="stretching"
              title="Miofascijalna istezanja"
              isActive={false}
            />
            <Stepitem
              icon="shock_teraphy"
              title="Terapija udarnim valom"
              isActive={false}
            />
            <Stepitem icon="medestec_tretman" title="Medestec tretman" isActive={false} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

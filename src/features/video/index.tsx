import { ScrollView, View } from "react-native"
import { Tags } from "./_components/tags"
import { Video } from "./_components/video"

export const Videos = () => {
  return (
    <View style={{ flex: 1, paddingTop: 32, gap: 16 }}>
      <Tags />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
      >
        <Video />
        <Video />
        <Video />
        <Video />
      </ScrollView>
    </View>
  )
}

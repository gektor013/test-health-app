import { View } from "react-native"
import { Tags } from "./_components/tags"

export const Video = () => {
  return (
    <View style={{ flex: 1, paddingTop: 32, gap: 16 }}>
      <Tags />
      <Video />
    </View>
  )
}

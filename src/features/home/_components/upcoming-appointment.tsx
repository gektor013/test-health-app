import { Link } from "expo-router"
import { FlatList, StyleSheet, View, ViewToken } from "react-native"
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue
} from "react-native-reanimated"

import { Appointment, Text } from "@/shared/components"
import { useTranslations } from "@/shared/hooks"

import { colors } from "@/constants"
import { Pagination } from "./pagination"

export interface OnboardingData {
  id: number
  text: string
  textColor: string
  backgroundColor: string
}

const data: OnboardingData[] = [
  {
    id: 1,
    text: "Lorem Ipsum dolor sit amet",
    textColor: "#109a78",
    backgroundColor: "#cde6d5"
  },
  {
    id: 2,
    text: "Lorem Ipsum dolor sit amet",
    textColor: "#1e2169",
    backgroundColor: "#cfe4e4"
  },
  {
    id: 3,
    text: "Lorem Ipsum dolor sit amet",
    textColor: "#F15937",
    backgroundColor: "#faeb8a"
  },
  {
    id: 4,
    text: "Lorem Ipsum dolor sit amet",
    textColor: "#F15937",
    backgroundColor: "#faeb8a"
  },
  {
    id: 5,
    text: "Lorem Ipsum dolor sit amet",
    textColor: "#F15937",
    backgroundColor: "#faeb8a"
  }
]

export const UpcomingAppointment = () => {
  const { t } = useTranslations()

  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>()
  const x = useSharedValue(0)
  const flatListIndex = useSharedValue(0)

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index
    }
  }

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("Upcoming appointment")}</Text>
        <View>
          <Link href="/(app)/tabs/appointment">
            <Text type="link">{t("See All")}</Text>
          </Link>
          <View style={styles.line} />
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Animated.FlatList
          ref={flatListRef}
          onScroll={onScroll}
          data={data}
          renderItem={() => {
            return <Appointment />
          }}
          keyExtractor={(item) => item.id.toString()}
          scrollEventThrottle={16}
          horizontal={true}
          bounces={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            minimumViewTime: 300,
            viewAreaCoveragePercentThreshold: 10
          }}
        />
        <View style={styles.bottomContainer}>
          <Pagination data={data} x={x} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontWeight: "600"
  },
  link: {
    // borderBottomWidth: 1,
    // borderColor: colors.green
  },
  bottomContainer: {
    alignItems: "center"
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: colors.green
  }
})

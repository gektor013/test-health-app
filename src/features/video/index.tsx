import { ScrollView, Text, View } from "react-native"
import { useCallback, useState } from "react"
import { useFocusEffect } from "expo-router"

import { useGetCategoriesQuery } from "@/redux/services/category-api"
import { useGetUserVideoQuery } from "@/redux/services/user-api"

import { Tags } from "./_components/tags"
import { Video } from "./_components/video"

export const Videos = () => {
  const [category, setCategory] = useState<string | null>(null)
  const { data: categoriesData, refetch: refetchCategoriesData } = useGetCategoriesQuery()
  const { data: userVideoData, refetch: refetchUserVideoData } = useGetUserVideoQuery(
    { category },
    {
      refetchOnMountOrArgChange: true
    }
  )

  useFocusEffect(
    useCallback(() => {
      refetchUserVideoData()
      refetchCategoriesData()
    }, [])
  )

  return (
    <View style={{ flex: 1, paddingTop: 32, gap: 16 }}>
      {!category && !userVideoData?.length ? (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>You don't have any videos available yet.</Text>
        </View>
      ) : (
        <>
          <Tags
            data={categoriesData?.data}
            currentCategory={category}
            setCategory={setCategory}
          />
          <ScrollView
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
          >
            {userVideoData?.map((video) => (
              <Video key={video.id} data={video} />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  )
}

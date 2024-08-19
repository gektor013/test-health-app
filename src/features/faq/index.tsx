import React from "react"
import { StyleSheet, View } from "react-native"

export const Faq = () => {
  // useEffect(() => {
  //   maxHeight.value = withTiming(isOpen ? 3000 : 0, { duration: 300 })
  // }, [isOpen])

  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  faqcontainer: {
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  questionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#F5F5F5"
  },
  questionText: {
    fontWeight: "bold",
    fontSize: 16
  },
  answerContainer: {
    overflow: "hidden",
    backgroundColor: "white"
  },
  answerText: {
    fontSize: 14,
    color: "#333",
    paddingHorizontal: 15,
    paddingVertical: 10
  }
})

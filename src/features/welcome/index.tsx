import { Image, StyleSheet, View } from "react-native"
import { Link, router } from "expo-router"

import { Button, Text, Title } from "@/shared/components"
import { useTranslations } from "@/shared/hooks"

import imageLogo from "#/images/logo.png"

export const Welcome = () => {
  const { t } = useTranslations()

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={imageLogo} resizeMode={"contain"} />
      <View style={styles.content}>
        <Title style={styles.title}>{t("Your app for schedule appointments")}</Title>
        <Text style={styles.description}>
          {t("Book appointments effortlessly, manage your visit history and videos")}
        </Text>
        <Button
          containerStyles={styles.button}
          variant="primary"
          title="Let’s Get Started"
          onPress={() => {
            router.replace("/onboarding")
          }}
        />
        <Text style={styles.authText}>
          {t("Already have an account?")}{" "}
          <Link href="/auth/sign-in">
            <Text style={styles.authText} type="link">
              {t("Sign In")}
            </Text>
          </Link>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    flex: 1,
    width: null,
    height: null
  },
  content: {
    paddingBottom: 70
  },
  title: {
    marginBottom: 18
  },
  description: {
    textAlign: "center",
    marginBottom: 32
  },
  button: {
    marginBottom: 24
  },
  authText: {
    textAlign: "center",
    fontSize: 12
  }
})

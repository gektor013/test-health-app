import { Link, router } from "expo-router"
import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import { Alert, Image, StyleSheet, View } from "react-native"

import { useLoginMutation } from "@/redux/services/user-api"
import { Button, FormError, Text, TextInput } from "@/shared/components"
import { useAuth, useTranslations } from "@/shared/hooks"
import { zodResolver } from "@/utils/zod"

import imageLogo from "#/images/logo-black-text.png"

import { signInSchema, SignInSchemaType } from "./schemas"

const defaultValues = {
  email: "",
  password: ""
}

export const SignIn = () => {
  const { t } = useTranslations()
  const [login, { isLoading }] = useLoginMutation()
  const { loginUser } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    defaultValues,
    resolver: zodResolver(signInSchema)
  })

  const onSubmit: SubmitHandler<SignInSchemaType> = async (body) => {
    try {
      const result = await login(body)
        .unwrap()
        .catch(() => Alert.alert("Wrong credentials"))

      if (result?.token) {
        loginUser(result)
        router.navigate("/")
      } else throw new Error()
    } catch (error) {
      setError("root.serverError", {
        type: "401",
        message: "Invalid credentials"
      })
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={imageLogo} resizeMode={"contain"} />
      <View style={styles.form}>
        <TextInput
          label="Email"
          control={control}
          name="email"
          inputProps={{
            keyboardType: "email-address",
            placeholder: t("example@email.com")
          }}
        />
        <TextInput
          label="Password"
          control={control}
          name="password"
          type="password"
          inputProps={{
            placeholder: t("Enter your password")
          }}
        />
        <FormError error={errors.root?.serverError as FieldError} />
        {/* <Text style={styles.forgotText} type="link">
          {t("Forgot password?")}
        </Text> */}
        <Button
          title={t("Sign In")}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
        <Text style={styles.accountText}>
          {t("Don’t have an account?")}&nbsp;
          <Link href={"/auth/sign-up"}>
            <Text style={styles.signUpText} type="link">
              {t("Sign Up")}
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
    width: 165,
    height: 100,
    alignSelf: "center",
    marginBottom: 24
  },
  form: {
    gap: 16
  },
  forgotText: {
    textAlign: "right",
    textDecorationLine: "underline"
  },
  accountText: {
    textAlign: "center"
  },
  signUpText: { textDecorationLine: "underline" }
})

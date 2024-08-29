import { Link, router } from "expo-router"
import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import { Alert, Image, StyleSheet, View } from "react-native"

import { useLoginMutation, useRegistrationsMutation } from "@/redux/services/user-api"
import { signUpSchema } from "@/schemas/sign-up/sign-up.schema"
import { Button, FormError, Text, TextInput } from "@/shared/components"
import { useActions, useTranslations } from "@/shared/hooks"
import { SignUp as SignUpType } from "@/types/sign-up"
import { zodResolver } from "@hookform/resolvers/zod"

import ImageLogo from "#/images/logo-black-text.png"

const defaultValues: SignUpType = {
  name: "",
  email: "",
  password: "",
  phone: "",
  confirmPassword: ""
}

export const SignUp = () => {
  const { t } = useTranslations()
  const { setToken } = useActions()

  const [login, { isLoading: isLoginLoading }] = useLoginMutation()
  const [registrations, { isLoading: isRegistrationLoading }] = useRegistrationsMutation()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit: SubmitHandler<SignUpType> = async (body) => {
    await registrations({ ...body, isAgreed: true })
      .unwrap()
      .then(() => {
        onLogin({ email: body.email, password: body.password })
      })
      .catch(() => {
        Alert.alert("Something went wrong")
      })
  }

  const onLogin = async ({ email, password }: { email: string; password: string }) => {
    await login({ email, password })
      .unwrap()
      .then((res) => {
        setToken(res?.token)

        router.push({
          pathname: "/auth/complete-profile",
          params: { email: res.email, name: res.name, id: res.userId, phone: res.phone }
        })
      })
      .catch(() => Alert.alert("Something went wrong"))
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={ImageLogo} resizeMode={"contain"} />
      <View style={styles.form}>
        <TextInput
          label="Full name"
          control={control}
          name="name"
          inputProps={{
            placeholder: t("Enter your name")
          }}
        />

        <TextInput
          label="Phone number"
          control={control}
          type="phone"
          name="phone"
          inputProps={{
            maxLength: 17,
            placeholder: t("+1 (999) 111-0000"),
            keyboardType: "numbers-and-punctuation"
          }}
        />

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
          label="New password"
          control={control}
          name="password"
          type="password"
          inputProps={{
            placeholder: t("New password")
          }}
        />

        <TextInput
          label="Confirm password"
          control={control}
          name="confirmPassword"
          type="password"
          inputProps={{
            placeholder: t("Confirm your password")
          }}
        />
        <FormError error={errors.root?.serverError as FieldError} />

        <Button
          title={t("Sign up")}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoginLoading || isRegistrationLoading}
        />
        <Text style={styles.accountText}>
          {t("Don’t have an account?")}{" "}
          <Link href={"/auth/sign-in"}>
            <Text style={styles.signUpText} type="link">
              {t("Sign in")}
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

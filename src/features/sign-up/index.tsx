import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import { Image, StyleSheet, View } from "react-native"

import { Button, FormError, Text, TextInput } from "@/shared/components"
import { useTranslations } from "@/shared/hooks"

import imageLogo from "#/images/logo-black-text.png"

import { signUpSchema } from "@/schemas/sign-up/sign-up.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "expo-router"
import { z } from "zod"

export type EmployeesResponse = z.infer<typeof signUpSchema>

const defaultValues: EmployeesResponse = {
  email: "",
  password: "",
  name: "",
  confirmPassword: ""
}

export const SignUp = () => {
  const { t } = useTranslations()
  // const [login, { isLoading }] = useLoginMutation()
  // const { loginUser } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    defaultValues,
    resolver: zodResolver(signUpSchema)
  })

  console.log(errors)

  const onSubmit: SubmitHandler<any> = async (body) => {
    // try {
    //   const result = await login(body).unwrap()
    //   if (result?.token) loginUser(result)
    //   else throw new Error()
    // } catch (error) {
    //   setError("root.serverError", {
    //     type: "401",
    //     message: "Invalid credentials"
    //   })
    // }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={imageLogo} resizeMode={"contain"} />
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
          // disabled={isLoading}
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

import { Image, StyleSheet, View } from "react-native";
import { Button, FormError, Text, TextInput } from "@/shared/components";
import { useTranslations } from "@/shared/hooks";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { signInSchema, SignInSchemaType } from "./schemas";
import { zodResolver } from "@/utils/zod";
import imageLogo from "#/images/logo-black-text.png";

const defaultValues = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues,
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInSchemaType> = async (body) => {
    try {
      console.log(body);
    } catch (error) {
      setError("root.serverError", {
        type: "401",
        message: "Invalid credentials",
      });
    }
  };

  const { t } = useTranslations();

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
            placeholder: t("example@email.com"),
          }}
        />
        <TextInput
          label="Password"
          control={control}
          name="password"
          type="password"
          inputProps={{
            placeholder: t("Enter your password"),
          }}
        />
        <FormError error={errors.root?.serverError as FieldError} />
        <Text style={styles.forgotText} type="link">
          {t("Forgot password?")}
        </Text>
        <Button title={t("Sign In")} onPress={handleSubmit(onSubmit)} />
        <Text style={styles.accountText}>
          {t("Don’t have an account?")}
          <Text style={styles.signUpText} type="link">
            {" "}
            {t("Sign Up")}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 165,
    height: 100,
    alignSelf: "center",
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  forgotText: {
    textAlign: "right",
    textDecorationLine: "underline",
  },
  accountText: {
    textAlign: "center",
  },
  signUpText: { textDecorationLine: "underline" },
});

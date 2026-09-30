import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useAuth } from "@/store/auth";

export default function SignUp() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const { signup, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onNext = async () => {
    if (!email || !phone || password.length < 8) {
      Alert.alert("Check karo", "Email, phone aur 8+ character ka password chahiye.");
      return;
    }
    try {
      await signup({ email: email.trim(), phone: phone.trim(), password });
      router.replace("/(auth)/verify");
    } catch (e: any) {
      Alert.alert(
        "Signup failed",
        e?.response?.data?.error ?? "Server se connect nahi ho paya."
      );
    }
  };

  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />

      <Image
        source={require("../../../assets/images/signup-kash-face.png")}
        style={{
          position: "absolute",
          top: -height * 0.055,
          left: -width * 0.18,
          width: width * 0.52,
          height: height * 0.2,
          transform: [{ rotate: "-18deg" }],
        }}
        contentFit="contain"
        pointerEvents="none"
      />

      <Image
        source={require("../../../assets/images/signup-star.png")}
        style={{
          position: "absolute",
          bottom: height * 0.14,
          right: -width * 0.1,
          width: width * 0.38,
          height: height * 0.17,
        }}
        contentFit="contain"
        pointerEvents="none"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 28,
            paddingBottom: height * 0.18,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require("../../../assets/images/signup-title.svg")}
            style={{ width: width * 0.42, height: height * 0.042, alignSelf: "center" }}
            contentFit="contain"
          />

          <Image
            source={require("../../../assets/images/signup-subtitle.svg")}
            style={{
              width: width * 0.52,
              height: height * 0.022,
              alignSelf: "center",
              marginTop: 6,
            }}
            contentFit="contain"
          />

          <View style={{ marginTop: 22, gap: 10 }}>
            <Field
              placeholder="Mail-id"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
            />
            <Field
              placeholder="Phone no."
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              autoComplete="tel"
            />
            <Field
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="newPassword"
              autoComplete="new-password"
            />
          </View>
        </ScrollView>

        <Pressable
          onPress={onNext}
          disabled={loading}
          style={{ backgroundColor: "#0B7A3B", opacity: loading ? 0.6 : 1 }}
          className="mx-auto mb-10 h-11 w-32 items-center justify-center rounded-full active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">
            {loading ? "..." : "Next"}
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#8A8A8A"
      autoCapitalize="none"
      autoCorrect={false}
      style={{
        height: 42,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#DCDCDC",
        backgroundColor: "#F1F1F1",
        paddingHorizontal: 14,
        fontSize: 14,
        color: "#111111",
      }}
    />
  );
}
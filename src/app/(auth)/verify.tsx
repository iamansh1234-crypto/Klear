import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useAuth } from "@/store/auth";

const OTP_LENGTH = 5;
const RESEND_SECONDS = 30;

export default function Verify() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const email = useAuth((s) => s.pendingEmail ?? "");
  const verify = useAuth((s) => s.verify);
  const resend = useAuth((s) => s.resend);

  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [busy, setBusy] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const complete = code.length === OTP_LENGTH;

  useEffect(() => {
    if (!email) router.replace("/(auth)/signup");
  }, [email]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  useEffect(() => {
    if (complete && !busy) onNext();
  }, [complete]);

  const reset = () => {
    setCode("");
    inputRef.current?.focus();
  };

  const onChangeText = (t: string) => {
    setCode(t.replace(/\D/g, "").slice(0, OTP_LENGTH));
  };

  const onResend = async () => {
    if (seconds > 0 || busy) return;
    try {
      await resend();
      reset();
      setSeconds(RESEND_SECONDS);
      Alert.alert("OTP bhej diya", `${email} pe naya code gaya hai.`);
    } catch (e: any) {
      Alert.alert("Resend failed", e?.response?.data?.error ?? e?.message ?? "Dobara try karo.");
    }
  };

  async function onNext() {
    if (code.length !== OTP_LENGTH || busy) return;
    setBusy(true);
    try {
      await verify(code);
      router.replace("/(auth)/get-to-know");
    } catch (e: any) {
      Alert.alert("Verify failed", e?.response?.data?.error ?? e?.message ?? "Dobara try karo.");
      reset();
    } finally {
      setBusy(false);
    }
  }

  const mmss = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  const activeIndex = Math.min(code.length, OTP_LENGTH - 1);

  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />

      <Image
        source={require("../../../assets/images/signup-star.png")}
        style={{
          position: "absolute",
          top: -height * 0.06,
          left: -width * 0.02,
          width: width * 0.62,
          height: height * 0.32,
          transform: [{ scaleX: -1 }],
        }}
        contentFit="contain"
        pointerEvents="none"
      />

      <Image
        source={require("../../../assets/images/signup-kash-face.png")}
        style={{
          position: "absolute",
          bottom: -height * 0.1,
          right: -width * 0.14,
          width: width * 0.95,
          height: height * 0.45,
          transform: [{ scaleX: -1 }, { rotate: "-8deg" }],
        }}
        contentFit="contain"
        pointerEvents="none"
      />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 26,
          paddingBottom: height * 0.1,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
            textAlign: "center",
            color: "#2A0F3D",
            letterSpacing: 1,
          }}
        >
          VERIFY
        </Text>

        <Text style={{ textAlign: "center", marginTop: 4, fontSize: 12, color: "#2A0F3D" }}>
          OTP is sent to your email to verify the details
        </Text>

        <Text
          style={{ textAlign: "center", marginTop: 2, fontSize: 12, color: "#777777" }}
          numberOfLines={1}
        >
          {email}
        </Text>

        <Pressable
          onPress={() => inputRef.current?.focus()}
          style={{ flexDirection: "row", justifyContent: "center", gap: 10, marginTop: 20 }}
        >
          {Array.from({ length: OTP_LENGTH }).map((_, i) => {
            const digit = code[i] ?? "";
            const isActive = focused && i === activeIndex && !complete;
            return (
              <View
                key={i}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  borderWidth: isActive ? 2 : 1,
                  borderColor: isActive || digit ? "#8338EB" : "#DCDCDC",
                  backgroundColor: "#F1F1F1",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "700", color: "#111111" }}>
                  {digit}
                </Text>
              </View>
            );
          })}

          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={onChangeText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            maxLength={OTP_LENGTH}
            autoFocus
            editable={!busy}
            caretHidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.01,
              color: "transparent",
            }}
          />
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
            paddingHorizontal: 6,
          }}
        >
          <Pressable onPress={onResend} disabled={seconds > 0 || busy}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: seconds > 0 ? "#999999" : "#2A0F3D",
              }}
            >
              Resend OTP
            </Text>
          </Pressable>

          <Text style={{ fontSize: 13, fontWeight: "600", color: "#2A0F3D" }}>
            Timer - {mmss}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onNext}
        disabled={!complete || busy}
        style={{
          backgroundColor: "#0B7A3B",
          opacity: complete && !busy ? 1 : 0.5,
          marginBottom: height * 0.07,
        }}
        className="mx-auto h-11 w-32 items-center justify-center rounded-full active:opacity-80"
      >
        <Text className="text-base font-semibold text-white">{busy ? "..." : "Next"}</Text>
      </Pressable>
    </View>
  );
}
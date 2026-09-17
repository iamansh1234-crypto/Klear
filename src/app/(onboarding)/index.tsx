import { useEffect } from "react";
import { View, Text, Pressable, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import { welcomeDecor } from "@/features/onboarding/decor";
import { FloatItem } from "@/features/onboarding/components/FloatItem";

export default function Welcome() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  const goNext = () => router.push("/(auth)/signup");
  // useEffect(() => {
  //   const t = setTimeout(goNext, 3000);
  //   return () => clearTimeout(t);
  // }, []);

  return (
     <Pressable onPress={goNext} className="flex-1 bg-purple">
    <StatusBar style="light" />

    <View className="absolute inset-0 overflow-hidden bg-purple">
      {welcomeDecor.map((item) => (
        <FloatItem key={item.id} item={item} />
      ))}

        {/* <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 700, delay: 900 }}
          style={{ position: "absolute", top: height * 0.43, width }}
          className="items-center"
        >
          <Text className="text-center text-base font-semibold tracking-[3px] text-offwhite">
            WELCOME TO
          </Text>
          <Text className="mt-1 text-center text-4xl font-extrabold tracking-wide text-offwhite">
            KLEAR SPEND
          </Text>
        </MotiView> */}

<MotiView
  from={{ opacity: 0, translateY: 16 }}
  animate={{ opacity: 1, translateY: 0 }}
  transition={{ type: "timing", duration: 700, delay: 900 }}
  style={{
    position: "absolute",
    top: height * 0.43,
    left: 0,
    right: 0,
    alignItems: "center",
  }}
>
  <Image
    source={require("../../../assets/images/welcome-text.svg")}
    style={{ width: width * 0.78, height: height * 0.09 }}
    contentFit="contain"
  />
</MotiView>

<MotiView
  from={{ opacity: 0, scale: 0.85, translateY: 50 }}
  animate={{ opacity: 1, scale: 1, translateY: 0 }}
  transition={{ type: "spring", damping: 14, delay: 1200 }}
  style={{
    position: "absolute",
    bottom: -height * 0.06,
    left: 0,
    right: 0,
    alignItems: "center",
  }}
  pointerEvents="none"
>
 <Image
  source={require("../../../assets/images/kash-bolt.png")}
  style={{ width: width * 1.05, height: height * 0.42 }}
  contentFit="fill"
/>
</MotiView>
      </View>
    </Pressable>
  );
}
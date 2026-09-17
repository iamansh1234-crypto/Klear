import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { markOnboardingDone, resetOnboarding } from "@/lib/storage";

export default function Slides() {
  const router = useRouter();

  const finish = async () => {
    await markOnboardingDone();
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 items-center justify-center bg-offwhite px-8">
      <Text className="text-2xl font-bold text-ink">Onboarding slides</Text>

      <Pressable
        onPress={finish}
        className="mt-8 h-14 w-full items-center justify-center rounded-2xl bg-purple active:opacity-80"
      >
        <Text className="text-lg font-semibold text-offwhite">Continue</Text>
      </Pressable>

      {/* dev only — launch se pehle hata dena */}
      <Pressable onPress={resetOnboarding} className="mt-4 py-2">
        <Text className="text-ink/50">Reset onboarding (dev)</Text>
      </Pressable>
    </View>
  );
}
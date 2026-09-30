import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Questions2() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-cream px-8">
      <Text className="text-2xl font-bold text-ink">Question 2</Text>
      <Pressable
        onPress={() => router.replace("/home")}
        className="mt-8 h-11 w-32 items-center justify-center rounded-full bg-purple active:opacity-80"
      >
        <Text className="text-base font-semibold text-white">Skip</Text>
      </Pressable>
    </View>
  );
}
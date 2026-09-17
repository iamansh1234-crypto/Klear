import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/store/auth";

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-cream px-8">
      <Text className="text-2xl font-bold text-ink">Sabh Klear Hai!</Text>
      <Text className="mt-2 text-ink/70">{user?.email}</Text>

      <Pressable
        onPress={async () => {
          await logout();
          router.replace("/(auth)/signup");
        }}
        className="mt-8 py-2"
      >
        <Text className="text-ink/50">Logout</Text>
      </Pressable>
    </View>
  );
}
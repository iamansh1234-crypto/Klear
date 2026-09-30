import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@/store/auth";

export default function Index() {
  const restore = useAuth((s) => s.restore);
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    restore().then((ok) => setTarget(ok ? "/home" : "/(onboarding)"));
  }, []);

  if (!target) {
    return (
      <View className="flex-1 items-center justify-center bg-purple">
        <ActivityIndicator color="#F5C518" />
      </View>
    );
  }

  return <Redirect href={target as any} />;
}
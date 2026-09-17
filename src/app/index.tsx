import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Index() {
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync("klear_token").then((token) => {
      setTarget(token ? "/home" : "/(onboarding)");
    });
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
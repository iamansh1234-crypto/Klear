import { useState } from "react";
import { View, Text, Pressable, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { useRouter } from "expo-router";

const OPTIONS = ["School student", "College student", "Employee", "Other"];

export default function Questions() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const onSelect = (option: string) => {
    setSelected(option);
    // thoda ruk ke aage, taki green dikh jaye
    setTimeout(() => router.push("/(auth)/questions-2"), 320);
  };

  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />

      {/* Kash — neeche, beech mein */}
      <Image
        source={require("../../../assets/images/signup-kash-face.png")}
        style={{
          position: "absolute",
          bottom: -height * 0.08,
          alignSelf: "center",
          width: width * 0.9,
          height: height * 0.42,
        }}
        contentFit="contain"
        pointerEvents="none"
      />

      <View style={{ paddingTop: height * 0.09, paddingHorizontal: 22 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "800",
            letterSpacing: 1.5,
            color: "#2A0F3D",
            textAlign: "center",
          }}
        >
          WHAT IS YOUR OCCUPATION ?
        </Text>

        <View style={{ marginTop: 22, gap: 12 }}>
          {OPTIONS.map((option, i) => {
            const isSelected = selected === option;
            return (
              <MotiView
                key={option}
                from={{ opacity: 0, translateY: 14 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 350, delay: 100 + i * 80 }}
              >
                <Pressable
                  onPress={() => onSelect(option)}
                  style={{
                    height: 50,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isSelected ? "#16A34A" : "#3D1A4F",
                    borderWidth: 2,
                    borderColor: isSelected ? "#0B7A3B" : "#3D1A4F",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "800",
                      letterSpacing: 1.2,
                      color: isSelected ? "#FFFFFF" : "#F5C518",
                    }}
                  >
                    {option.toUpperCase()}
                  </Text>
                </Pressable>
              </MotiView>
            );
          })}
        </View>
      </View>
    </View>
  );
}
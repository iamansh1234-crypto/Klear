import { View, Text, Pressable, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { useRouter } from "expo-router";

export default function GetToKnow() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  const goNext = () => router.push("/(auth)/questions");

  return (
    <Pressable onPress={goNext} className="flex-1 bg-cream">
      <StatusBar style="dark" />

      {/* neeche-left star — signup wala hi, ghuma ke */}
      <Image
        source={require("../../../assets/images/signup-star.png")}
        style={{
          position: "absolute",
          bottom: -height * 0.02,
          left: -width * 0.16,
          width: width * 0.5,
          height: height * 0.22,
          transform: [{ scaleX: -1 }],
        }}
        contentFit="contain"
        pointerEvents="none"
      />

      {/* speech bubble */}
      <MotiView
        from={{ opacity: 0, translateY: -20, scale: 0.9 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        transition={{ type: "spring", damping: 14, delay: 200 }}
        style={{
          position: "absolute",
          top: height * 0.08,
          left: width * 0.07,
          right: width * 0.12,
        }}
      >
        <View
          style={{
            backgroundColor: "#2A0F3D",
            borderRadius: 12,
            paddingVertical: 20,
            paddingHorizontal: 22,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "800",
              letterSpacing: 2,
            }}
          >
            LETS
          </Text>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "800",
              letterSpacing: 2,
              marginTop: 3,
            }}
          >
            GET TO KNOW YOU
          </Text>
          <Text
            style={{
              color: "#F5C518",
              fontSize: 20,
              fontWeight: "900",
              letterSpacing: 2,
              marginTop: 3,
            }}
          >
            BETTER
          </Text>
        </View>

        {/* bubble ki poonch */}
        <View
          style={{
            width: 0,
            height: 0,
            marginLeft: 26,
            borderRightWidth: 16,
            borderTopWidth: 22,
            borderRightColor: "transparent",
            borderTopColor: "#2A0F3D",
          }}
        />

        {/* coin — bubble ke upar-right kone pe */}
        <View
          style={{
            position: "absolute",
            top: -14,
            right: -10,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#F5C518",
            borderWidth: 3,
            borderColor: "#2A0F3D",
            alignItems: "center",
            justifyContent: "center",
            transform: [{ rotate: "-15deg" }],
          }}
        >
          <Text style={{ color: "#8338EB", fontSize: 18, fontWeight: "900" }}>₹</Text>
        </View>
      </MotiView>

      {/* daudta Kash */}
      <MotiView
        from={{ opacity: 0, translateX: -70 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: "spring", damping: 15, delay: 500 }}
        style={{
          position: "absolute",
          top: height * 0.3,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
        pointerEvents="none"
      >
        <Image
          source={require("../../../assets/images/kash-running.png")}
          style={{ width: width * 0.9, height: height * 0.42 }}
          contentFit="contain"
        />
      </MotiView>

      {/* tap hint */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ type: "timing", duration: 600, delay: 1400 }}
        style={{ position: "absolute", bottom: height * 0.05, left: 0, right: 0 }}
      >
        <Text style={{ textAlign: "center", fontSize: 12, color: "#2A0F3D" }}>
          Tap to continue
        </Text>
      </MotiView>
    </Pressable>
  );
}
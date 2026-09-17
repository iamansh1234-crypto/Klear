import { MotiView } from "moti";
import { Image } from "expo-image";
import { useWindowDimensions } from "react-native";
import type { DecorItem } from "../decor";

export function FloatItem({ item }: { item: DecorItem }) {
  const { width, height } = useWindowDimensions();
  const size = width * item.size;

  return (
    <MotiView
      from={{ translateY: 0 }}
      animate={{ translateY: -12 }}
      transition={{
        type: "timing",
        duration: 2000,
        loop: true,
        repeatReverse: true,
        delay: item.delay ?? 0,
      }}
      style={{
        position: "absolute",
        left: width * item.x,
        top: height * item.y,
        transform: [{ rotate: `${item.rotate ?? 0}deg` }],
      }}
      pointerEvents="none"
    >
      <Image
        source={item.source}
        style={{ width: size, height: size }}
        contentFit="contain"
      />
    </MotiView>
  );
}
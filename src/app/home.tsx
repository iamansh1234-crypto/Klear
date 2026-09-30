import { useState } from "react";
import { View, Text, Pressable, ScrollView, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/store/auth";
// import { savingSummary, quickActions, goals, autoSave, smartInsight } from "@/features/home/data";

import { useHomeData } from "@/features/home/useHomeData";
const CREAM = "#FBEFD3";
const GOLD = "#F5C518";
const INK = "#2A0F3D";
const PURPLE = "#8338EB";
const GREEN = "#127A3D";
const TAB_IDLE = "#EADCAE";

const TABS = ["SAVING", "SPENDING", "INVESTING"] as const;
type Tab = (typeof TABS)[number];

export default function Home() {
  const { width } = useWindowDimensions();
  const [tab, setTab] = useState<Tab>("SAVING");
  const user = useAuth((s) => s.user);
  const { savingSummary, quickActions, goals, autoSave, smartInsight, streak } = useHomeData();

  const name = (() => {
    const raw = user?.email?.split("@")[0] ?? "";
    if (!raw) return "THERE";
    const clean = raw.split(/[._\-0-9]+/)[0];
    return (clean || raw).toUpperCase();
  })();

  return (
    <View style={{ flex: 1, backgroundColor: CREAM }}>
      <StatusBar style="dark" />
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 18,
              marginTop: 10,
            }}
          >
            <View>
              <Text
                style={{ fontSize: 22, fontWeight: "900", color: INK, letterSpacing: 0.5 }}
              >
                HEY {name}
              </Text>
              <Text style={{ fontSize: 12, color: INK, opacity: 0.75, marginTop: 2 }}>
                Lets have a Klear Day
              </Text>
            </View>

            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: PURPLE,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Image
                source={require("../../assets/images/signup-kash-face.png")}
                style={{ width: 58, height: 58, marginTop: 6 }}
                contentFit="contain"
              />
            </View>
          </View>

          {/* tabs */}
          <View style={{ flexDirection: "row", marginTop: 18, paddingHorizontal: 10 }}>
            {TABS.map((t) => {
              const active = t === tab;
              return (
                <Pressable
                  key={t}
                  onPress={() => setTab(t)}
                  style={{
                    flex: 1,
                    height: 34,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: active ? INK : TAB_IDLE,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "800",
                      letterSpacing: 1.2,
                      color: active ? GOLD : INK,
                      opacity: active ? 1 : 0.6,
                    }}
                  >
                    {t}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {tab === "SAVING" ? (
            <View style={{ paddingHorizontal: 18 }}>
              {/* total saving card */}
              <View
                style={{
                  marginTop: 16,
                  backgroundColor: GOLD,
                  borderRadius: 14,
                  padding: 18,
                  overflow: "hidden",
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: "700", color: GREEN }}>
                  Total Saving Value
                </Text>

                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "900",
                    color: INK,
                    marginTop: 6,
                    lineHeight: 26,
                  }}
                >
                  {savingSummary.total}
                </Text>

                <Text style={{ fontSize: 10, fontWeight: "600", color: GREEN, marginTop: 8 }}>
                  {savingSummary.caption}
                </Text>

                <Pressable
                  style={{
                    marginTop: 14,
                    height: 36,
                    width: 110,
                    borderRadius: 8,
                    backgroundColor: GREEN,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>
                    Add Goal
                  </Text>
                </Pressable>

                {/* Kash */}
                <Image
                  source={require("../../assets/images/kash-dance.png")}
                  style={{
                    position: "absolute",
                    right: -4,
                    top: 10,
                    width: width * 0.32,
                    height: 118,
                  }}
                  contentFit="contain"
                  pointerEvents="none"
                />
              </View>

              {/* quick actions */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 24,
                  paddingHorizontal: 6,
                }}
              >
                {quickActions.map((a) => (
                  <Pressable key={a.id} style={{ alignItems: "center", width: 80 }}>
                    <Image
                      source={a.icon}
                      style={{ width: 46, height: 46 }}
                      contentFit="contain"
                    />
                    <Text
                      style={{ fontSize: 11, fontWeight: "700", color: INK, marginTop: 8 }}
                    >
                      {a.label}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {/* MY GOALS */}
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "900",
                  letterSpacing: 1.2,
                  color: INK,
                  marginTop: 26,
                  marginBottom: 10,
                }}
              >
                MY GOALS
              </Text>

              <View
                style={{
                  backgroundColor: GOLD,
                  borderRadius: 14,
                  paddingVertical: 14,
                  paddingHorizontal: 14,
                  gap: 16,
                }}
              >
                {goals.map((g) => (
                  <Pressable
                    key={g.id}
                    style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
                  >
                    <Image
                      source={g.icon}
                      style={{ width: 42, height: 42 }}
                      contentFit="contain"
                    />

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "900",
                          letterSpacing: 0.8,
                          color: PURPLE,
                        }}
                      >
                        {g.label}
                      </Text>

                      <Text style={{ fontSize: 9, color: INK, opacity: 0.6, marginTop: 2 }}>
                        {g.saved} / {g.target}
                      </Text>

                      <View
                        style={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: "#FFFFFF",
                          marginTop: 6,
                          overflow: "hidden",
                        }}
                      >
                        <View
                          style={{
                            width: `${g.percent}%`,
                            height: "100%",
                            backgroundColor: GREEN,
                            borderRadius: 3,
                          }}
                        />
                      </View>
                    </View>

                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "900",
                        color: INK,
                        width: 52,
                        textAlign: "right",
                      }}
                    >
                      {g.percent}%
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Pressable style={{ alignSelf: "flex-end", marginTop: 8 }}>
                <Text style={{ fontSize: 11, fontWeight: "700", color: INK, opacity: 0.7 }}>
                  View All →
                </Text>
              </Pressable>


                              {/* AUTO SAVE + SMART INSIGHT */}
              <View style={{ flexDirection: "row", gap: 12, marginTop: 14 }}>
                {/* auto save */}
                <View
                  style={{
                    flex: 1,
                    backgroundColor: GOLD,
                    borderRadius: 14,
                    padding: 12,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Image
                      source={autoSave.icon}
                      style={{ width: 34, height: 34 }}
                      contentFit="contain"
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: "900", color: INK }}>
                        {autoSave.title}
                      </Text>
                      <Text style={{ fontSize: 8, color: INK, opacity: 0.65 }}>
                        {autoSave.subtitle}
                      </Text>
                    </View>
                  </View>

                  <View style={{ marginTop: 12, gap: 10 }}>
                    {autoSave.rules.map((r) => (
                      <View
                        key={r.id}
                        style={{ flexDirection: "row", gap: 6, alignItems: "flex-start" }}
                      >
                        <View
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: 4,
                            backgroundColor: GREEN,
                            marginTop: 4,
                          }}
                        />
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 11, fontWeight: "800", color: INK }}>
                            {r.title}
                          </Text>
                          <Text style={{ fontSize: 7, color: INK, opacity: 0.6, marginTop: 1 }}>
                            {r.sub}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>

                  <View
                    style={{
                      marginTop: 12,
                      backgroundColor: GREEN,
                      borderRadius: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Image
                      source={autoSave.piggy}
                      style={{ width: 28, height: 28 }}
                      contentFit="contain"
                    />
                    <View>
                      <Text style={{ fontSize: 8, color: "#fff", opacity: 0.9 }}>
                        {autoSave.amountLabel}
                      </Text>
                      <Text style={{ fontSize: 20, fontWeight: "900", color: "#fff" }}>
                        {autoSave.amount}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* smart insight */}
                <View
                  style={{
                    flex: 1,
                    backgroundColor: GOLD,
                    borderRadius: 14,
                    padding: 12,
                    borderWidth: 2,
                    borderColor: "#4FA3D1",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Image
                      source={smartInsight.icon}
                      style={{ width: 34, height: 34 }}
                      contentFit="contain"
                    />
                    <Text style={{ fontSize: 13, fontWeight: "900", color: INK, flex: 1 }}>
                      {smartInsight.title}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      marginTop: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 4,
                        backgroundColor: GREEN,
                        marginTop: 4,
                      }}
                    />
                    <Text
                      style={{ fontSize: 11, fontWeight: "800", color: INK, flex: 1, lineHeight: 15 }}
                    >
                      {smartInsight.text}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: 12,
                      backgroundColor: "#F7D64A",
                      borderRadius: 10,
                      padding: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Image
                      source={smartInsight.targetIcon}
                      style={{ width: 26, height: 26 }}
                      contentFit="contain"
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 8, color: INK, opacity: 0.75 }}>
                        {smartInsight.suggestion.small}
                      </Text>
                      <Text style={{ fontSize: 12, fontWeight: "900", color: INK }}>
                        {smartInsight.suggestion.big}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
                    <Pressable
                      style={{
                        flex: 1,
                        backgroundColor: "#F3F1EC",
                        borderRadius: 8,
                        paddingVertical: 9,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 10, fontWeight: "700", color: INK }}>
                        Not Now
                      </Text>
                    </Pressable>
                    <Pressable
                      style={{
                        flex: 1,
                        backgroundColor: GREEN,
                        borderRadius: 8,
                        paddingVertical: 9,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 10, fontWeight: "700", color: "#fff" }}>
                        Move Now
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>

                                {/* SAVING STREAK */}
              <View
                style={{
                  marginTop: 16,
                  backgroundColor: "#6B2D8C",
                  borderRadius: 16,
                  padding: 18,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <Image
                  source={streak.trophy}
                  style={{ width: 84, height: 84 }}
                  contentFit="contain"
                />

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "900",
                      color: "#FFFFFF",
                      letterSpacing: 1,
                    }}
                  >
                    {streak.title}
                  </Text>

                  <View style={{ flexDirection: "row", marginTop: 10, gap: 22 }}>
                    <View>
                      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 30, fontWeight: "900", color: GOLD }}>
                          {streak.current}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "700",
                            color: "#FFFFFF",
                            marginBottom: 5,
                            marginLeft: 3,
                          }}
                        >
                          Days
                        </Text>
                      </View>

                      <View
                        style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}
                      >
                        <Text style={{ fontSize: 10, fontWeight: "700", color: "#FFFFFF" }}>
                          {streak.currentLabel}
                        </Text>
                        <Image
                          source={streak.flame}
                          style={{ width: 12, height: 12 }}
                          contentFit="contain"
                        />
                      </View>
                    </View>

                    <View>
                      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 30, fontWeight: "900", color: GOLD }}>
                          {streak.longest}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "700",
                            color: "#FFFFFF",
                            marginBottom: 5,
                            marginLeft: 3,
                          }}
                        >
                          Days
                        </Text>
                      </View>

                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "700",
                          color: "#FFFFFF",
                          marginTop: 4,
                        }}
                      >
                        {streak.longestLabel}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

            </View>
          ) : (
            <View style={{ paddingVertical: 60, alignItems: "center" }}>
              <Text style={{ color: INK, opacity: 0.5, fontSize: 13 }}>
                {tab} coming soon
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
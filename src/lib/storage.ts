import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDING_KEY = "klear:onboarding_done";

export async function hasSeenOnboarding() {
  return (await AsyncStorage.getItem(ONBOARDING_KEY)) === "true";
}

export async function markOnboardingDone() {
  await AsyncStorage.setItem(ONBOARDING_KEY, "true");
}

export async function resetOnboarding() {
  await AsyncStorage.removeItem(ONBOARDING_KEY);
}

export async function clearStorage(){
  await AsyncStorage.clear();
}
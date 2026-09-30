import { savingSummary, quickActions, goals, autoSave, smartInsight, streak } from "./data";

export function useHomeData() {
  // TODO: AA integration ke baad — api.get("/home/summary")
  return {
    loading: false,
    savingSummary,
    quickActions,
    goals,
    autoSave,
    smartInsight,
    streak,
  };
}
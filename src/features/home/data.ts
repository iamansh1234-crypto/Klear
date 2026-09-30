export const savingSummary = {
  total: "AMOUNT\nMONEY SAVE",
  caption: "Upgrade/Downgrade Status",
};

export const quickActions = [
  { id: "split", label: "Split", icon: require("../../../assets/images/coins-stack.png") },
  { id: "transfer", label: "Transfer", icon: require("../../../assets/images/icon-transfer.png") },
  { id: "scan", label: "ScanQR", icon: require("../../../assets/images/icon-scan.png") },
];


export const goals = [
  {
    id: "japan",
    label: "TRIP TO JAPAN",
    saved: "31,000",
    target: "51,000",
    percent: 62,
    icon: require("../../../assets/images/icon-goal-travel.png"),
  },
  {
    id: "phone",
    label: "NEW PHONE",
    saved: "12,000",
    target: "30,000",
    percent: 40,
    icon: require("../../../assets/images/icon-goal-phone.png"),
  },
  {
    id: "education",
    label: "EDUCATION FUND",
    saved: "35,000",
    target: "1,00,000",
    percent: 28,
    icon: require("../../../assets/images/icon-goal-education.png"),
  },
];




export const autoSave = {
  title: "AUTO SAVE",
  subtitle: "saving automatically",
  icon: require("../../../assets/images/icon-autosave-kash.png"),
  piggy: require("../../../assets/images/icon-piggy.png"),
  amount: "3,250",
  amountLabel: "Automatic savings",
  rules: [
    { id: "roundup", title: "Round-up Savings", sub: "50 rupees from each transactions" },
    { id: "monthly", title: "Monthly auto Savings", sub: "5,000 on 1st of every month" },
  ],
};

export const smartInsight = {
  title: "SMART INSIGHT",
  icon: require("../../../assets/images/icon-insight-kash.png"),
  targetIcon: require("../../../assets/images/icon-target.png"),
  text: "You spent 2,000 less on food this month",
  suggestion: { small: "Move your 1,000 to your", big: "Japan Trip Goal" },
};


export const streak = {
  title: "SAVING STREAK",
  trophy: require("../../../assets/images/icon-trophy.png"),
  flame: require("../../../assets/images/icon-flame.png"),
  current: 7,
  currentLabel: "Keep it Up",
  longest: 12,
  longestLabel: "Longest Streak",
};
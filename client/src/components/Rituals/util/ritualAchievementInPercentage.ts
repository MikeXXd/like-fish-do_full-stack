import { Ritual } from "../contexts/Ritual";

export default function getRitualAchievementInPercentage(ritual: Ritual) {
  return Math.round((ritual.performed.length / ritual.frequency) * 100);
}

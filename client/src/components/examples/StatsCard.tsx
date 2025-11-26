import { Award } from "lucide-react";
import { StatsCard } from "../StatsCard";

export default function StatsCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <StatsCard
        title="Certificates Generated"
        value="1,847"
        icon={Award}
        trend={{ value: "+28% from last month", positive: true }}
      />
    </div>
  );
}

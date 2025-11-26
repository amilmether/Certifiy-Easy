import { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export function StatsCard({ title, value, icon: Icon, description, trend }: StatsCardProps) {
  return (
    <GlassCard hover>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3
              className="text-3xl font-bold mb-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {value}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {trend && (
              <p
                className={`text-xs font-medium mt-2 ${
                  trend.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {trend.positive ? "+" : ""}{trend.value}
              </p>
            )}
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

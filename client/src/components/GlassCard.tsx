import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <Card
      className={cn(
        "backdrop-blur-md bg-card/80 border-border/50 shadow-sm",
        hover && "hover-elevate transition-all duration-200",
        className
      )}
    >
      {children}
    </Card>
  );
}

import { Calendar, Users, Award, ChevronRight, MoreVertical } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EventCardProps {
  title: string;
  type: "large" | "single";
  date: string;
  participantCount: number;
  certificateCount: number;
  subEventCount?: number;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function EventCard({
  title,
  type,
  date,
  participantCount,
  certificateCount,
  subEventCount,
  onView,
  onEdit,
  onDelete,
}: EventCardProps) {
  return (
    <GlassCard hover>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3
                className="font-semibold text-lg"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {title}
              </h3>
              <Badge variant={type === "large" ? "default" : "secondary"}>
                {type === "large" ? "Large Event" : "Single Event"}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-event-menu">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView} data-testid="button-view-event">
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit} data-testid="button-edit-event">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
                className="text-destructive"
                data-testid="button-delete-event"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{participantCount}</p>
              <p className="text-xs text-muted-foreground">Participants</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{certificateCount}</p>
              <p className="text-xs text-muted-foreground">Certificates</p>
            </div>
          </div>
          {subEventCount !== undefined && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{subEventCount}</p>
                <p className="text-xs text-muted-foreground">Sub-events</p>
              </div>
            </div>
          )}
        </div>

        <Button
          onClick={onView}
          className="w-full"
          variant="secondary"
          data-testid="button-manage-event"
        >
          Manage Event
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </GlassCard>
  );
}

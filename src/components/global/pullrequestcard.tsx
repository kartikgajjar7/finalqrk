import { Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PullRequestChipProps } from "@/@types/type";
import { Badge } from "@/components/ui/badge";
dayjs.extend(relativeTime);
export function PRCard({
  id,
  title,
  Blog,
  status,
  date,
}: PullRequestChipProps) {
  return (
    <div
      className={cn(
        " w-full group border border-border rounded-lg p-5 bg-card transition-all hover:shadow-md hover:border-primary/20",
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-base sm:text-lg text-card-foreground leading-tight transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">on {Blog}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Created {dayjs(date).fromNow()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground group-hover:underline transition-all">
            View changes
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
}
type Status = "PENDING" | "closed" | "merged" | "draft";
interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "PENDING":
        return "bg-green-500/15 text-green-500 hover:bg-green-500/25";
      case "closed":
        return "bg-red-500/15 text-red-500 hover:bg-red-500/25";
      case "merged":
        return "bg-purple-500/15 text-purple-500 hover:bg-purple-500/25";
      case "draft":
        return "bg-gray-500/15 text-gray-500 hover:bg-gray-500/25";
      default:
        return "bg-gray-500/15 text-gray-500 hover:bg-gray-500/25";
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full font-medium transition-colors",
        getStatusStyles(),
        className,
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

import { Download, Share2, Mail, MoreVertical, FileText } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CertificateCardProps {
  templateName: string;
  eventName: string;
  recipientCount: number;
  createdDate: string;
  onDownload?: () => void;
  onShare?: () => void;
  onEmail?: () => void;
  onDelete?: () => void;
}

export function CertificateCard({
  templateName,
  eventName,
  recipientCount,
  createdDate,
  onDownload,
  onShare,
  onEmail,
  onDelete,
}: CertificateCardProps) {
  return (
    <GlassCard hover>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3
                  className="font-semibold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {templateName}
                </h3>
                <p className="text-sm text-muted-foreground">{eventName}</p>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-certificate-menu">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onDelete} className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <span>{recipientCount} recipients</span>
          <span>•</span>
          <span>{createdDate}</span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onDownload}
            size="sm"
            variant="secondary"
            className="flex-1"
            data-testid="button-download-certificate"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            onClick={onShare}
            size="sm"
            variant="secondary"
            data-testid="button-share-certificate"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            onClick={onEmail}
            size="sm"
            variant="secondary"
            data-testid="button-email-certificate"
          >
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}

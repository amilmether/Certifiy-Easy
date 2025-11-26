import { useState } from "react";
import { Search, Calendar, Download, Share2, Mail, Filter, ChevronDown } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CertificateHistory {
  id: string;
  recipientName: string;
  recipientEmail: string;
  certificateType: string;
  eventName: string;
  createdAt: Date;
  status: "sent" | "pending" | "downloaded";
}

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEvent, setFilterEvent] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data organized by date
  const certificates: CertificateHistory[] = [
    {
      id: "1",
      recipientName: "John Smith",
      recipientEmail: "john.smith@example.com",
      certificateType: "Participation",
      eventName: "Lumiere 2024",
      createdAt: new Date("2024-11-26T14:30:00"),
      status: "sent",
    },
    {
      id: "2",
      recipientName: "Sarah Johnson",
      recipientEmail: "sarah.j@example.com",
      certificateType: "Volunteer",
      eventName: "Lumiere 2024",
      createdAt: new Date("2024-11-26T14:30:00"),
      status: "sent",
    },
    {
      id: "3",
      recipientName: "Mike Wilson",
      recipientEmail: "mike.w@example.com",
      certificateType: "Winner",
      eventName: "Hackathon 2024",
      createdAt: new Date("2024-11-25T10:15:00"),
      status: "downloaded",
    },
    {
      id: "4",
      recipientName: "Emily Brown",
      recipientEmail: "emily.b@example.com",
      certificateType: "Speaker",
      eventName: "Tech Workshop",
      createdAt: new Date("2024-11-24T16:45:00"),
      status: "pending",
    },
    {
      id: "5",
      recipientName: "David Lee",
      recipientEmail: "david.lee@example.com",
      certificateType: "Participation",
      eventName: "Tech Workshop",
      createdAt: new Date("2024-11-24T16:45:00"),
      status: "sent",
    },
    {
      id: "6",
      recipientName: "Lisa Chen",
      recipientEmail: "lisa.chen@example.com",
      certificateType: "Volunteer",
      eventName: "Cultural Fest",
      createdAt: new Date("2024-11-20T09:00:00"),
      status: "sent",
    },
  ];

  // Filter certificates
  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.recipientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.eventName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEvent = filterEvent === "all" || cert.eventName === filterEvent;
    const matchesStatus = filterStatus === "all" || cert.status === filterStatus;
    return matchesSearch && matchesEvent && matchesStatus;
  });

  // Group certificates by date
  const groupedByDate = filteredCertificates.reduce((groups, cert) => {
    const dateKey = cert.createdAt.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(cert);
    return groups;
  }, {} as Record<string, CertificateHistory[]>);

  const uniqueEvents = Array.from(new Set(certificates.map((c) => c.eventName)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "default";
      case "pending":
        return "secondary";
      case "downloaded":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Certificate History
        </h1>
        <p className="text-muted-foreground">
          View all generated certificates organized by date and time
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-history"
          />
        </div>
        <Select value={filterEvent} onValueChange={setFilterEvent}>
          <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-filter-event">
            <SelectValue placeholder="Filter by event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            {uniqueEvents.map((event) => (
              <SelectItem key={event} value={event}>
                {event}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[150px]" data-testid="select-filter-status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="downloaded">Downloaded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Certificate List by Date */}
      {Object.keys(groupedByDate).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedByDate).map(([date, certs]) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">{date}</h2>
                <Badge variant="secondary" className="ml-2">
                  {certs.length} certificate{certs.length !== 1 ? "s" : ""}
                </Badge>
              </div>
              <div className="space-y-3">
                {certs.map((cert) => (
                  <GlassCard key={cert.id} hover>
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold truncate">{cert.recipientName}</h3>
                          <Badge variant={getStatusColor(cert.status)}>
                            {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{cert.recipientEmail}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <Badge variant="outline">{cert.certificateType}</Badge>
                          <span className="text-muted-foreground">{cert.eventName}</span>
                          <span className="text-muted-foreground">
                            {cert.createdAt.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log("Download:", cert.id)}
                          data-testid={`button-download-${cert.id}`}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log("Share:", cert.id)}
                          data-testid={`button-share-${cert.id}`}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => console.log("Email:", cert.id)}
                          data-testid={`button-email-${cert.id}`}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <GlassCard>
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No certificates found</p>
          </div>
        </GlassCard>
      )}
    </div>
  );
}

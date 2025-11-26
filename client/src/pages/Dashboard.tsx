import { Award, Calendar, FileText, Users, Sparkles } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { EventCard } from "@/components/EventCard";
import { CertificateCard } from "@/components/CertificateCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Dashboard() {
  // todo: remove mock functionality
  const stats = [
    {
      title: "Total Events",
      value: "24",
      icon: Calendar,
      trend: { value: "+12% from last month", positive: true },
    },
    {
      title: "Certificates Generated",
      value: "1,847",
      icon: Award,
      trend: { value: "+28% from last month", positive: true },
    },
    {
      title: "Active Templates",
      value: "18",
      icon: FileText,
    },
    {
      title: "Total Participants",
      value: "2,345",
      icon: Users,
      trend: { value: "+156 this week", positive: true },
    },
  ];

  const recentEvents = [
    {
      title: "Lumiere 2024",
      type: "large" as const,
      date: "Dec 15-17, 2024",
      participantCount: 450,
      certificateCount: 892,
      subEventCount: 12,
    },
    {
      title: "Tech Workshop Series",
      type: "single" as const,
      date: "Nov 28, 2024",
      participantCount: 120,
      certificateCount: 240,
    },
    {
      title: "Cultural Fest",
      type: "large" as const,
      date: "Nov 10-12, 2024",
      participantCount: 380,
      certificateCount: 680,
      subEventCount: 8,
    },
  ];

  const recentCertificates = [
    {
      templateName: "Participation Certificate",
      eventName: "Lumiere 2024",
      recipientCount: 450,
      createdDate: "2 days ago",
    },
    {
      templateName: "Volunteer Certificate",
      eventName: "Tech Workshop",
      recipientCount: 35,
      createdDate: "5 days ago",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative mb-12 overflow-hidden bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
        
        <div className="relative py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Professional Certificate Generator</span>
            </div>
            
            <h1
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Welcome to CertifyEasy
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Generate, manage, and distribute professional certificates at scale. 
              Create beautiful certificates for events, workshops, and programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" data-testid="button-create-certificate">
                  <Award className="mr-2 h-5 w-5" />
                  Create Certificate
                </Button>
              </Link>
              <Link href="/events">
                <Button size="lg" variant="outline" data-testid="button-manage-events">
                  <Calendar className="mr-2 h-5 w-5" />
                  Manage Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 max-w-7xl mx-auto pb-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Recent Events */}
        <div className="mb-12">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Recent Events
            </h2>
            <Link href="/events">
              <Button variant="ghost" data-testid="button-view-all-events">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEvents.map((event) => (
              <EventCard
                key={event.title}
                {...event}
                onView={() => console.log("View event:", event.title)}
                onEdit={() => console.log("Edit event:", event.title)}
                onDelete={() => console.log("Delete event:", event.title)}
              />
            ))}
          </div>
        </div>

        {/* Recent Certificates */}
        <div>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Recent Certificates
            </h2>
            <Link href="/history">
              <Button variant="ghost" data-testid="button-view-all-certificates">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentCertificates.map((cert) => (
              <CertificateCard
                key={`${cert.templateName}-${cert.eventName}`}
                {...cert}
                onDownload={() => console.log("Download:", cert.templateName)}
                onShare={() => console.log("Share:", cert.templateName)}
                onEmail={() => console.log("Email:", cert.templateName)}
                onDelete={() => console.log("Delete:", cert.templateName)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

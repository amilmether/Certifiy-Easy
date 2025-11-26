import { Award, Calendar, FileText, Users } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { EventCard } from "@/components/EventCard";
import { CertificateCard } from "@/components/CertificateCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/hero_background_gradient_illustration.png";

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
      <div className="relative h-[400px] mb-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center max-w-3xl backdrop-blur-md bg-background/30 p-12 rounded-3xl border border-border/20">
            <h1
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Welcome to CertiFlow
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Generate, manage, and distribute professional certificates at scale
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" data-testid="button-create-certificate">
                  <Award className="mr-2 h-5 w-5" />
                  Create Certificate
                </Button>
              </Link>
              <Link href="/events">
                <Button size="lg" variant="outline" data-testid="button-manage-events">
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
          <div className="flex items-center justify-between mb-6">
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
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Recent Certificates
            </h2>
            <Link href="/templates">
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

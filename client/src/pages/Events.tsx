import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/GlassCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // todo: remove mock functionality
  const events = [
    {
      id: 1,
      title: "Lumiere 2024",
      type: "large" as const,
      date: "Dec 15-17, 2024",
      participantCount: 450,
      certificateCount: 892,
      subEventCount: 12,
    },
    {
      id: 2,
      title: "Tech Workshop Series",
      type: "single" as const,
      date: "Nov 28, 2024",
      participantCount: 120,
      certificateCount: 240,
    },
    {
      id: 3,
      title: "Cultural Fest",
      type: "large" as const,
      date: "Nov 10-12, 2024",
      participantCount: 380,
      certificateCount: 680,
      subEventCount: 8,
    },
    {
      id: 4,
      title: "Annual Hackathon",
      type: "single" as const,
      date: "Oct 5-6, 2024",
      participantCount: 200,
      certificateCount: 400,
    },
  ];

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const largeEvents = filteredEvents.filter((e) => e.type === "large");
  const singleEvents = filteredEvents.filter((e) => e.type === "single");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Events
        </h1>
        <p className="text-muted-foreground">
          Manage your events and organize certificates
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-events"
          />
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-event">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Set up a new event to manage certificates
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="event-name">Event Name</Label>
                <Input
                  id="event-name"
                  placeholder="Enter event name"
                  data-testid="input-event-name"
                />
              </div>
              <div>
                <Label htmlFor="event-type">Event Type</Label>
                <Select>
                  <SelectTrigger id="event-type" data-testid="select-event-type">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="large">Large Event (with sub-events)</SelectItem>
                    <SelectItem value="single">Single Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="event-date">Event Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  data-testid="input-event-date"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => {
                    console.log("Event created");
                    setIsCreateDialogOpen(false);
                  }}
                  data-testid="button-submit-event"
                >
                  Create Event
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  data-testid="button-cancel-event"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all" data-testid="tab-all-events">
            All Events ({filteredEvents.length})
          </TabsTrigger>
          <TabsTrigger value="large" data-testid="tab-large-events">
            Large Events ({largeEvents.length})
          </TabsTrigger>
          <TabsTrigger value="single" data-testid="tab-single-events">
            Single Events ({singleEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onView={() => console.log("View event:", event.title)}
                  onEdit={() => console.log("Edit event:", event.title)}
                  onDelete={() => console.log("Delete event:", event.title)}
                />
              ))}
            </div>
          ) : (
            <GlassCard>
              <div className="p-12 text-center">
                <p className="text-muted-foreground">No events found</p>
              </div>
            </GlassCard>
          )}
        </TabsContent>

        <TabsContent value="large">
          {largeEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {largeEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onView={() => console.log("View event:", event.title)}
                  onEdit={() => console.log("Edit event:", event.title)}
                  onDelete={() => console.log("Delete event:", event.title)}
                />
              ))}
            </div>
          ) : (
            <GlassCard>
              <div className="p-12 text-center">
                <p className="text-muted-foreground">No large events found</p>
              </div>
            </GlassCard>
          )}
        </TabsContent>

        <TabsContent value="single">
          {singleEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {singleEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onView={() => console.log("View event:", event.title)}
                  onEdit={() => console.log("Edit event:", event.title)}
                  onDelete={() => console.log("Delete event:", event.title)}
                />
              ))}
            </div>
          ) : (
            <GlassCard>
              <div className="p-12 text-center">
                <p className="text-muted-foreground">No single events found</p>
              </div>
            </GlassCard>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

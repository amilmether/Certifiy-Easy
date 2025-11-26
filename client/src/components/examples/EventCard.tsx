import { EventCard } from "../EventCard";

export default function EventCardExample() {
  return (
    <div className="p-8 max-w-md">
      <EventCard
        title="Lumiere 2024"
        type="large"
        date="Dec 15-17, 2024"
        participantCount={450}
        certificateCount={892}
        subEventCount={12}
        onView={() => console.log("View clicked")}
        onEdit={() => console.log("Edit clicked")}
        onDelete={() => console.log("Delete clicked")}
      />
    </div>
  );
}

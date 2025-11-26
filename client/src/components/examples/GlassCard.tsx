import { GlassCard } from "../GlassCard";

export default function GlassCardExample() {
  return (
    <div className="p-8 space-y-4">
      <GlassCard>
        <div className="p-6">
          <h3 className="font-semibold mb-2">Standard Glass Card</h3>
          <p className="text-sm text-muted-foreground">
            A beautiful glassmorphism card with backdrop blur effect
          </p>
        </div>
      </GlassCard>
      <GlassCard hover>
        <div className="p-6">
          <h3 className="font-semibold mb-2">Hoverable Glass Card</h3>
          <p className="text-sm text-muted-foreground">
            Hover over this card to see the elevation effect
          </p>
        </div>
      </GlassCard>
    </div>
  );
}

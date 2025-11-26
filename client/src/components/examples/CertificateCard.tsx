import { CertificateCard } from "../CertificateCard";

export default function CertificateCardExample() {
  return (
    <div className="p-8 max-w-md">
      <CertificateCard
        templateName="Participation Certificate"
        eventName="Lumiere 2024"
        recipientCount={450}
        createdDate="2 days ago"
        onDownload={() => console.log("Download clicked")}
        onShare={() => console.log("Share clicked")}
        onEmail={() => console.log("Email clicked")}
        onDelete={() => console.log("Delete clicked")}
      />
    </div>
  );
}

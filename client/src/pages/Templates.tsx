import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { CertificateCard } from "@/components/CertificateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/GlassCard";
import { FileUploadZone } from "@/components/FileUploadZone";
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

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // todo: remove mock functionality
  const templates = [
    {
      id: 1,
      templateName: "Participation Certificate",
      eventName: "Lumiere 2024",
      recipientCount: 450,
      createdDate: "2 days ago",
    },
    {
      id: 2,
      templateName: "Volunteer Certificate",
      eventName: "Tech Workshop",
      recipientCount: 35,
      createdDate: "5 days ago",
    },
    {
      id: 3,
      templateName: "Winner Certificate",
      eventName: "Hackathon 2024",
      recipientCount: 15,
      createdDate: "1 week ago",
    },
    {
      id: 4,
      templateName: "Speaker Certificate",
      eventName: "Tech Talk Series",
      recipientCount: 8,
      createdDate: "2 weeks ago",
    },
  ];

  const filteredTemplates = templates.filter(
    (template) =>
      template.templateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Certificate Templates
        </h1>
        <p className="text-muted-foreground">
          Manage your certificate templates and designs
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-templates"
          />
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-upload-template">
              <Plus className="mr-2 h-4 w-4" />
              Upload Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Certificate Template</DialogTitle>
              <DialogDescription>
                Upload a template design and configure variable fields
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  placeholder="Enter template name"
                  data-testid="input-template-name"
                />
              </div>
              <div>
                <Label htmlFor="template-event">Associated Event</Label>
                <Select>
                  <SelectTrigger id="template-event" data-testid="select-template-event">
                    <SelectValue placeholder="Select event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lumiere">Lumiere 2024</SelectItem>
                    <SelectItem value="workshop">Tech Workshop</SelectItem>
                    <SelectItem value="hackathon">Hackathon 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Upload Template Image/PDF</Label>
                <div className="mt-2">
                  <FileUploadZone
                    onFileSelect={(file) => {
                      setUploadedFile(file);
                      if (file) console.log("File uploaded:", file.name);
                    }}
                    accept={{
                      "image/*": [".png", ".jpg", ".jpeg"],
                      "application/pdf": [".pdf"],
                    }}
                    label="Upload Template"
                    description="PNG, JPG, or PDF (max 10MB)"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => {
                    console.log("Template uploaded:", uploadedFile?.name);
                    setIsUploadDialogOpen(false);
                  }}
                  data-testid="button-submit-template"
                >
                  Upload Template
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsUploadDialogOpen(false)}
                  data-testid="button-cancel-template"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <CertificateCard
              key={template.id}
              {...template}
              onDownload={() => console.log("Download:", template.templateName)}
              onShare={() => console.log("Share:", template.templateName)}
              onEmail={() => console.log("Email:", template.templateName)}
              onDelete={() => console.log("Delete:", template.templateName)}
            />
          ))}
        </div>
      ) : (
        <GlassCard>
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No templates found</p>
          </div>
        </GlassCard>
      )}
    </div>
  );
}

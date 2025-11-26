import { useState } from "react";
import { FileText, Send, Download, CloudUpload, Plus, Trash2, Upload } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { FileUploadZone } from "@/components/FileUploadZone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface Recipient {
  id: string;
  name: string;
  email: string;
  achievement: string;
}

export default function CreateCertificate() {
  const { toast } = useToast();
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [dataFile, setDataFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("bulk");
  const [dataInputMethod, setDataInputMethod] = useState<"csv" | "manual">("csv");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Manual entry recipients
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: "1", name: "", email: "", achievement: "" },
  ]);

  const addRecipient = () => {
    setRecipients([
      ...recipients,
      { id: Date.now().toString(), name: "", email: "", achievement: "" },
    ]);
  };

  const removeRecipient = (id: string) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter((r) => r.id !== id));
    }
  };

  const updateRecipient = (id: string, field: keyof Recipient, value: string) => {
    setRecipients(
      recipients.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleGenerate = () => {
    if (!templateFile) {
      toast({
        title: "Template required",
        description: "Please upload a certificate template first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast({
            title: "Certificates generated",
            description: "Your certificates have been created successfully.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Create Certificate
        </h1>
        <p className="text-muted-foreground">
          Upload a template, add recipient data, and generate certificates
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Template Upload */}
        <div className="xl:col-span-1">
          <GlassCard>
            <div className="p-6">
              <h2
                className="text-xl font-semibold mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                1. Upload Template
              </h2>
              <FileUploadZone
                onFileSelect={(file) => {
                  setTemplateFile(file);
                  if (file) {
                    toast({
                      title: "Template uploaded",
                      description: file.name,
                    });
                  }
                }}
                accept={{
                  "image/*": [".png", ".jpg", ".jpeg"],
                  "application/pdf": [".pdf"],
                }}
                label="Upload Certificate Template"
                description="PNG, JPG, or PDF (max 10MB)"
              />
              {templateFile && (
                <div className="mt-4 p-3 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium">Template ready</p>
                  <p className="text-xs text-muted-foreground">{templateFile.name}</p>
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="event-select">Select Event</Label>
                  <Select>
                    <SelectTrigger id="event-select" data-testid="select-event">
                      <SelectValue placeholder="Choose event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lumiere">Lumiere 2024</SelectItem>
                      <SelectItem value="workshop">Tech Workshop</SelectItem>
                      <SelectItem value="hackathon">Hackathon 2024</SelectItem>
                      <SelectItem value="cultural">Cultural Fest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cert-type">Certificate Type</Label>
                  <Select>
                    <SelectTrigger id="cert-type" data-testid="select-certificate-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="participation">Participation</SelectItem>
                      <SelectItem value="volunteer">Volunteering</SelectItem>
                      <SelectItem value="winner">Winner</SelectItem>
                      <SelectItem value="speaker">Speaker</SelectItem>
                      <SelectItem value="organizer">Organizer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column - Recipient Data */}
        <div className="xl:col-span-2">
          <GlassCard>
            <div className="p-6">
              <h2
                className="text-xl font-semibold mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                2. Add Recipient Data
              </h2>

              <Tabs value={dataInputMethod} onValueChange={(v) => setDataInputMethod(v as "csv" | "manual")}>
                <TabsList className="mb-6">
                  <TabsTrigger value="csv" data-testid="tab-csv-upload">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload CSV/Excel
                  </TabsTrigger>
                  <TabsTrigger value="manual" data-testid="tab-manual-entry">
                    <FileText className="h-4 w-4 mr-2" />
                    Manual Entry
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="csv">
                  <FileUploadZone
                    onFileSelect={(file) => {
                      setDataFile(file);
                      if (file) {
                        toast({
                          title: "Data file uploaded",
                          description: file.name,
                        });
                      }
                    }}
                    accept={{
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
                      "application/vnd.ms-excel": [".xls"],
                      "text/csv": [".csv"],
                    }}
                    label="Upload Excel/CSV File"
                    description="File with columns: Name, Email, Achievement (optional)"
                  />
                  {dataFile && (
                    <div className="mt-4 p-3 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium">Data file ready</p>
                      <p className="text-xs text-muted-foreground">{dataFile.name}</p>
                    </div>
                  )}
                  <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-dashed">
                    <p className="text-sm font-medium mb-2">Expected columns:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>Name (required) - Recipient's full name</li>
                      <li>Email (required) - Email address for delivery</li>
                      <li>Achievement (optional) - Position, prize, or role</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="manual">
                  <div className="space-y-4">
                    {recipients.map((recipient, index) => (
                      <div
                        key={recipient.id}
                        className="p-4 rounded-lg bg-muted/30 border"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium">
                            Recipient {index + 1}
                          </span>
                          {recipients.length > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeRecipient(recipient.id)}
                              data-testid={`button-remove-recipient-${index}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label htmlFor={`name-${recipient.id}`}>Name</Label>
                            <Input
                              id={`name-${recipient.id}`}
                              placeholder="Full name"
                              value={recipient.name}
                              onChange={(e) =>
                                updateRecipient(recipient.id, "name", e.target.value)
                              }
                              data-testid={`input-recipient-name-${index}`}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`email-${recipient.id}`}>Email</Label>
                            <Input
                              id={`email-${recipient.id}`}
                              type="email"
                              placeholder="email@example.com"
                              value={recipient.email}
                              onChange={(e) =>
                                updateRecipient(recipient.id, "email", e.target.value)
                              }
                              data-testid={`input-recipient-email-${index}`}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`achievement-${recipient.id}`}>
                              Achievement
                            </Label>
                            <Input
                              id={`achievement-${recipient.id}`}
                              placeholder="e.g., First Place"
                              value={recipient.achievement}
                              onChange={(e) =>
                                updateRecipient(recipient.id, "achievement", e.target.value)
                              }
                              data-testid={`input-recipient-achievement-${index}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={addRecipient}
                      className="w-full"
                      data-testid="button-add-recipient"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Recipient
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </GlassCard>

          {/* Delivery Options */}
          <GlassCard className="mt-6">
            <div className="p-6">
              <h2
                className="text-xl font-semibold mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                3. Delivery Options
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="send-email" defaultChecked data-testid="checkbox-send-email" />
                    <Label htmlFor="send-email" className="text-sm font-normal cursor-pointer">
                      Send certificates via email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="save-drive" defaultChecked data-testid="checkbox-save-drive" />
                    <Label htmlFor="save-drive" className="text-sm font-normal cursor-pointer">
                      Save to Google Drive
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="download-zip" data-testid="checkbox-download-zip" />
                    <Label htmlFor="download-zip" className="text-sm font-normal cursor-pointer">
                      Download as ZIP file
                    </Label>
                  </div>
                </div>
                <div className="rounded-lg bg-muted/50 p-4">
                  <h3 className="font-medium mb-3 text-sm">Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Template:</span>
                      <span className="font-medium truncate ml-2">
                        {templateFile ? templateFile.name : "Not uploaded"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recipients:</span>
                      <span className="font-medium">
                        {dataInputMethod === "csv"
                          ? dataFile
                            ? "File uploaded"
                            : "No file"
                          : `${recipients.filter((r) => r.name).length} entered`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {isGenerating && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Generating certificates...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              <Separator className="my-6" />

              <div className="flex gap-3 flex-wrap">
                <Button
                  size="lg"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  data-testid="button-generate-certificates"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate & Send"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => console.log("Download certificates")}
                  disabled={isGenerating}
                  data-testid="button-download-all"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => console.log("Upload to Drive")}
                  disabled={isGenerating}
                  data-testid="button-upload-drive"
                >
                  <CloudUpload className="mr-2 h-4 w-4" />
                  Upload to Drive
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

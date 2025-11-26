import { useState } from "react";
import { FileText, Upload, Send, Download } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { FileUploadZone } from "@/components/FileUploadZone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateCertificate() {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("single");

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
          Generate single or bulk certificates for your events
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="single" data-testid="tab-single-certificate">
            Single Certificate
          </TabsTrigger>
          <TabsTrigger value="bulk" data-testid="tab-bulk-certificate">
            Bulk Generate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard>
              <div className="p-6">
                <h2
                  className="text-xl font-semibold mb-6"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Certificate Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="recipient-name">Recipient Name</Label>
                    <Input
                      id="recipient-name"
                      placeholder="Enter recipient name"
                      data-testid="input-recipient-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipient-email">Email Address</Label>
                    <Input
                      id="recipient-email"
                      type="email"
                      placeholder="recipient@example.com"
                      data-testid="input-recipient-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-select">Event</Label>
                    <Select>
                      <SelectTrigger id="event-select" data-testid="select-event">
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
                    <Label htmlFor="certificate-type">Certificate Type</Label>
                    <Select>
                      <SelectTrigger id="certificate-type" data-testid="select-certificate-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="participation">Participation</SelectItem>
                        <SelectItem value="volunteer">Volunteering</SelectItem>
                        <SelectItem value="winner">Winner</SelectItem>
                        <SelectItem value="speaker">Speaker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="achievement">Achievement/Position</Label>
                    <Input
                      id="achievement"
                      placeholder="e.g., First Place, Speaker"
                      data-testid="input-achievement"
                    />
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <h2
                  className="text-xl font-semibold mb-6"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Template & Delivery
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label>Select Template</Label>
                    <Select>
                      <SelectTrigger data-testid="select-template">
                        <SelectValue placeholder="Choose a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="template1">Participation Certificate</SelectItem>
                        <SelectItem value="template2">Volunteer Certificate</SelectItem>
                        <SelectItem value="template3">Winner Certificate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="send-email" data-testid="checkbox-send-email" />
                    <Label htmlFor="send-email" className="text-sm font-normal">
                      Send certificate via email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="save-drive" data-testid="checkbox-save-drive" />
                    <Label htmlFor="save-drive" className="text-sm font-normal">
                      Save to Google Drive
                    </Label>
                  </div>
                  <Separator />
                  <div className="flex gap-2 pt-4">
                    <Button
                      className="flex-1"
                      onClick={() => console.log("Generate certificate")}
                      data-testid="button-generate-single"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Generate
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => console.log("Download certificate")}
                      data-testid="button-download-single"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="bulk">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard>
              <div className="p-6">
                <h2
                  className="text-xl font-semibold mb-6"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Upload Data
                </h2>
                <div className="space-y-6">
                  <div>
                    <Label>Excel File with Recipients</Label>
                    <div className="mt-2">
                      <FileUploadZone
                        onFileSelect={(file) => {
                          setExcelFile(file);
                          console.log("Excel file uploaded:", file.name);
                        }}
                        accept=".xlsx,.xls,.csv"
                        label="Upload Excel/CSV"
                        description="Excel or CSV file with recipient data"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      File should contain columns: Name, Email, Achievement, etc.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="bulk-event">Event</Label>
                    <Select>
                      <SelectTrigger id="bulk-event" data-testid="select-bulk-event">
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
                    <Label htmlFor="bulk-template">Certificate Template</Label>
                    <Select>
                      <SelectTrigger id="bulk-template" data-testid="select-bulk-template">
                        <SelectValue placeholder="Choose template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="template1">Participation Certificate</SelectItem>
                        <SelectItem value="template2">Volunteer Certificate</SelectItem>
                        <SelectItem value="template3">Winner Certificate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <h2
                  className="text-xl font-semibold mb-6"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Distribution Options
                </h2>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bulk-email" defaultChecked data-testid="checkbox-bulk-email" />
                      <Label htmlFor="bulk-email" className="text-sm font-normal">
                        Send via email to all recipients
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bulk-drive" defaultChecked data-testid="checkbox-bulk-drive" />
                      <Label htmlFor="bulk-drive" className="text-sm font-normal">
                        Upload to Google Drive
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bulk-zip" defaultChecked data-testid="checkbox-bulk-zip" />
                      <Label htmlFor="bulk-zip" className="text-sm font-normal">
                        Download as ZIP file
                      </Label>
                    </div>
                  </div>
                  <Separator />
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium mb-2 text-sm">Summary</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Recipients: {excelFile ? "File uploaded ✓" : "No file yet"}</p>
                      <p>Template: Not selected</p>
                      <p>Event: Not selected</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => console.log("Generate bulk certificates")}
                      data-testid="button-generate-bulk"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Generate & Send
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

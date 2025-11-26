import { useState } from "react";
import { Save, User, Mail, Bell, Palette, FolderOpen, Shield } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    displayName: "John Doe",
    email: "john@example.com",
    organization: "My Organization",
    defaultCertificateType: "participation",
    emailNotifications: true,
    autoSaveToDrive: true,
    defaultDriveFolder: "CertifyEasy Certificates",
    darkMode: false,
  });

  const handleSave = () => {
    console.log("Saving settings:", settings);
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const updateSetting = <K extends keyof typeof settings>(
    key: K,
    value: typeof settings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <GlassCard>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="h-5 w-5 text-primary" />
              <h2
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Profile
              </h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={settings.displayName}
                    onChange={(e) => updateSetting("displayName", e.target.value)}
                    data-testid="input-display-name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateSetting("email", e.target.value)}
                    data-testid="input-email"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="organization">Organization Name</Label>
                <Input
                  id="organization"
                  value={settings.organization}
                  onChange={(e) => updateSetting("organization", e.target.value)}
                  placeholder="Your organization or company name"
                  data-testid="input-organization"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This will appear on generated certificates
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Certificate Defaults */}
        <GlassCard>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <h2
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Certificate Defaults
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="defaultType">Default Certificate Type</Label>
                <Select
                  value={settings.defaultCertificateType}
                  onValueChange={(value) => updateSetting("defaultCertificateType", value)}
                >
                  <SelectTrigger id="defaultType" data-testid="select-default-type">
                    <SelectValue placeholder="Select default type" />
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

        {/* Notification Settings */}
        <GlassCard>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="h-5 w-5 text-primary" />
              <h2
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Notifications
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications" className="text-base">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about certificate delivery status
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                  data-testid="switch-email-notifications"
                />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Google Drive Settings */}
        <GlassCard>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <FolderOpen className="h-5 w-5 text-primary" />
              <h2
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Google Drive
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoSave" className="text-base">
                    Auto-save to Drive
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically upload certificates to Google Drive
                  </p>
                </div>
                <Switch
                  id="autoSave"
                  checked={settings.autoSaveToDrive}
                  onCheckedChange={(checked) => updateSetting("autoSaveToDrive", checked)}
                  data-testid="switch-auto-save"
                />
              </div>
              <Separator />
              <div>
                <Label htmlFor="driveFolder">Default Drive Folder</Label>
                <Input
                  id="driveFolder"
                  value={settings.defaultDriveFolder}
                  onChange={(e) => updateSetting("defaultDriveFolder", e.target.value)}
                  placeholder="Folder name for certificates"
                  data-testid="input-drive-folder"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Certificates will be saved to this folder in your Google Drive
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Appearance */}
        <GlassCard>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Palette className="h-5 w-5 text-primary" />
              <h2
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Appearance
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode" className="text-base">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Use dark theme for the application
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => updateSetting("darkMode", checked)}
                  data-testid="switch-dark-mode"
                />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg" data-testid="button-save-settings">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}

import { FileUploadZone } from "../FileUploadZone";

export default function FileUploadZoneExample() {
  return (
    <div className="p-8 max-w-md">
      <FileUploadZone
        onFileSelect={(file) => console.log("File selected:", file.name)}
        accept="image/*"
        label="Upload Image"
        description="PNG or JPG (max 10MB)"
      />
    </div>
  );
}

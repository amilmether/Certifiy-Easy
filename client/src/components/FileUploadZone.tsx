import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  label?: string;
  description?: string;
}

export function FileUploadZone({
  onFileSelect,
  accept,
  maxSize = 10485760,
  label = "Upload File",
  description = "Drag and drop or click to browse",
}: FileUploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxSize,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
        "backdrop-blur-sm bg-card/20 hover:bg-card/40 hover:border-primary/50",
        isDragActive && "border-primary bg-primary/10"
      )}
      data-testid="upload-zone"
    >
      <input {...getInputProps()} data-testid="input-file-upload" />
      <div className="flex flex-col items-center gap-3">
        {acceptedFiles.length > 0 ? (
          <>
            <FileText className="h-12 w-12 text-primary" />
            <div>
              <p className="font-medium text-foreground">{acceptedFiles[0].name}</p>
              <p className="text-sm text-muted-foreground">
                {(acceptedFiles[0].size / 1024).toFixed(2)} KB
              </p>
            </div>
          </>
        ) : (
          <>
            <Upload className="h-12 w-12 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">{label}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileUploadZoneProps {
  onFileSelect: (file: File | null) => void;
  accept?: Record<string, string[]>;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    onFileSelect(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
        "bg-muted/30 hover:bg-muted/50 hover:border-primary/50",
        isDragActive && "border-primary bg-primary/10"
      )}
      data-testid="upload-zone"
    >
      <input {...getInputProps()} data-testid="input-file-upload" />
      <div className="flex flex-col items-center gap-3">
        {selectedFile ? (
          <>
            <div className="relative">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={clearFile}
                data-testid="button-clear-file"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="h-14 w-14 rounded-xl bg-muted/50 flex items-center justify-center">
              <Upload className="h-7 w-7 text-muted-foreground" />
            </div>
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

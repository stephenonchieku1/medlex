import { useDropzone } from "react-dropzone";
import { Camera, Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageCapture: (file: File) => Promise<void>;
  isAnalyzing: boolean;
}

export default function ImageUpload({
  onImageCapture,
  isAnalyzing,
}: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setError(null);
        
        // Create preview URL for the image
        const previewUrl = URL.createObjectURL(acceptedFiles[0]);
        setPreview(previewUrl);
        
        try {
          await onImageCapture(acceptedFiles[0]);
          toast.success("Image successfully uploaded");
        } catch (err) {
          toast.error("Failed to process image");
        }
      }
    },
    onDropRejected: () => {
      setError("Please upload a valid image file (PNG, JPG, or JPEG)");
      toast.error("Invalid file type");
    },
  });

  const clearPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {preview ? (
        <div className="relative w-full">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full max-h-64 object-contain rounded-lg" 
          />
          {!isAnalyzing && (
            <button 
              onClick={clearPreview}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : null}
      
      <div
        {...getRootProps()}
        className={`flex-1 cursor-pointer ${
        isDragActive ? "bg-blue-700" : "bg-blue-500"
      } 
      text-white p-3 rounded-lg flex items-center justify-center space-x-4
      hover:bg-[#C62E2E] transition-colors relative`}
      >
        <input {...getInputProps()} />
        {isAnalyzing ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <Camera className="h-6 w-6" />
        )}
        <span>
          {isDragActive
            ? "Drop the image here"
            : isAnalyzing
            ? "Analyzing..."
            : preview 
              ? "Change Image" 
              : "Scan Medicine"}
        </span>
        {error && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white p-2 text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
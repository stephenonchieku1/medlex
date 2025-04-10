import { useDropzone } from "react-dropzone";
import { Camera, Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageCapture: (file: File) => Promise<any>;
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
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors"
    >
      {preview ? (
        <div className="relative mb-4">
          <img 
            src={preview} 
            alt="Preview" 
            className="mx-auto rounded-md max-h-48 object-contain" 
          />
          {!isAnalyzing && (
            <button
              onClick={clearPreview}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
            >
              <X size={16} />
            </button>
          )}
        </div>
      ) : null}
      
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="bg-blue-100 p-3 rounded-full">
          {isAnalyzing ? (
            <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
          ) : (
            <Camera className="h-6 w-6 text-blue-500" />
          )}
        </div>
        <p className="text-sm text-gray-600 font-medium">
          {isDragActive
            ? "Drop the image here"
            : isAnalyzing
            ? "Analyzing..."
            : preview
              ? "Change Image"
              : "Scan Medicine"}
        </p>
        {error && (
          <p className="text-xs text-red-500 mt-2">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
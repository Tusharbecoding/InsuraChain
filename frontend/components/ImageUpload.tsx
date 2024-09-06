// components/ImageUpload.tsx
import { useState } from "react";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUploadClick = () => {
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="text-gray-500 border border-gray-300 rounded p-2"
      />
      {preview && (
        <img src={preview} alt="Preview" className="w-48 h-48 object-cover" />
      )}
      <button
        onClick={handleUploadClick}
        className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
      >
        Assess Damage
      </button>
    </div>
  );
};

export default ImageUpload;

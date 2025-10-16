import { useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (imageSrc: string) => void;
  hasImage: boolean;
  onClearImage: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, hasImage, onClearImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      // Reset input value to allow selecting the same file again
      e.target.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-area">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button className="upload-button" onClick={handleClick}>
        {hasImage ? 'Change Image' : 'Upload Watch Photo'}
      </button>
      {hasImage && (
        <button className="upload-button secondary" onClick={onClearImage}>
          Clear Image
        </button>
      )}
    </div>
  );
};


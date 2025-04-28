import { useRef, useState } from 'react';
import { User } from '../utils/types';

interface FileUploadProps {
  onFileUpload: (users: User[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (file.type !== 'text/csv') {
      setError('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const lines = content.split('\n');
        const headers = lines[0].split(',');
        
        // Validate headers
        const requiredFields = ['name', 'email', 'role'];
        const hasAllFields = requiredFields.every(field => 
          headers.map(h => h.trim().toLowerCase()).includes(field.toLowerCase())
        );
        
        if (!hasAllFields) {
          setError('CSV must include name, email and role columns');
          return;
        }

        // Process CSV
        const parsedUsers: User[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].split(',');
          const user: User = {
            name: '',
            email: '',
            role: '',
          };
          
          headers.forEach((header, index) => {
            const key = header.trim().toLowerCase();
            if (key === 'name') user.name = values[index]?.trim() || '';
            if (key === 'email') user.email = values[index]?.trim() || '';
            if (key === 'role') user.role = values[index]?.trim() || '';
            if (key === 'phone') user.phone = values[index]?.trim();
          });
          
          if (user.name && user.email && user.role) {
            parsedUsers.push(user);
          }
        }
        
        if (parsedUsers.length === 0) {
          setError('No valid users found in CSV');
          return;
        }
        
        onFileUpload(parsedUsers);
        setError(null);
      } catch (err) {
        setError('Failed to process CSV file');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <span className="mt-2 block text-sm font-medium text-gray-700">
          Drag and drop a CSV file, or click to browse
        </span>
        <span className="mt-1 block text-xs text-gray-500">
          CSV should include name, email, and role columns
        </span>
        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          accept=".csv" 
          onChange={handleFileChange}
        />
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
      
      <div className="mt-4">
        <a 
          href="/template.csv" 
          download
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Download Template CSV
        </a>
      </div>
    </div>
  );
};

export default FileUpload;

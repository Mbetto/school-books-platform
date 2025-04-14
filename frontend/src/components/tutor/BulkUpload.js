import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTheme } from '../../context/ThemeContext';
import './BulkUpload.scss';

const BulkUpload = ({ onUploadComplete }) => {
  const { theme } = useTheme();
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    setError(null);
    setFiles(acceptedFiles);
    setIsUploading(true);
    
    try {
      // Simulate upload progress
      const totalFiles = acceptedFiles.length;
      for (let i = 0; i < totalFiles; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(Math.round(((i + 1) / totalFiles) * 100));
      }
      
      // Call actual upload function
      await uploadToServer(acceptedFiles);
      onUploadComplete(acceptedFiles);
      setFiles([]);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 10,
    maxSize: 50 * 1024 * 1024, // 50MB
    onDrop
  });

  return (
    <div className={`bulk-upload ${theme}`}>
      <h2 className="upload-header">Bulk Upload Documents</h2>
      <p className="upload-instructions">
        Drag & drop files here, or click to select files (PDF, DOC, TXT)
      </p>
      
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag & drop files here, or click to select</p>
        )}
      </div>

      {isUploading && (
        <div className="upload-progress">
          <progress value={progress} max="100" />
          <span>{progress}%</span>
        </div>
      )}

      {files.length > 0 && !isUploading && (
        <div className="file-preview">
          <h4>Selected Files:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name} - {(file.size / 1024 / 1024).toFixed(2)}MB
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default BulkUpload;
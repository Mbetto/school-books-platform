// WatermarkPDF.js
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useTheme } from '../../context/ThemeContext';
import './WatermarkPDF.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const WatermarkPDF = ({ 
  file, 
  watermarkText, 
  userId = null,
  isPreview = false,
  onLoadSuccess = () => {},
  pageNumber = 1,
  scale = 1.0
}) => {
  const { theme } = useTheme();
  const [numPages, setNumPages] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    onLoadSuccess(numPages);
  };

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector('.pdf-container');
      if (container) {
        setDimensions({
          width: container.offsetWidth,
          height: container.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const renderWatermark = () => {
    const watermarkContent = userId 
      ? `${watermarkText} - User: ${userId}` 
      : watermarkText;

    return (
      <div className={`watermark ${theme}`}>
        {watermarkContent}
        {isPreview && (
          <div className="preview-overlay">
            Preview Only - Purchase to view full document
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pdf-container">
      <Document 
        file={file} 
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className="pdf-loading">Loading document...</div>}
        error={<div className="pdf-error">Failed to load document</div>}
      >
        {isPreview ? (
          <>
            <Page 
              pageNumber={pageNumber} 
              width={dimensions.width * 0.9} 
              renderAnnotationLayer={false} 
              renderTextLayer={false} 
            />
            {pageNumber < numPages && pageNumber < 2 && (
              <Page 
                pageNumber={pageNumber + 1} 
                width={dimensions.width * 0.9} 
                renderAnnotationLayer={false} 
                renderTextLayer={false} 
              />
            )}
          </>
        ) : (
          Array.from(new Array(numPages), (el, index) => (
            <Page 
              key={`page_${index + 1}`}
              pageNumber={index + 1} 
              width={dimensions.width * 0.9}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))
        )}
        {renderWatermark()}
      </Document>
    </div>
  );
};

export default WatermarkPDF;
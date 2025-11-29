import React, { useRef, useState } from 'react';
import './VideoUpload.css';

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      alert('Please upload a valid video file');
      return;
    }

    setVideoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setAnalysisResult(null);
  };

  const handleUpload = async () => {
    if (!videoFile) return;

    setIsUploading(true);
    
    // Simulate API call for analysis
    try {
      // In a real application, you would upload the file to your backend here
      // const formData = new FormData();
      // formData.append('video', videoFile);
      // const response = await fetch('/api/analyze', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const result = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis result
      const mockResult = {
        status: 'success',
        analysis: {
          duration: '2:45',
          distance: '8.7 km',
          averageSpeed: '32 km/h',
          maxSpeed: '78 km/h',
          harshBraking: 2,
          rapidAcceleration: 3,
          sharpTurns: 1,
          safetyScore: 87,
          timestamp: new Date().toLocaleString(),
        },
        recommendations: [
          'Try to maintain consistent speed',
          'Avoid sudden braking',
          'Smooth acceleration recommended',
        ],
      };
      
      setAnalysisResult(mockResult);
    } catch (error) {
      console.error('Error analyzing video:', error);
      alert('Error analyzing video. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
    }
  };

  const handleRetake = () => {
    setVideoFile(null);
    setPreviewUrl('');
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="video-upload-section">
      <div className="container">
        <h2 className="section-title">Analyze Your Drive</h2>
        
        {!previewUrl ? (
          <div 
            className="upload-area"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="upload-content">
              <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <h3>Drag & Drop your driving video here</h3>
              <p>or click to browse files</p>
              <p className="file-types">Supported formats: MP4, WebM, MOV</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <div className="preview-container">
            <div className="video-preview">
              <video
                ref={videoRef}
                src={previewUrl}
                controls
                className="preview-video"
              />
              <div className="video-controls">
                <button 
                  onClick={handleRetake}
                  className="retake-btn"
                  disabled={isUploading}
                >
                  Retake
                </button>
                <button 
                  onClick={handleUpload}
                  className="analyze-btn"
                  disabled={isUploading}
                >
                  {isUploading ? 'Analyzing...' : 'Start Analysis'}
                </button>
              </div>
            </div>
            
            {analysisResult && (
              <div className="analysis-results fade-in-up">
                <h3>Analysis Complete</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-value">{analysisResult.analysis.safetyScore}/100</span>
                    <span className="stat-label">Safety Score</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{analysisResult.analysis.distance}</span>
                    <span className="stat-label">Distance</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{analysisResult.analysis.averageSpeed}</span>
                    <span className="stat-label">Avg. Speed</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{analysisResult.analysis.maxSpeed}</span>
                    <span className="stat-label">Max Speed</span>
                  </div>
                </div>
                
                <div className="recommendations">
                  <h4>Recommendations</h4>
                  <ul>
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="analysis-meta">
                  <span>Analyzed on: {analysisResult.analysis.timestamp}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoUpload;

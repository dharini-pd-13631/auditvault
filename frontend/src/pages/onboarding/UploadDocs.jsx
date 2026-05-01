import { useRef } from 'react';

export default function UploadDocs({ documents, onChange }) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newDocs = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    }));
    onChange([...documents, ...newDocs]);
  };

  const removeDoc = (id) => {
    onChange(documents.filter(d => d.id !== id));
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div>
      <h2 className="page-title">Upload documents</h2>
      <p className="page-subtitle">Upload any existing compliance documents, policies, or certificates you have.</p>

      <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
        <div className="upload-icon">📁</div>
        <div className="upload-text">Click to upload or drag and drop files here</div>
        <div className="upload-subtext">PDF, DOC, DOCX, XLS, XLSX up to 10MB each</div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {documents.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            Uploaded files ({documents.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {documents.map(doc => (
              <div key={doc.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                background: 'var(--bg-dark)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{doc.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{formatSize(doc.size)}</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeDoc(doc.id); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', padding: '0.25rem' }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

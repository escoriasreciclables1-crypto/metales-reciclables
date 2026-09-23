import React, { useState, useEffect, useRef } from 'react';
import { Language, QuoteFormData, AttachedPhoto } from '../types';
import { t } from '../data/translations';
import { 
  X, 
  CheckCircle, 
  Mail, 
  AlertCircle, 
  UploadCloud, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Trash2, 
  Plus,
  FileText
} from 'lucide-react';

interface QuoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  presetMaterial?: string;
  presetQuantity?: string;
  presetFormat?: string;
}

export const QuoteFormModal: React.FC<QuoteFormModalProps> = ({
  isOpen,
  onClose,
  lang,
  presetMaterial = '',
  presetQuantity = '',
  presetFormat = ''
}) => {
  const text = t[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    materialType: presetMaterial || (lang === 'es' ? 'Carburo de Tungsteno (Widia)' : 'Tungsten Carbide (Widia)'),
    quantityKg: presetQuantity || '250',
    format: presetFormat || (lang === 'es' ? 'Sólidos / Insertos' : 'Solids / Inserts'),
    location: '',
    notes: ''
  });

  // Attached photos state
  const [photos, setPhotos] = useState<AttachedPhoto[]>([]);
  const [photoTab, setPhotoTab] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (presetMaterial) {
      setFormData((prev) => ({
        ...prev,
        materialType: presetMaterial,
        quantityKg: presetQuantity || prev.quantityKg,
        format: presetFormat || prev.format
      }));
    }
  }, [presetMaterial, presetQuantity, presetFormat]);

  if (!isOpen) return null;

  // Format file size nicely
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Handle local file uploads from computer
  const processFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    Array.from(fileList).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setErrorMsg(
          lang === 'es'
            ? 'Por favor suba únicamente archivos de imagen (JPG, PNG, WEBP).'
            : 'Please upload image files only (JPG, PNG, WEBP).'
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = event.target?.result as string;
        const newPhoto: AttachedPhoto = {
          id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          source: 'upload',
          name: file.name,
          url: resultUrl,
          size: formatFileSize(file.size)
        };
        setPhotos((prev) => [...prev, newPhoto]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  // Handle adding photo by URL
  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      setErrorMsg(
        lang === 'es'
          ? 'Por favor ingrese una URL válida que comience con http:// o https://'
          : 'Please enter a valid URL starting with http:// or https://'
      );
      return;
    }

    setErrorMsg('');
    const newPhoto: AttachedPhoto = {
      id: `url-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      source: 'url',
      name: trimmed.length > 35 ? `${trimmed.substring(0, 32)}...` : trimmed,
      url: trimmed
    };
    setPhotos((prev) => [...prev, newPhoto]);
    setUrlInput('');
  };

  // Remove photo
  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  // Generate photos summary text for email
  const photosSummary = photos.length > 0
    ? '\nFotos del Producto / Lote:\n' +
      photos.map((p, idx) => `  ${idx + 1}. [${p.source === 'upload' ? 'Desde Ordenador' : 'Enlace Web'}] ${p.name} ${p.size ? `(${p.size})` : ''} ${p.source === 'url' ? `-> ${p.url}` : ''}`).join('\n')
    : '\nFotos: Sin fotos adjuntas';

  // Direct mailto generation for industrial buyers/suppliers
  const mailSubject = encodeURIComponent(`Ecowidia Solicitud: ${formData.materialType || 'Lote de Metales'} (${formData.quantityKg || 'A convenir'} kg)`);
  const mailBody = encodeURIComponent(
    `SOLICITUD DE VALORIZACIÓN / COMPRA - ECOWIDIA\n\n` +
    `Empresa: ${formData.company}\n` +
    `Contacto: ${formData.fullName}\n` +
    `Email: ${formData.email}\n` +
    `Teléfono: ${formData.phone}\n` +
    `Material: ${formData.materialType}\n` +
    `Cantidad estimada: ${formData.quantityKg} kg\n` +
    `Formato físico: ${formData.format}\n` +
    `Ubicación / Retirada: ${formData.location}\n` +
    `Detalles / Notas: ${formData.notes}\n` +
    `${photosSummary}\n\n` +
    `Enviado a: escorias.reciclables1@gmail.com`
  );
  const mailtoLink = `mailto:escorias.reciclables1@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg(text.formValidationErr);
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
    try {
      window.open(mailtoLink, '_top');
    } catch {
      window.location.href = mailtoLink;
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setPhotos([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0b1a12] border border-emerald-800/80 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 my-6 text-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-emerald-400/80 hover:text-white p-1 rounded-lg hover:bg-emerald-950/80 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 sm:py-8 space-y-5 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-900/60 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/20">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white font-display">
              {text.formSuccessTitle}
            </h3>

            <p className="text-sm text-emerald-100/80 max-w-lg mx-auto leading-relaxed">
              {text.formSuccessDesc}
            </p>

            {/* Summary card */}
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-900/60 text-xs text-emerald-300 max-w-md mx-auto text-left space-y-1.5 font-mono">
              <div><span className="text-emerald-500 font-sans font-semibold">Lote:</span> {formData.materialType}</div>
              <div><span className="text-emerald-500 font-sans font-semibold">Cantidad:</span> {formData.quantityKg} kg ({formData.format})</div>
              <div><span className="text-emerald-500 font-sans font-semibold">Contacto:</span> {formData.fullName} ({formData.email})</div>
              <div>
                <span className="text-emerald-500 font-sans font-semibold">Fotos adjuntas:</span> {photos.length}
              </div>
            </div>

            {/* Photos thumbnail preview if any were added */}
            {photos.length > 0 && (
              <div className="max-w-md mx-auto text-left pt-2">
                <div className="text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Fotos del producto registradas ({photos.length}):</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {photos.map((photo) => (
                    <div key={`thumb-${photo.id}`} className="aspect-square rounded-lg overflow-hidden border border-emerald-800 bg-[#07130c] relative group">
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback icon if URL is not a direct image
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-emerald-950/80 flex items-center justify-center p-1 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] text-emerald-300 font-mono truncate">{photo.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={mailtoLink}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-400/20 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Enviar copia por correo a escorias.reciclables1@gmail.com</span>
              </a>

              <button
                onClick={resetAndClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-emerald-800 text-emerald-200 text-xs font-semibold hover:bg-emerald-900/40 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto pr-1">
            {/* Form Header */}
            <div className="mb-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1 font-mono">
                {text.formKicker}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {text.formTitle}
              </h3>
              <p className="text-xs text-emerald-100/70 mt-1 leading-relaxed">
                {text.formSubtitle}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Row 1: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-emerald-300 font-medium mb-1">
                    {text.fieldFullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ej. Roberto Martínez"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130c] border border-emerald-900/80 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-emerald-300 font-medium mb-1">
                    {text.fieldCompany} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ej. Talleres Mecanizados S.L."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130c] border border-emerald-900/80 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-emerald-300 font-medium mb-1">
                    {text.fieldEmail} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contacto@empresa.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130c] border border-emerald-900/80 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-emerald-300 font-medium mb-1">
                    {text.fieldPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+34 600 000 000 / +52 ..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130c] border border-emerald-900/80 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Material, Quantity, Format */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-emerald-300 font-medium mb-1">
                    {text.fieldMaterial}
                  </label>
                  <input
                    type="text"
                    value={formData.materialType}
                    onChange={(e) => setFormData({ ...formData, materialType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130c] border border-emerald-900/80 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-emerald-300 font-medium mb-1">
                    {text.fieldQuantity}
                  </label>
                  <input
                    type="text"
                    value={formData.quantityKg}
                    onChange={(e) => setFormData({ ...formData, quantityKg: e.target.value })}
                    placeholder="Ej. 500"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130c] border border-emerald-900/80 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-emerald-300 font-medium mb-1">
                    {text.fieldFormat}
                  </label>
                  <input
                    type="text"
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    placeholder="Ej. Insertos usados / Lodos"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130c] border border-emerald-900/80 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-emerald-300 font-medium mb-1">
                  {text.fieldLocation}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ej. Barcelona, España / Monterrey, México / São Paulo, Brasil"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130c] border border-emerald-900/80 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>

              {/* NEW: Fotos del Producto (Subir desde el ordenador o por URL) */}
              <div className="pt-1 pb-1">
                <div className="p-4 rounded-2xl bg-[#07150d] border border-emerald-800/70 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 font-display">
                        <ImageIcon className="w-4 h-4 text-emerald-400" />
                        <span>{text.fieldPhotosTitle}</span>
                        {photos.length > 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold font-mono">
                            {photos.length}
                          </span>
                        )}
                      </label>
                      <p className="text-[11px] text-emerald-100/70 mt-0.5">
                        {text.fieldPhotosSubtitle}
                      </p>
                    </div>

                    {/* Sub-tabs: Subir desde ordenador vs URL */}
                    <div className="flex items-center p-0.5 rounded-xl bg-emerald-950/80 border border-emerald-800/70 shrink-0 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setPhotoTab('upload')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                          photoTab === 'upload'
                            ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                            : 'text-emerald-300/80 hover:text-white'
                        }`}
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>{text.tabUpload}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPhotoTab('url')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                          photoTab === 'url'
                            ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                            : 'text-emerald-300/80 hover:text-white'
                        }`}
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span>{text.tabUrl}</span>
                      </button>
                    </div>
                  </div>

                  {/* TAB 1: Subir desde el ordenador (Drag & Drop + File Input) */}
                  {photoTab === 'upload' && (
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        multiple
                        onChange={handleFileInputChange}
                        className="hidden"
                        id="photo-file-input"
                      />
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                          isDragging
                            ? 'border-emerald-400 bg-emerald-950/80 scale-[0.99]'
                            : 'border-emerald-800/80 hover:border-emerald-500 bg-[#051109] hover:bg-emerald-950/40'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-900/50 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-semibold text-emerald-200">
                            {text.uploadDropText}
                          </p>
                          <p className="text-[10px] text-emerald-400/80">
                            JPG, PNG, WEBP · Hasta 10 MB por imagen
                          </p>
                        </div>
                        <span className="mt-1 inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-950 border border-emerald-700/70 text-emerald-300 text-[11px] font-medium hover:bg-emerald-900">
                          <Plus className="w-3 h-3" />
                          <span>{text.uploadBrowse}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Subir por URL */}
                  {photoTab === 'url' && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="url"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddUrl(e);
                              }
                            }}
                            placeholder={text.urlPlaceholder}
                            className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-[#051109] border border-emerald-800/80 text-white text-xs focus:outline-none focus:border-emerald-400 transition-colors"
                          />
                          <LinkIcon className="w-3.5 h-3.5 text-emerald-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <button
                          type="button"
                          onClick={handleAddUrl}
                          className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 shadow-sm shadow-emerald-400/20"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{text.btnAddUrl}</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-emerald-300/60 pl-1">
                        {lang === 'es'
                          ? 'Admite enlaces directos a imágenes o carpetas compartidas de Google Drive, Dropbox, OneDrive, etc.'
                          : 'Supports direct image links or shared cloud folders from Google Drive, Dropbox, OneDrive, etc.'}
                      </p>
                    </div>
                  )}

                  {/* Attached Photos Previews Gallery */}
                  {photos.length > 0 && (
                    <div className="pt-2 border-t border-emerald-900/60 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-emerald-300 font-mono">
                        <span>{photos.length} {text.photoCount}</span>
                        <button
                          type="button"
                          onClick={() => setPhotos([])}
                          className="text-red-400 hover:text-red-300 text-[10px] underline cursor-pointer"
                        >
                          {lang === 'es' ? 'Quitar todas' : 'Remove all'}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1">
                        {photos.map((photo) => (
                          <div
                            key={photo.id}
                            className="relative group rounded-xl border border-emerald-800/80 bg-[#051109] p-2 flex items-center gap-2.5 overflow-hidden shadow-sm hover:border-emerald-500 transition-all"
                          >
                            <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-emerald-950 border border-emerald-800 flex items-center justify-center relative">
                              <img
                                src={photo.url}
                                alt={photo.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // In case it's a Drive/folder URL that is not a direct image renderable in <img>
                                  const target = e.target as HTMLElement;
                                  target.style.display = 'none';
                                }}
                              />
                              <FileText className="w-5 h-5 text-emerald-400 absolute pointer-events-none opacity-40 group-hover:opacity-60" />
                            </div>

                            <div className="flex-1 min-w-0 pr-6">
                              <p className="text-[11px] font-medium text-white truncate" title={photo.name}>
                                {photo.name}
                              </p>
                              <div className="flex items-center gap-1.5 text-[9px] text-emerald-400/80 font-mono mt-0.5">
                                <span className="bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800/60">
                                  {photo.source === 'upload' ? 'PC' : 'URL'}
                                </span>
                                {photo.size && <span>{photo.size}</span>}
                              </div>
                            </div>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(photo.id)}
                              aria-label={text.removePhoto}
                              className="absolute top-1.5 right-1.5 p-1 rounded-md text-emerald-400/70 hover:text-red-300 hover:bg-red-950/50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-emerald-300 font-medium mb-1">
                  {text.fieldNotes}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Descripción de la pieza, marcas de herramientas, porcentaje estimado o fecha estimada de disponibilidad..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#07130c] border border-emerald-900/80 text-white focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                />
              </div>

              {/* Submit Button - Enlazado al correo escorias.reciclables1@gmail.com */}
              <div className="pt-2">
                <a
                  href={mailtoLink}
                  target="_top"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
                      setErrorMsg(text.formValidationErr);
                    } else {
                      setErrorMsg('');
                      setSubmitted(true);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer select-none text-center"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="text-center font-bold tracking-wider">{text.formSubmitBtn}</span>
                </a>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

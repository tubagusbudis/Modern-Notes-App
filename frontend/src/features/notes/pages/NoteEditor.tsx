import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Trash2, X, Image as ImageIcon, Paperclip } from 'lucide-react';
import { useNote, useNoteMutations } from '../hooks/useNotes';
import { usePageEnterAnimation } from '../../../lib/animations';

export function NoteEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id;
  const { data: note, isLoading } = useNote(id);
  const { create, update, remove } = useNoteMutations();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [colorVariant, setColorVariant] = useState<"default" | "lavender" | "mint" | "sky-blue" | "sage-green" | "warm-amber" | "soft-rose" | "coral" | "lilac" | "slate-gray">('default');
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  const [removeImage, setRemoveImage] = useState(false);
  const [removeFile, setRemoveFile] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const pendingImageRef = useRef<File | null>(null);
  const pendingDocRef = useRef<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const timeoutRef = useRef<NodeJS.Timeout>();
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (note && initialLoadRef.current) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags || []);
      setColorVariant(note.colorVariant as any);
      initialLoadRef.current = false;
    }
  }, [note]);

  const handleSave = async () => {
    setSaveStatus('saving');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', JSON.stringify(tags));
    formData.append('colorVariant', colorVariant);
    
    if (pendingImageRef.current) formData.append('image', pendingImageRef.current);
    else if (removeImage) formData.append('removeImage', 'true');

    if (pendingDocRef.current) formData.append('file', pendingDocRef.current);
    else if (removeFile) formData.append('removeFile', 'true');

    try {
      if (isNew) {
        const newNote = await create.mutateAsync(formData as any);
        pendingImageRef.current = null;
        pendingDocRef.current = null;
        setImageFile(null);
        setDocFile(null);
        navigate(`/app/notes/${newNote.id}/edit`, { replace: true });
      } else if (id) {
        await update.mutateAsync({ id, data: formData as any });
        pendingImageRef.current = null;
        pendingDocRef.current = null;
        setImageFile(null);
        setDocFile(null);
      }
      setSaveStatus('saved');
    } catch (e) {
      setSaveStatus('unsaved');
    }
  };

  const handleDelete = async () => {
    if (id) {
      await remove.mutateAsync(id);
      navigate('/app/notes', { replace: true });
    }
  };

  useEffect(() => {
    if (initialLoadRef.current && !isNew) return;
    setSaveStatus('unsaved');
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleSave();
    }, 1500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [title, content, tags, colorVariant, imageFile, docFile, removeImage, removeFile]);

  const handleAddTag = (e?: React.KeyboardEvent | React.FocusEvent) => {
    if (e && 'key' in e && (e as React.KeyboardEvent).key !== 'Enter') return;
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
    }
    setNewTag('');
    setIsAddingTag(false);
  };

  const containerRef = usePageEnterAnimation(isLoading && !isNew);

  if (isLoading && !isNew) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto flex flex-col h-full h-[calc(100vh-8rem)]">
      <header className="gsap-header flex items-center justify-between pb-4 border-b border-border-soft mb-6">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-secondary hover:text-primary hover:bg-subtle rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-muted">{isNew ? 'Untitled note' : 'Editing note'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted mr-2 flex items-center">
            {saveStatus === 'saved' && <><Check className="w-3 h-3 mr-1" /> Saved</>}
            {saveStatus === 'saving' && 'Saving...'}
            {saveStatus === 'unsaved' && 'Unsaved changes'}
          </span>
          <div className="flex items-center space-x-1 mr-4">
            {[
              { id: 'default', color: 'bg-surface border-border-soft', name: 'Default' },
              { id: 'lavender', color: 'bg-[#EAE4FA] border-[#EAE4FA]', name: 'Lavender' },
              { id: 'mint', color: 'bg-[#E0F4E8] border-[#E0F4E8]', name: 'Mint' },
              { id: 'sky-blue', color: 'bg-[#E3F2FD] border-[#E3F2FD]', name: 'Sky Blue' },
              { id: 'sage-green', color: 'bg-[#E4ECE5] border-[#E4ECE5]', name: 'Sage Green' },
              { id: 'warm-amber', color: 'bg-[#FFF3E0] border-[#FFF3E0]', name: 'Warm Amber' },
              { id: 'soft-rose', color: 'bg-[#FCE4EC] border-[#FCE4EC]', name: 'Soft Rose' },
              { id: 'coral', color: 'bg-[#FFEBEE] border-[#FFEBEE]', name: 'Coral' },
              { id: 'lilac', color: 'bg-[#F3E5F5] border-[#F3E5F5]', name: 'Lilac' },
              { id: 'slate-gray', color: 'bg-[#ECEFF1] border-[#ECEFF1]', name: 'Slate Gray' },
            ].map(swatch => (
              <button
                key={swatch.id}
                onClick={() => setColorVariant(swatch.id as any)}
                className={`w-5 h-5 rounded-full border transition-transform ${swatch.color} ${colorVariant === swatch.id ? 'ring-2 ring-primary ring-offset-1 scale-110' : 'hover:scale-110'}`}
                title={swatch.name}
              />
            ))}
          </div>

          <div className="flex items-center space-x-1 mr-4 border-l pl-4 border-border-soft">
            <button onClick={() => imageInputRef.current?.click()} className="p-2 text-secondary hover:text-primary transition-colors" title="Attach Image">
              <ImageIcon className="w-4 h-4" />
            </button>
            <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={(e) => {
              const file = e.target.files?.[0] || null;
              pendingImageRef.current = file;
              setImageFile(file);
              if (file) setRemoveImage(false);
            }} />
            
            <button onClick={() => fileInputRef.current?.click()} className="p-2 text-secondary hover:text-primary transition-colors" title="Attach File">
              <Paperclip className="w-4 h-4" />
            </button>
            <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => {
              const file = e.target.files?.[0] || null;
              pendingDocRef.current = file;
              setDocFile(file);
              if (file) setRemoveFile(false);
            }} />
          </div>

          {!isNew && (
            <button onClick={handleDelete} className="p-2 text-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      <div className="gsap-card flex-1 overflow-y-auto pb-20 flex flex-col">
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add title..." 
          className="w-full text-4xl font-bold bg-transparent border-none outline-none text-primary placeholder-muted mb-4"
        />
        <div className="flex items-center flex-wrap gap-2 mb-8 text-sm">
          <span className="text-muted">Tags:</span>
          {tags.map(tag => (
            <span key={tag} className="flex items-center px-2 py-1 bg-subtle text-secondary rounded-md">
              {tag}
              <button onClick={() => setTags(tags.filter(t => t !== tag))} className="ml-1 hover:text-danger rounded-full p-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {isAddingTag ? (
            <input
              type="text"
              autoFocus
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              onBlur={handleAddTag}
              placeholder="Type tag..."
              className="px-2 py-1 bg-transparent border-b border-primary outline-none text-primary w-24 text-sm"
            />
          ) : (
            <button onClick={() => setIsAddingTag(true)} className="px-2 py-1 bg-subtle text-secondary hover:text-primary rounded-md transition-colors">+ Add tag</button>
          )}
        </div>

        {(imageFile || (note?.imageUrl && !removeImage)) && (
          <div className="mb-4 relative w-max">
             <img src={imageFile ? URL.createObjectURL(imageFile) : `http://localhost:5000${note?.imageUrl}`} alt="Attachment" className="max-h-[400px] rounded-xl object-contain border border-border-soft bg-black/5" />
             <button
               onClick={(e) => {
                 e.preventDefault();
                 setImageFile(null);
                 pendingImageRef.current = null;
                 setRemoveImage(true);
               }}
               className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-danger text-white rounded-full transition-colors backdrop-blur-sm"
               title="Remove image"
             >
               <X className="w-4 h-4" />
             </button>
          </div>
        )}
        {(docFile || (note?.fileUrl && !removeFile)) && (
          <div className="mb-4 flex items-center space-x-2">
            <a 
              href={docFile ? URL.createObjectURL(docFile) : `http://localhost:5000${note?.fileUrl}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-2 text-sm text-secondary bg-subtle p-3 rounded-lg w-max border border-border-soft hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary transition-colors cursor-pointer"
            >
               <Paperclip className="w-4 h-4" />
               <span>{docFile ? docFile.name : note?.fileUrl?.split('/').pop()}</span>
            </a>
            <button
              onClick={(e) => {
                e.preventDefault();
                setDocFile(null);
                pendingDocRef.current = null;
                setRemoveFile(true);
              }}
              className="p-2 text-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
              title="Remove file"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..." 
          className="flex-1 w-full min-h-[500px] resize-none bg-transparent border-none outline-none text-primary placeholder-muted text-lg leading-relaxed"
        />
      </div>
    </div>
  );
}

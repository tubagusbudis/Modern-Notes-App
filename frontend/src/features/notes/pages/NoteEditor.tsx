import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Trash2, X, Image as ImageIcon, Paperclip } from 'lucide-react';
import { useNote, useNoteMutations } from '../hooks/useNotes';
import { usePageEnterAnimation } from '../../../lib/animations';
import { RichTextEditor } from '../../../components/ui/RichTextEditor';
import { usePreferences } from '../../../hooks/usePreferences';
import { useLanguage } from '../../../context/LanguageContext';

export function NoteEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id;
  const { data: note, isLoading } = useNote(id);
  const { create, update, remove } = useNoteMutations();
  const { preferences } = usePreferences();
  const { t } = useLanguage();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [colorVariant, setColorVariant] = useState<"default" | "lavender" | "mint" | "sky-blue" | "sage-green" | "warm-amber" | "soft-rose" | "coral" | "lilac" | "slate-gray">(
    isNew ? (preferences.defaultColor as any) : 'default'
  );
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

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (note && initialLoadRef.current) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags || []);
      setColorVariant(note.colorVariant as any);
      initialLoadRef.current = false;
    } else if (isNew && initialLoadRef.current) {
      setColorVariant(preferences.defaultColor as any);
      initialLoadRef.current = false;
    }
  }, [note, isNew, preferences.defaultColor]);


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
      <header className="gsap-header flex flex-wrap items-center justify-between pb-4 border-b-2 border-black/20 gap-3 mb-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-black dark:text-white bg-white dark:bg-[#1E1E1E] border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
            title={t('goBack')}
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-sm font-extrabold text-gray-700 dark:text-gray-300">
            {isNew ? t('untitledNoteEditor') : t('editingNote')}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-xl border-2 border-black bg-white dark:bg-[#1E1E1E] text-xs font-black text-black dark:text-white shadow-[1.5px_1.5px_0px_0px_#000] flex items-center">
            {saveStatus === 'saved' && <><Check className="w-3.5 h-3.5 mr-1 stroke-[3] text-emerald-600" /> {t('saved')}</>}
            {saveStatus === 'saving' && t('saving')}
            {saveStatus === 'unsaved' && t('unsavedChanges')}
          </span>

          <div className="flex items-center space-x-1.5 px-2 py-1 bg-white dark:bg-[#1E1E1E] border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000]">
            {[
              { id: 'default', color: 'bg-white', name: t('colorWhite') },
              { id: 'lavender', color: 'bg-[#E2D4FF]', name: t('colorLavender') },
              { id: 'mint', color: 'bg-[#A3F7CF]', name: t('colorMint') },
              { id: 'sky-blue', color: 'bg-[#B4E4FF]', name: t('colorBlue') },
              { id: 'sage-green', color: 'bg-[#CBE8BA]', name: 'Sage Green' },
              { id: 'warm-amber', color: 'bg-[#FFEB85]', name: t('colorYellow') },
              { id: 'soft-rose', color: 'bg-[#FFC6D0]', name: t('colorPink') },
              { id: 'coral', color: 'bg-[#FFB5A7]', name: 'Coral' },
              { id: 'lilac', color: 'bg-[#E8D1FF]', name: 'Lilac' },
              { id: 'slate-gray', color: 'bg-[#DFE4EA]', name: 'Slate Gray' },
            ].map(swatch => (
              <button
                key={swatch.id}
                onClick={() => setColorVariant(swatch.id as any)}
                className={`w-5 h-5 rounded-full border-2 border-black transition-all cursor-pointer ${swatch.color} ${colorVariant === swatch.id ? 'scale-125 ring-2 ring-black shadow-[1.5px_1.5px_0px_0px_#000]' : 'hover:scale-115'}`}
                title={swatch.name}
              />
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => imageInputRef.current?.click()}
              className="p-2 text-black dark:text-white bg-white dark:bg-[#1E1E1E] border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              title={t('attachImage')}
            >
              <ImageIcon className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>
            <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={(e) => {
              const file = e.target.files?.[0] || null;
              pendingImageRef.current = file;
              setImageFile(file);
              if (file) setRemoveImage(false);
            }} />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-black dark:text-white bg-white dark:bg-[#1E1E1E] border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              title={t('attachFile')}
            >
              <Paperclip className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>
            <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => {
              const file = e.target.files?.[0] || null;
              pendingDocRef.current = file;
              setDocFile(file);
              if (file) setRemoveFile(false);
            }} />

            {!isNew && (
              <button
                onClick={handleDelete}
                className="p-2 text-black bg-[#FF7890] border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
                title={t('moveToTrash')}
              >
                <Trash2 className="w-4.5 h-4.5 stroke-[2.2]" />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="gsap-card flex-1 overflow-y-auto pb-20 flex flex-col">
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('noteTitlePlaceholder')} 
          className="w-full text-3xl sm:text-4xl font-black bg-transparent border-none outline-none text-black dark:text-white placeholder-gray-400 mb-4 tracking-tight"
        />
        
        {/* Tags */}
        <div className="flex items-center flex-wrap gap-2 mb-6 text-sm">
          <span className="text-xs font-black uppercase tracking-wider text-gray-500">{t('tagsLabel')}</span>
          {tags.map(tag => (
            <span
              key={tag}
              className="flex items-center px-3 py-1 bg-white dark:bg-[#1E1E1E] border-2 border-black rounded-xl text-xs font-black text-black dark:text-white shadow-[1.5px_1.5px_0px_0px_#000]"
            >
              {tag}
              <button
                onClick={() => setTags(tags.filter(t => t !== tag))}
                className="ml-1.5 hover:text-red-600 rounded-full p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5 stroke-[3]" />
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
              placeholder={t('typeTag')}
              className="px-3 py-1 bg-white dark:bg-[#1E1E1E] border-2 border-black rounded-xl text-xs font-black text-black dark:text-white shadow-[1.5px_1.5px_0px_0px_#000] outline-none w-28"
            />
          ) : (
            <button
              onClick={() => setIsAddingTag(true)}
              className="px-3 py-1 bg-[#C4B5FD] text-black border-2 border-black rounded-xl text-xs font-black shadow-[1.5px_1.5px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
            >
              {t('addTag')}
            </button>
          )}
        </div>

        {/* Attached Image Preview */}
        {(imageFile || (note?.imageUrl && !removeImage)) && (
          <div className="mb-5 relative w-max max-w-full">
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : `http://localhost:5000${note?.imageUrl}`}
              alt="Attachment"
              className="max-h-[380px] rounded-2xl object-contain border-3 border-black shadow-[4px_4px_0px_0px_#000] bg-white dark:bg-[#1E1E1E]"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setImageFile(null);
                pendingImageRef.current = null;
                setRemoveImage(true);
              }}
              className="absolute top-2.5 right-2.5 p-1.5 bg-[#FF7890] hover:bg-[#FF617D] text-black border-2 border-black rounded-full shadow-[2px_2px_0px_0px_#000] hover:scale-110 transition-all cursor-pointer"
              title={t('removeImage')}
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}

        {/* Attached Document File */}
        {(docFile || (note?.fileUrl && !removeFile)) && (
          <div className="mb-5 flex items-center space-x-2">
            <a 
              href={docFile ? URL.createObjectURL(docFile) : `http://localhost:5000${note?.fileUrl}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-2 text-sm font-extrabold text-black dark:text-white bg-white dark:bg-[#1E1E1E] p-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer w-max max-w-full"
            >
              <Paperclip className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>{docFile ? docFile.name : note?.fileUrl?.split('/').pop()}</span>
            </a>
            <button
              onClick={(e) => {
                e.preventDefault();
                setDocFile(null);
                pendingDocRef.current = null;
                setRemoveFile(true);
              }}
              className="p-3 text-black bg-[#FF7890] border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] hover:scale-105 transition-all cursor-pointer"
              title={t('removeFile')}
            >
              <Trash2 className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}

        <RichTextEditor 
          content={content}
          onChange={setContent}
          placeholder={t('startWriting')} 
        />
      </div>
    </div>
  );
}

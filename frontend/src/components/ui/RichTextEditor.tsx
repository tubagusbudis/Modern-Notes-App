import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  CheckSquare,
  Highlighter,
  Quote
} from 'lucide-react';
import { useEffect } from 'react';
import { usePreferences } from '../../hooks/usePreferences';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const toggleBtnClass = (isActive: boolean) => 
    `p-2 rounded-xl border-2 transition-all select-none cursor-pointer ${
      isActive
        ? 'bg-[#C4B5FD] text-black border-black shadow-[2px_2px_0px_0px_#000000] font-black translate-x-[0.5px] translate-y-[0.5px]'
        : 'text-black dark:text-white border-transparent hover:border-black hover:bg-black/5 dark:hover:bg-white/5 font-bold'
    }`;

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-2 mb-4 border-2 border-black rounded-2xl bg-white dark:bg-[#1E1E1E] sticky top-0 z-10 shadow-[3px_3px_0px_0px_#000000]">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={toggleBtnClass(editor.isActive('bold'))}
        title="Bold"
      >
        <Bold className="w-4 h-4 stroke-[2.5]" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={toggleBtnClass(editor.isActive('italic'))}
        title="Italic"
      >
        <Italic className="w-4 h-4 stroke-[2.5]" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={toggleBtnClass(editor.isActive('underline'))}
        title="Underline"
      >
        <UnderlineIcon className="w-4 h-4 stroke-[2.5]" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={toggleBtnClass(editor.isActive('strike'))}
        title="Strikethrough"
      >
        <Strikethrough className="w-4 h-4 stroke-[2.5]" />
      </button>
      
      <div className="w-0.5 h-6 bg-black/20 dark:bg-white/20 mx-1 rounded-full" />
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={toggleBtnClass(editor.isActive('heading', { level: 1 }))}
        title="Heading 1"
      >
        <Heading1 className="w-4 h-4 stroke-[2.5]" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={toggleBtnClass(editor.isActive('heading', { level: 2 }))}
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4 stroke-[2.5]" />
      </button>
      
      <div className="w-0.5 h-6 bg-black/20 dark:bg-white/20 mx-1 rounded-full" />
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={toggleBtnClass(editor.isActive('bulletList'))}
        title="Bullet List"
      >
        <List className="w-4 h-4 stroke-[2.5]" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={toggleBtnClass(editor.isActive('orderedList'))}
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4 stroke-[2.5]" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={toggleBtnClass(editor.isActive('taskList'))}
        title="To-Do List"
      >
        <CheckSquare className="w-4 h-4 stroke-[2.5]" />
      </button>
      
      <div className="w-0.5 h-6 bg-black/20 dark:bg-white/20 mx-1 rounded-full" />
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={toggleBtnClass(editor.isActive('highlight'))}
        title="Highlight"
      >
        <Highlighter className="w-4 h-4 stroke-[2.5]" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={toggleBtnClass(editor.isActive('blockquote'))}
        title="Blockquote"
      >
        <Quote className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const { fontSizeClass, proseSizeClass } = usePreferences();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Highlight,
      Placeholder.configure({
        placeholder: placeholder || 'Start writing...',
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `prose ${proseSizeClass} ${fontSizeClass} dark:prose-invert focus:outline-none max-w-none min-h-[400px] text-gray-900 dark:text-gray-100`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update dynamic font size attributes if preference changes
  useEffect(() => {
    if (editor) {
      editor.setOptions({
        editorProps: {
          attributes: {
            class: `prose ${proseSizeClass} ${fontSizeClass} dark:prose-invert focus:outline-none max-w-none min-h-[400px] text-gray-900 dark:text-gray-100`,
          },
        },
      });
    }
  }, [editor, fontSizeClass, proseSizeClass]);

  // Update editor content when content prop changes (for initial load)
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="flex flex-col w-full flex-1">
      <MenuBar editor={editor} />
      <div className={`flex-1 w-full rich-text-editor p-5 sm:p-6 rounded-2xl border-2 border-black bg-white dark:bg-[#1E1E1E] shadow-[4px_4px_0px_0px_#000000] text-gray-900 dark:text-gray-100 ${fontSizeClass}`}>
        <EditorContent editor={editor} className={`flex-1 w-full ${fontSizeClass}`} />
      </div>
    </div>
  );
}

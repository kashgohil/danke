'use client';

import { cn } from '@/lib/utils';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Palette,
  Strikethrough,
  Underline as UnderlineIcon,
} from 'lucide-react';
import { Button } from './button';

interface RichTextEditorProps {
  content?: any;
  onChange?: (content: any) => void;
  placeholder?: string;
  className?: string;
  editable?: boolean;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Write your appreciation message...',
  className,
  editable = true,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[120px] p-4',
          className
        ),
      },
    },
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      type="button"
      variant={isActive ? 'default' : 'ghost'}
      size="sm"
      onClick={onClick}
      title={title}
      className="h-8 w-8 p-0"
    >
      {children}
    </Button>
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      {editable && (
        <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <div className="flex items-center gap-1">
            <Palette className="h-4 w-4 text-gray-500" />
            <input
              type="color"
              onChange={(e) =>
                editor.chain().focus().setColor(e.target.value).run()
              }
              value={editor.getAttributes('textStyle').color || '#000000'}
              className="w-8 h-8 border rounded cursor-pointer"
              title="Text Color"
            />
          </div>
        </div>
      )}

      <EditorContent
        editor={editor}
        className={cn('min-h-[120px]', !editable && 'cursor-default')}
        placeholder={placeholder}
      />
    </div>
  );
}

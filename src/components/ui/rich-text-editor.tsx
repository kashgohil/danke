'use client';

import { cn } from '@/lib/utils';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
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
import { useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  editable?: boolean;
}

export function RichTextEditor({
  content,
  onChange,
  className,
  editable = true,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
    ],
    content: content || '',
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
          editable ? 'min-h-[120px] p-4' : 'p-0',
          className
        ),
      },
    },
  });

  useEffect(() => {
    if (editor && content !== undefined && editor.getHTML() !== content) {
      editor.commands.setContent(content || '');
    }
  }, [editor, content]);

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
      className={cn(
        'h-8 w-8 p-0 transition-all',
        isActive
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'hover:bg-accent hover:text-accent-foreground'
      )}
    >
      {children}
    </Button>
  );

  return (
    <Card className="overflow-hidden border-transparent">
      {editable && (
        <div className="border-b bg-muted/30 p-3">
          <div className="flex flex-wrap items-center gap-1">
            <div className="flex items-center gap-1">
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
            </div>

            <div className="w-px h-6 bg-border mx-2" />

            <div className="flex items-center gap-1">
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
            </div>

            <div className="w-px h-6 bg-border mx-2" />

            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <div className="relative">
                <input
                  type="color"
                  onChange={(e) =>
                    editor.chain().focus().setColor(e.target.value).run()
                  }
                  value={editor.getAttributes('textStyle').color || '#000000'}
                  className="w-8 h-8 border border-input rounded cursor-pointer bg-background hover:bg-accent transition-colors"
                  title="Text Color"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <CardContent className="p-0">
        <EditorContent
          editor={editor}
          className={cn(
            'prose prose-sm max-w-none',
            editable ? 'min-h-[120px] p-4' : 'p-4',
            !editable && 'cursor-default',
            'prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground',
            className
          )}
        />
      </CardContent>
    </Card>
  );
}

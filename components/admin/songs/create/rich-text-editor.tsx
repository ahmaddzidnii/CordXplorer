"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import { cn } from "@/lib/utils";

import "./styles.css";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
  className?: string;
  content?: string;
  onChange?: (content: string) => void;
}

const BoldExtended = Bold.extend({
  renderHTML: ({ HTMLAttributes }) => {
    return [
      "span",
      {
        class: "c",
        ...HTMLAttributes,
      },
    ];
  },
});

export const RichTextEditor = ({ className, content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        italic: false,
        bold: false,
      }),
      BoldExtended,

      PlaceHolder.configure({
        placeholder: "Type lyrics and chord here...",
      }),
    ],
    content: content || undefined,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML().replace(/\s+/g, "&nbsp;"));
      }
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="h-10 w-max rounded-lg">
        <Button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
          variant={editor?.isActive("bold") ? "default" : "secondary"}
        >
          Mark as chord
        </Button>
      </div>
      <EditorContent
        className={cn("w-full ", className)}
        editor={editor}
        onPaste={(event) => {
          // Mencegah aksi paste default
          event.preventDefault();

          // Ambil data plain text dari clipboard
          const clipboardData = (event.clipboardData || window.ClipboardItem).getData("text");

          // Perbarui state dengan data plain text
          console.log(clipboardData);
        }}
      />
    </div>
  );
};

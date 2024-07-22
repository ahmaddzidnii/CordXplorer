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
  onChange?: (content: string) => void;
}
export const RichTextEditor = ({ className, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        italic: false,
        bold: false,
      }),
      Bold.configure({
        HTMLAttributes: {
          class: "c",
        },
      }),
      PlaceHolder.configure({
        placeholder: "Type lyrics and chord here...",
      }),
    ],
    content: undefined,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
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
      />
    </div>
  );
};

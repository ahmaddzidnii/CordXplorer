"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";

import "./styles.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Chord } from "@/extensions/Chord";
import { NonBreakingSpace } from "@/extensions/NonBreakingSpace";
import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";
import { CHORD_REGEX } from "@/constants/chord-index";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface RichTextEditorProps {
  className?: string;
  content?: string;
  onChange?: (content: string) => void;
}

const isValidChord = (chord: string): boolean => {
  return CHORD_REGEX.test(chord);
};

export const RichTextEditor = ({
  className,
  content,
  onChange,
}: RichTextEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      handlePaste(view, event) {
        event.preventDefault();
        const text = event.clipboardData?.getData("text/plain")!;
        const { state } = view;
        view.dispatch(state.tr.insertText(text));
        return true;
      },
    },
    content,
    extensions: [
      StarterKit.configure({
        italic: false,
        bold: false,
      }),
      Chord,
      NonBreakingSpace,
      Placeholder.configure({
        placeholder: "Type lyrics and chord here...",
      }),
    ],
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  const [chord, setChord] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddChord = () => {
    if (!isValidChord(chord.trim())) {
      toast.error(
        "Invalid chord make sure it's in the format of A, Am, A7, A#m7, etc.",
        {
          duration: 5000,
        },
      );
      return;
    } else {
      editor?.chain().focus().addChord({ chord }).run();
      setChord("");
      setIsOpen(false);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="mb-5 h-10 w-max rounded-lg">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button type="button" onClick={() => setIsOpen(!isOpen)}>
              Add Chord
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Chord</DialogTitle>
              <DialogDescription>
                <Input
                  placeholder="Am"
                  value={chord}
                  onChange={(e) => {
                    setChord(e.target.value);
                  }}
                />
              </DialogDescription>
            </DialogHeader>
            <div>
              <Button type="button" onClick={handleAddChord}>
                Add Chord
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <EditorContent className={cn("w-full", className)} editor={editor} />
    </div>
  );
};

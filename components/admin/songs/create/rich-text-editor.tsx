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
} from "@/components/ui/dialog";
import HardBreak from "@tiptap/extension-hard-break";

import { InlineChord, BlockChord } from "@/extensions/Chord";
import { NonBreakingSpace } from "@/extensions/NonBreakingSpace";
import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";
import { CHORD_REGEX } from "@/constants/chord-index";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface RichTextEditorProps {
  className?: string;
  content?: string;
  onChange?: (content: string) => void;
}

interface State {
  isOpen: boolean;
  type: "block" | "inline" | undefined;
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
        hardBreak: false,
      }),
      HardBreak.configure({
        HTMLAttributes: {
          class: "ProseMirror-trailingBreak",
        },
      }),
      InlineChord,
      BlockChord,
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
  const [state, setState] = useState<State>({ isOpen: false, type: undefined });

  const handleAddChord = () => {
    if (!isValidChord(chord.trim())) {
      toast.error(
        "Invalid chord make sure it's in the format of A, Am, A7, A#m7, etc.",
        {
          duration: 5000,
        },
      );
      return;
    }
    if (state.type === "inline") {
      editor?.chain().focus().addChord({ "data-origin": chord }).run();
    } else {
      editor?.chain().focus().addBlockChord({ "data-origin": chord }).run();
    }
    setChord("");
    setState({ type: undefined, isOpen: false });
  };

  const openDialog = (type: "block" | "inline") => {
    setState({ isOpen: true, type });
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="mb-5 h-10 w-max rounded-lg">
        <div className="flex gap-x-5">
          <Button type="button" onClick={() => openDialog("block")}>
            <Plus className="mr-3 size-8" /> Block Chord
          </Button>
          <Button type="button" onClick={() => openDialog("inline")}>
            <Plus className="mr-3 size-8" /> Inline Chord
          </Button>
          <Button
            type="button"
            onClick={() => {
              editor.chain().focus().setHardBreak().run();
            }}
          >
            <Plus className="mr-3 size-8" /> Break
          </Button>
        </div>
        <Dialog
          open={state.isOpen}
          onOpenChange={(open) => {
            setState({ ...state, isOpen: open });
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-5">
                Add {state.type === "block" ? "Block" : "Inline"} Chord
              </DialogTitle>
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

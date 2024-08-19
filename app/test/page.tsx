"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { NonBreakingSpace } from "@/extensions/NonBreakingSpace";
import { BlockChord, InlineChord } from "@/extensions/Chord";
import { CHORD_REGEX } from "@/constants/chord-index";
import { Plus } from "lucide-react";

const isValidChord = (chord: string): boolean => {
  return CHORD_REGEX.test(chord);
};

const TestPage = () => {
  const editor = useEditor({
    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "outline-none border-2 border-gray-300 rounded-lg p-3 py-8 min-h-[300px]",
      },
      handlePaste(view, event) {
        event.preventDefault();
        const text = event.clipboardData?.getData("text/plain")!;
        const { state } = view;
        view.dispatch(state.tr.insertText(text));
        return true;
      },
    },
    extensions: [
      StarterKit.configure({
        italic: false,
        bold: false,
      }),
      InlineChord,
      NonBreakingSpace,
      BlockChord,
    ],
    onUpdate: ({ editor }) => {
      console.log({
        content: editor.getHTML(),
      });
    },
  });

  const [chord, setChord] = useState("");
  const [state, setState] = useState<{
    isOpen: boolean;
    type: "block" | "inline" | undefined;
  }>({ isOpen: false, type: undefined });

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
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-[400px]">
        <div className="mb-5 h-10 w-max rounded-lg">
          <div className="flex gap-x-5">
            <Button type="button" onClick={() => openDialog("block")}>
              <Plus className="mr-3 size-8" /> Block Chord
            </Button>
            <Button type="button" onClick={() => openDialog("inline")}>
              <Plus className="mr-3 size-8" /> Inline Chord
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
                  Add
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <EditorContent className={cn("w-full")} editor={editor} />
      </div>
    </div>
  );
};

export default TestPage;

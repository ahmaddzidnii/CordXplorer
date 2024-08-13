"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import PlaceHolder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { NonBreakingSpace } from "@/extensions/NonBreakingSpace";
import { Chord } from "@/extensions/Chord";
import { CHORD_REGEX } from "@/constants/chord-index";

const isValidChord = (chord: string): boolean => {
  return CHORD_REGEX.test(chord);
};

const TestPage = () => {
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "outline-none border-2 border-gray-300 rounded-lg p-3 min-h-[300px]",
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
      Chord,
      NonBreakingSpace,
      PlaceHolder.configure({
        placeholder: "Type lyrics and chord here...",
      }),
    ],
    onUpdate: ({ editor }) => {
      console.log({
        content: editor.getHTML(),
      });
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
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-[400px]">
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
        <EditorContent className={cn("w-full")} editor={editor} />
      </div>
    </div>
  );
};

export default TestPage;

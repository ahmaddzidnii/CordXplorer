import { Node } from "@tiptap/react";

export const NonBreakingSpace = Node.create({
  name: "hardSpace",

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  addKeyboardShortcuts() {
    return {
      Space: () => this.editor.commands.insertContent({ type: "text", text: "\u00A0" }),
    };
  },
});

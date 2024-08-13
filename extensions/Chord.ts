import { mergeAttributes, Node } from "@tiptap/react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    addChord: {
      addChord: (attributes: { chord: string }) => ReturnType;
    };
  }
}

export const Chord = Node.create({
  name: "chord",
  group: "inline",
  inline: true,
  atom: true,
  addAttributes() {
    return {
      class: {
        default: "c",
      },
      chord: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span.c",
        getAttrs: (dom) => ({
          chord: dom.getAttribute("data-chord"),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-origin": HTMLAttributes.chord,
      }),
      HTMLAttributes.chord,
    ];
  },

  addCommands() {
    return {
      addChord:
        (attributes) =>
        ({ state, commands }) => {
          const { from, to } = state.selection;
          return commands.insertContentAt(
            { from, to },
            `<span class="c" data-chord="${attributes.chord}">${attributes.chord}</span>`,
          );
        },
    };
  },
});

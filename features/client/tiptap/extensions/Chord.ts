import { mergeAttributes, Node } from "@tiptap/react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    addChord: {
      addChord: (attributes: { "data-origin": string }) => ReturnType;
    };
    addBlockChord: {
      addBlockChord: (attributes: { "data-origin": string }) => ReturnType;
    };
  }
}

export const InlineChord = Node.create({
  name: "inline-chord",
  group: "inline",
  inline: true,
  atom: true,
  addAttributes() {
    return {
      class: {
        default: "c",
      },
      "data-origin": {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span.c",
        getAttrs: (dom) => ({
          "data-origin": dom.getAttribute("data-chord"),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      HTMLAttributes["data-origin"],
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
            `<span class="c" data-chord="${attributes["data-origin"]}">${attributes["data-origin"]}</span>`,
          );
        },
    };
  },
});
export const BlockChord = Node.create({
  name: "block-chord",
  group: "inline",
  inline: true,
  atom: true,
  addAttributes() {
    return {
      "data-origin": {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span.chord-wrap",
        getAttrs: (dom) => {
          const innerSpan = dom.querySelector("span.c");
          return {
            "data-origin": innerSpan
              ? innerSpan.getAttribute("data-origin")
              : null,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      { class: "chord-wrap" },
      [
        "span",
        mergeAttributes(
          { class: "c" },
          { "data-origin": HTMLAttributes["data-origin"] },
        ),
        HTMLAttributes["data-origin"],
      ],
    ];
  },

  addCommands() {
    return {
      addBlockChord:
        (attributes) =>
        ({ state, commands }) => {
          const { from, to } = state.selection;
          return commands.insertContentAt(
            { from, to },
            `<span class="chord-wrap"><span class="c" data-origin="${attributes["data-origin"]}">${attributes["data-origin"]}</span></span>`,
          );
        },
    };
  },
});

// export const Chord = Node.create({
//   name: "chord",
//   group: "inline",
//   inline: true,
//   atom: true,
//   addAttributes() {
//     return {
//       class: {
//         default: "c",
//       },
//       chord: {
//         default: "",
//       },
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: "span.c",
//         getAttrs: (dom) => ({
//           chord: dom.getAttribute("data-chord"),
//         }),
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes }) {
//     return [
//       "span",
//       mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
//         "data-origin": HTMLAttributes.chord,
//       }),
//       HTMLAttributes.chord,
//     ];
//   },

//   addCommands() {
//     return {
//       addChord:
//         (attributes) =>
//         ({ state, commands }) => {
//           const { from, to } = state.selection;
//           return commands.insertContentAt(
//             { from, to },
//             `<span class="c" data-chord="${attributes.chord}">${attributes.chord}</span>`,
//           );
//         },
//     };
//   },
// });

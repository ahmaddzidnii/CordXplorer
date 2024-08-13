export const MAX_CHORDS_INDEX = 11;

export const CHORD_REGEX =
  /^([A-G][#b]?)([mM]?(?:7|9|11|13|sus[24]|add9|dim|aug)?[b#]?[0-9]*)(?:\/([A-G][#b]?))?$/;

export const chords: { [key: string]: number } = {
  C: 0,
  "B#": 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  F: 5,
  "E#": 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
  Cb: 11,
};

// Chords with preference for sharps
export const sharpChords: { [key: number]: string } = {
  0: "C",
  1: "C#",
  2: "D",
  3: "D#",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "G#",
  9: "A",
  10: "A#",
  11: "B",
};

// Chords with preference for flats
export const flatChords: { [key: number]: string } = {
  0: "C",
  1: "Db",
  2: "D",
  3: "Eb",
  4: "E",
  5: "F",
  6: "Gb",
  7: "G",
  8: "Ab",
  9: "A",
  10: "Bb",
  11: "B",
};

export function transpose(
  chord: string,
  step: number,
  enharmonicPreference: "sharp" | "flat",
): string {
  // Extract the chord name and modifier, including slash chords
  const chordParts = chord?.split("/");
  const mainChordMatch = chordParts[0].match(/^([A-G][#b]?)/);
  if (!mainChordMatch) {
    throw new Error("Invalid chord format");
  }
  const mainChord = mainChordMatch[0];
  const mainChordModifier = chordParts[0].slice(mainChord.length);
  const bassChordMatch = chordParts[1]
    ? chordParts[1].match(/([A-G][#b]?)/)
    : null;
  const bassChord = bassChordMatch ? bassChordMatch[0] : null;

  // Calculate the transposed index for main chord and bass chord if present
  const mainChordIndex = (chords[mainChord] + step + 12) % 12;
  const transposedMainChordName =
    enharmonicPreference === "sharp"
      ? sharpChords[mainChordIndex]
      : flatChords[mainChordIndex];

  let transposedChord = transposedMainChordName + mainChordModifier;

  if (bassChord) {
    const bassChordIndex = (chords[bassChord] + step + 12) % 12;
    const transposedBassChordName =
      enharmonicPreference === "sharp"
        ? sharpChords[bassChordIndex]
        : flatChords[bassChordIndex];
    transposedChord += "/" + transposedBassChordName;
  }

  // Return the transposed chord with its modifier and optional bass note
  return transposedChord;
}

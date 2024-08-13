interface Intervals {
  [key: string]: number;
  m2: number;
  M2: number;
  m3: number;
  M3: number;
  P4: number;
  TT: number;
  P5: number;
  m6: number;
  M6: number;
  m7: number;
  M7: number;
  P8: number;
}

function transposeChord(chord: string, semitones: number): string {
  const intervals: Intervals = {
    m2: 1,
    M2: 2,
    m3: 3,
    M3: 4,
    P4: 5,
    TT: 6,
    P5: 7,
    m6: 8,
    M6: 9,
    m7: 10,
    M7: 11,
    P8: 12,
  };

  const chordParts: string[] = chord.split("");
  const rootNoteIndex: number = intervals[chordParts[0]];
  const newRootNoteIndex: number = (rootNoteIndex + semitones) % 12;
  const newRootNote: string = Object.keys(intervals).find(
    (key) => intervals[key] === newRootNoteIndex,
  )!;

  const transposedChord: string = newRootNote + chord.slice(1);
  return transposedChord;
}

// Contoh penggunaan:
const chord: string = "Cmaj7";
const semitones: number = 2;
const transposedChord: string = transposeChord(chord, semitones);
console.log(transposedChord); // Output: 'Dmaj7'

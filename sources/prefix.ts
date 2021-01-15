import type { EmitFunction, Word } from "../includes/types";
import { normaliseSpelling } from "../includes/utils";

declare var emit: EmitFunction<string, string>;

function emitPrefixes(doc: Word) {
  if (doc?.type === "word") {
    const spelling = normaliseSpelling(doc.id);
    const length = spelling.length;
    if (length > 0) {
      for (let last = 1; last <= length; last++) {
        emit(spelling.substr(0, last));
      }
    }
  }
}

emitPrefixes;

import { documentTypes } from "./documents";
import { itemTypes } from "./items";
import { sectionTypes } from "./sections";
import { place, tone } from "./shared";

// El modelo está descrito en docs/cms-modelo.md y tipado en site/src/lib/types.ts:
// los nombres de tipo y de campo de estos esquemas son los mismos.
export const schemaTypes = [place, tone, ...itemTypes, ...sectionTypes, ...documentTypes];

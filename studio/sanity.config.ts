import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "REPLACE_WITH_PROJECT_ID";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

// «Ajustes» es un documento único: no se puede crear otro, duplicarlo ni borrarlo.
const singletons = new Set(["settings"]);

export default defineConfig({
  name: "ciudadycuerpo",
  title: "Ciudad y Cuerpo",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.listItem()
              .title("Ajustes")
              .id("settings")
              .child(S.document().schemaType("settings").documentId("settings").title("Ajustes")),
            S.divider(),
            S.listItem()
              .title("Páginas")
              .id("pages")
              .schemaType("page")
              .child(
                S.documentTypeList("page")
                  .title("Páginas")
                  // Inicio (sin slug) primero; el resto por dirección.
                  .defaultOrdering([{ field: "slug.current", direction: "asc" }]),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => prev.filter((t) => !singletons.has(t.schemaType)),
  },
  document: {
    actions: (prev, { schemaType }) =>
      singletons.has(schemaType)
        ? prev.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : prev,
    // Sin «Ajustes» en el botón global de «crear nuevo».
    newDocumentOptions: (prev) => prev.filter((t) => !singletons.has(t.templateId)),
  },
});

import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "1x40dsfz",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // https://ciudadycuerpo.sanity.studio
  studioHost: "ciudadycuerpo",
});

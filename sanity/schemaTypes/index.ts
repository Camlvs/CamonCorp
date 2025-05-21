import { type SchemaTypeDefinition } from "sanity";
import avis from "./avis";
import { chiffres } from "./chiffres";
import faq from "./faq";
import footer from "./footer";
import { header } from "./header";
import { mission } from "./mission";
import offre from "./offre";
import { valeurs } from "./valeurs";
import { yourProjects } from "./yourProjects";
import yourVideo from "./yourVideo";
import { youtubers } from "./youtubers";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    header,
    mission,
    youtubers,
    chiffres,
    yourProjects,
    valeurs,
    yourVideo,
    avis,
    offre,
    faq,
    footer,
  ],
};

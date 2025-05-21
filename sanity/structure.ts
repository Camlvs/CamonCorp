import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("header").title("Header"),
      S.documentTypeListItem("mission").title("Mission"),
      S.documentTypeListItem("youtubers").title("Youtubers"),
      S.documentTypeListItem("chiffres").title("Chiffres"),
      S.documentTypeListItem("yourProjects").title("Your Projects"),
      S.documentTypeListItem("valeurs").title("Valeurs"),
      S.documentTypeListItem("yourVideo").title("Votre vidéo"),
      S.documentTypeListItem("avis").title("Avis clients"),
      S.documentTypeListItem("offre").title("Offre"),
      S.documentTypeListItem("faq").title("Faq"),
      S.documentTypeListItem("footer").title("Footer"),
    ]);

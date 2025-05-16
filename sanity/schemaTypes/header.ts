import { defineType } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    {
      name: "bandeau",
      title: "Bandeau tout en haut",
      type: "string",
    },
    {
      name: "title",
      title: "Titre principal",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "subTitle",
      title: "Sous titre",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "button",
      title: "Texte du bouton",
      type: "string",
      initialValue: "Démarre ta prochaine vidéo avec nous",
    },
    // array of string
    {
      name: "subButton",
      title: "Textes sous le boutons",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
  ],
});

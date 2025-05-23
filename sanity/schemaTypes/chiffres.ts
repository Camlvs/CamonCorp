import { defineType } from "sanity";

export const chiffres = defineType({
  name: "chiffres",
  title: "Chiffres",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Nos Chiffres",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "statistics",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "textBefore",
              title: "Text avant",
              type: "string",
            },
            {
              name: "number",
              title: "Number",
              type: "string",
            },
            {
              name: "textAfter",
              title: "Text après",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
});

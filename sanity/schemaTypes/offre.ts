import { defineField, defineType } from "sanity";

export default defineType({
  name: "offre",
  title: "Offre",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "offers",
      title: "Offers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            }),
            defineField({
              name: "pricing",
              title: "Pricing",
              type: "string",
            }),
            defineField({
              name: "buttonText",
              title: "Button Text",
              type: "string",
            }),
            defineField({
              name: "titleOffre",
              title: "Offer Title",
              type: "string",
            }),
            defineField({
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),
  ],
});

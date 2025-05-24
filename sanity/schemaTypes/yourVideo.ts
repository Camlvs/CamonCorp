import { defineField, defineType } from "sanity";

export default defineType({
  name: "yourVideo",
  title: "Your Video",
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
      type: "text",
    }),
    defineField({
      name: "title1",
      title: "Titre première étape",
      type: "string",
    }),
    defineField({
      name: "etape1",
      title: "Textes première étape",
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
              name: "textColor",
              title: "Couleur du texte (#FFFFFF)",
              type: "string",
            }),
            defineField({
              name: "backgroundColor",
              title: "Couleur du background (#FFFFFF)",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "etape2",
      title: "Textes deuxième étape",
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
              name: "textColor",
              title: "Couleur du texte (#FFFFFF)",
              type: "string",
            }),
            defineField({
              name: "backgroundColor",
              title: "Couleur du background (#FFFFFF)",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "videos",
      title: "Videos",
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
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
          ],
        },
      ],
    }),
  ],
});

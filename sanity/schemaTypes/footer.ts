import { defineField, defineType } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "logo1",
      title: "First Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "logo2",
      title: "Second Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "contactText",
      title: "Contact Text",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
  ],
});

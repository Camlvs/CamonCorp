import { defineType } from "sanity";

export const clients = defineType({
  name: "clients",
  title: "Clients",
  type: "document",
  fields: [
    {
      name: "clientsList",
      title: "Clients List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Client Name",
              type: "string",
            },
            {
              name: "image",
              title: "Profile Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
  ],
});

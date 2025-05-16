import { defineType } from "sanity";

export const youtubers = defineType({
  name: "youtubers",
  title: "Youtubers",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Featured Youtubers",
    },
    {
      name: "subTitle",
      title: "Sous titre",
      type: "string",
    },
    {
      name: "youtubersList",
      title: "Youtubers List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Youtuber Name",
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
            {
              name: "videoTitle",
              title: "Video Title",
              type: "string",
            },
            {
              name: "videoUrl",
              title: "Video URL",
              type: "url",
            },
          ],
        },
      ],
    },
  ],
});

import { groq } from "next-sanity";

// Query schema datasets
export const headerQuery = groq`*[_type == "header"][0] {
	"video": video.asset->url,
  cta,
  bandeau,
  title[]{
    ...,
    children[]{
      ...
    }
  },
  subTitle[]{
    ...,
    children[]{
      ...
    }
  },
  button,
  subButton[]
}`;

export const missionQuery = groq`*[_type == "mission"][0] {
  title,
  subtitle,
  description,
  buttonText,
  socialLinks,
  image
}`;

export const youtubersQuery = groq`*[_type == "youtubers"][0] {
  title,
  subTitle,
  youtubersList[] {
    name,
    "image": image.asset->url,
    videoTitle,
    videoUrl
  }
}`;

export const chiffresQuery = groq`*[_type == "chiffres"][0] {
  title,
  subtitle,
  statistics[] {
    title,
    textBefore,
    number,
    textAfter
  }
}`;

export const yourProjectsQuery = groq`*[_type == "yourProjects"][0] {
  title,
  richText,
  buttonText,
  socialLinks,
  "image": image.asset->url,
  projects[] {
    "image": image.asset->url,
    title,
    description
  },
  statistics[] {
    title,
    number1,
    number2
  }
}`;

export const valeursQuery = groq`*[_type == "valeurs"][0] {
  title,
  subtitle,
  description,
  buttonText,
  values[] {
    "image": image.asset->url,
    title,
    description
  }
}`;

export const yourVideoQuery = groq`*[_type == "yourVideo"][0] {
  title,
  subtitle,
  description,
  videos[] {
    title,
    description,
    "image": image.asset->url
  }
}`;

export const avisQuery = groq`*[_type == "avis"][0] {
  "image": image.asset->url,
  title,
  subtitle,
  description,
  testimonials[] {
    "image": image.asset->url,
    title,
    description
  }
}`;

export const offreQuery = groq`*[_type == "offre"][0] {
  title,
  subtitle,
  description,
  offers[] {
    title,
    subtitle,
    pricing,
    buttonText,
    titleOffre,
    features
  }
}`;

export const faqQuery = groq`*[_type == "faq"][0] {
  title,
  questions[] {
    question,
    reponse
  }
}`;

export const footerQuery = groq`*[_type == "footer"][0] {
  "video": video.asset->url,
  "logo1": logo1.asset->url,
  "logo2": logo2.asset->url,
  contactText,
  email
}`;

export interface Header {
  cta: string;
  bandeau: PortableTextBlock[];
  title: PortableTextBlock[];
  subTitle: PortableTextBlock[];
  button: string;
  subButton: string[];
}

export interface Mission {
  title: string;
  subtitle: string;
  description: PortableTextBlock[];
  buttonText: string;
  socialLinks: Array<{
    platform: string;
    title: string;
    url: string;
  }>;
  image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}

export interface PortableTextBlock {
  _key: string;
  _type: string;
  children: Array<{
    _key: string;
    _type: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
  }>;
  style?: string;
}

export interface Youtuber {
  name: string;
  image: string;
  videoTitle: string;
  videoUrl: string;
}

export interface Youtubers {
  title: string;
  subTitle: string;
  youtubersList: Youtuber[];
}

export interface Statistic {
  title: string;
  number: string;
}

export interface Chiffres {
  title: string;
  subtitle: string;
  statistics: Statistic[];
}

export interface Project {
  image: string;
  title: string;
  description: string;
}

export interface ProjectStatistic {
  title: string;
  number1: string;
  number2: string;
}

export interface YourProjects {
  title: string;
  richText: PortableTextBlock[];
  buttonText: string;
  socialLinks: Array<{
    platform: string;
    title: string;
    url: string;
  }>;
  image: string;
  projects: Project[];
  statistics: ProjectStatistic[];
}

export interface Value {
  image: string;
  title: string;
  description: string;
}

export interface Valeurs {
  title: string;
  subtitle: string;
  description: PortableTextBlock[];
  buttonText: string;
  values: Value[];
}

export type YourVideo = {
  title: string;
  subtitle: string;
  description: string;
  videos: {
    title: string;
    description: string;
    image: string;
  }[];
};

export type Avis = {
  image: string;
  title: string;
  subtitle: string;
  description: PortableTextBlock[];
  testimonials: {
    image: string;
    title: string;
    description: string;
  }[];
};

export type Offre = {
  title: string;
  subtitle: string;
  description: PortableTextBlock[];
  offers: {
    title: string;
    subtitle: string;
    pricing: string;
    buttonText: string;
    titleOffre: string;
    features: string[];
  }[];
};

export type FAQ = {
  title: string;
  questions: {
    question: string;
    reponse: PortableTextBlock[];
  }[];
};

export type Footer = {
  video: string;
  logo1: string;
  logo2: string;
  contactText: string;
  email: string;
};

import { groq } from "next-sanity";

// Query schema datasets
export const firstQuery = groq`*[_type == "home"][0] {
	blockHtml,
	ctaAllPagesButton,
  navigation {
    "logo": logo.asset->url,
    name,
    menuItems[] {
      label,
    },
    ctaButton {
      text,
    }
  },
  heroSection {
    topButton,
    titlePart1,
    titlePart2,
    titlePart3,
    video{
    asset->{_id, url}
  	},
    description,
    description2,
    ctaButton,
    statsText,
    "statsImage": statsImage.asset->url
  },
  brands[] {
  	"image": image.asset->url
	},
  presentationSection {
    topButton,
    name1,
    name2,
    description,
    ctaButton,
    "image": image.asset->url,
    nbOfPeople[] {
			title,
			number,
			description
		}
  },
  forWhoSection {
    topButton,
    title1,
    title2,
    description,
    cards[] {
      title,
      description
    },
		ctaButton,
	 	"image": image.asset->url
  },
  resultsSection {
    topButton,
    title,
    description,
    cards[] {
      "icon": icon.asset->url,
      title,
      description
    },
    ctaButton
  },
  resultsSection2 {
    topButton,
    title,
    description,
    cards[] {
      "icon": icon.asset->url,
      title,
      description
    },
    ctaButton
  },
  priceSection {
    topButton,
    title1,
    title2,
    subtitle,
    hero[] {
      "image": image.asset->url,
    	name,
    },
    card {
      "image": image.asset->url,
      title,
      price,
      advantagesTitle,
      advantages,
      ctaButton
    }
  },
  faqSection {
    title1,
    title2,
    questions[] {
      question,
      answer
    }
  },
  ctaFooter {
    topButton,
    title,
    description,
    ctaButton,
    footer {
      "profileImage": profileImage.asset->url,
      name,
      linkedinUrl,
      credits,
      creditsUrl
    }
  },
  actionPlanSection {
    topButton,
    title1,
    title2,
    description,
    steps[] {
      "image": image.asset->url,
      number,
      title,
      bulletPoints
    },
    ctaButton
  },
  testimonialsSection {
    topButton,
    title1,
    title2,
    videos[] {
      video{
        asset->{_id, url}
      },
      name,
      job
    },
    ctaButton
  }
}`;

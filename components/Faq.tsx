import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/magicui/accordion";
import { PortableText } from "next-sanity";
import { PortableTextBlock } from "sanity";

interface FaqProps {
  questions: {
    question: string;
    reponse: PortableTextBlock[];
  }[];
}

export function Faq({ questions }: FaqProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full m-auto text-[#D6D6D6] mt-[35px]"
    >
      {questions.map((q, index) => (
        <AccordionItem value={`item-${index + 1}`} key={index}>
          <AccordionTrigger>{q.question}</AccordionTrigger>
          <AccordionContent>
            <PortableText value={q.reponse} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

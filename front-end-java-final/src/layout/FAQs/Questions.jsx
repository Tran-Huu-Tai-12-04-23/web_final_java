import React from "react";
import TableOfContent from "./TableOfContent";
function Question({ question, answer }) {
  return (
    <div className="w-[808px] h-[222px] px-4 py-6 border-b border-zinc-400 flex-col justify-start items-start gap-8 inline-flex">
      <div className="justify-between items-center inline-flex">
        <div className="grow shrink basis-0 text-rose-400 text-2xl font-medium font-['Inter']">
          {question}
        </div>
        <div className="w-6 h-6 justify-center items-center flex">
          <div className="w-6 h-6 relative"></div>
        </div>
      </div>
      <div className="self-stretch text-black text-xl font-light font-['Inter'] leading-7">
        {answer}
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <>
    <div className="flex justify-center">
        <TableOfContent></TableOfContent>
        <div className="flex flex-col">
        <Question
            question="Can I purchase products from Get Tech using installment payments?"
            answer="Yes, Tech Heim offers the option to purchase products using both cash and installment payments. This allows you to choose the payment method that suits your needs and budget."
        />
        <Question
            question="How can I engage with the magazine content on Get Tech?"
            answer="You can actively engage with the magazine content by leaving comments and participating in the question-and-answer section. Feel free to share your thoughts, ask questions, and interact with fellow tech enthusiasts in the community."
        />

        <Question
            question="Does Get Tech offer a warranty on its products?"
            answer="Yes, Tech Heim provides a warranty on all eligible products. The specific warranty details may vary depending on the manufacturer and product category. Please refer to the product description or contact our customer support for more information."
        />

        <Question
            question="Is Get Tech a secure platform for online shopping?"
            answer="Yes, Tech Heim provides a warranty on all eligible products. The specific warranty details may vary depending on the manufacturer and product category. Please refer to the product description or contact our customer support for more information."
        />

        <Question
            question="How can I get assistance with my purchase or any other inquiries?"
            answer="If you need assistance with your purchase or have any questions, our dedicated customer support team is here to help. You can reach out to us through the contact page on our website, and we'll be happy to assist you promptly."
        />
        </div>
    </div>
    </>
  );
}

export default FAQ;

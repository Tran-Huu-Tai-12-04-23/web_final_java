import React, { useState } from "react";
import { TextMain } from "../../components";
import { TextReveal } from "../../components/Animate";

function TableOfContent({ onCategorySelect }) {
  return (
    <div className="mt-5 w-[184px] h-[180px] flex-col justify-start items-start gap-6 inline-flex ml-20">
      <TextMain className={'text-neutral-950 font-bold text-xl'}>Table of Contents</TextMain>
      <div className="self-stretch h-[132px] flex-col justify-start items-start gap-3 flex">
        <NavItem onClick={() => onCategorySelect("general")}>General</NavItem>
        <NavItem onClick={() => onCategorySelect("trusts-safety")}>Trusts & Safety</NavItem>
        <NavItem onClick={() => onCategorySelect("services")}>Services</NavItem>
        <NavItem onClick={() => onCategorySelect("billing")}>Billing</NavItem>
      </div>
    </div>
  );
}

function NavItem({ onClick, children }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer text-base font-light font-['Inter'] leading-normal hover:text-primary"
    >
      {children}
    </div>
  );
}

function Question({ questionsAndAnswers }) {
  return (
    <div className="w-[808px] px-4 flex-col justify-start items-start gap-4 inline-flex">
      {questionsAndAnswers.map((qa, index) => (
        <div key={index}>
            <TextMain className={"font-bold text-xl justify-between items-center inline-flex text-primary py-6"}>
              {<TextReveal text={qa.question}></TextReveal>}
            </TextMain>
            <TextMain className={"text-black"}>
              {qa.answer}
            </TextMain>
            <div className="border-b border-zinc-400 py-2">
            </div>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const categoryData = {
    "general": [
      {
        question: "Can I purchase products from Get Tech using installment payments?",
        answer: "Yes, Tech Heim offers the option to purchase products using both cash and installment payments. This allows you to choose the payment method that suits your needs and budget."
      },
      {
        question: "Is there a return policy for products?",
        answer: "Yes, we have a flexible return policy. If you are not satisfied with your purchase, you can return it within 30 days for a refund or exchange."
      },
      {
        question: "How can I engage with the magazine content on Get Tech ?",
        answer: "You can actively engage with the magazine content by leaving comments and participating in the question-and-answer section. Feel free to share your thoughts, ask questions, and interact with fellow tech enthusiasts in the community."
      },
      {
        question: "Does Get Tech offer a warranty on its products?",
        answer: "Yes, Tech Heim provides a warranty on all eligible products. The specific warranty details may vary depending on the manufacturer and product category. Please refer to the product description or contact our customer support for more information."
      },
      {
        question: "How can I get assistance with my purchase or any other inquiries?",
        answer: "If you need assistance with your purchase or have any questions, our dedicated customer support team is here to help. You can reach out to us through the contact page on our website, and we'll be happy to assist you promptly."
      },
    ],
    "trusts-safety": [
      {
        question: "What measures are in place to prevent fraud and scams?",
        answer: "We have a dedicated team monitoring transactions for suspicious activity and employ fraud detection tools to protect our users. In case of any issues, we have a dispute resolution process in place."
      },
      {
        question: "How do we verify the authenticity of products sold on our platform?",
        answer: "We work closely with verified sellers and employ stringent quality control measures to ensure that products listed on our platform are genuine and meet our quality standards."
      },
      {
        question: "Can I report a safety concern or inappropriate content?",
        answer: "Yes, we have a reporting system in place. If you come across unsafe or inappropriate content, please report it to our support team, and we will take appropriate action."
      },
      {
        question: "How do we handle user data and privacy?",
        answer: "We follow strict privacy policies and comply with data protection regulations. Your data is stored securely, and we do not share it with third parties without your consent."
      },
      {
        question: "Is it safe to make transactions with other users on our platform?",
        answer: "We provide secure payment options, and we recommend using them for all transactions. If you encounter any issues, our support team is here to assist you."
      },
    ],
    "services": [
      {
        question: "What is the typical turnaround time for product repair services?",
        answer: "The turnaround time for product repair depends on the type of repair and availability of parts. Our service team will provide you with an estimated timeframe."
      },
      {
        question: "Do you offer on-site service or should I send my product for repair?",
        answer: "We offer both on-site and in-store repair services, depending on your location and the type of repair required."
      },
      {
        question: "Can I customize a product to my specifications?",
        answer: "Yes, we offer product customization services. Contact our customization team to discuss your requirements and options."
      },
      {
        question: "Are there warranties on services provided?",
        answer: "We offer warranties on our services. The warranty period varies based on the type of service, and details can be found in the service agreement."
      },
      {
        question: "How can I track the status of my service request?",
        answer: " You can track the status of your service request by logging into your account on our platform or by contacting our customer support team."
      },
    ],
    "billing": [
      {
        question: "Can I set up recurring payments for my subscription?",
        answer: "Yes, we offer the option to set up recurring payments for subscriptions, making it convenient for you to manage your bills."
      },
      {
        question: "What happens if there is an issue with my billing statement?",
        answer: "If you have questions or concerns about your billing statement, please contact our billing department, and we'll assist you in resolving any discrepancies."
      },
      {
        question: "Do you offer discounts or promotions for certain payment methods?",
        answer: "Yes, we may offer discounts or promotions for specific payment methods. Check our promotions page or contact our support team for details."
      },
      {
        question: "Is there a late fee for overdue payments?",
        answer: " We have a grace period for payments, but if a payment becomes overdue, a late fee may be applied. Please ensure your payments are made on time."
      },
      {
        question: "Can I view and download my billing history and receipts?",
        answer: "Yes, you can access your billing history and download receipts through your account on our platform. It's easy to keep track of your financial transactions."
      },
    ]
  };

  const questionsAndAnswers = categoryData[selectedCategory] || [];
  return (
    <>
      <div className="flex justify-center">
        <TableOfContent onCategorySelect={setSelectedCategory} />
        <div className="flex flex-col">
          <Question questionsAndAnswers={questionsAndAnswers} />
        </div>
      </div>
    </>
  );
}

export default FAQ;

import { TextMain } from "../../components";

function ListItem({ text }) {
    return (
      <li className="text-neutral-950 text-md font-light leading-7 mb-2">
        {text}
      </li>
    );
  }
function PageDescription(){
    const impressiveFeatures = [
        'Diverse digital gadgets for purchase in cash or installments',
        'A blog with reviews and articles about the latest technology and gadgets',
        'User comments and Q&A section for community interaction',
        'Represents a tech-savvy "home" with all necessary technology',
        'Easy-to-use interface for a great user experience',
        'Consistent and visually appealing design',
        'A hub for tech enthusiasts to connect and share insights',
        'Helps users make informed purchase decisions',
      ];
    
      return (
        <div className="mt-10 max-w-screen-xl mx-auto px-4 text-justify">
            Get Tech is an innovative online store that offers a diverse selection of digital gadgets, available for purchase in both cash and installment options. Embodying the motto "Join the digital revolution today," the website not only provides a seamless shopping experience but also features a captivating blog section filled with insightful reviews, articles, and videos about cutting-edge technology and digital gadgets. Users can actively engage with the content through comments and a question-answer section, fostering a dynamic community of tech enthusiasts.
          <TextMain className="text-neutral-950 font-light leading-7 mb-6"></TextMain>
          <div className="text-neutral-950 text-xl font-medium mb-4">
            Some of Get Tech’s impressive features:
          </div>
    
          <ul className="list-disc pl-6">
            {impressiveFeatures.map((feature, index) => (
              <ListItem key={index} text={feature} />
            ))}
          </ul>
        </div>
      );
}
export default PageDescription;
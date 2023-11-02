import faqImage from '../../assets/img/faqs.webp';
function FAQsImage(){
    return(
        <div>
            <img
                src={faqImage}
                alt="Contact"
                className="object-contain mx-auto"
            />
        </div>
    )
}
export default FAQsImage;
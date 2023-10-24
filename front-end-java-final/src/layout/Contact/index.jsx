import BriefInfor from "./BriefInfor";
import ContactImage from "./ContactImage";
import MessageUs from "./MessageUs";
import PageDescription from "./PageDescription";
function Contact(){
    return (
        <>
            <BriefInfor></BriefInfor>
            <MessageUs></MessageUs>
            <ContactImage></ContactImage>
            <PageDescription></PageDescription>
        </>
    );
}
export default Contact;
import { DisplayHTMLContent } from '../../../components';
function Description({ data }) {
    return (
        <div className="p-4 bg-light-tiny dark:bg-dark-tiny rounded-md mt-4">
            <DisplayHTMLContent htmlContent={data}></DisplayHTMLContent>
        </div>
    );
}

export default Description;

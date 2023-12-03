import React from 'react';
import 'react-quill/dist/quill.snow.css';

function DisplayHTMLContent(props) {
    const createMarkup = (htmlContent) => ({ __html: htmlContent });

    return <div dangerouslySetInnerHTML={createMarkup(props.htmlContent)} />;
}

export default DisplayHTMLContent;

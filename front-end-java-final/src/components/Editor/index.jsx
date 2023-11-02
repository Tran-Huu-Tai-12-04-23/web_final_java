import React, { useEffect, useRef } from 'react';
import ReactQuill, { Quill, editor } from 'react-quill';
// import ImageResize  from 'quill-image-resize-module';
import 'react-quill/dist/quill.snow.css';

import CustomToolbar from './CustomToolbar';
import './style.css';

// Quill.register('modules/ImageResize',ImageResize);
const Editor = ({ value, onChange = (value) => console.log(value) }) => {
    const handleChange = (html) => {
        onChange(html);
    };
    const modules = {
        toolbar: {
            container: '#toolbar',
        },
    };
    const formats = [
        'undo',
        'redo',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'color',
        'background',
        'script',
        'header',
        'blockquote',
        'code-block',
        'indent',
        'list',
        'direction',
        'align',
        'link',
        'image',
        'video',
        'formula',
    ];

    return (
        <>
            <CustomToolbar />
            <ReactQuill value={value} onChange={handleChange} modules={modules} formats={formats} />
        </>
    );
};

export default Editor;

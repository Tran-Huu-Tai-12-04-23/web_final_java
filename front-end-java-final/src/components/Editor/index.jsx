import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor({ onChange, value }) {
    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                config={{
                    ckfinder: {
                        uploadUrl: 'https://api.imgbb.com/1/upload?expiration=600&key=5d5efefbe072ed037f95dc62c9143141', // Đặt URL của bạn ở đây
                    },
                }}
                onReady={(editor) => {
                    // Bạn có thể truy cập instance CKEditor ở đây nếu cần
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
            />
        </div>
    );
}

export default Editor;

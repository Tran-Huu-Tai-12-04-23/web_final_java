import { useEffect, useState } from 'react';
import screenfull from 'screenfull';
import { AnimateHover } from '../../components/Animate';

import { AiOutlineFullscreenExit, AiOutlineExpand } from 'react-icons/ai';

function FullScreen() {
    const [expand, setExpand] = useState(false);
    useEffect(() => {
        const handleFullScreenChange = () => {
            if (screenfull.isEnabled) {
                if (screenfull.isFullscreen) {
                    setExpand(true);
                    console.log('Entered full screen');
                } else {
                    setExpand(false);
                    console.log('Exited full screen');
                }
            }
        };

        if (screenfull.isEnabled) {
            screenfull.on('change', handleFullScreenChange);
        }

        return () => {
            if (screenfull.isEnabled) {
                screenfull.off('change', handleFullScreenChange);
            }
        };
    }, []);

    const toggleFullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    };
    return (
        <AnimateHover className={'cursor-pointer  text-primary'}>
            {!expand && <AiOutlineExpand onClick={toggleFullScreen} className="w-6 h-6 "></AiOutlineExpand>}
            {expand && (
                <AiOutlineFullscreenExit onClick={toggleFullScreen} className="w-6 h-6 "></AiOutlineFullscreenExit>
            )}
        </AnimateHover>
    );
}

export default FullScreen;

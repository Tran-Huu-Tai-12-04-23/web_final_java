import { Modal } from "../../components";
import {motion} from "framer-motion";
import { AnimateHover } from "../../components/Animate";
import { AiOutlineClose } from 'react-icons/ai';
function ModalName({onclose =() => {}}){
    const [y, setY] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [active, setActive] = useState(0);

    const handleClose = async () => {
        setY(-100);
        setOpacity(0);
        const waitClose = async () => {
            setTimeout(() => {
                onClose();
            }, 400);
        };
        await waitClose();
    };
    return(
        <Modal>
            <motion.div
                initial={{
                    y: -100,
                    opacity: 0,
                }}
                animate={{
                    y: y,
                    opacity: opacity,
                }}
                exit={{
                    y: 100,
                    opacity: 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                }}
                className="relative overflow-hidden p-10 min-h-[35rem] shadow-xl h-4/5 max-h-[36rem]  min-w-[20rem] w-4/5 max-w-[30rem] bg-white dark:bg-dark  rounded-xl flex flex-col "
            >
                <AnimateHover
                    onClick={handleClose}
                    className="absolute top-4 right-4 cursor-pointer hover:text-primary"
                ></AnimateHover>
                <AiOutlineClose className="h-6 w-6"></AiOutlineClose>
                <Tabs
                    tabs={tabs}
                    style="center"
                    classItem="w-1/2"
                    active={active}
                    setActive={(value) => setActive(value)}
                ></Tabs>
            </motion.div>
        </Modal>
    );
}
export default ModalName;
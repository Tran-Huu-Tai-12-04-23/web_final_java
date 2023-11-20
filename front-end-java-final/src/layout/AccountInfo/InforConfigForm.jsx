import { motion } from "framer-motion";
import { MdDriveFileRenameOutline } from "react-icons/md";
import {Button, Input, TextMain } from "../../components";
function InforConfigForm({inforType}){
    return(
        <motion.div>
            {/* initial={{
                opacity: 0,
                y: 100,
                animate={{
            }}
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
            }}
            className="pt-10 w-full" */}
            <TextMain className={'font-bold text-center text-xl mb-5'}>{inforType}</TextMain>
            <Input
                placeholder="First name"
                className="mb-3"
                iconLeft={<MdDriveFileRenameOutline className="w-6 h-6 ml-2 text-gray-400"></MdDriveFileRenameOutline>}
            ></Input>
            <div className="flex justify-end">
                <Button className="w-1/3 ml-auto rounded-lg p-3 text-center mt-5 bg-primary text-white">Save</Button>
            </div>
        </motion.div>
    );
}
export default InforConfigForm;
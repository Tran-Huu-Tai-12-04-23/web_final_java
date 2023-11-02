import { Button, TextMain } from '../../../components';
import { AnimateOpacity } from '../../../components/Animate';

import { MdKeyboardArrowDown } from 'react-icons/md';

function Description() {
    const description = [
        {
            value: '13.3-inch (diagonal) LED-backlit display with IPS technology',
            name: 'display',
        },
        {
            value: 'Apple 10-core CPU',
            name: 'graphics',
        },
        {
            value: 'Apple m2 chip',
            name: 'processor ',
        },
        {
            value: '67W USB-C Power Adapter, USB-C charge Cable (2m)',
            name: 'in the box',
        },
        {
            value: '0.61 inch(1.56cm)',
            name: 'height',
        },
        {
            value: '11.97 inches(30.41 cm)',
            name: 'width',
        },
    ];
    return (
        <AnimateOpacity className="p-4 rounded-md">
            <TextMain className={'border-b-primary pb-3'}>Technical details</TextMain>

            <div className="flex flex-col mt-3">
                {description.map((des, index) => {
                    return (
                        <div
                            className={`${
                                index % 2 === 0 ? 'bg-light-tiny dark:bg-dark-tiny' : 'bg-transparent'
                            } p-2 flex rounded-md  justify-between items-center`}
                            key={index}
                        >
                            <span>{des.name.charAt(0).toUpperCase() + des.name.slice(1)}</span>
                            <span>{des.value}</span>
                        </div>
                    );
                })}
                <div className="w-full mt-4">
                    <Button className="float-left group  brightness-50 hover:text-primary hover:brightness-100 cursor-pointer flex justify-center items-center">
                        <MdKeyboardArrowDown className="w-6 h-6"></MdKeyboardArrowDown>
                        <span>More</span>
                    </Button>
                </div>
            </div>
        </AnimateOpacity>
    );
}

export default Description;

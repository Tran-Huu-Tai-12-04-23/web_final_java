import React, { useState } from 'react';
import { MdOutlineAccountCircle } from "react-icons/md";
function CurrentUser({ initialName }) {
  const [name, setName] = useState(initialName);

  const handleNameChange = (newName) => {
    setName(newName);
  };

  return (
    <div className='mt-10'>
      <div className="w-[284px] h-16 px-2 justify-center items-center gap-4 inline-flex">
        <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
        <div className="relative flex items-center justify-center">
            <MdOutlineAccountCircle size={40}/>
        </div>
        </div>
        <div className="justify-start items-center flex">
          <div className="text-neutral-950">
            <input
              type="text"
              value={initialName}
              onChange={(e) => handleNameChange(e.target.value)}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentUser;

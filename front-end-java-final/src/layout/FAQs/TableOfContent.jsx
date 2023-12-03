import React from "react";
import { TextMain } from "../../components";

function TableOfContent() {
  return (
    <div className="mt-5 w-[184px] h-[180px] flex-col justify-start items-start gap-6 inline-flex ml-20">
      <TextMain className={'text-neutral-950 font-bold text-xl'}>Mục lục</TextMain>
      <div className="self-stretch h-[132px] flex-col justify-start items-start gap-3 flex">
        <NavItem href="#general">Chung</NavItem>
        <NavItem href="#trusts-safety">Chính sách mua hàng</NavItem>
        <NavItem href="#services">Dịch vụ</NavItem>
        <NavItem href="#billing">Thanh toán</NavItem>
      </div>
    </div>
  );
}

function NavItem({ href, children }) {
  return (
    <a
      href={href}
      className="text-base font-light font-['Inter'] leading-normal hover:text-primary"
    >
      {children}
    </a>
  );
}

export default TableOfContent;

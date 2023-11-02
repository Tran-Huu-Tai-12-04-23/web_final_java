import React from "react";

function TableOfContent() {
  return (
    <div className="mt-6 w-[184px] h-[180px] flex-col justify-start items-start gap-6 inline-flex ml-20">
      <div className="self-stretch text-neutral-950 text-xl font-bold font-['Inter']">
        Table of Contents
      </div>
      <div className="self-stretch h-[132px] flex-col justify-start items-start gap-3 flex">
        <NavItem href="#general">General</NavItem>
        <NavItem href="#trusts-safety">Trusts & Safety</NavItem>
        <NavItem href="#services">Services</NavItem>
        <NavItem href="#billing">Billing</NavItem>
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

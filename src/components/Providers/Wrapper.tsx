import React, { ReactNode } from "react";

type WrapperType = {
  children: ReactNode;
};

const WrapperComponent = ({ children }: WrapperType) => {
  return (
    <>
      <div className="  w-11/12 sm:w-10/12 mx-auto">{children}</div>
    </>
  );
};

export default WrapperComponent;

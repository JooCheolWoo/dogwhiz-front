import React, { ReactElement, useEffect, useState } from "react";
import ReactDom, { createPortal } from "react-dom";
import { Component } from "react-image-crop";

const Portal = ({ children }: { children: ReactElement }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === "undefined") return <></>;

  return mounted ? createPortal(children, document.getElementById("modal-root") as HTMLElement) : <></>;
};

export default Portal;
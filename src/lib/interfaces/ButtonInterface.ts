import { ReactNode } from "react";

interface ButtonProps {
  title?: string;
  cx?:string;
  icon?:ReactNode;
  href?:string;
  onClick?:()=>void;
  outline?:boolean
}

export default ButtonProps;

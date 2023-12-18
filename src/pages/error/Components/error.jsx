import React from "react";
import BubbleBusterGame from "./bubbleBusterGam";
import { ReactComponent as ErrorSvg1 } from "../../../assets/error1.svg";
import { ReactComponent as ErrorSvg2 } from "../../../assets/error2.svg";
import { ReactComponent as ErrorSvg3 } from "../../../assets/error3.svg";
import { ReactComponent as ErrorSvg4 } from "../../../assets/error4.svg";

const errorSvgs = [ErrorSvg1, ErrorSvg2, ErrorSvg3, ErrorSvg4];

const getRandomErrorSvg = () => {
  const randomIndex = Math.floor(Math.random() * errorSvgs.length);
  return errorSvgs[randomIndex];
};

export default function ErrorComponent() {
  const RandomErrorSvg = getRandomErrorSvg();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <RandomErrorSvg className="w-max h-max" />
        <p className="text-lg text-center mb-8">
          Lost in the ticket maze? Don't panic! Take a deep breath, and
          remember, tickets have their own sense of direction. It's a ticket
          thing!
        </p>
        <p className="text-lg text-center mb-8">
          Here's a game to help you relax a bit. Enjoy and chill!
        </p>
      </div>
      <BubbleBusterGame />
    </>
  );
}

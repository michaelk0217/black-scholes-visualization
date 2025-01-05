import { Linkedin, Github, TrendingUpDown } from "lucide-react";
import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";
export default function Header() {
  return (
    <>
      <div className="p-4 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-2">
            Black-Scholes Visualizer
          </h3>
          <TrendingUpDown />
        </div>
        <div className="flex flex-row gap-4 justify-around items-center mr-2">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Built by Michael Kim
          </h4>
          <Link
            href="https://www.linkedin.com/in/michaeltk217/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Linkedin />
          </Link>
          <Link
            href="https://github.com/michaelk0217/black-scholes-visualization"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github />
          </Link>
          <ThemeToggler />
        </div>
      </div>
      <div className="shrink-0 bg-border h-[1px] w-full"></div>
    </>
  );
}

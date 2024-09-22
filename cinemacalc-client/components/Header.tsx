import { proximaSoft } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Github from "@/public/github.svg";
import Logo from "@/public/logo-small.svg";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur-sm bg-background/50">
      <div className="flex items-center justify-between p-4 mx-auto">
        <a href="/" className="flex flex-row justify-center items-center gap-3">
          <Logo className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          <h1
            className={cn(
              proximaSoft.className,
              "hidden sm:block text-md sm:text-l md:text-xl lg:text-2xl font-black"
            )}
          >
            Cinema Calc Challenge
          </h1>
        </a>
        <a
          href="https://github.com/diabahmed/cinemacalc-challenge"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            className="bg-transparent hover:bg-[#E2ECF9] hover:text-accent-foreground"
            size={"icon"}
          >
            <Github className="text-accent-foreground w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </Button>
        </a>
      </div>
    </header>
  );
}

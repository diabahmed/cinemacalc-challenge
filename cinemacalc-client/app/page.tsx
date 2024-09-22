import CinemaCalc from "@/components/CinemaCalc";
import { Header } from "@/components/Header";
import DotPattern from "@/components/magicui/dot-pattern";

export default function Home() {
  return (
    <main className="relative mx-auto">
      <Header />
      <div className="container p-4 min-h-[calc(100vh-5rem)] flex flex-col justify-start items-center">
        <CinemaCalc />
      </div>
      <DotPattern className="-z-50 opacity-30 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]" />
    </main>
  );
}

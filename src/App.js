import Puzzle from "./components/Puzzle";
import Timer from "./components/Timer";

export default function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#121212] font-gabarito">
      <Timer />
      <Puzzle />
    </div>
  );
}

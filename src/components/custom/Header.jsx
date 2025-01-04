export default function Header() {
  return (
    <>
      <div className="p-4 flex flex-row justify-between items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-2">
          Black-Scholes Visualizer
        </h3>
        <div className="flex flex-row gap-4 justify-around items-center mr-2">
          <div>Linkedin</div>
          <div>Github</div>
        </div>
      </div>
      <div className="shrink-0 bg-border h-[1px] w-full"></div>
    </>
  );
}

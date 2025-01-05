import InputLabelSlider from "@/components/custom/InputLabelSlider";

export default function OptionInputs({
  spot,
  setSpot,
  strike,
  setStrike,
  time,
  setTime,
  rate,
  setRate,
  vol,
  setVol,
  minSpot,
  setMinSpot,
  maxSpot,
  setMaxSpot,
  minVol,
  setMinVol,
  maxVol,
  setMaxVol,
}) {
  return (
    <div className="flex flex-col justify-center gap-6 w-1/6 min-w-72 p-6">
      <InputLabelSlider
        label="Spot Price (S)"
        value={spot}
        max={1000}
        min={0}
        step={0.01}
        onChange={setSpot}
      />
      <InputLabelSlider
        label="Strike Price (K)"
        value={strike}
        max={1000}
        min={0}
        step={0.01}
        onChange={setStrike}
      />
      <InputLabelSlider
        label="Time (T, years)"
        value={time}
        max={10}
        min={0}
        onChange={setTime}
      />
      <InputLabelSlider
        label="Rate"
        desc="(r, annualized)"
        value={rate}
        max={0.1}
        min={0}
        step={0.001}
        onChange={setRate}
      />
      <InputLabelSlider
        label="Volatility"
        desc="(σ, annualized)"
        value={vol}
        max={0.5}
        min={0}
        step={0.001}
        onChange={setVol}
      />
      <div className="shrink-0 bg-border h-[1px] w-full"></div>

      <InputLabelSlider
        label="Min Spot Price"
        value={minSpot}
        max={maxSpot - 0.01}
        min={0}
        step={0.01}
        onChange={setMinSpot}
      />
      <InputLabelSlider
        label="Max Spot Price"
        value={maxSpot}
        max={1000}
        min={minSpot}
        step={0.01}
        onChange={setMaxSpot}
      />
      <InputLabelSlider
        label="Min Volatility"
        value={minVol}
        max={maxVol - 0.001}
        min={0}
        step={0.001}
        onChange={setMinVol}
      />
      <InputLabelSlider
        label="Max Volatility"
        value={maxVol}
        max={0.5}
        min={minVol}
        step={0.001}
        onChange={setMaxVol}
      />
    </div>
  );
}

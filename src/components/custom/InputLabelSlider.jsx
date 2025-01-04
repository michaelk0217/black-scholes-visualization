import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export default function InputLabelSlider({
  label,
  desc,
  value,
  max,
  min,
  step,
  onChange,
}) {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    const newValue = parseFloat(e.target.value);

    if (isNaN(newValue)) {
      // If the input is not a valid number, don't update the state
      return;
    }
    if (newValue < min) {
      setInputValue(min);
    } else if (newValue > max) {
      setInputValue(max);
    } else {
      setInputValue(newValue);
    }
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <Label>{label}</Label>
          {desc && <Label>{desc}</Label>}
        </div>
        <Input
          className="w-24"
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          step={step}
        />
      </div>
      <Slider
        value={[inputValue]}
        onValueChange={([value]) => {
          setInputValue(value);
          onChange(value);
        }}
        max={max}
        min={min}
        step={step}
      />
    </div>
  );
}

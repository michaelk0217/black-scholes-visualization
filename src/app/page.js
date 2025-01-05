"use client";

import { useState, useEffect, useMemo } from "react";

import Header from "@/components/custom/Header";
import PriceCard from "@/components/custom/PriceCard";
import OptionInputs from "@/components/custom/OptionInputs";
import Heatmap from "@/components/custom/Heatmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  blackScholesCallPriceHP,
  blackScholesPutPriceHP,
  generateHeatmapData,
} from "@/lib/blackscholes";

export default function Home() {
  // Main parameters
  const [spot, setSpot] = useState(100);
  const [strike, setStrike] = useState(100);
  const [time, setTime] = useState(1.0); // in years
  const [rate, setRate] = useState(0.05); // 5%
  const [vol, setVol] = useState(0.2); // 20%

  // Heatmap parameters
  const [minSpot, setMinSpot] = useState(80);
  const [maxSpot, setMaxSpot] = useState(120);
  const [stepsSpot, setStepsSpot] = useState(10);

  const [minVol, setMinVol] = useState(0.1);
  const [maxVol, setMaxVol] = useState(0.3);
  const [stepsVol, setStepsVol] = useState(10);

  // Generate Heatmap data
  const callHeatmapData = useMemo(() => {
    return generateHeatmapData({
      minSpot,
      maxSpot,
      stepsSpot,
      minVol,
      maxVol,
      stepsVol,
      strike,
      time,
      rate,
      blackScholesCallPrice: blackScholesCallPriceHP,
    });
  }, [
    minSpot,
    maxSpot,
    stepsSpot,
    minVol,
    maxVol,
    stepsVol,
    strike,
    time,
    rate,
  ]);

  const putHeatmapData = useMemo(() => {
    return generateHeatmapData({
      minSpot,
      maxSpot,
      stepsSpot,
      minVol,
      maxVol,
      stepsVol,
      strike,
      time,
      rate,
      blackScholesCallPrice: blackScholesPutPriceHP,
    });
  }, [
    minSpot,
    maxSpot,
    stepsSpot,
    minVol,
    maxVol,
    stepsVol,
    strike,
    time,
    rate,
  ]);

  // Prices
  const [callPrice, setCallPrice] = useState(10.45);
  const [putPrice, setPutPrice] = useState(5.57);

  // Calculate prices
  useEffect(() => {
    setCallPrice(blackScholesCallPriceHP(spot, strike, time, rate, vol));
    setPutPrice(blackScholesPutPriceHP(spot, strike, time, rate, vol));
  }, [spot, strike, time, rate, vol]);

  return (
    <>
      <Header />

      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-evenly items-center gap-4 p-4 h-full">
          <Card>
            <CardHeader>
              <CardTitle>Call Option</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center">
              <Card className="w-1/3">
                <CardContent>
                  <div className="flex flex-row justify-center items-center mt-6">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                      {callPrice.toFixed(2)}
                    </h1>
                  </div>
                </CardContent>
              </Card>
              <Heatmap
                data={callHeatmapData}
                minSpot={minSpot}
                maxSpot={maxSpot}
                stepsSpot={stepsSpot}
                minVol={minVol}
                maxVol={maxVol}
                stepsVol={stepsVol}
                width={600}
                height={550}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Put Option</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center">
              <Card className="w-1/3">
                <CardContent>
                  <div className="flex flex-row justify-center items-center mt-6">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                      {putPrice.toFixed(2)}
                    </h1>
                  </div>
                </CardContent>
              </Card>
              <Heatmap
                data={putHeatmapData}
                minSpot={minSpot}
                maxSpot={maxSpot}
                stepsSpot={stepsSpot}
                minVol={minVol}
                maxVol={maxVol}
                stepsVol={stepsVol}
                width={600}
                height={550}
              />
            </CardContent>
          </Card>
        </div>

        <OptionInputs
          spot={spot}
          setSpot={setSpot}
          strike={strike}
          setStrike={setStrike}
          time={time}
          setTime={setTime}
          rate={rate}
          setRate={setRate}
          vol={vol}
          setVol={setVol}
          minSpot={minSpot}
          setMinSpot={setMinSpot}
          maxSpot={maxSpot}
          setMaxSpot={setMaxSpot}
          minVol={minVol}
          setMinVol={setMinVol}
          maxVol={maxVol}
          setMaxVol={setMaxVol}
        />
      </div>
    </>
  );
}

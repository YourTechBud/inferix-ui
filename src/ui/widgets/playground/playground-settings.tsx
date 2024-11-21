'use client';
import { useState } from 'react';

import { Button } from '@/ui/components/button';
import { Input } from '@/ui/components/input';
import { Slider } from '@/ui/components/slider';

export default function PlaygroundSettings() {
  //state variables for sliders
  const [temperature, setTemperature] = useState(1);
  const [tokens, setTokens] = useState(256);
  const [topP, setTopP] = useState(1);

  return (
    <div className="hidden w-full flex-col items-start gap-4 lg:flex lg:w-[250px]">
      <div className="w-full space-y-2">
        <p>Functions</p>
        <Button
          color="secondary"
          className="bg-sidebar-foreground hover:bg-sidebar-hover w-full font-semibold text-black"
        >
          Add Functions
        </Button>
      </div>
      <div className="w-full space-y-3">
        <div className="flex flex-row justify-between">
          <h1 className="items-start text-sm font-semibold">Temperature</h1>
          <Input
            className="ml-2 w-20"
            type="number"
            value={temperature}
            step="0.01"
            min="0"
            max="2"
            onChange={e => setTemperature(parseFloat(e.target.value) || 0)}
          />
        </div>
        <Slider
          value={[temperature]}
          max={2}
          step={0.01}
          onValueChange={value => {
            setTemperature(value[0]);
          }}
        />
      </div>
      <div className="w-full space-y-3">
        <div className="flex flex-row justify-between">
          <h1 className="items-start text-sm font-semibold">Maximum Tokens</h1>
          <Input
            className="ml-2 w-20"
            type="number"
            value={tokens}
            step="1"
            min="0"
            max="4095"
            onChange={e => setTokens(parseInt(e.target.value) || 0)}
          />
        </div>
        <Slider
          value={[tokens]}
          max={4095}
          step={1}
          onValueChange={value => {
            setTokens(value[0]);
          }}
        />
      </div>
      <div className="w-full space-y-3">
        <div className="flex flex-row justify-between">
          <h1 className="items-start text-sm font-semibold">Top P</h1>
          <Input
            className="ml-2 w-20"
            type="number"
            value={topP}
            step="0.01"
            min="0"
            max="1"
            onChange={e => setTopP(parseFloat(e.target.value) || 0)}
          />
        </div>
        <Slider
          value={[topP]}
          max={1}
          step={0.01}
          onValueChange={value => {
            setTopP(value[0]);
          }}
        />
      </div>
    </div>
  );
}

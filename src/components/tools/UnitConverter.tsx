
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoveHorizontal, ArrowRight } from 'lucide-react';

// Conversion types and their units
const conversionTypes = [
  {
    type: 'length',
    label: 'Length',
    units: [
      { value: 'm', label: 'meters (m)' },
      { value: 'km', label: 'kilometers (km)' },
      { value: 'cm', label: 'centimeters (cm)' },
      { value: 'mm', label: 'millimeters (mm)' },
      { value: 'in', label: 'inches (in)' },
      { value: 'ft', label: 'feet (ft)' },
      { value: 'yd', label: 'yards (yd)' },
      { value: 'mi', label: 'miles (mi)' },
    ]
  },
  {
    type: 'weight',
    label: 'Weight',
    units: [
      { value: 'kg', label: 'kilograms (kg)' },
      { value: 'g', label: 'grams (g)' },
      { value: 'mg', label: 'milligrams (mg)' },
      { value: 'lb', label: 'pounds (lb)' },
      { value: 'oz', label: 'ounces (oz)' },
      { value: 't', label: 'metric tons (t)' },
    ]
  },
  {
    type: 'temperature',
    label: 'Temperature',
    units: [
      { value: 'c', label: 'Celsius (°C)' },
      { value: 'f', label: 'Fahrenheit (°F)' },
      { value: 'k', label: 'Kelvin (K)' },
    ]
  },
  {
    type: 'volume',
    label: 'Volume',
    units: [
      { value: 'l', label: 'liters (L)' },
      { value: 'ml', label: 'milliliters (mL)' },
      { value: 'gal', label: 'gallons (gal)' },
      { value: 'qt', label: 'quarts (qt)' },
      { value: 'pt', label: 'pints (pt)' },
      { value: 'cup', label: 'cups' },
      { value: 'floz', label: 'fluid ounces (fl oz)' },
    ]
  },
];

// Conversion factors to SI units
const toSI = {
  // Length (convert to meters)
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.34,
  
  // Weight (convert to kilograms)
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.453592,
  oz: 0.0283495,
  t: 1000,
  
  // Volume (convert to liters)
  l: 1,
  ml: 0.001,
  gal: 3.78541,
  qt: 0.946353,
  pt: 0.473176,
  cup: 0.24,
  floz: 0.0295735,
};

const UnitConverter = () => {
  const [conversionType, setConversionType] = useState('length');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('cm');
  const [availableUnits, setAvailableUnits] = useState(conversionTypes[0].units);

  // Convert temperature (special case)
  const convertTemperature = (value: number, from: string, to: string): number => {
    let tempInCelsius;
    // Convert to Celsius first
    switch (from) {
      case 'c': 
        tempInCelsius = value;
        break;
      case 'f': 
        tempInCelsius = (value - 32) * 5/9;
        break;
      case 'k': 
        tempInCelsius = value - 273.15;
        break;
      default:
        return 0;
    }
    
    // Convert from Celsius to target unit
    switch (to) {
      case 'c': 
        return tempInCelsius;
      case 'f': 
        return tempInCelsius * 9/5 + 32;
      case 'k': 
        return tempInCelsius + 273.15;
      default:
        return 0;
    }
  };

  // Perform conversion
  const convert = () => {
    if (!fromValue) {
      setToValue('');
      return;
    }

    const value = parseFloat(fromValue);
    if (isNaN(value)) {
      setToValue('Invalid input');
      return;
    }
    
    // Handle temperature separately
    if (conversionType === 'temperature') {
      const result = convertTemperature(value, fromUnit, toUnit);
      setToValue(result.toFixed(4));
      return;
    }

    // General unit conversion using SI as intermediary
    if (toSI[fromUnit as keyof typeof toSI] && toSI[toUnit as keyof typeof toSI]) {
      const valueInSI = value * toSI[fromUnit as keyof typeof toSI];
      const result = valueInSI / toSI[toUnit as keyof typeof toSI];
      setToValue(result.toFixed(4));
    } else {
      setToValue('Conversion not supported');
    }
  };

  // Update available units when conversion type changes
  useEffect(() => {
    const conversionTypeObj = conversionTypes.find(t => t.type === conversionType);
    if (conversionTypeObj) {
      setAvailableUnits(conversionTypeObj.units);
      setFromUnit(conversionTypeObj.units[0].value);
      setToUnit(conversionTypeObj.units[1].value);
    }
  }, [conversionType]);

  // Convert automatically when inputs change
  useEffect(() => {
    convert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromValue, fromUnit, toUnit]);

  // Handle switching units
  const handleSwapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    
    // Swap values too if we have a numerical result
    if (fromValue && toValue && !isNaN(parseFloat(toValue))) {
      setFromValue(toValue);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MoveHorizontal className="mr-2 h-5 w-5" />
          Unit Converter
        </CardTitle>
        <CardDescription>Convert between different units of measurement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Conversion Type</Label>
            <Select value={conversionType} onValueChange={setConversionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select conversion type" />
              </SelectTrigger>
              <SelectContent>
                {conversionTypes.map(type => (
                  <SelectItem key={type.type} value={type.type}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-5">
              <Label>From</Label>
              <div className="flex">
                <Input 
                  type="number" 
                  placeholder="0" 
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  className="rounded-r-none" 
                />
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="rounded-l-none min-w-[120px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUnits.map(unit => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="col-span-2 flex justify-center">
              <button 
                className="p-2 rounded-full hover:bg-accent transition-colors"
                onClick={handleSwapUnits}
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            
            <div className="col-span-5">
              <Label>To</Label>
              <div className="flex">
                <Input 
                  type="text" 
                  placeholder="Result" 
                  value={toValue}
                  readOnly
                  className="rounded-r-none bg-muted"
                />
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger className="rounded-l-none min-w-[120px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUnits.map(unit => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Tip: Click the arrow between inputs to swap the conversion direction
      </CardFooter>
    </Card>
  );
};

export default UnitConverter;

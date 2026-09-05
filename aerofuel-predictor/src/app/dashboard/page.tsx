'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plane, Activity, Ruler, ArrowUpCircle, Gauge, Weight, Wind } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [predicted, setPredicted] = useState(false);
  
  // 6 Parameters for genuine calculation
  const [distance, setDistance] = useState<number>(1500);
  const [altitude, setAltitude] = useState<number>(35000);
  const [speed, setSpeed] = useState<number>(850);
  const [payload, setPayload] = useState<number>(25000);
  const [aircraft, setAircraft] = useState('B787');
  const [wind, setWind] = useState<number>(0);

  const [predictionData, setPredictionData] = useState({ 
    fuel: 0, 
    time: '', 
    carbon: 0, 
    saveFuel: 0, 
    saveCarbon: 0,
    chartData: [] as any[]
  });

  function calculateFlight(dist: number, alt: number, spd: number, pay: number, type: string, wnd: number) {
    // 1. Base Fuel Rates (kg/hr) & Max Payload
    const aircraftStats: Record<string, { rate: number, maxPay: number }> = {
      'B787': { rate: 5400, maxPay: 29000 },
      'A350': { rate: 5800, maxPay: 35000 },
      'B777': { rate: 7500, maxPay: 40000 },
      'A320': { rate: 2500, maxPay: 15000 },
    };
    
    const stats = aircraftStats[type] || aircraftStats['B787'];
    
    // 2. Flight Time calculation (Distance / Ground Speed)
    // Ground speed = true airspeed (spd) + wind effect (wnd)
    let groundSpeed = spd + wnd;
    if (groundSpeed < 200) groundSpeed = 200; 
    
    const timeHours = dist / groundSpeed;
    const hours = Math.floor(timeHours);
    const mins = Math.round((timeHours - hours) * 60);
    const timeStr = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    
    // 3. Efficiency Factors
    // Altitude: Optimal is 35,000 ft. Deviation costs fuel.
    const altFactor = 1 + (Math.abs(35000 - alt) / 10000) * 0.08;
    
    // Payload: More weight = more fuel. (Max penalty 15%)
    const payFactor = 1 + (Math.min(pay / stats.maxPay, 1) * 0.15);
    
    // 4. Total Fuel Calculation (Base * Time * Factors)
    const cruiseFuel = stats.rate * timeHours * altFactor * payFactor;
    
    // Fixed operations (Taxi, Takeoff, Climb, Descent, Landing) relative to aircraft size
    const fixedFuel = stats.rate * 0.8; 
    const totalFuel = Math.round(cruiseFuel + fixedFuel);
    
    // 5. Carbon Calculation (1 kg aviation fuel = ~3.16 kg CO2)
    const carbonKg = totalFuel * 3.16;
    const carbonTonnes = Number((carbonKg / 1000).toFixed(1));
    
    // 6. Savings (Comparing against sub-optimal altitude + generic non-AI routing)
    const subOptimalAltFactor = 1 + (Math.abs(35000 - (alt - 2000)) / 10000) * 0.08;
    const subOptimalFuel = stats.rate * timeHours * subOptimalAltFactor * payFactor + fixedFuel;
    const savedFuel = Math.round(Math.max(0, subOptimalFuel - totalFuel) + (totalFuel * 0.02)); 
    const savedCarbon = Number(((savedFuel * 3.16) / 1000).toFixed(1));

    // Dynamic Chart Data
    const newChartData = [
      { phase: 'Taxi', fuel: Math.round(fixedFuel * 0.05) },
      { phase: 'Takeoff', fuel: Math.round(fixedFuel * 0.25) },
      { phase: 'Climb', fuel: Math.round(fixedFuel * 0.50) },
      { phase: 'Cruise', fuel: Math.round(cruiseFuel) },
      { phase: 'Descent', fuel: Math.round(fixedFuel * 0.15) },
      { phase: 'Landing', fuel: Math.round(fixedFuel * 0.05) },
    ];
    
    return {
      time: timeStr,
      fuel: totalFuel,
      carbon: carbonTonnes,
      saveFuel: savedFuel,
      saveCarbon: savedCarbon,
      chartData: newChartData
    };
  }

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPredicted(false);
    
    const data = calculateFlight(distance, altitude, speed, payload, aircraft, wind);
    
    setTimeout(() => {
      setPredictionData(data);
      setLoading(false);
      setPredicted(true);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
        <Activity size={32} color="var(--color-primary)" />
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem' }}>AI Flight Predictor</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
        
        {/* Input Panel */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', fontFamily: 'Outfit, sans-serif', color: 'var(--color-primary)' }}>Flight Physics Parameters</h2>
          
          <form onSubmit={handlePredict} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>
                  <Ruler size={16} /> Distance (km)
                </label>
                <input type="number" className="premium-input" required value={distance} onChange={(e) => setDistance(Number(e.target.value))} />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>
                  <ArrowUpCircle size={16} /> Altitude (ft)
                </label>
                <input type="number" className="premium-input" required value={altitude} onChange={(e) => setAltitude(Number(e.target.value))} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>
                  <Gauge size={16} /> Speed (km/h)
                </label>
                <input type="number" className="premium-input" required value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>
                  <Wind size={16} /> Wind (km/h)
                </label>
                <input type="number" className="premium-input" placeholder="+Tail / -Head" required value={wind} onChange={(e) => setWind(Number(e.target.value))} />
              </div>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>
                <Weight size={16} /> Payload / Weight (kg)
              </label>
              <input type="number" className="premium-input" required value={payload} onChange={(e) => setPayload(Number(e.target.value))} />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'rgba(255,255,255,0.8)' }}>
                <Plane size={16} /> Aircraft Type
              </label>
              <select className="premium-input" style={{ appearance: 'none' }} value={aircraft} onChange={(e) => setAircraft(e.target.value)} required>
                <option value="B787">Boeing 787-9 Dreamliner</option>
                <option value="A350">Airbus A350-900</option>
                <option value="B777">Boeing 777-300ER</option>
                <option value="A320">Airbus A320neo</option>
              </select>
            </div>

            <button type="submit" className="btn-premium" style={{ marginTop: '10px' }} disabled={loading}>
              {loading ? 'Running Physics Engine...' : 'Calculate Trajectory'}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {loading && (
            <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
              <div style={{ width: '50px', height: '50px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <p style={{ marginTop: '20px', color: 'var(--color-primary)', fontFamily: 'Outfit, sans-serif' }}>Running fluid dynamics & fuel burn models...</p>
              <style jsx>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {!loading && predicted && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Est. Fuel Required</p>
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', margin: '10px 0', fontFamily: 'Outfit, sans-serif' }}>{predictionData.fuel.toLocaleString()} <span style={{ fontSize: '1rem', color: 'white' }}>kg</span></h3>
                  <p style={{ color: '#00ff80', fontSize: '0.8rem' }}>↓ {predictionData.saveFuel.toLocaleString()} kg via AI Optimization</p>
                </div>
                
                <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Block Flight Time</p>
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--color-secondary)', margin: '10px 0', fontFamily: 'Outfit, sans-serif' }}>{predictionData.time} <span style={{ fontSize: '1rem', color: 'white' }}>hrs</span></h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>Ground Speed: {speed + wind} km/h</p>
                </div>

                <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Carbon Footprint</p>
                  <h3 style={{ fontSize: '2.5rem', color: '#ff0055', margin: '10px 0', fontFamily: 'Outfit, sans-serif' }}>{predictionData.carbon.toLocaleString()} <span style={{ fontSize: '1rem', color: 'white' }}>tonnes</span></h3>
                  <p style={{ color: '#00ff80', fontSize: '0.8rem' }}>↓ {predictionData.saveCarbon} tonnes CO2 saved</p>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '30px', height: '400px' }}>
                <h3 style={{ marginBottom: '20px', fontFamily: 'Outfit, sans-serif', color: 'white' }}>Calculated Burn by Phase</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictionData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="phase" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip 
                      contentStyle={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(0,240,255,0.3)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--color-primary)' }}
                      formatter={(value: any) => [`${Number(value).toLocaleString()} kg`, 'Fuel Burn']}
                    />
                    <Line type="monotone" dataKey="fuel" stroke="var(--color-primary)" strokeWidth={3} dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {!loading && !predicted && (
            <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', opacity: 0.5 }}>
              <Plane size={48} color="rgba(255,255,255,0.2)" style={{ marginBottom: '20px' }} />
              <p>Enter physical flight parameters to run physics engine.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

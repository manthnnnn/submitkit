'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, TrendingDown, Leaf, DollarSign } from 'lucide-react';

const fleetData = [
  { month: 'Jan', saved: 120 },
  { month: 'Feb', saved: 150 },
  { month: 'Mar', saved: 180 },
  { month: 'Apr', saved: 210 },
  { month: 'May', saved: 250 },
  { month: 'Jun', saved: 290 },
];

const routeEfficiency = [
  { name: 'Transatlantic', value: 400 },
  { name: 'Domestic', value: 300 },
  { name: 'Transpacific', value: 300 },
  { name: 'Short-haul', value: 200 },
];

const COLORS = ['var(--color-primary)', 'var(--color-secondary)', '#ff0055', '#00ff80'];

export default function Analytics() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
        <BarChart3 size={32} color="var(--color-secondary)" />
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem' }}>Fleet Analytics</h1>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(0, 240, 255, 0.1)', padding: '16px', borderRadius: '12px' }}>
            <TrendingDown size={32} color="var(--color-primary)" />
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Total Fuel Saved (YTD)</p>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif' }}>1.2M <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)' }}>kg</span></h3>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(0, 255, 128, 0.1)', padding: '16px', borderRadius: '12px' }}>
            <Leaf size={32} color="#00ff80" />
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>CO2 Emission Reduced</p>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif' }}>3.7M <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)' }}>kg</span></h3>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(255, 0, 85, 0.1)', padding: '16px', borderRadius: '12px' }}>
            <DollarSign size={32} color="#ff0055" />
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Cost Savings (YTD)</p>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif' }}>$850K</h3>
          </div>
        </div>

      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
        
        <div className="glass-panel" style={{ padding: '30px', height: '400px' }}>
          <h3 style={{ marginBottom: '20px', fontFamily: 'Outfit, sans-serif', color: 'white' }}>Monthly Fuel Savings Trend (tonnes)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fleetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(0,240,255,0.3)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--color-primary)' }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Bar dataKey="saved" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel" style={{ padding: '30px', height: '400px' }}>
          <h3 style={{ marginBottom: '20px', fontFamily: 'Outfit, sans-serif', color: 'white' }}>Savings by Route Type</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={routeEfficiency}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {routeEfficiency.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(0,240,255,0.3)', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px', flexWrap: 'wrap' }}>
            {routeEfficiency.map((entry, index) => (
              <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: COLORS[index] }} />
                {entry.name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

import { useState } from 'react'
import { Info, Thermometer, Flame } from 'lucide-react'

export default function Thermodynamics({ gradeLevel }) {
  const [temperature, setTemperature] = useState(25)
  const [pressure, setPressure] = useState(1)
  const [volume, setVolume] = useState(22.4)
  const [moles, setMoles] = useState(1)
  const [fixedVariable, setFixedVariable] = useState('none')

  const R = 0.0821 // Gas constant in L·atm/(mol·K)

  const calculatePV = () => {
    const tempK = temperature + 273.15
    if (fixedVariable === 'pressure') {
      // V = nRT/P
      const newVolume = (moles * R * tempK) / pressure
      setVolume(newVolume)
    } else if (fixedVariable === 'volume') {
      // P = nRT/V
      const newPressure = (moles * R * tempK) / volume
      setPressure(newPressure)
    } else if (fixedVariable === 'temperature') {
      // T = PV/nR
      const newTemp = (pressure * volume) / (moles * R)
      setTemperature(newTemp - 273.15)
    }
  }

  const getParticleSpeed = () => {
    const tempK = temperature + 273.15
    return Math.sqrt(tempK) * 2
  }

  const getParticleColor = () => {
    if (temperature < 0) return '#60a5fa'
    if (temperature < 100) return '#34d399'
    if (temperature < 200) return '#fbbf24'
    return '#ef4444'
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Thermodynamics</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">High School</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Gas Particle Simulation</h3>
            <div className="bg-slate-800 rounded-lg p-4 relative h-64 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="rounded-full border-4 border-white/30 transition-all duration-300"
                  style={{
                    width: `${Math.min(volume * 10, 300)}px`,
                    height: `${Math.min(volume * 10, 200)}px`,
                    borderColor: getParticleColor()
                  }}
                >
                  <div className="w-full h-full relative overflow-hidden">
                    {[...Array(Math.min(moles * 5, 20))].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: getParticleColor(),
                          left: `${Math.random() * 80 + 10}%`,
                          top: `${Math.random() * 80 + 10}%`,
                          animation: `bounce ${2 / getParticleSpeed()}s infinite alternate`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <style jsx>{`
                @keyframes bounce {
                  0% { transform: translate(0, 0); }
                  100% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
                }
              `}</style>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">PV Diagram</h3>
            <div className="bg-slate-800 rounded-lg p-4 h-48 relative">
              <svg width="100%" height="100%" viewBox="0 0 300 150">
                {/* Axes */}
                <line x1="30" y1="130" x2="280" y2="130" stroke="#fff" strokeWidth="2" />
                <line x1="30" y1="130" x2="30" y2="20" stroke="#fff" strokeWidth="2" />
                
                {/* Labels */}
                <text x="270" y="145" fill="#fff" fontSize="12">Volume (L)</text>
                <text x="10" y="30" fill="#fff" fontSize="12" transform="rotate(-90, 10, 30)">Pressure (atm)</text>
                
                {/* Current point */}
                <circle 
                  cx={30 + volume * 8} 
                  cy={130 - pressure * 80} 
                  r="6" 
                  fill={getParticleColor()}
                />
                
                {/* Isotherm curve */}
                <path
                  d={`M 30 130 Q ${30 + volume * 8} ${130 - pressure * 80} ${30 + volume * 8} ${130 - pressure * 80}`}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-white font-medium mb-2 block">Fixed Variable (for calculation)</label>
            <select
              value={fixedVariable}
              onChange={(e) => setFixedVariable(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
            >
              <option value="none">None</option>
              <option value="pressure">Pressure (Boyle's Law)</option>
              <option value="volume">Volume (Charles's Law)</option>
              <option value="temperature">Temperature (Gay-Lussac's Law)</option>
            </select>
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">
              Temperature: {temperature.toFixed(1)}°C
            </label>
            <input
              type="range"
              min="-50"
              max="500"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full"
              disabled={fixedVariable === 'temperature'}
            />
            <div className="flex justify-between text-white/50 text-xs mt-1">
              <span>-50°C</span>
              <span>500°C</span>
            </div>
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">
              Pressure: {pressure.toFixed(2)} atm
            </label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={pressure}
              onChange={(e) => setPressure(parseFloat(e.target.value))}
              className="w-full"
              disabled={fixedVariable === 'pressure'}
            />
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">
              Volume: {volume.toFixed(2)} L
            </label>
            <input
              type="range"
              min="1"
              max="50"
              step="0.5"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full"
              disabled={fixedVariable === 'volume'}
            />
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">
              Moles: {moles}
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={moles}
              onChange={(e) => setMoles(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <button
            onClick={calculatePV}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Calculate (Ideal Gas Law)
          </button>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Boyle's Law: P₁V₁ = P₂V₂ (T constant)</li>
              <li>• Charles's Law: V₁/T₁ = V₂/T₂ (P constant)</li>
              <li>• Gay-Lussac: P₁/T₁ = P₂/T₂ (V constant)</li>
              <li>• Ideal Gas: PV = nRT</li>
            </ul>
          </div>

          <div className="bg-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-300 font-semibold mb-2">Ideal Gas Law</h3>
            <p className="text-white/80 text-sm font-mono">
              PV = nRT
            </p>
            <p className="text-white/60 text-xs mt-1">
              R = 0.0821 L·atm/(mol·K)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

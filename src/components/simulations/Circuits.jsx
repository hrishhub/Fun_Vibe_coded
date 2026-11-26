import { useState } from 'react'
import { Info, Zap } from 'lucide-react'

export default function Circuits({ gradeLevel }) {
  const [voltage, setVoltage] = useState(12)
  const [resistance, setResistance] = useState(10)
  const [circuitType, setCircuitType] = useState('series')
  const [resistors, setResistors] = useState([10, 20, 30])

  const calculateTotalResistance = () => {
    if (circuitType === 'series') {
      return resistors.reduce((sum, r) => sum + r, 0)
    } else {
      // Parallel
      const reciprocalSum = resistors.reduce((sum, r) => sum + 1/r, 0)
      return 1 / reciprocalSum
    }
  }

  const calculateCurrent = () => {
    return voltage / calculateTotalResistance()
  }

  const calculatePower = () => {
    const I = calculateCurrent()
    const R = calculateTotalResistance()
    return I * I * R
  }

  const updateResistor = (index, value) => {
    const newResistors = [...resistors]
    newResistors[index] = value
    setResistors(newResistors)
  }

  const addResistor = () => {
    setResistors([...resistors, 10])
  }

  const removeResistor = () => {
    if (resistors.length > 1) {
      setResistors(resistors.slice(0, -1))
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Electric Circuits</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">{gradeLevel === 'low' ? 'Elementary' : 'High School'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Circuit Diagram</h3>
            <div className="bg-slate-800 rounded-lg p-8 relative h-64">
              {/* Simple circuit visualization */}
              <svg width="100%" height="100%" viewBox="0 0 400 200">
                {/* Battery */}
                <rect x="30" y="80" width="40" height="40" fill="#fbbf24" rx="4" />
                <text x="50" y="105" textAnchor="middle" fill="#000" fontSize="12" fontWeight="bold">
                  {voltage}V
                </text>
                
                {/* Wires */}
                <line x1="70" y1="90" x2="70" y2="50" stroke="#60a5fa" strokeWidth="3" />
                <line x1="70" y1="50" x2="350" y2="50" stroke="#60a5fa" strokeWidth="3" />
                <line x1="350" y1="50" x2="350" y2="110" stroke="#60a5fa" strokeWidth="3" />
                <line x1="350" y1="110" x2="70" y2="110" stroke="#60a5fa" strokeWidth="3" />
                <line x1="70" y1="110" x2="70" y2="120" stroke="#60a5fa" strokeWidth="3" />

                {/* Resistors */}
                {resistors.map((r, i) => {
                  const x = 120 + i * 80
                  return (
                    <g key={i}>
                      <rect x={x} y={40} width="40" height="20" fill="#ef4444" rx="2" />
                      <text x={x + 20} y="35" textAnchor="middle" fill="#fff" fontSize="10">
                        {r}Ω
                      </text>
                    </g>
                  )
                })}

                {/* Current arrow */}
                <text x="200" y="40" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
                  I = {calculateCurrent().toFixed(2)}A
                </text>
              </svg>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Calculated Values</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-white/60 text-sm">Voltage</p>
                <p className="text-2xl font-bold text-white">{voltage}V</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-white/60 text-sm">Total Resistance</p>
                <p className="text-2xl font-bold text-white">{calculateTotalResistance().toFixed(1)}Ω</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-white/60 text-sm">Current</p>
                <p className="text-2xl font-bold text-green-400">{calculateCurrent().toFixed(2)}A</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-white/60 text-sm">Power</p>
                <p className="text-2xl font-bold text-yellow-400">{calculatePower().toFixed(2)}W</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-white font-medium mb-2 block">Circuit Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCircuitType('series')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  circuitType === 'series' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Series
              </button>
              <button
                onClick={() => setCircuitType('parallel')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  circuitType === 'parallel' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Parallel
              </button>
            </div>
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">
              Voltage: {voltage}V
            </label>
            <input
              type="range"
              min="1"
              max="24"
              value={voltage}
              onChange={(e) => setVoltage(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-white font-medium">Resistors</label>
              <div className="flex gap-2">
                <button
                  onClick={addResistor}
                  className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm hover:bg-green-500/30"
                >
                  +
                </button>
                <button
                  onClick={removeResistor}
                  className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30"
                >
                  -
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {resistors.map((r, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-white/50 text-sm w-8">R{i+1}</span>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={r}
                    onChange={(e) => updateResistor(i, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-white w-12 text-right">{r}Ω</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Ohm's Law: V = IR</li>
              <li>• Power: P = VI = I²R</li>
              <li>• Series: R = R₁ + R₂ + ...</li>
              <li>• Parallel: 1/R = 1/R₁ + 1/R₂ + ...</li>
            </ul>
          </div>

          {gradeLevel === 'high' && (
            <div className="bg-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-semibold mb-2">Formulas</h3>
              <p className="text-white/80 text-sm">
                {circuitType === 'series' ? 'R_total = ΣR_i' : '1/R_total = Σ(1/R_i)'}
              </p>
              <p className="text-white/80 text-sm mt-1">
                I = V / R_total
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

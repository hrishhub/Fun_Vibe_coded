import { useState } from 'react'
import { Info, Sun, Droplets, Wind } from 'lucide-react'

export default function Photosynthesis({ gradeLevel }) {
  const [phase, setPhase] = useState('light')
  const [lightIntensity, setLightIntensity] = useState(50)
  const [co2Level, setCo2Level] = useState(50)

  const phases = [
    {
      id: 'light',
      name: 'Light Reaction',
      location: 'Thylakoid Membrane',
      inputs: ['Light', 'H₂O'],
      outputs: ['ATP', 'NADPH', 'O₂'],
      description: 'Light energy is converted to chemical energy (ATP and NADPH)',
    },
    {
      id: 'dark',
      name: 'Calvin Cycle (Dark Reaction)',
      location: 'Stroma',
      inputs: ['CO₂', 'ATP', 'NADPH'],
      outputs: ['Glucose', 'ADP', 'NADP+'],
      description: 'CO₂ is converted to glucose using ATP and NADPH',
    },
  ]

  const currentPhase = phases.find(p => p.id === phase)

  const calculateOxygenProduction = () => {
    return (lightIntensity * co2Level / 2500).toFixed(1)
  }

  const calculateGlucoseProduction = () => {
    return (lightIntensity * co2Level / 5000).toFixed(1)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Photosynthesis</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">{gradeLevel === 'low' ? 'Elementary' : 'High School'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Overall Equation</h3>
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <div className="text-2xl font-mono text-white mb-4">
                6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂
              </div>
              <div className="flex justify-center gap-8 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-blue-400" />
                  <span>Carbon Dioxide</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-400" />
                  <span>Water</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-yellow-400" />
                  <span>Light Energy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Phase Selection</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {phases.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPhase(p.id)}
                  className={`px-4 py-3 rounded-lg text-left transition-all ${
                    phase === p.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm opacity-70">{p.location}</div>
                </button>
              ))}
            </div>

            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-2">{currentPhase.name}</h4>
              <p className="text-white/70 mb-4">{currentPhase.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm mb-2">Inputs</p>
                  <div className="space-y-1">
                    {currentPhase.inputs.map((input, i) => (
                      <div key={i} className="bg-white/10 rounded px-2 py-1 text-white text-sm">
                        {input}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-2">Outputs</p>
                  <div className="space-y-1">
                    {currentPhase.outputs.map((output, i) => (
                      <div key={i} className="bg-green-500/20 rounded px-2 py-1 text-green-400 text-sm">
                        {output}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white font-medium mb-2 block">
                  Light Intensity: {lightIntensity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={lightIntensity}
                  onChange={(e) => setLightIntensity(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-white font-medium mb-2 block">
                  CO₂ Level: {co2Level}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={co2Level}
                  onChange={(e) => setCo2Level(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Production Rates</h3>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-5 h-5 text-blue-400" />
                  <span className="text-white/60 text-sm">O₂ Produced</span>
                </div>
                <div className="text-2xl font-bold text-white">{calculateOxygenProduction()} units</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-green-400" />
                  <span className="text-white/60 text-sm">Glucose Produced</span>
                </div>
                <div className="text-2xl font-bold text-white">{calculateGlucoseProduction()} units</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Facts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Occurs in chloroplasts</li>
              <li>• Chlorophyll absorbs light</li>
              <li>• Converts light to chemical energy</li>
              <li>• Produces oxygen as byproduct</li>
            </ul>
          </div>

          <div className="bg-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-300 font-semibold mb-2">Chlorophyll</h3>
            <p className="text-white/80 text-sm">
              Pigment that absorbs light energy
            </p>
            <p className="text-white/60 text-xs mt-1">
              Absorbs red and blue light, reflects green
            </p>
          </div>

          {gradeLevel === 'high' && (
            <div className="bg-purple-500/20 rounded-lg p-4">
              <h3 className="text-purple-300 font-semibold mb-2">Factors Affecting Rate</h3>
              <ul className="text-white/80 text-sm space-y-1">
                <li>• Light intensity</li>
                <li>• CO₂ concentration</li>
                <li>• Temperature</li>
                <li>• Water availability</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

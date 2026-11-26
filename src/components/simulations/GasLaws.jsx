import { useState } from 'react'
import { Info } from 'lucide-react'

export default function GasLaws({ gradeLevel }) {
  const [selectedLaw, setSelectedLaw] = useState('boyle')
  const [p1, setP1] = useState(1)
  const [v1, setV1] = useState(10)
  const [t1, setT1] = useState(273)
  const [p2, setP2] = useState(2)
  const [v2, setV2] = useState(5)
  const [t2, setT2] = useState(273)

  const calculateMissing = () => {
    if (selectedLaw === 'boyle') {
      // P1V1 = P2V2
      if (!p2) setP2((p1 * v1) / v2)
      if (!v2) setV2((p1 * v1) / p2)
    } else if (selectedLaw === 'charles') {
      // V1/T1 = V2/T2
      if (!v2) setV2((v1 * t2) / t1)
      if (!t2) setT2((v2 * t1) / v1)
    } else if (selectedLaw === 'gaylussac') {
      // P1/T1 = P2/T2
      if (!p2) setP2((p1 * t2) / t1)
      if (!t2) setT2((p2 * t1) / p1)
    }
  }

  const laws = [
    {
      id: 'boyle',
      name: "Boyle's Law",
      formula: 'P₁V₁ = P₂V₂',
      description: 'Pressure and volume are inversely proportional at constant temperature',
      variables: ['P1', 'V1', 'P2', 'V2'],
      constant: 'Temperature',
    },
    {
      id: 'charles',
      name: "Charles's Law",
      formula: 'V₁/T₁ = V₂/T₂',
      description: 'Volume and temperature are directly proportional at constant pressure',
      variables: ['V1', 'T1', 'V2', 'T2'],
      constant: 'Pressure',
    },
    {
      id: 'gaylussac',
      name: "Gay-Lussac's Law",
      formula: 'P₁/T₁ = P₂/T₂',
      description: 'Pressure and temperature are directly proportional at constant volume',
      variables: ['P1', 'T1', 'P2', 'T2'],
      constant: 'Volume',
    },
  ]

  const currentLaw = laws.find(l => l.id === selectedLaw)

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Gas Laws</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">High School</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Select a Gas Law</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {laws.map((law) => (
                <button
                  key={law.id}
                  onClick={() => setSelectedLaw(law.id)}
                  className={`px-4 py-3 rounded-lg text-left transition-all ${
                    selectedLaw === law.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <div className="font-medium">{law.name}</div>
                  <div className="text-sm opacity-70 font-mono">{law.formula}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{currentLaw.name}</h3>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-400 font-mono mb-2">
                {currentLaw.formula}
              </div>
              <p className="text-white/70">{currentLaw.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Initial State</h4>
                <div className="space-y-3">
                  {selectedLaw !== 'charles' && (
                    <div>
                      <label className="text-white/60 text-sm">P₁ (atm)</label>
                      <input
                        type="number"
                        value={p1}
                        onChange={(e) => setP1(parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                      />
                    </div>
                  )}
                  {selectedLaw !== 'gaylussac' && (
                    <div>
                      <label className="text-white/60 text-sm">V₁ (L)</label>
                      <input
                        type="number"
                        value={v1}
                        onChange={(e) => setV1(parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                      />
                    </div>
                  )}
                  <div>
                    <label className="text-white/60 text-sm">T₁ (K)</label>
                    <input
                      type="number"
                      value={t1}
                      onChange={(e) => setT1(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Final State</h4>
                <div className="space-y-3">
                  {selectedLaw !== 'charles' && (
                    <div>
                      <label className="text-white/60 text-sm">P₂ (atm)</label>
                      <input
                        type="number"
                        value={p2}
                        onChange={(e) => setP2(parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                      />
                    </div>
                  )}
                  {selectedLaw !== 'gaylussac' && (
                    <div>
                      <label className="text-white/60 text-sm">V₂ (L)</label>
                      <input
                        type="number"
                        value={v2}
                        onChange={(e) => setV2(parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                      />
                    </div>
                  )}
                  <div>
                    <label className="text-white/60 text-sm">T₂ (K)</label>
                    <input
                      type="number"
                      value={t2}
                      onChange={(e) => setT2(parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={calculateMissing}
              className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            >
              Calculate Missing Value
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Constant Variable</h3>
            <p className="text-white/70">{currentLaw.constant}</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Boyle: P ∝ 1/V (T constant)</li>
              <li>• Charles: V ∝ T (P constant)</li>
              <li>• Gay-Lussac: P ∝ T (V constant)</li>
              <li>• Combined: PV/T = constant</li>
            </ul>
          </div>

          <div className="bg-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-300 font-semibold mb-2">Temperature Note</h3>
            <p className="text-white/80 text-sm">
              Always use Kelvin (K) for gas law calculations
            </p>
            <p className="text-white/60 text-xs mt-1">
              K = °C + 273.15
            </p>
          </div>

          <div className="bg-purple-500/20 rounded-lg p-4">
            <h3 className="text-purple-300 font-semibold mb-2">Ideal Gas Law</h3>
            <p className="text-white/80 text-sm font-mono">
              PV = nRT
            </p>
            <p className="text-white/60 text-xs mt-1">
              Combines all gas laws
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

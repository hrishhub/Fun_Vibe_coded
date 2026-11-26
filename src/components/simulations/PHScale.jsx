import { useState } from 'react'
import { Info, Droplets } from 'lucide-react'

export default function PHScale({ gradeLevel }) {
  const [ph, setPh] = useState(7)
  const [substance, setSubstance] = useState('')

  const commonSubstances = [
    { name: 'Battery Acid', ph: 0 },
    { name: 'Stomach Acid', ph: 1.5 },
    { name: 'Lemon Juice', ph: 2 },
    { name: 'Vinegar', ph: 3 },
    { name: 'Coffee', ph: 5 },
    { name: 'Milk', ph: 6.5 },
    { name: 'Pure Water', ph: 7 },
    { name: 'Blood', ph: 7.4 },
    { name: 'Sea Water', ph: 8 },
    { name: 'Soap', ph: 10 },
    { name: 'Ammonia', ph: 11.5 },
    { name: 'Bleach', ph: 13 },
  ]

  const getPHColor = (value) => {
    if (value < 3) return '#ef4444'
    if (value < 5) return '#f97316'
    if (value < 6.5) return '#eab308'
    if (value < 7.5) return '#22c55e'
    if (value < 10) return '#3b82f6'
    if (value < 12) return '#8b5cf6'
    return '#ec4899'
  }

  const getPHType = (value) => {
    if (value < 7) return 'Acidic'
    if (value > 7) return 'Basic'
    return 'Neutral'
  }

  const getHConcentration = (value) => {
    return (10 ** -value).toExponential(2)
  }

  const getOHConcentration = (value) => {
    return (10 ** -(14 - value)).toExponential(2)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">pH Scale</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">{gradeLevel === 'low' ? 'Elementary' : 'High School'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">pH Scale</h3>
            
            <div className="relative h-16 rounded-lg overflow-hidden mb-4">
              <div className="absolute inset-0 flex">
                {[...Array(14)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 transition-all"
                    style={{ backgroundColor: getPHColor(i) }}
                  />
                ))}
              </div>
              <div
                className="absolute top-0 bottom-0 w-1 bg-white transition-all"
                style={{ left: `${(ph / 14) * 100}%` }}
              />
              <div
                className="absolute top-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold transition-all"
                style={{ left: `calc(${(ph / 14) * 100}% - 16px)` }}
              >
                {ph.toFixed(1)}
              </div>
            </div>

            <div className="flex justify-between text-white/70 text-xs">
              <span>0</span>
              <span>7</span>
              <span>14</span>
            </div>
            <div className="flex justify-between text-white/50 text-xs mt-1">
              <span>Acidic</span>
              <span>Neutral</span>
              <span>Basic</span>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Common Substances</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {commonSubstances.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => setPh(sub.ph)}
                  className={`px-3 py-2 rounded-lg text-left transition-all ${
                    Math.abs(ph - sub.ph) < 0.1
                      ? 'ring-2 ring-white'
                      : 'hover:bg-white/10'
                  }`}
                  style={{ backgroundColor: getPHColor(sub.ph) + '40' }}
                >
                  <div className="text-white font-medium text-sm">{sub.name}</div>
                  <div className="text-white/70 text-xs">pH: {sub.ph}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-white font-medium mb-2 block">
              pH Value: {ph.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="14"
              step="0.1"
              value={ph}
              onChange={(e) => setPh(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6 text-center">
            <div
              className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center transition-all"
              style={{ backgroundColor: getPHColor(ph) }}
            >
              <Droplets className="w-12 h-12 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{ph.toFixed(1)}</div>
            <div className={`text-lg font-medium ${getPHType(ph) === 'Acidic' ? 'text-red-400' : getPHType(ph) === 'Basic' ? 'text-blue-400' : 'text-green-400'}`}>
              {getPHType(ph)}
            </div>
          </div>

          {gradeLevel === 'high' && (
            <div className="bg-white/5 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-white/60 text-sm">[H⁺] Concentration</p>
                <p className="text-white font-mono">{getHConcentration(ph)} M</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">[OH⁻] Concentration</p>
                <p className="text-white font-mono">{getOHConcentration(ph)} M</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">pOH</p>
                <p className="text-white font-mono">{(14 - ph).toFixed(1)}</p>
              </div>
            </div>
          )}

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• pH = -log[H⁺]</li>
              <li>• Scale: 0 (acidic) to 14 (basic)</li>
              <li>• pH 7 = neutral (pure water)</li>
              <li>• Each unit = 10× change</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

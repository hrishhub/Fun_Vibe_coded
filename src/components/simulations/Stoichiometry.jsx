import { useState } from 'react'
import { Info, FlaskConical } from 'lucide-react'

export default function Stoichiometry({ gradeLevel }) {
  const [selectedReaction, setSelectedReaction] = useState(0)
  const [givenAmount, setGivenAmount] = useState('')
  const [givenUnit, setGivenUnit] = useState('moles')
  const [findUnit, setFindUnit] = useState('grams')

  const reactions = [
    {
      equation: '2H₂ + O₂ → 2H₂O',
      name: 'Combustion of Hydrogen',
      substances: ['H₂', 'O₂', 'H₂O'],
      coefficients: [2, 1, 2],
      molarMass: [2.016, 32.00, 18.015],
    },
    {
      equation: 'N₂ + 3H₂ → 2NH₃',
      name: 'Haber Process',
      substances: ['N₂', 'H₂', 'NH₃'],
      coefficients: [1, 3, 2],
      molarMass: [28.02, 2.016, 17.03],
    },
    {
      equation: '2Na + Cl₂ → 2NaCl',
      name: 'Sodium chlorination',
      substances: ['Na', 'Cl₂', 'NaCl'],
      coefficients: [2, 1, 2],
      molarMass: [22.99, 70.90, 58.44],
    },
  ]

  const currentReaction = reactions[selectedReaction]

  const calculateStoichiometry = () => {
    if (!givenAmount) return null

    const amount = parseFloat(givenAmount)
    let molesGiven = amount

    if (givenUnit === 'grams') {
      molesGiven = amount / currentReaction.molarMass[0]
    } else if (givenUnit === 'liters') {
      molesGiven = amount / 22.4
    }

    const results = currentReaction.substances.map((sub, i) => {
      const moles = molesGiven * (currentReaction.coefficients[i] / currentReaction.coefficients[0])
      const grams = moles * currentReaction.molarMass[i]
      const liters = moles * 22.4

      return {
        substance: sub,
        moles: moles.toFixed(3),
        grams: grams.toFixed(2),
        liters: liters.toFixed(2),
      }
    })

    return results
  }

  const results = calculateStoichiometry()

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Stoichiometry</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">High School</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Select Reaction</h3>
            <div className="space-y-2">
              {reactions.map((reaction, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedReaction(index)}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                    selectedReaction === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <div className="font-mono text-lg mb-1">{reaction.equation}</div>
                  <div className="text-sm opacity-70">{reaction.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Calculation</h3>
            
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <div className="text-2xl font-mono text-white text-center mb-4">
                {currentReaction.equation}
              </div>
              <div className="flex justify-center gap-4 text-white/70 text-sm">
                {currentReaction.substances.map((sub, i) => (
                  <div key={i} className="text-center">
                    <div className="font-medium">{sub}</div>
                    <div className="text-xs">{currentReaction.molarMass[i]} g/mol</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-white/60 text-sm block mb-2">Given Amount</label>
                <input
                  type="number"
                  value={givenAmount}
                  onChange={(e) => setGivenAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-2">Given Unit</label>
                <select
                  value={givenUnit}
                  onChange={(e) => setGivenUnit(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                >
                  <option value="moles">Moles</option>
                  <option value="grams">Grams</option>
                  <option value="liters">Liters (STP)</option>
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-2">Find In</label>
                <select
                  value={findUnit}
                  onChange={(e) => setFindUnit(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                >
                  <option value="moles">Moles</option>
                  <option value="grams">Grams</option>
                  <option value="liters">Liters (STP)</option>
                </select>
              </div>
            </div>

            {results && (
              <div className="bg-green-500/20 rounded-lg p-4">
                <h4 className="text-green-300 font-semibold mb-3">Results</h4>
                <div className="space-y-2">
                  {results.map((result, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/10 rounded p-2">
                      <span className="text-white font-medium">{result.substance}</span>
                      <div className="text-right">
                        <span className="text-white">{result[findUnit]}</span>
                        <span className="text-white/60 text-sm ml-1">{findUnit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Mole Concept</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• 1 mole = 6.022 × 10²³ particles</li>
              <li>• 1 mole = molar mass (grams)</li>
              <li>• 1 mole gas = 22.4 L (STP)</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Steps</h3>
            <ol className="text-white/70 text-sm space-y-1 list-decimal list-inside">
              <li>Balance equation</li>
              <li>Convert given to moles</li>
              <li>Use mole ratio</li>
              <li>Convert to desired unit</li>
            </ol>
          </div>

          <div className="bg-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-300 font-semibold mb-2">Mole Ratio</h3>
            <p className="text-white/80 text-sm">
              Use coefficients from balanced equation
            </p>
            <div className="text-white/60 text-xs mt-1 font-mono">
              moles A / coeff A = moles B / coeff B
            </div>
          </div>

          <div className="bg-purple-500/20 rounded-lg p-4">
            <h3 className="text-purple-300 font-semibold mb-2">STP Conditions</h3>
            <p className="text-white/80 text-sm">
              Standard Temperature and Pressure
            </p>
            <p className="text-white/60 text-xs mt-1">
              0°C (273 K) and 1 atm
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

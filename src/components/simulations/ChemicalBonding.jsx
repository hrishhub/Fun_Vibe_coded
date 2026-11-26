import { useState } from 'react'
import { Info, Link } from 'lucide-react'

export default function ChemicalBonding({ gradeLevel }) {
  const [bondType, setBondType] = useState('ionic')
  const [selectedElements, setSelectedElements] = useState(['Na', 'Cl'])

  const bondTypes = [
    {
      id: 'ionic',
      name: 'Ionic Bond',
      description: 'Transfer of electrons between metal and nonmetal',
      example: 'NaCl (Sodium Chloride)',
      characteristics: [
        'Metal + Nonmetal',
        'Electron transfer',
        'High melting point',
        'Conducts when dissolved',
      ],
    },
    {
      id: 'covalent',
      name: 'Covalent Bond',
      description: 'Sharing of electrons between nonmetals',
      example: 'H₂O (Water)',
      characteristics: [
        'Nonmetal + Nonmetal',
        'Electron sharing',
        'Lower melting point',
        'Poor conductor',
      ],
    },
    {
      id: 'metallic',
      name: 'Metallic Bond',
      description: 'Sea of delocalized electrons in metals',
      example: 'Fe (Iron)',
      characteristics: [
        'Metal atoms',
        'Delocalized electrons',
        'Malleable, ductile',
        'Good conductor',
      ],
    },
  ]

  const currentBond = bondTypes.find(b => b.id === bondType)

  const commonPairs = {
    ionic: [
      { elements: ['Na', 'Cl'], name: 'Sodium Chloride' },
      { elements: ['Mg', 'O'], name: 'Magnesium Oxide' },
      { elements: ['Ca', 'F'], name: 'Calcium Fluoride' },
    ],
    covalent: [
      { elements: ['H', 'O'], name: 'Water' },
      { elements: ['C', 'O'], name: 'Carbon Dioxide' },
      { elements: ['N', 'H'], name: 'Ammonia' },
    ],
    metallic: [
      { elements: ['Fe'], name: 'Iron' },
      { elements: ['Cu'], name: 'Copper' },
      { elements: ['Al'], name: 'Aluminum' },
    ],
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Chemical Bonding</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">High School</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Bond Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {bondTypes.map((bond) => (
                <button
                  key={bond.id}
                  onClick={() => setBondType(bond.id)}
                  className={`px-4 py-4 rounded-lg text-left transition-all ${
                    bondType === bond.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <div className="font-medium mb-1">{bond.name}</div>
                  <div className="text-sm opacity-70">{bond.example}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{currentBond.name}</h3>
            <p className="text-white/70 mb-6">{currentBond.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {currentBond.characteristics.map((char, i) => (
                <div key={i} className="bg-white/10 rounded-lg p-3 flex items-center gap-2">
                  <Link className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-white text-sm">{char}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">Common Examples</h4>
              <div className="space-y-2">
                {commonPairs[bondType].map((pair, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedElements(pair.elements)}
                    className={`w-full px-4 py-2 rounded-lg text-left transition-all ${
                      selectedElements.join('') === pair.elements.join('')
                        ? 'bg-green-500/20 text-green-400 border border-green-500'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <div className="font-medium">{pair.name}</div>
                    <div className="text-sm opacity-70">{pair.elements.join(' + ')}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Bond Visualization</h3>
            <div className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center">
              {bondType === 'ionic' && (
                <div className="relative">
                  <div className="absolute left-0 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedElements[0] || 'Na'}⁺
                  </div>
                  <div className="absolute right-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedElements[1] || 'Cl'}⁻
                  </div>
                  <div className="absolute left-16 right-16 top-1/2 h-0.5 bg-yellow-400" />
                </div>
              )}
              {bondType === 'covalent' && (
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedElements[0] || 'H'}
                  </div>
                  <div className="w-8 h-1 bg-yellow-400" />
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedElements[1] || 'O'}
                  </div>
                </div>
              )}
              {bondType === 'metallic' && (
                <div className="relative">
                  <div className="absolute left-4 top-4 w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {selectedElements[0] || 'Fe'}
                  </div>
                  <div className="absolute right-4 top-4 w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {selectedElements[0] || 'Fe'}
                  </div>
                  <div className="absolute left-8 bottom-4 w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {selectedElements[0] || 'Fe'}
                  </div>
                  <div className="absolute right-8 bottom-4 w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {selectedElements[0] || 'Fe'}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-yellow-400 rounded-full opacity-30" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Electronegativity</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Ionic: ΔEN &gt; 1.7</li>
              <li>• Polar Covalent: 0.4 &lt; ΔEN &lt; 1.7</li>
              <li>• Nonpolar Covalent: ΔEN &lt; 0.4</li>
            </ul>
          </div>

          <div className="bg-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-300 font-semibold mb-2">Octet Rule</h3>
            <p className="text-white/80 text-sm">
              Atoms tend to gain, lose, or share electrons to achieve 8 valence electrons
            </p>
          </div>

          {gradeLevel === 'high' && (
            <div className="bg-purple-500/20 rounded-lg p-4">
              <h3 className="text-purple-300 font-semibold mb-2">Bond Energy</h3>
              <p className="text-white/80 text-sm">
                Energy required to break a bond
              </p>
              <p className="text-white/60 text-xs mt-1">
                Ionic &gt; Covalent &gt; Metallic
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

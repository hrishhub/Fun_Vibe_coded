import { useState } from 'react'
import { Info, FlaskConical, ArrowRight } from 'lucide-react'

export default function ChemicalReactions({ gradeLevel }) {
  const [selectedReaction, setSelectedReaction] = useState(0)
  const [balanced, setBalanced] = useState(false)

  const reactions = [
    {
      name: 'Combustion of Methane',
      unbalanced: 'CH₄ + O₂ → CO₂ + H₂O',
      balanced: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
      description: 'Methane burns in oxygen to produce carbon dioxide and water',
      reactants: ['Methane (CH₄)', 'Oxygen (O₂)'],
      products: ['Carbon Dioxide (CO₂)', 'Water (H₂O)'],
      type: 'Combustion',
    },
    {
      name: 'Photosynthesis',
      unbalanced: 'CO₂ + H₂O → C₆H₁₂O₆ + O₂',
      balanced: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
      description: 'Plants convert carbon dioxide and water into glucose and oxygen',
      reactants: ['Carbon Dioxide (CO₂)', 'Water (H₂O)'],
      products: ['Glucose (C₆H₁₂O₆)', 'Oxygen (O₂)'],
      type: 'Synthesis',
    },
    {
      name: 'Rusting of Iron',
      unbalanced: 'Fe + O₂ → Fe₂O₃',
      balanced: '4Fe + 3O₂ → 2Fe₂O₃',
      description: 'Iron reacts with oxygen to form iron oxide (rust)',
      reactants: ['Iron (Fe)', 'Oxygen (O₂)'],
      products: ['Iron Oxide (Fe₂O₃)'],
      type: 'Oxidation',
    },
    {
      name: 'Neutralization',
      unbalanced: 'HCl + NaOH → NaCl + H₂O',
      balanced: 'HCl + NaOH → NaCl + H₂O',
      description: 'Acid and base react to form salt and water',
      reactants: ['Hydrochloric Acid (HCl)', 'Sodium Hydroxide (NaOH)'],
      products: ['Sodium Chloride (NaCl)', 'Water (H₂O)'],
      type: 'Neutralization',
    },
  ]

  const currentReaction = reactions[selectedReaction]

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Chemical Reactions</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">{gradeLevel === 'low' ? 'Elementary' : 'High School'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Reaction Equation</h3>
            <div className="text-center space-y-4">
              <div className="text-2xl text-white/70 font-mono">
                {balanced ? currentReaction.balanced : currentReaction.unbalanced}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setBalanced(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    !balanced ? 'bg-red-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Unbalanced
                </button>
                <button
                  onClick={() => setBalanced(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    balanced ? 'bg-green-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Balanced
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Reaction Visualization</h3>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <FlaskConical className="w-16 h-16 text-blue-400 mx-auto mb-2" />
                <p className="text-white/70 text-sm">Reactants</p>
                <div className="space-y-1 mt-2">
                  {currentReaction.reactants.map((r, i) => (
                    <p key={i} className="text-white text-xs">{r}</p>
                  ))}
                </div>
              </div>
              
              <ArrowRight className="w-8 h-8 text-yellow-400" />
              
              <div className="text-center">
                <FlaskConical className="w-16 h-16 text-green-400 mx-auto mb-2" />
                <p className="text-white/70 text-sm">Products</p>
                <div className="space-y-1 mt-2">
                  {currentReaction.products.map((p, i) => (
                    <p key={i} className="text-white text-xs">{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-white/70">{currentReaction.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-white font-medium mb-2 block">Select Reaction</label>
            <div className="space-y-2">
              {reactions.map((reaction, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedReaction(index)
                    setBalanced(false)
                  }}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                    selectedReaction === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <div className="font-medium">{reaction.name}</div>
                  <div className="text-sm opacity-70">{reaction.type}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Reaction Type</h3>
            <p className="text-white/70">{currentReaction.type}</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Law of Conservation of Mass</li>
              <li>• Atoms are neither created nor destroyed</li>
              <li>• Same number of each atom on both sides</li>
              <li>• Balance coefficients, not subscripts</li>
            </ul>
          </div>

          {gradeLevel === 'high' && (
            <div className="bg-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-semibold mb-2">Balancing Tips</h3>
              <ul className="text-white/80 text-sm space-y-1">
                <li>• Start with elements that appear once</li>
                <li>• Balance polyatomic ions as groups</li>
                <li>• Save hydrogen and oxygen for last</li>
                <li>• Check your work by counting atoms</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

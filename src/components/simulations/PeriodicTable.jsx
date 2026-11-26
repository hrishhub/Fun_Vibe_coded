import { useState } from 'react'
import { Info, Atom } from 'lucide-react'

const elements = [
  { number: 1, symbol: 'H', name: 'Hydrogen', mass: 1.008, category: 'nonmetal' },
  { number: 2, symbol: 'He', name: 'Helium', mass: 4.003, category: 'noble' },
  { number: 3, symbol: 'Li', name: 'Lithium', mass: 6.941, category: 'alkali' },
  { number: 4, symbol: 'Be', name: 'Beryllium', mass: 9.012, category: 'alkaline' },
  { number: 5, symbol: 'B', name: 'Boron', mass: 10.81, category: 'metalloid' },
  { number: 6, symbol: 'C', name: 'Carbon', mass: 12.01, category: 'nonmetal' },
  { number: 7, symbol: 'N', name: 'Nitrogen', mass: 14.01, category: 'nonmetal' },
  { number: 8, symbol: 'O', name: 'Oxygen', mass: 16.00, category: 'nonmetal' },
  { number: 9, symbol: 'F', name: 'Fluorine', mass: 19.00, category: 'halogen' },
  { number: 10, symbol: 'Ne', name: 'Neon', mass: 20.18, category: 'noble' },
  { number: 11, symbol: 'Na', name: 'Sodium', mass: 22.99, category: 'alkali' },
  { number: 12, symbol: 'Mg', name: 'Magnesium', mass: 24.31, category: 'alkaline' },
  { number: 13, symbol: 'Al', name: 'Aluminum', mass: 26.98, category: 'metal' },
  { number: 14, symbol: 'Si', name: 'Silicon', mass: 28.09, category: 'metalloid' },
  { number: 15, symbol: 'P', name: 'Phosphorus', mass: 30.97, category: 'nonmetal' },
  { number: 16, symbol: 'S', name: 'Sulfur', mass: 32.07, category: 'nonmetal' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', mass: 35.45, category: 'halogen' },
  { number: 18, symbol: 'Ar', name: 'Argon', mass: 39.95, category: 'noble' },
]

const categoryColors = {
  alkali: 'bg-red-500/20 border-red-500',
  alkaline: 'bg-orange-500/20 border-orange-500',
  metal: 'bg-yellow-500/20 border-yellow-500',
  metalloid: 'bg-green-500/20 border-green-500',
  nonmetal: 'bg-blue-500/20 border-blue-500',
  halogen: 'bg-purple-500/20 border-purple-500',
  noble: 'bg-pink-500/20 border-pink-500',
}

export default function PeriodicTable({ gradeLevel }) {
  const [selectedElement, setSelectedElement] = useState(null)

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Periodic Table</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">{gradeLevel === 'low' ? 'Elementary' : 'High School'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <div className="grid grid-cols-9 gap-1">
              {elements.map((element) => (
                <button
                  key={element.number}
                  onClick={() => setSelectedElement(element)}
                  className={`aspect-square rounded-lg border-2 p-1 transition-all hover:scale-110 ${
                    selectedElement?.number === element.number
                      ? 'ring-2 ring-white'
                      : ''
                  } ${categoryColors[element.category]}`}
                >
                  <div className="text-xs text-white/70">{element.number}</div>
                  <div className="text-lg font-bold text-white">{element.symbol}</div>
                  <div className="text-xs text-white/70 truncate">{element.name}</div>
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(categoryColors).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-1">
                  <div className={`w-4 h-4 rounded border-2 ${color}`} />
                  <span className="text-white/70 text-xs capitalize">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {selectedElement ? (
            <div className="bg-slate-900/50 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className={`inline-block px-8 py-8 rounded-xl border-4 ${categoryColors[selectedElement.category]}`}>
                  <div className="text-4xl font-bold text-white mb-2">{selectedElement.symbol}</div>
                  <div className="text-white/70">{selectedElement.name}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/60 text-sm">Atomic Number</p>
                  <p className="text-white text-xl font-bold">{selectedElement.number}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/60 text-sm">Atomic Mass</p>
                  <p className="text-white text-xl font-bold">{selectedElement.mass} u</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/60 text-sm">Category</p>
                  <p className="text-white text-xl font-bold capitalize">{selectedElement.category}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 rounded-xl p-6 text-center">
              <Atom className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/50">Select an element to see details</p>
            </div>
          )}

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Elements arranged by atomic number</li>
              <li>• Groups = columns (similar properties)</li>
              <li>• Periods = rows (same energy level)</li>
              <li>• Metals on left, nonmetals on right</li>
            </ul>
          </div>

          {gradeLevel === 'high' && (
            <div className="bg-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-semibold mb-2">Trends</h3>
              <ul className="text-white/80 text-sm space-y-1">
                <li>• Atomic radius → decreases across period</li>
                <li>• Ionization energy → increases across</li>
                <li>• Electronegativity → increases across</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

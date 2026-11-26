import { useState } from 'react'
import { Info, Microscope } from 'lucide-react'

export default function CellStructure({ gradeLevel }) {
  const [cellType, setCellType] = useState('animal')
  const [selectedOrganelle, setSelectedOrganelle] = useState(null)

  const organelles = {
    animal: [
      { name: 'Nucleus', description: 'Control center containing DNA', color: '#ef4444' },
      { name: 'Mitochondria', description: 'Powerhouse of the cell', color: '#f97316' },
      { name: 'Endoplasmic Reticulum', description: 'Protein synthesis and transport', color: '#eab308' },
      { name: 'Golgi Apparatus', description: 'Package and ship proteins', color: '#22c55e' },
      { name: 'Lysosome', description: 'Digest waste and cellular debris', color: '#3b82f6' },
      { name: 'Cell Membrane', description: 'Controls what enters and exits', color: '#8b5cf6' },
      { name: 'Cytoplasm', description: 'Jelly-like substance filling cell', color: '#ec4899' },
    ],
    plant: [
      { name: 'Nucleus', description: 'Control center containing DNA', color: '#ef4444' },
      { name: 'Mitochondria', description: 'Powerhouse of the cell', color: '#f97316' },
      { name: 'Chloroplast', description: 'Site of photosynthesis', color: '#22c55e' },
      { name: 'Cell Wall', description: 'Rigid outer structure', color: '#eab308' },
      { name: 'Large Vacuole', description: 'Storage of water and nutrients', color: '#3b82f6' },
      { name: 'Cell Membrane', description: 'Controls what enters and exits', color: '#8b5cf6' },
      { name: 'Cytoplasm', description: 'Jelly-like substance filling cell', color: '#ec4899' },
    ],
  }

  const currentOrganelles = organelles[cellType]

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Cell Structure</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">{gradeLevel === 'low' ? 'Elementary' : 'High School'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Cell Type</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => {
                  setCellType('animal')
                  setSelectedOrganelle(null)
                }}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  cellType === 'animal'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Animal Cell
              </button>
              <button
                onClick={() => {
                  setCellType('plant')
                  setSelectedOrganelle(null)
                }}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  cellType === 'plant'
                    ? 'bg-green-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Plant Cell
              </button>
            </div>

            <div className="bg-slate-800 rounded-lg p-8 relative h-80">
              <div className="absolute inset-4 border-4 border-white/30 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <Microscope className="w-16 h-16 text-white/50 mx-auto mb-2" />
                  <p className="text-white/50 text-sm">Interactive Cell Diagram</p>
                </div>
              </div>

              {/* Simplified organelle positions */}
              {currentOrganelles.map((organelle, i) => {
                const positions = [
                  { top: '20%', left: '40%' },
                  { top: '40%', left: '20%' },
                  { top: '60%', left: '60%' },
                  { top: '30%', left: '70%' },
                  { top: '70%', left: '30%' },
                  { top: '50%', left: '50%' },
                  { top: '80%', left: '50%' },
                ]
                const pos = positions[i % positions.length]
                return (
                  <button
                    key={organelle.name}
                    onClick={() => setSelectedOrganelle(organelle)}
                    className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all hover:scale-110 ${
                      selectedOrganelle?.name === organelle.name
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800'
                        : ''
                    }`}
                    style={{
                      backgroundColor: organelle.color,
                      top: pos.top,
                      left: pos.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {organelle.name.slice(0, 3)}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {selectedOrganelle ? (
            <div className="bg-slate-900/50 rounded-xl p-6">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: selectedOrganelle.color }}>
                <Microscope className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">{selectedOrganelle.name}</h3>
              <p className="text-white/70 text-center">{selectedOrganelle.description}</p>
            </div>
          ) : (
            <div className="bg-slate-900/50 rounded-xl p-6 text-center">
              <Microscope className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/50">Click on an organelle to learn more</p>
            </div>
          )}

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Differences</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Plant cells have cell walls</li>
              <li>• Plant cells have chloroplasts</li>
              <li>• Plant cells have large vacuoles</li>
              <li>• Animal cells are more flexible</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Cell Theory</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• All living things made of cells</li>
              <li>• Cells are basic unit of life</li>
              <li>• All cells come from cells</li>
            </ul>
          </div>

          {gradeLevel === 'high' && (
            <div className="bg-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-semibold mb-2">Prokaryote vs Eukaryote</h3>
              <ul className="text-white/80 text-sm space-y-1">
                <li>• Prokaryotes: No nucleus (bacteria)</li>
                <li>• Eukaryotes: Have nucleus (plants, animals)</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

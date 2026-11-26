import { useState } from 'react'
import { Info, Dna } from 'lucide-react'

export default function DNAReplication({ gradeLevel }) {
  const [step, setStep] = useState(0)
  const [speed, setSpeed] = useState(1)

  const steps = [
    {
      title: 'DNA Double Helix',
      description: 'Two strands twisted together in a double helix structure',
      details: 'DNA consists of two complementary strands held together by hydrogen bonds between base pairs.',
    },
    {
      title: 'Unwinding',
      description: 'Helicase enzyme unwinds and separates the DNA strands',
      details: 'The double helix is unwound by helicase, breaking hydrogen bonds between base pairs.',
    },
    {
      title: 'Primer Binding',
      description: 'Primase adds RNA primers to start replication',
      details: 'Short RNA primers are added to provide a starting point for DNA polymerase.',
    },
    {
      title: 'Elongation',
      description: 'DNA polymerase adds new nucleotides to each strand',
      details: 'DNA polymerase adds complementary nucleotides: A pairs with T, C pairs with G.',
    },
    {
      title: 'Lagging Strand',
      description: 'Okazaki fragments are formed on the lagging strand',
      details: 'The lagging strand is synthesized in short fragments called Okazaki fragments.',
    },
    {
      title: 'Completion',
      description: 'Two identical DNA molecules are formed',
      details: 'The result is two identical DNA molecules, each with one old and one new strand.',
    },
  ]

  const bases = ['A', 'T', 'C', 'G']
  const baseColors = {
    A: '#ef4444',
    T: '#3b82f6',
    C: '#22c55e',
    G: '#eab308',
  }

  const renderDNA = () => {
    const strand1 = ['A', 'T', 'C', 'G', 'A', 'T']
    const strand2 = ['T', 'A', 'G', 'C', 'T', 'A']

    return (
      <div className="flex justify-center items-center gap-8 py-8">
        <div className="flex flex-col gap-2">
          {strand1.map((base, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: baseColors[base] }}
            >
              {base}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {strand1.map((_, i) => (
            <div key={i} className="w-8 h-0.5 bg-white/30" />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {strand2.map((base, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: baseColors[base] }}
            >
              {base}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderReplication = () => {
    const originalStrand = ['A', 'T', 'C', 'G', 'A', 'T']
    const newStrand1 = ['T', 'A', 'G', 'C', 'T', 'A']
    const newStrand2 = ['A', 'T', 'C', 'G', 'A', 'T']

    return (
      <div className="flex justify-center items-center gap-4 py-8">
        <div className="flex flex-col gap-2">
          <div className="text-white/50 text-xs text-center mb-2">Original</div>
          {originalStrand.map((base, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: baseColors[base] }}
            >
              {base}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-white/50 text-xs text-center mb-2">New</div>
          {newStrand1.map((base, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-sm opacity-70"
              style={{ backgroundColor: baseColors[base] }}
            >
              {base}
            </div>
          ))}
        </div>
        <div className="w-px h-48 bg-white/20" />
        <div className="flex flex-col gap-2">
          <div className="text-white/50 text-xs text-center mb-2">Original</div>
          {newStrand2.map((base, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: baseColors[base] }}
            >
              {base}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-white/50 text-xs text-center mb-2">New</div>
          {originalStrand.map((base, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-sm opacity-70"
              style={{ backgroundColor: baseColors[base] }}
            >
              {base}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">DNA Replication</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">High School</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Replication Process</h3>
            
            <div className="bg-slate-800 rounded-lg p-6 mb-6">
              {step < 3 ? renderDNA() : renderReplication()}
            </div>

            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                      step === i
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                disabled={step === steps.length - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Step {step + 1}: {steps[step].title}</h4>
              <p className="text-white/70 mb-2">{steps[step].description}</p>
              <p className="text-white/50 text-sm">{steps[step].details}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Base Pairing Rules</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center text-white text-xs font-bold">A</div>
                <span className="text-white/70">pairs with</span>
                <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-bold">T</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center text-white text-xs font-bold">C</div>
                <span className="text-white/70">pairs with</span>
                <div className="w-6 h-6 rounded bg-yellow-500 flex items-center justify-center text-white text-xs font-bold">G</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Enzymes</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Helicase: Unwinds DNA</li>
              <li>• Primase: Adds primers</li>
              <li>• DNA Polymerase: Adds nucleotides</li>
              <li>• Ligase: Joins fragments</li>
            </ul>
          </div>

          <div className="bg-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-300 font-semibold mb-2">Semi-Conservative</h3>
            <p className="text-white/80 text-sm">
              Each new DNA molecule has one original strand and one new strand
            </p>
          </div>

          <div className="bg-purple-500/20 rounded-lg p-4">
            <h3 className="text-purple-300 font-semibold mb-2">Direction</h3>
            <p className="text-white/80 text-sm">
              Replication occurs in 5' to 3' direction
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

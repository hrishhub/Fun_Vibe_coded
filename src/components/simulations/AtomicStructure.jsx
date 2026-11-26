import { useState, useRef, useEffect } from 'react'
import { Info, Plus, Minus } from 'lucide-react'

export default function AtomicStructure({ gradeLevel }) {
  const canvasRef = useRef(null)
  const [element, setElement] = useState('hydrogen')
  const [showElectrons, setShowElectrons] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)

  const elements = {
    hydrogen: { name: 'Hydrogen', symbol: 'H', protons: 1, neutrons: 0, electrons: [1], shells: [1] },
    helium: { name: 'Helium', symbol: 'He', protons: 2, neutrons: 2, electrons: [2], shells: [2] },
    lithium: { name: 'Lithium', symbol: 'Li', protons: 3, neutrons: 4, electrons: [2, 1], shells: [2, 1] },
    carbon: { name: 'Carbon', symbol: 'C', protons: 6, neutrons: 6, electrons: [2, 4], shells: [2, 4] },
    nitrogen: { name: 'Nitrogen', symbol: 'N', protons: 7, neutrons: 7, electrons: [2, 5], shells: [2, 5] },
    oxygen: { name: 'Oxygen', symbol: 'O', protons: 8, neutrons: 8, electrons: [2, 6], shells: [2, 6] },
    sodium: { name: 'Sodium', symbol: 'Na', protons: 11, neutrons: 12, electrons: [2, 8, 1], shells: [2, 8, 1] },
  }

  useEffect(() => {
    let animationFrame
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let time = 0

    const animate = () => {
      time += 0.02 * animationSpeed
      drawAtom(ctx, canvas, elements[element], time)
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => cancelAnimationFrame(animationFrame)
  }, [element, showElectrons, animationSpeed])

  const drawAtom = (ctx, canvas, elem, time) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Draw nucleus
    const nucleusRadius = 30 + (elem.protons + elem.neutrons) * 0.5
    ctx.fillStyle = 'rgba(239, 68, 68, 0.3)'
    ctx.beginPath()
    ctx.arc(centerX, centerY, nucleusRadius, 0, Math.PI * 2)
    ctx.fill()

    // Draw protons and neutrons in nucleus
    const particles = []
    for (let i = 0; i < elem.protons; i++) particles.push({ type: 'proton' })
    for (let i = 0; i < elem.neutrons; i++) particles.push({ type: 'neutron' })

    const particleRadius = 8
    particles.forEach((particle, i) => {
      const angle = (i / particles.length) * Math.PI * 2
      const dist = (i % 2 === 0 ? 0.5 : 0.8) * nucleusRadius * 0.7
      const x = centerX + Math.cos(angle) * dist
      const y = centerY + Math.sin(angle) * dist

      ctx.fillStyle = particle.type === 'proton' ? '#ef4444' : '#6b7280'
      ctx.beginPath()
      ctx.arc(x, y, particleRadius, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 8px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(particle.type === 'proton' ? '+' : '0', x, y)
    })

    // Draw electron shells
    if (showElectrons) {
      elem.shells.forEach((electronCount, shellIndex) => {
        const shellRadius = 60 + shellIndex * 35
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(centerX, centerY, shellRadius, 0, Math.PI * 2)
        ctx.stroke()

        // Draw electrons on shell
        for (let i = 0; i < electronCount; i++) {
          const angle = (i / electronCount) * Math.PI * 2 + time * (1 - shellIndex * 0.2)
          const x = centerX + Math.cos(angle) * shellRadius
          const y = centerY + Math.sin(angle) * shellRadius

          ctx.fillStyle = '#3b82f6'
          ctx.beginPath()
          ctx.arc(x, y, 6, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 8px sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('-', x, y)
        }
      })
    }

    // Draw legend
    ctx.fillStyle = '#ffffff'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(`${elem.name} (${elem.symbol})`, 20, 30)
    ctx.fillText(`Protons: ${elem.protons}`, 20, 50)
    ctx.fillText(`Neutrons: ${elem.neutrons}`, 20, 70)
    ctx.fillText(`Electrons: ${elem.electrons.reduce((a, b) => a + b, 0)}`, 20, 90)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Atomic Structure</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">{gradeLevel === 'low' ? 'Elementary' : 'High School'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="w-full bg-slate-900/50 rounded-xl"
          />
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-white font-medium mb-2 block">Select Element</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(elements).map((key) => (
                <button
                  key={key}
                  onClick={() => setElement(key)}
                  className={`px-3 py-2 rounded-lg font-medium transition-all ${
                    element === key
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {elements[key].symbol} - {elements[key].name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">Animation Speed</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAnimationSpeed(Math.max(0.1, animationSpeed - 0.2))}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-white"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white w-12 text-center">{animationSpeed.toFixed(1)}x</span>
              <button
                onClick={() => setAnimationSpeed(Math.min(3, animationSpeed + 0.2))}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showElectrons"
              checked={showElectrons}
              onChange={(e) => setShowElectrons(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="showElectrons" className="text-white">Show Electron Shells</label>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Element Info</h3>
            <div className="text-white/70 text-sm space-y-1">
              <p><strong>Symbol:</strong> {elements[element].symbol}</p>
              <p><strong>Atomic Number:</strong> {elements[element].protons}</p>
              <p><strong>Mass Number:</strong> {elements[element].protons + elements[element].neutrons}</p>
              <p><strong>Electron Configuration:</strong> {elements[element].electrons.join('-')}</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Protons (red) = positive charge</li>
              <li>• Neutrons (gray) = no charge</li>
              <li>• Electrons (blue) = negative charge</li>
              <li>• Electrons orbit in shells</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

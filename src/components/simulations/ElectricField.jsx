import { useState, useRef, useEffect } from 'react'
import { Info, Plus, Minus } from 'lucide-react'

export default function ElectricField({ gradeLevel }) {
  const canvasRef = useRef(null)
  const [charges, setCharges] = useState([
    { x: 200, y: 200, q: 1 },
    { x: 400, y: 200, q: -1 },
  ])
  const [selectedCharge, setSelectedCharge] = useState(null)
  const [showFieldLines, setShowFieldLines] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    drawField(ctx, canvas)
  }, [charges, showFieldLines])

  const drawField = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw field lines
    if (showFieldLines) {
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)'
      ctx.lineWidth = 1
      
      for (let charge of charges) {
        if (charge.q > 0) {
          for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
            drawFieldLine(ctx, canvas, charge, angle)
          }
        }
      }
    }

    // Draw charges
    charges.forEach((charge, index) => {
      const color = charge.q > 0 ? '#ef4444' : '#3b82f6'
      const gradient = ctx.createRadialGradient(charge.x, charge.y, 0, charge.x, charge.y, 25)
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, 'transparent')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(charge.x, charge.y, 25, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(charge.x, charge.y, 15, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = charge.q > 0 ? '#ef4444' : '#3b82f6'
      ctx.font = 'bold 20px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(charge.q > 0 ? '+' : '-', charge.x, charge.y)
    })

    // Draw legend
    ctx.fillStyle = '#ffffff'
    ctx.font = '14px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('Click to add charges', 20, 30)
    ctx.fillText('Right-click to remove', 20, 50)
  }

  const drawFieldLine = (ctx, canvas, startCharge, startAngle) => {
    let x = startCharge.x + Math.cos(startAngle) * 20
    let y = startCharge.y + Math.sin(startAngle) * 20
    const stepSize = 5
    const maxSteps = 500

    ctx.beginPath()
    ctx.moveTo(x, y)

    for (let i = 0; i < maxSteps; i++) {
      let Ex = 0, Ey = 0
      
      charges.forEach(charge => {
        const dx = x - charge.x
        const dy = y - charge.y
        const distSq = dx * dx + dy * dy
        const dist = Math.sqrt(distSq)
        
        if (dist < 20) return
        
        const E = charge.q / distSq
        Ex += E * dx / dist
        Ey += E * dy / dist
      })

      const E = Math.sqrt(Ex * Ex + Ey * Ey)
      if (E === 0) break
      
      x += (Ex / E) * stepSize
      y += (Ey / E) * stepSize

      ctx.lineTo(x, y)

      if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) break
      
      let hitCharge = false
      charges.forEach(charge => {
        const dx = x - charge.x
        const dy = y - charge.y
        if (dx * dx + dy * dy < 400) hitCharge = true
      })
      if (hitCharge) break
    }

    ctx.stroke()
  }

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvas.width / rect.width)
    const y = (e.clientY - rect.top) * (canvas.height / rect.height)

    if (e.button === 2) {
      // Right click - remove nearby charge
      setCharges(charges.filter(c => {
        const dx = c.x - x
        const dy = c.y - y
        return Math.sqrt(dx * dx + dy * dy) > 30
      }))
    } else {
      // Left click - add charge
      const newCharge = { x, y, q: 1 }
      setCharges([...charges, newCharge])
    }
  }

  const toggleChargeSign = (index) => {
    const newCharges = [...charges]
    newCharges[index].q *= -1
    setCharges(newCharges)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Electric Field</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">High School</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="w-full bg-slate-900/50 rounded-xl cursor-crosshair"
            onClick={handleCanvasClick}
            onContextMenu={(e) => {
              e.preventDefault()
              handleCanvasClick(e)
            }}
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showFieldLines"
              checked={showFieldLines}
              onChange={(e) => setShowFieldLines(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="showFieldLines" className="text-white">Show Field Lines</label>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Charges</h3>
            <div className="space-y-2">
              {charges.map((charge, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    charge.q > 0 ? 'bg-red-500' : 'bg-blue-500'
                  }`}>
                    {charge.q > 0 ? <Plus className="w-4 h-4 text-white" /> : <Minus className="w-4 h-4 text-white" />}
                  </span>
                  <span className="text-white/70 text-sm flex-1">
                    Charge {index + 1}: {charge.q > 0 ? '+' : ''}{charge.q}
                  </span>
                  <button
                    onClick={() => toggleChargeSign(index)}
                    className="px-2 py-1 bg-white/10 rounded text-white text-xs hover:bg-white/20"
                  >
                    Flip
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCharges([])}
            className="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
          >
            Clear All Charges
          </button>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Electric field lines start on + charges</li>
              <li>• Field lines end on - charges</li>
              <li>• Field strength ∝ line density</li>
              <li>• Coulomb's Law: F = kq₁q₂/r²</li>
            </ul>
          </div>

          <div className="bg-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-300 font-semibold mb-2">Instructions</h3>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• Left-click to add + charge</li>
              <li>• Right-click to remove charge</li>
              <li>• Use "Flip" to change sign</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import { Info, Zap } from 'lucide-react'

export default function MagneticField({ gradeLevel }) {
  const canvasRef = useRef(null)
  const [current, setCurrent] = useState(5)
  const [showField, setShowField] = useState(true)
  const [wirePosition, setWirePosition] = useState('center')

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    drawMagneticField(ctx, canvas)
  }, [current, showField, wirePosition])

  const drawMagneticField = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const wireX = wirePosition === 'center' ? centerX : wirePosition === 'left' ? 150 : 450

    // Draw wire
    ctx.strokeStyle = '#fbbf24'
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.moveTo(wireX, 0)
    ctx.lineTo(wireX, canvas.height)
    ctx.stroke()

    // Draw current direction arrow
    if (current > 0) {
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.moveTo(wireX - 10, centerY - 20)
      ctx.lineTo(wireX + 10, centerY - 20)
      ctx.lineTo(wireX, centerY)
      ctx.closePath()
      ctx.fill()
    } else {
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.moveTo(wireX - 10, centerY + 20)
      ctx.lineTo(wireX + 10, centerY + 20)
      ctx.lineTo(wireX, centerY)
      ctx.closePath()
      ctx.fill()
    }

    // Draw magnetic field circles
    if (showField) {
      const fieldStrength = Math.abs(current) / 5
      ctx.strokeStyle = `rgba(96, 165, 250, ${0.3 + fieldStrength * 0.1})`
      ctx.lineWidth = 2

      for (let r = 30; r < 300; r += 30) {
        ctx.beginPath()
        ctx.arc(wireX, centerY, r, 0, Math.PI * 2)
        ctx.stroke()

        // Draw field direction indicators
        const numIndicators = Math.floor(r / 20)
        for (let i = 0; i < numIndicators; i++) {
          const angle = (i / numIndicators) * Math.PI * 2
          const x = wireX + r * Math.cos(angle)
          const y = centerY + r * Math.sin(angle)
          
          // Draw X or dot based on current direction
          ctx.fillStyle = '#60a5fa'
          ctx.font = '12px sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          
          if (current > 0) {
            // Current up - field counter-clockwise
            const tangentAngle = angle + Math.PI / 2
            const arrowSize = 8
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x + arrowSize * Math.cos(tangentAngle), y + arrowSize * Math.sin(tangentAngle))
            ctx.stroke()
          } else {
            // Current down - field clockwise
            const tangentAngle = angle - Math.PI / 2
            const arrowSize = 8
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x + arrowSize * Math.cos(tangentAngle), y + arrowSize * Math.sin(tangentAngle))
            ctx.stroke()
          }
        }
      }
    }

    // Draw labels
    ctx.fillStyle = '#ffffff'
    ctx.font = '14px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(`Current: ${current} A`, 20, 30)
    ctx.fillText(current > 0 ? 'Direction: UP ↑' : 'Direction: DOWN ↓', 20, 50)
    
    // Draw compass at a point
    const compassX = wireX + 150
    const compassY = centerY
    const distFromWire = 150
    const B = (current > 0 ? 1 : -1) * Math.abs(current) / distFromWire
    
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(compassX, compassY, 30, 0, Math.PI * 2)
    ctx.stroke()
    
    // Compass needle
    const needleAngle = current > 0 ? Math.PI / 2 : -Math.PI / 2
    ctx.save()
    ctx.translate(compassX, compassY)
    ctx.rotate(needleAngle)
    
    ctx.fillStyle = '#ef4444'
    ctx.beginPath()
    ctx.moveTo(0, -25)
    ctx.lineTo(8, 0)
    ctx.lineTo(-8, 0)
    ctx.closePath()
    ctx.fill()
    
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.moveTo(0, 25)
    ctx.lineTo(8, 0)
    ctx.lineTo(-8, 0)
    ctx.closePath()
    ctx.fill()
    
    ctx.restore()
    
    ctx.fillStyle = '#ffffff'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Compass', compassX, compassY + 50)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Magnetic Field</h2>
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
            className="w-full bg-slate-900/50 rounded-xl"
          />
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-white font-medium mb-2 block">
              Current: {current} A
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              value={current}
              onChange={(e) => setCurrent(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-white/50 text-xs mt-1">
              <span>-10A (Down)</span>
              <span>0</span>
              <span>+10A (Up)</span>
            </div>
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">Wire Position</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setWirePosition('left')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  wirePosition === 'left' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Left
              </button>
              <button
                onClick={() => setWirePosition('center')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  wirePosition === 'center' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Center
              </button>
              <button
                onClick={() => setWirePosition('right')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  wirePosition === 'right' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Right
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showField"
              checked={showField}
              onChange={(e) => setShowField(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="showField" className="text-white">Show Field Lines</label>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Current creates magnetic field</li>
              <li>• Right-hand rule applies</li>
              <li>• Field strength ∝ current</li>
              <li>• Field strength ∝ 1/distance</li>
            </ul>
          </div>

          <div className="bg-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-300 font-semibold mb-2">Right-Hand Rule</h3>
            <p className="text-white/80 text-sm">
              Point thumb in current direction, fingers curl in magnetic field direction
            </p>
          </div>

          {gradeLevel === 'high' && (
            <div className="bg-purple-500/20 rounded-lg p-4">
              <h3 className="text-purple-300 font-semibold mb-2">Formula</h3>
              <p className="text-white/80 text-sm">
                B = μ₀I / (2πr)
              </p>
              <p className="text-white/60 text-xs mt-1">
                B = magnetic field, I = current, r = distance
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

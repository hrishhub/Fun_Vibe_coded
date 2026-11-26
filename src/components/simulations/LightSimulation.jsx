import { useState, useRef, useEffect } from 'react'
import { Play, Pause, RotateCcw, Info } from 'lucide-react'

export default function LightSimulation({ gradeLevel }) {
  const canvasRef = useRef(null)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState('reflection')
  const [angle, setAngle] = useState(45)
  const [refractiveIndex, setRefractiveIndex] = useState(1.5)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    drawSimulation(ctx, canvas)
  }, [mode, angle, refractiveIndex])

  const drawSimulation = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    if (mode === 'reflection') {
      // Draw mirror
      ctx.strokeStyle = '#60a5fa'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(centerX - 150, centerY + 100)
      ctx.lineTo(centerX + 150, centerY + 100)
      ctx.stroke()

      // Mirror hatch marks
      ctx.strokeStyle = '#60a5fa'
      ctx.lineWidth = 2
      for (let i = -140; i <= 140; i += 20) {
        ctx.beginPath()
        ctx.moveTo(centerX + i, centerY + 100)
        ctx.lineTo(centerX + i - 10, centerY + 115)
        ctx.stroke()
      }

      // Normal line
      ctx.strokeStyle = '#9ca3af'
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - 150)
      ctx.lineTo(centerX, centerY + 100)
      ctx.stroke()
      ctx.setLineDash([])

      // Incident ray
      const angleRad = (angle * Math.PI) / 180
      const incidentLength = 120
      const incidentX = centerX - incidentLength * Math.sin(angleRad)
      const incidentY = centerY - incidentLength * Math.cos(angleRad)

      ctx.strokeStyle = '#fbbf24'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(incidentX, incidentY)
      ctx.lineTo(centerX, centerY)
      ctx.stroke()

      // Arrow on incident ray
      drawArrow(ctx, incidentX, incidentY, centerX, centerY, '#fbbf24')

      // Reflected ray
      const reflectedX = centerX + incidentLength * Math.sin(angleRad)
      const reflectedY = centerY - incidentLength * Math.cos(angleRad)

      ctx.strokeStyle = '#f87171'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(reflectedX, reflectedY)
      ctx.stroke()

      drawArrow(ctx, centerX, centerY, reflectedX, reflectedY, '#f87171')

      // Angle labels
      ctx.fillStyle = '#ffffff'
      ctx.font = '14px sans-serif'
      ctx.fillText(`i = ${angle}°`, centerX - 60, centerY - 20)
      ctx.fillText(`r = ${angle}°`, centerX + 20, centerY - 20)

    } else if (mode === 'refraction') {
      // Draw medium boundary
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'
      ctx.fillRect(0, centerY, canvas.width, canvas.height / 2)
      
      ctx.strokeStyle = '#60a5fa'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(0, centerY)
      ctx.lineTo(canvas.width, centerY)
      ctx.stroke()

      // Normal line
      ctx.strokeStyle = '#9ca3af'
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(centerX, 0)
      ctx.lineTo(centerX, canvas.height)
      ctx.stroke()
      ctx.setLineDash([])

      // Incident ray (air to medium)
      const angleRad = (angle * Math.PI) / 180
      const incidentLength = 100
      const incidentX = centerX - incidentLength * Math.sin(angleRad)
      const incidentY = centerY - incidentLength * Math.cos(angleRad)

      ctx.strokeStyle = '#fbbf24'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(incidentX, incidentY)
      ctx.lineTo(centerX, centerY)
      ctx.stroke()
      drawArrow(ctx, incidentX, incidentY, centerX, centerY, '#fbbf24')

      // Refracted ray
      const refractedAngle = Math.asin(Math.sin(angleRad) / refractiveIndex)
      const refractedLength = 100
      const refractedX = centerX + refractedLength * Math.sin(refractedAngle)
      const refractedY = centerY + refractedLength * Math.cos(refractedAngle)

      ctx.strokeStyle = '#34d399'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(refractedX, refractedY)
      ctx.stroke()
      drawArrow(ctx, centerX, centerY, refractedX, refractedY, '#34d399')

      // Labels
      ctx.fillStyle = '#ffffff'
      ctx.font = '14px sans-serif'
      ctx.fillText(`Air (n=1.0)`, 20, centerY - 20)
      ctx.fillText(`Medium (n=${refractiveIndex})`, 20, centerY + 30)
      const refractedAngleDeg = (refractedAngle * 180) / Math.PI
      ctx.fillText(`i = ${angle}°`, centerX - 70, centerY - 20)
      ctx.fillText(`r = ${refractedAngleDeg.toFixed(1)}°`, centerX + 20, centerY + 30)

    } else if (mode === 'prism') {
      // Draw prism
      ctx.fillStyle = 'rgba(139, 92, 246, 0.3)'
      ctx.strokeStyle = '#a78bfa'
      ctx.lineWidth = 3
      
      const prismSize = 120
      const prismTop = { x: centerX, y: centerY - prismSize }
      const prismLeft = { x: centerX - prismSize * 0.866, y: centerY + prismSize * 0.5 }
      const prismRight = { x: centerX + prismSize * 0.866, y: centerY + prismSize * 0.5 }

      ctx.beginPath()
      ctx.moveTo(prismTop.x, prismTop.y)
      ctx.lineTo(prismRight.x, prismRight.y)
      ctx.lineTo(prismLeft.x, prismLeft.y)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Incident white light
      const incidentAngle = 30
      const incidentRad = (incidentAngle * Math.PI) / 180
      const incidentStart = { x: centerX - 150, y: centerY - 100 }
      const incidentEnd = { x: centerX - 40, y: centerY - 20 }

      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(incidentStart.x, incidentStart.y)
      ctx.lineTo(incidentEnd.x, incidentEnd.y)
      ctx.stroke()
      drawArrow(ctx, incidentStart.x, incidentStart.y, incidentEnd.x, incidentEnd.y, '#ffffff')

      // Dispersed light (rainbow)
      const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3']
      const exitPoint = { x: centerX + 40, y: centerY - 20 }
      
      colors.forEach((color, i) => {
        const spreadAngle = (i - 3) * 3
        const spreadRad = (spreadAngle * Math.PI) / 180
        const endX = exitPoint.x + 100 * Math.cos(spreadRad)
        const endY = exitPoint.y + 100 * Math.sin(spreadRad)
        
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(exitPoint.x, exitPoint.y)
        ctx.lineTo(endX, endY)
        ctx.stroke()
      })

      ctx.fillStyle = '#ffffff'
      ctx.font = '14px sans-serif'
      ctx.fillText('White Light', incidentStart.x - 60, incidentStart.y)
      ctx.fillText('Dispersion', exitPoint.x + 20, exitPoint.y - 30)
    }
  }

  const drawArrow = (ctx, fromX, fromY, toX, toY, color) => {
    const headLength = 10
    const angle = Math.atan2(toY - fromY, toX - fromX)
    
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(toX, toY)
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6))
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6))
    ctx.closePath()
    ctx.fill()
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Light & Optics Simulation</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">
            {gradeLevel === 'low' ? 'Elementary' : 'High School'}
          </span>
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
            <label className="text-white font-medium mb-2 block">Mode</label>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setMode('reflection')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  mode === 'reflection' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Reflection
              </button>
              <button
                onClick={() => setMode('refraction')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  mode === 'refraction' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Refraction
              </button>
              <button
                onClick={() => setMode('prism')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  mode === 'prism' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Prism Dispersion
              </button>
            </div>
          </div>

          {mode !== 'prism' && (
            <div>
              <label className="text-white font-medium mb-2 block">
                Incident Angle: {angle}°
              </label>
              <input
                type="range"
                min="0"
                max="80"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {mode === 'refraction' && gradeLevel === 'high' && (
            <div>
              <label className="text-white font-medium mb-2 block">
                Refractive Index: {refractiveIndex}
              </label>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.1"
                value={refractiveIndex}
                onChange={(e) => setRefractiveIndex(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              {mode === 'reflection' && (
                <>
                  <li>• Angle of incidence = Angle of reflection</li>
                  <li>• Light bounces off a mirror</li>
                </>
              )}
              {mode === 'refraction' && (
                <>
                  <li>• Light bends when entering a new medium</li>
                  <li>• Snell's Law: n₁sin(i) = n₂sin(r)</li>
                </>
              )}
              {mode === 'prism' && (
                <>
                  <li>• White light splits into colors</li>
                  <li>• Different colors bend by different amounts</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

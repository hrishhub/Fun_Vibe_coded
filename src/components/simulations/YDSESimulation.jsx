import { useState, useRef, useEffect } from 'react'
import { Play, Pause, RotateCcw, Info } from 'lucide-react'

export default function YDSESimulation({ gradeLevel }) {
  const canvasRef = useRef(null)
  const [wavelength, setWavelength] = useState(500)
  const [slitDistance, setSlitDistance] = useState(0.5)
  const [screenDistance, setScreenDistance] = useState(2)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    drawSimulation(ctx, canvas)
  }, [wavelength, slitDistance, screenDistance])

  const drawSimulation = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    
    // Draw light source
    ctx.fillStyle = '#fbbf24'
    ctx.beginPath()
    ctx.arc(50, centerY, 15, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = '12px sans-serif'
    ctx.fillText('Source', 30, centerY + 30)

    // Draw double slit barrier
    ctx.fillStyle = '#374151'
    ctx.fillRect(150, 0, 10, canvas.height)
    
    // Draw slits
    const slitGap = slitDistance * 20
    ctx.fillStyle = '#000000'
    ctx.fillRect(150, centerY - slitGap - 10, 10, 20)
    ctx.fillRect(150, centerY + slitGap - 10, 10, 20)

    // Draw screen
    ctx.fillStyle = '#1e3a5f'
    ctx.fillRect(canvas.width - 50, 0, 50, canvas.height)
    ctx.fillStyle = '#ffffff'
    ctx.font = '12px sans-serif'
    ctx.fillText('Screen', canvas.width - 45, canvas.height - 20)

    // Draw waves from source to slits
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)'
    ctx.lineWidth = 1
    for (let i = 0; i < 5; i++) {
      const radius = 20 + i * 25
      ctx.beginPath()
      ctx.arc(50, centerY, radius, -Math.PI / 4, Math.PI / 4)
      ctx.stroke()
    }

    // Draw waves from slits to screen
    const slit1Y = centerY - slitGap
    const slit2Y = centerY + slitGap
    
    ctx.strokeStyle = `rgba(${getWavelengthColor(wavelength)}, 0.4)`
    ctx.lineWidth = 1
    
    for (let i = 0; i < 8; i++) {
      const radius = 15 + i * 30
      
      // From slit 1
      ctx.beginPath()
      ctx.arc(160, slit1Y, radius, -Math.PI / 3, Math.PI / 3)
      ctx.stroke()
      
      // From slit 2
      ctx.beginPath()
      ctx.arc(160, slit2Y, radius, -Math.PI / 3, Math.PI / 3)
      ctx.stroke()
    }

    // Draw interference pattern on screen
    drawInterferencePattern(ctx, canvas, wavelength, slitDistance, screenDistance)

    // Draw intensity graph below
    drawIntensityGraph(ctx, canvas, wavelength, slitDistance, screenDistance)
  }

  const getWavelengthColor = (nm) => {
    if (nm < 450) return '138, 43, 226'
    if (nm < 495) return '0, 0, 255'
    if (nm < 570) return '0, 255, 0'
    if (nm < 590) return '255, 255, 0'
    if (nm < 620) return '255, 165, 0'
    return '255, 0, 0'
  }

  const drawInterferencePattern = (ctx, canvas, wavelength, slitDistance, screenDistance) => {
    const screenX = canvas.width - 50
    const patternHeight = canvas.height - 100
    const startY = 50
    const centerY = canvas.height / 2
    
    const beta = (Math.PI * slitDistance * 1e-3) / (wavelength * 1e-9 * screenDistance)
    
    for (let y = startY; y < startY + patternHeight; y++) {
      const distanceFromCenter = (y - centerY) * 0.001
      const theta = Math.atan(distanceFromCenter / screenDistance)
      const phi = (Math.PI * slitDistance * 1e-3 * Math.sin(theta)) / (wavelength * 1e-9)
      
      let intensity
      if (phi === 0) {
        intensity = 1
      } else {
        intensity = Math.pow(Math.sin(phi) / phi, 2)
      }
      
      const brightness = Math.floor(intensity * 255)
      ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`
      ctx.fillRect(screenX, y, 40, 1)
    }
  }

  const drawIntensityGraph = (ctx, canvas, wavelength, slitDistance, screenDistance) => {
    const graphY = canvas.height - 80
    const graphWidth = canvas.width - 250
    const graphHeight = 60
    const startX = 180
    
    // Draw axes
    ctx.strokeStyle = '#9ca3af'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(startX, graphY)
    ctx.lineTo(startX + graphWidth, graphY)
    ctx.moveTo(startX, graphY)
    ctx.lineTo(startX, graphY - graphHeight)
    ctx.stroke()

    // Draw intensity curve
    ctx.strokeStyle = `rgb(${getWavelengthColor(wavelength)})`
    ctx.lineWidth = 2
    ctx.beginPath()
    
    for (let x = 0; x <= graphWidth; x++) {
      const normalizedX = (x - graphWidth / 2) / (graphWidth / 2)
      const theta = normalizedX * 0.1
      const phi = (Math.PI * slitDistance * 1e-3 * Math.sin(theta)) / (wavelength * 1e-9)
      
      let intensity
      if (phi === 0) {
        intensity = 1
      } else {
        intensity = Math.pow(Math.sin(phi) / phi, 2)
      }
      
      const plotY = graphY - intensity * graphHeight
      
      if (x === 0) {
        ctx.moveTo(startX + x, plotY)
      } else {
        ctx.lineTo(startX + x, plotY)
      }
    }
    ctx.stroke()

    ctx.fillStyle = '#ffffff'
    ctx.font = '11px sans-serif'
    ctx.fillText('Intensity', startX + 5, graphY - graphHeight - 5)
    ctx.fillText('Position', startX + graphWidth - 30, graphY + 15)
  }

  const getWavelengthName = (nm) => {
    if (nm < 450) return 'Violet'
    if (nm < 495) return 'Blue'
    if (nm < 570) return 'Green'
    if (nm < 590) return 'Yellow'
    if (nm < 620) return 'Orange'
    return 'Red'
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Young's Double Slit Experiment</h2>
        <div className="flex items-center gap-2 text-white/70">
          <Info className="w-5 h-5" />
          <span className="text-sm">High School</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <canvas
            ref={canvasRef}
            width={700}
            height={400}
            className="w-full bg-slate-900/50 rounded-xl"
          />
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-white font-medium mb-2 block">
              Wavelength: {wavelength}nm ({getWavelengthName(wavelength)})
            </label>
            <input
              type="range"
              min="400"
              max="700"
              value={wavelength}
              onChange={(e) => setWavelength(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-white/50 text-xs mt-1">
              <span>Violet (400nm)</span>
              <span>Red (700nm)</span>
            </div>
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">
              Slit Distance: {slitDistance}mm
            </label>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.1"
              value={slitDistance}
              onChange={(e) => setSlitDistance(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">
              Screen Distance: {screenDistance}m
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={screenDistance}
              onChange={(e) => setScreenDistance(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Light behaves as a wave</li>
              <li>• Constructive interference = bright fringes</li>
              <li>• Destructive interference = dark fringes</li>
              <li>• Fringe spacing λD/d</li>
            </ul>
          </div>

          {gradeLevel === 'high' && (
            <div className="bg-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-semibold mb-2">Formula</h3>
              <p className="text-white/80 text-sm">
                Fringe width: β = λD/d
              </p>
              <p className="text-white/60 text-xs mt-1">
                λ = wavelength, D = screen distance, d = slit separation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

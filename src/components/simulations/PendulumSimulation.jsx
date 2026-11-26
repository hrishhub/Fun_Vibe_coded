import { useState, useRef, useEffect } from 'react'
import { Play, Pause, RotateCcw, Info } from 'lucide-react'

export default function PendulumSimulation({ gradeLevel }) {
  const canvasRef = useRef(null)
  const [isRunning, setIsRunning] = useState(false)
  const [length, setLength] = useState(200)
  const [mass, setMass] = useState(1)
  const [gravity, setGravity] = useState(9.8)
  const [angle, setAngle] = useState(45)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let animationFrame
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const animate = () => {
      if (isRunning) {
        setTime(time + 0.016)
      }
      drawPendulum(ctx, canvas)
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => cancelAnimationFrame(animationFrame)
  }, [isRunning, length, mass, gravity, angle, time])

  const drawPendulum = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const pivotX = canvas.width / 2
    const pivotY = 50
    const currentAngle = angle * Math.cos(Math.sqrt(gravity / (length / 100)) * time)
    const angleRad = (currentAngle * Math.PI) / 180
    
    const bobX = pivotX + length * Math.sin(angleRad)
    const bobY = pivotY + length * Math.cos(angleRad)

    // Draw pivot point
    ctx.fillStyle = '#9ca3af'
    ctx.beginPath()
    ctx.arc(pivotX, pivotY, 8, 0, Math.PI * 2)
    ctx.fill()

    // Draw string
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(pivotX, pivotY)
    ctx.lineTo(bobX, bobY)
    ctx.stroke()

    // Draw bob
    const bobRadius = 15 + mass * 5
    const gradient = ctx.createRadialGradient(bobX, bobY, 0, bobX, bobY, bobRadius)
    gradient.addColorStop(0, '#60a5fa')
    gradient.addColorStop(1, '#3b82f6')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2)
    ctx.fill()

    // Draw arc path
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.arc(pivotX, pivotY, length, (Math.PI / 2) - (angle * Math.PI / 180), (Math.PI / 2) + (angle * Math.PI / 180))
    ctx.stroke()
    ctx.setLineDash([])

    // Draw equilibrium line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(pivotX, pivotY)
    ctx.lineTo(pivotX, pivotY + length + 50)
    ctx.stroke()

    // Display info
    ctx.fillStyle = '#ffffff'
    ctx.font = '14px sans-serif'
    ctx.fillText(`Length: ${length} cm`, 20, 30)
    ctx.fillText(`Mass: ${mass} kg`, 20, 50)
    ctx.fillText(`Angle: ${currentAngle.toFixed(1)}°`, 20, 70)

    // Calculate and display period
    const period = 2 * Math.PI * Math.sqrt((length / 100) / gravity)
    ctx.fillText(`Period: ${period.toFixed(2)} s`, 20, 90)
  }

  const reset = () => {
    setTime(0)
    setIsRunning(false)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Simple Pendulum</h2>
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
          <div className="flex gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                isRunning ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 rounded-lg font-medium bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">
              Length: {length} cm
            </label>
            <input
              type="range"
              min="50"
              max="300"
              value={length}
              onChange={(e) => {
                setLength(parseInt(e.target.value))
                setTime(0)
                setIsRunning(false)
              }}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">
              Mass: {mass} kg
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={mass}
              onChange={(e) => setMass(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">
              Initial Angle: {angle}°
            </label>
            <input
              type="range"
              min="10"
              max="60"
              value={angle}
              onChange={(e) => {
                setAngle(parseInt(e.target.value))
                setTime(0)
                setIsRunning(false)
              }}
              className="w-full"
            />
          </div>

          {gradeLevel === 'high' && (
            <div>
              <label className="text-white font-medium mb-2 block">
                Gravity: {gravity} m/s²
              </label>
              <input
                type="range"
                min="1.6"
                max="20"
                step="0.1"
                value={gravity}
                onChange={(e) => setGravity(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-white/50 text-xs mt-1">
                <span>Moon (1.6)</span>
                <span>Earth (9.8)</span>
                <span>Jupiter (24.8)</span>
              </div>
            </div>
          )}

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Period = 2π√(L/g)</li>
              <li>• Independent of mass (for small angles)</li>
              <li>• Longer pendulum = slower oscillation</li>
              <li>• Simple Harmonic Motion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, RotateCcw, Info } from 'lucide-react'

export default function ProjectileMotion({ gradeLevel }) {
  const canvasRef = useRef(null)
  const [isRunning, setIsRunning] = useState(false)
  const [velocity, setVelocity] = useState(50)
  const [angle, setAngle] = useState(45)
  const [gravity, setGravity] = useState(9.8)
  const [time, setTime] = useState(0)
  const [trajectory, setTrajectory] = useState([])

  useEffect(() => {
    let animationFrame
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const animate = () => {
      if (isRunning) {
        setTime(time + 0.016)
        calculateTrajectory()
      }
      drawSimulation(ctx, canvas)
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => cancelAnimationFrame(animationFrame)
  }, [isRunning, velocity, angle, gravity, time, trajectory])

  const calculateTrajectory = () => {
    const v0 = velocity
    const theta = (angle * Math.PI) / 180
    const g = gravity
    const points = []

    for (let t = 0; t <= 10; t += 0.1) {
      const x = v0 * Math.cos(theta) * t
      const y = v0 * Math.sin(theta) * t - 0.5 * g * t * t
      if (y < 0) break
      points.push({ x, y })
    }
    setTrajectory(points)
  }

  const drawSimulation = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const scale = 3
    const groundY = canvas.height - 50
    const startX = 50

    // Draw ground
    ctx.fillStyle = '#4ade80'
    ctx.fillRect(0, groundY, canvas.width, 50)
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, groundY)
      ctx.stroke()
    }
    for (let i = 0; i < groundY; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw trajectory
    if (trajectory.length > 0) {
      ctx.strokeStyle = '#60a5fa'
      ctx.lineWidth = 2
      ctx.beginPath()
      trajectory.forEach((point, i) => {
        const x = startX + point.x * scale
        const y = groundY - point.y * scale
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.stroke()
    }

    // Draw current projectile position
    const v0 = velocity
    const theta = (angle * Math.PI) / 180
    const g = gravity
    const currentTime = isRunning ? time : 0
    const currentX = v0 * Math.cos(theta) * currentTime
    const currentY = v0 * Math.sin(theta) * currentTime - 0.5 * g * currentTime * currentTime
    
    if (currentY >= 0) {
      const projX = startX + currentX * scale
      const projY = groundY - currentY * scale
      
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.arc(projX, projY, 8, 0, Math.PI * 2)
      ctx.fill()

      // Draw velocity vector
      const vx = v0 * Math.cos(theta)
      const vy = v0 * Math.sin(theta) - g * currentTime
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(projX, projY)
      ctx.lineTo(projX + vx * 0.5, projY - vy * 0.5)
      ctx.stroke()
    }

    // Draw cannon
    ctx.fillStyle = '#6b7280'
    ctx.save()
    ctx.translate(startX, groundY)
    ctx.rotate(-theta)
    ctx.fillRect(0, -10, 40, 20)
    ctx.restore()

    // Display info
    ctx.fillStyle = '#ffffff'
    ctx.font = '14px sans-serif'
    ctx.fillText(`Velocity: ${velocity} m/s`, 20, 30)
    ctx.fillText(`Angle: ${angle}°`, 20, 50)
    ctx.fillText(`Gravity: ${gravity} m/s²`, 20, 70)
    
    const maxRange = (v0 * v0 * Math.sin(2 * theta)) / g
    const maxHeight = (v0 * v0 * Math.sin(theta) * Math.sin(theta)) / (2 * g)
    const flightTime = (2 * v0 * Math.sin(theta)) / g
    
    ctx.fillText(`Max Range: ${maxRange.toFixed(1)} m`, 20, 100)
    ctx.fillText(`Max Height: ${maxHeight.toFixed(1)} m`, 20, 120)
    ctx.fillText(`Flight Time: ${flightTime.toFixed(1)} s`, 20, 140)
  }

  const reset = () => {
    setTime(0)
    setTrajectory([])
    setIsRunning(false)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Projectile Motion</h2>
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
              {isRunning ? 'Pause' : 'Launch'}
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
              Initial Velocity: {velocity} m/s
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={velocity}
              onChange={(e) => {
                setVelocity(parseInt(e.target.value))
                reset()
              }}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">
              Launch Angle: {angle}°
            </label>
            <input
              type="range"
              min="10"
              max="90"
              value={angle}
              onChange={(e) => {
                setAngle(parseInt(e.target.value))
                reset()
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
                <span>Moon</span>
                <span>Earth</span>
                <span>Jupiter</span>
              </div>
            </div>
          )}

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Horizontal motion = constant velocity</li>
              <li>• Vertical motion = accelerated by gravity</li>
              <li>• Path is parabolic</li>
              <li>• Range = v²sin(2θ)/g</li>
            </ul>
          </div>

          {gradeLevel === 'high' && (
            <div className="bg-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-semibold mb-2">Equations</h3>
              <p className="text-white/80 text-sm">
                x = v₀cos(θ)t
              </p>
              <p className="text-white/80 text-sm">
                y = v₀sin(θ)t - ½gt²
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

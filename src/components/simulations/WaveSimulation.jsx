import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Info } from 'lucide-react'

export default function WaveSimulation({ gradeLevel }) {
  const canvasRef = useRef(null)
  const [isRunning, setIsRunning] = useState(false)
  const [amplitude, setAmplitude] = useState(50)
  const [frequency, setFrequency] = useState(1)
  const [waveSpeed, setWaveSpeed] = useState(2)
  const [showTransverse, setShowTransverse] = useState(true)
  const [showLongitudinal, setShowLongitudinal] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let animationFrame
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const animate = () => {
      if (isRunning) {
        setTime(time + 0.02)
      }
      drawWave(ctx, canvas)
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => cancelAnimationFrame(animationFrame)
  }, [isRunning, amplitude, frequency, waveSpeed, showTransverse, showLongitudinal, time])

  const drawWave = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const centerY = canvas.height / 2
    const wavelength = 200 / frequency

    if (showTransverse) {
      // Draw transverse wave
      ctx.strokeStyle = '#60a5fa'
      ctx.lineWidth = 3
      ctx.beginPath()
      
      for (let x = 0; x < canvas.width; x++) {
        const y = centerY + amplitude * Math.sin((2 * Math.PI * x) / wavelength - waveSpeed * time)
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Draw equilibrium line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(0, centerY)
      ctx.lineTo(canvas.width, centerY)
      ctx.stroke()
      ctx.setLineDash([])

      // Draw particle motion indicators
      for (let x = 50; x < canvas.width; x += 100) {
        const y = centerY + amplitude * Math.sin((2 * Math.PI * x) / wavelength - waveSpeed * time)
        ctx.fillStyle = '#fbbf24'
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()

        // Draw motion arrow (vertical)
        const motionY = Math.cos((2 * Math.PI * x) / wavelength - waveSpeed * time) * 20
        ctx.strokeStyle = '#fbbf24'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + motionY)
        ctx.stroke()
      }

      // Labels
      ctx.fillStyle = '#ffffff'
      ctx.font = '14px sans-serif'
      ctx.fillText('Transverse Wave', 20, 30)
      ctx.fillText(`Amplitude: ${amplitude}`, 20, 50)
      ctx.fillText(`Frequency: ${frequency} Hz`, 20, 70)
      ctx.fillText(`Wavelength: ${wavelength.toFixed(0)} px`, 20, 90)
    }

    if (showLongitudinal) {
      // Draw longitudinal wave (compression/rarefaction)
      const particleCount = 30
      const spacing = canvas.width / particleCount
      
      for (let i = 0; i < particleCount; i++) {
        const baseX = i * spacing + spacing / 2
        const displacement = amplitude * 0.5 * Math.sin((2 * Math.PI * i) / particleCount - waveSpeed * time)
        const x = baseX + displacement
        
        // Draw particle
        ctx.fillStyle = '#34d399'
        ctx.beginPath()
        ctx.arc(x, centerY, 8, 0, Math.PI * 2)
        ctx.fill()

        // Draw motion arrow (horizontal)
        const motionX = Math.cos((2 * Math.PI * i) / particleCount - waveSpeed * time) * 15
        ctx.strokeStyle = '#34d399'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x, centerY)
        ctx.lineTo(x + motionX, centerY)
        ctx.stroke()
      }

      ctx.fillStyle = '#ffffff'
      ctx.font = '14px sans-serif'
      ctx.fillText('Longitudinal Wave', 20, 30)
      ctx.fillText('Particles oscillate parallel to wave direction', 20, 50)
    }

    // Draw wavelength indicator
    if (showTransverse) {
      const startX = 50
      const endX = startX + wavelength
      const indicatorY = centerY + amplitude + 30
      
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(startX, indicatorY)
      ctx.lineTo(endX, indicatorY)
      ctx.stroke()
      
      // Arrow heads
      ctx.beginPath()
      ctx.moveTo(startX, indicatorY - 5)
      ctx.lineTo(startX, indicatorY + 5)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(endX, indicatorY - 5)
      ctx.lineTo(endX, indicatorY + 5)
      ctx.stroke()
      
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('λ', (startX + endX) / 2, indicatorY + 20)
      ctx.textAlign = 'left'
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Wave Properties</h2>
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
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">Wave Type</label>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowTransverse(true)
                  setShowLongitudinal(false)
                }}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
                  showTransverse && !showLongitudinal ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Transverse
              </button>
              <button
                onClick={() => {
                  setShowTransverse(false)
                  setShowLongitudinal(true)
                }}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
                  showLongitudinal ? 'bg-green-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Longitudinal
              </button>
            </div>
          </div>

          {showTransverse && (
            <>
              <div>
                <label className="text-white font-medium mb-2 block">
                  Amplitude: {amplitude}
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={amplitude}
                  onChange={(e) => setAmplitude(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">
                  Frequency: {frequency} Hz
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={frequency}
                  onChange={(e) => setFrequency(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">
                  Wave Speed: {waveSpeed}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={waveSpeed}
                  onChange={(e) => setWaveSpeed(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </>
          )}

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Amplitude = wave height</li>
              <li>• Wavelength = distance between peaks</li>
              <li>• Frequency = cycles per second</li>
              <li>• Speed = wavelength × frequency</li>
            </ul>
          </div>

          {gradeLevel === 'high' && (
            <div className="bg-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-semibold mb-2">Wave Equation</h3>
              <p className="text-white/80 text-sm">
                v = λ × f
              </p>
              <p className="text-white/60 text-xs mt-1">
                v = speed, λ = wavelength, f = frequency
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

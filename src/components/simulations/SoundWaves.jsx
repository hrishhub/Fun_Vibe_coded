import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Info, Volume2 } from 'lucide-react'

export default function SoundWaves({ gradeLevel }) {
  const canvasRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [frequency, setFrequency] = useState(440)
  const [amplitude, setAmplitude] = useState(50)
  const [showDoppler, setShowDoppler] = useState(false)
  const [sourceSpeed, setSourceSpeed] = useState(0)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let animationFrame
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const animate = () => {
      if (isPlaying) {
        setTime(time + 0.016)
      }
      drawSoundWaves(ctx, canvas)
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => cancelAnimationFrame(animationFrame)
  }, [isPlaying, frequency, amplitude, showDoppler, sourceSpeed, time])

  const drawSoundWaves = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const wavelength = 20000 / frequency

    if (showDoppler) {
      // Doppler effect visualization
      const sourceX = centerX + (Math.sin(time * sourceSpeed) * 100)
      
      // Draw wave circles with compression/rarefaction
      for (let i = 0; i < 10; i++) {
        const radius = ((time * 100 + i * wavelength) % (wavelength * 10))
        const compression = 1 + (sourceSpeed / 10) * Math.cos(time)
        
        ctx.strokeStyle = `rgba(96, 165, 250, ${0.5 - i * 0.05})`
        ctx.lineWidth = 3 / compression
        ctx.beginPath()
        ctx.arc(sourceX, centerY, radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw moving source
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.arc(sourceX, centerY, 15, 0, Math.PI * 2)
      ctx.fill()

      // Draw velocity arrow
      const velocity = Math.cos(time * sourceSpeed) * sourceSpeed * 10
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(sourceX, centerY - 30)
      ctx.lineTo(sourceX + velocity, centerY - 30)
      ctx.stroke()

    } else {
      // Standard sound wave
      ctx.strokeStyle = '#60a5fa'
      ctx.lineWidth = 3
      ctx.beginPath()
      
      for (let x = 0; x < canvas.width; x++) {
        const y = centerY + amplitude * Math.sin((2 * Math.PI * x) / wavelength - time * frequency * 0.01)
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Draw particles representing air molecules
      for (let i = 0; i < 50; i++) {
        const baseX = (i / 50) * canvas.width
        const displacement = amplitude * 0.3 * Math.sin((2 * Math.PI * baseX) / wavelength - time * frequency * 0.01)
        const x = baseX + displacement
        const y = centerY + (Math.random() - 0.5) * 40
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw source
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.arc(50, centerY, 15, 0, Math.PI * 2)
      ctx.fill()
    }

    // Display info
    ctx.fillStyle = '#ffffff'
    ctx.font = '14px sans-serif'
    ctx.fillText(`Frequency: ${frequency} Hz`, 20, 30)
    ctx.fillText(`Amplitude: ${amplitude}`, 20, 50)
    
    const wavelengthPx = 20000 / frequency
    ctx.fillText(`Wavelength: ${wavelengthPx.toFixed(0)} px`, 20, 70)
    
    if (showDoppler) {
      ctx.fillText(`Source Speed: ${sourceSpeed.toFixed(1)}`, 20, 90)
    }

    // Draw frequency spectrum
    drawSpectrum(ctx, canvas, frequency)
  }

  const drawSpectrum = (ctx, canvas, freq) => {
    const spectrumY = canvas.height - 60
    const barWidth = 4
    const numBars = 50
    
    for (let i = 0; i < numBars; i++) {
      const barFreq = 100 + i * 20
      const isCurrentFreq = Math.abs(barFreq - freq) < 20
      const height = isCurrentFreq ? 40 : 5 + Math.random() * 10
      
      ctx.fillStyle = isCurrentFreq ? '#34d399' : 'rgba(255, 255, 255, 0.3)'
      ctx.fillRect(50 + i * (barWidth + 2), spectrumY - height, barWidth, height)
    }
    
    ctx.fillStyle = '#ffffff'
    ctx.font = '12px sans-serif'
    ctx.fillText('Frequency Spectrum', 50, spectrumY + 20)
  }

  const playTone = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = 'sine'
      gainNode.gain.value = 0.1
      
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.5)
    } catch (e) {
      console.log('Audio not supported')
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Sound Waves</h2>
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
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                isPlaying ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={playTone}
              className="px-4 py-2 rounded-lg font-medium bg-purple-500 text-white hover:bg-purple-600 transition-all"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">
              Frequency: {frequency} Hz
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              value={frequency}
              onChange={(e) => setFrequency(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-white/50 text-xs mt-1">
              <span>100Hz (Low)</span>
              <span>1000Hz (High)</span>
            </div>
          </div>

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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showDoppler"
              checked={showDoppler}
              onChange={(e) => setShowDoppler(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="showDoppler" className="text-white">Show Doppler Effect</label>
          </div>

          {showDoppler && (
            <div>
              <label className="text-white font-medium mb-2 block">
                Source Speed: {sourceSpeed.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={sourceSpeed}
                onChange={(e) => setSourceSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Concepts</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Sound is a longitudinal wave</li>
              <li>• Frequency = pitch</li>
              <li>• Amplitude = loudness</li>
              <li>• Doppler effect changes perceived frequency</li>
            </ul>
          </div>

          {gradeLevel === 'high' && (
            <div className="bg-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-semibold mb-2">Wave Equation</h3>
              <p className="text-white/80 text-sm">
                v = f × λ
              </p>
              <p className="text-white/60 text-xs mt-1">
                Speed of sound ≈ 343 m/s (in air)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

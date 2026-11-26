import { useState, useMemo } from 'react'
import { BookOpen, Atom, Lightbulb, FlaskConical, Waves, Zap, Search, Menu, X, Home, Star, TrendingUp, Filter } from 'lucide-react'
import LightSimulation from './components/simulations/LightSimulation'
import YDSESimulation from './components/simulations/YDSESimulation'
import AtomicStructure from './components/simulations/AtomicStructure'
import PendulumSimulation from './components/simulations/PendulumSimulation'
import ChemicalReactions from './components/simulations/ChemicalReactions'
import WaveSimulation from './components/simulations/WaveSimulation'
import ProjectileMotion from './components/simulations/ProjectileMotion'
import ElectricField from './components/simulations/ElectricField'
import MagneticField from './components/simulations/MagneticField'
import Circuits from './components/simulations/Circuits'
import Thermodynamics from './components/simulations/Thermodynamics'
import SoundWaves from './components/simulations/SoundWaves'
import PeriodicTable from './components/simulations/PeriodicTable'
import PHScale from './components/simulations/PHScale'
import GasLaws from './components/simulations/GasLaws'
import Stoichiometry from './components/simulations/Stoichiometry'
import ChemicalBonding from './components/simulations/ChemicalBonding'
import CellStructure from './components/simulations/CellStructure'
import DNAReplication from './components/simulations/DNAReplication'
import Photosynthesis from './components/simulations/Photosynthesis'

const physicsTopics = [
  { id: 'light', name: 'Light & Optics', icon: Lightbulb, grade: 'all', description: 'Reflection, Refraction, Prism', category: 'physics', difficulty: 'beginner' },
  { id: 'ydse', name: 'Wave Interference', icon: Waves, grade: 'high', description: 'Young\'s Double Slit Experiment', category: 'physics', difficulty: 'advanced' },
  { id: 'pendulum', name: 'Simple Pendulum', icon: Zap, grade: 'all', description: 'Oscillations, Period', category: 'physics', difficulty: 'beginner' },
  { id: 'waves', name: 'Wave Properties', icon: Waves, grade: 'all', description: 'Frequency, Amplitude, Wavelength', category: 'physics', difficulty: 'beginner' },
  { id: 'projectile', name: 'Projectile Motion', icon: Zap, grade: 'all', description: 'Trajectories, Parabolic Motion', category: 'physics', difficulty: 'intermediate' },
  { id: 'electric', name: 'Electric Fields', icon: Zap, grade: 'high', description: 'Coulomb\'s Law, Field Lines', category: 'physics', difficulty: 'advanced' },
  { id: 'magnetic', name: 'Magnetic Fields', icon: Zap, grade: 'high', description: 'Electromagnetism, Lorentz Force', category: 'physics', difficulty: 'advanced' },
  { id: 'circuits', name: 'Electric Circuits', icon: Zap, grade: 'all', description: 'Ohm\'s Law, Series/Parallel', category: 'physics', difficulty: 'intermediate' },
  { id: 'thermo', name: 'Thermodynamics', icon: Zap, grade: 'high', description: 'Heat Transfer, Laws of Thermodynamics', category: 'physics', difficulty: 'advanced' },
  { id: 'sound', name: 'Sound Waves', icon: Waves, grade: 'all', description: 'Doppler Effect, Resonance', category: 'physics', difficulty: 'intermediate' },
]

const chemistryTopics = [
  { id: 'atomic', name: 'Atomic Structure', icon: Atom, grade: 'all', description: 'Bohr Model, Electron Shells', category: 'chemistry', difficulty: 'beginner' },
  { id: 'reactions', name: 'Chemical Reactions', icon: FlaskConical, grade: 'all', description: 'Balance Equations', category: 'chemistry', difficulty: 'beginner' },
  { id: 'periodic', name: 'Periodic Table', icon: Atom, grade: 'all', description: 'Elements, Properties, Trends', category: 'chemistry', difficulty: 'beginner' },
  { id: 'ph', name: 'pH Scale', icon: FlaskConical, grade: 'all', description: 'Acids, Bases, Neutralization', category: 'chemistry', difficulty: 'beginner' },
  { id: 'gaslaws', name: 'Gas Laws', icon: FlaskConical, grade: 'high', description: 'PV=nRT, Boyle\'s, Charles\' Laws', category: 'chemistry', difficulty: 'intermediate' },
  { id: 'stoichiometry', name: 'Stoichiometry', icon: FlaskConical, grade: 'high', description: 'Mole Calculations', category: 'chemistry', difficulty: 'intermediate' },
  { id: 'bonding', name: 'Chemical Bonding', icon: Atom, grade: 'high', description: 'Ionic, Covalent, Metallic', category: 'chemistry', difficulty: 'advanced' },
]

const biologyTopics = [
  { id: 'cell', name: 'Cell Structure', icon: Atom, grade: 'all', description: 'Organelles, Membrane', category: 'biology', difficulty: 'beginner' },
  { id: 'dna', name: 'DNA Replication', icon: Atom, grade: 'high', description: 'Genetics, Heredity', category: 'biology', difficulty: 'advanced' },
  { id: 'photosynthesis', name: 'Photosynthesis', icon: Lightbulb, grade: 'all', description: 'Light Reaction, Calvin Cycle', category: 'biology', difficulty: 'intermediate' },
]

const allTopics = [...physicsTopics, ...chemistryTopics, ...biologyTopics]

const gradeLevels = [
  { id: 'low', name: 'Elementary (Grades 6-8)', color: 'bg-green-500' },
  { id: 'high', name: 'High School (Grades 9-12)', color: 'bg-blue-500' },
]

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [gradeLevel, setGradeLevel] = useState('low')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('scienceSimFavorites')
    return saved ? JSON.parse(saved) : []
  })

  const toggleFavorite = (topicId) => {
    const newFavorites = favorites.includes(topicId)
      ? favorites.filter(id => id !== topicId)
      : [...favorites, topicId]
    setFavorites(newFavorites)
    localStorage.setItem('scienceSimFavorites', JSON.stringify(newFavorites))
  }

  const filteredTopics = useMemo(() => {
    return allTopics.filter(topic => {
      const matchesSearch = topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           topic.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'all' || topic.difficulty === selectedDifficulty
      const matchesGrade = topic.grade === 'all' || topic.grade === gradeLevel
      return matchesSearch && matchesCategory && matchesDifficulty && matchesGrade
    })
  }, [searchQuery, selectedCategory, selectedDifficulty, gradeLevel])

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'physics', name: 'Physics', icon: Zap },
    { id: 'chemistry', name: 'Chemistry', icon: FlaskConical },
    { id: 'biology', name: 'Biology', icon: Atom },
  ]

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
  ]

  const renderSimulation = () => {
    switch (selectedTopic) {
      case 'light': return <LightSimulation gradeLevel={gradeLevel} />
      case 'ydse': return <YDSESimulation gradeLevel={gradeLevel} />
      case 'atomic': return <AtomicStructure gradeLevel={gradeLevel} />
      case 'pendulum': return <PendulumSimulation gradeLevel={gradeLevel} />
      case 'reactions': return <ChemicalReactions gradeLevel={gradeLevel} />
      case 'waves': return <WaveSimulation gradeLevel={gradeLevel} />
      case 'projectile': return <ProjectileMotion gradeLevel={gradeLevel} />
      case 'electric': return <ElectricField gradeLevel={gradeLevel} />
      case 'magnetic': return <MagneticField gradeLevel={gradeLevel} />
      case 'circuits': return <Circuits gradeLevel={gradeLevel} />
      case 'thermo': return <Thermodynamics gradeLevel={gradeLevel} />
      case 'sound': return <SoundWaves gradeLevel={gradeLevel} />
      case 'periodic': return <PeriodicTable gradeLevel={gradeLevel} />
      case 'ph': return <PHScale gradeLevel={gradeLevel} />
      case 'gaslaws': return <GasLaws gradeLevel={gradeLevel} />
      case 'stoichiometry': return <Stoichiometry gradeLevel={gradeLevel} />
      case 'bonding': return <ChemicalBonding gradeLevel={gradeLevel} />
      case 'cell': return <CellStructure gradeLevel={gradeLevel} />
      case 'dna': return <DNAReplication gradeLevel={gradeLevel} />
      case 'photosynthesis': return <Photosynthesis gradeLevel={gradeLevel} />
      default: return null
    }
  }

  const topicData = allTopics.find(t => t.id === selectedTopic)

  if (selectedTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <nav className="bg-black/40 backdrop-blur-lg border-b border-white/10 p-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setSelectedTopic(null)}
              className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold">Back to Topics</span>
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm">Grade:</span>
                {gradeLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setGradeLevel(level.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      gradeLevel === level.id
                        ? `${level.color} text-white`
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {level.name.split(' ')[0]}
                  </button>
                ))}
              </div>
              <button
                onClick={() => toggleFavorite(selectedTopic)}
                className={`p-2 rounded-lg transition-all ${
                  favorites.includes(selectedTopic)
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <Star className={`w-5 h-5 ${favorites.includes(selectedTopic) ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </nav>
        <div className="p-6">
          <div className="max-w-7xl mx-auto mb-4">
            <div className="flex items-center gap-3">
              {topicData && <topicData.icon className="w-8 h-8 text-blue-400" />}
              <h1 className="text-3xl font-bold text-white">{topicData?.name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                topicData?.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                topicData?.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {topicData?.difficulty}
              </span>
            </div>
          </div>
          {renderSimulation()}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <header className="bg-black/40 backdrop-blur-lg border-b border-white/10 p-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-blue-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">ScienceLab Pro</h1>
                <p className="text-white/60 text-sm">Interactive Science Simulations</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 bg-white/10 rounded-lg text-white"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search simulations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-all"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {difficulties.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedDifficulty === diff.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {diff.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`fixed left-0 top-32 h-[calc(100vh-8rem)] w-64 bg-black/30 backdrop-blur-lg border-r border-white/10 p-4 overflow-y-auto transition-transform z-40 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Favorites
            </h3>
            {favorites.length === 0 ? (
              <p className="text-white/50 text-sm">No favorites yet</p>
            ) : (
              <div className="space-y-2">
                {favorites.map(favId => {
                  const topic = allTopics.find(t => t.id === favId)
                  return topic ? (
                    <button
                      key={favId}
                      onClick={() => setSelectedTopic(favId)}
                      className="w-full px-3 py-2 bg-white/10 rounded-lg text-left text-white/80 hover:bg-white/20 transition-all text-sm"
                    >
                      {topic.name}
                    </button>
                  ) : null
                })}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Grade Level
            </h3>
            <div className="space-y-2">
              {gradeLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setGradeLevel(level.id)}
                  className={`w-full px-3 py-2 rounded-lg text-left transition-all text-sm ${
                    gradeLevel === level.id
                      ? `${level.color} text-white`
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedCategory === 'all' ? 'All Simulations' : categories.find(c => c.id === selectedCategory)?.name}
                <span className="text-white/50 text-lg ml-2">({filteredTopics.length})</span>
              </h2>
            </div>

            {filteredTopics.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/50 text-lg">No simulations found matching your criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left hover:bg-white/20 hover:border-blue-400/50 transition-all transform hover:scale-105 group relative"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(topic.id)
                      }}
                      className="absolute top-4 right-4 p-1 rounded-lg transition-all hover:bg-white/20"
                    >
                      <Star className={`w-5 h-5 ${favorites.includes(topic.id) ? 'fill-yellow-400 text-yellow-400' : 'text-white/50'}`} />
                    </button>
                    <topic.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:text-blue-300 transition-colors" />
                    <h3 className="text-xl font-semibold text-white mb-2">{topic.name}</h3>
                    <p className="text-white/60 text-sm mb-4">{topic.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        topic.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                        topic.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {topic.difficulty}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        topic.category === 'physics' ? 'bg-blue-500/20 text-blue-400' :
                        topic.category === 'chemistry' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {topic.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

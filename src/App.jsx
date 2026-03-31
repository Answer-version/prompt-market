import { useState, useMemo, useEffect } from 'react'
import { prompts, platforms, categories, sortOptions } from './data/prompts'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('hot')
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('prompthub-favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  useEffect(() => {
    localStorage.setItem('prompthub-favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (e, promptId) => {
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(promptId) 
        ? prev.filter(id => id !== promptId)
        : [...prev, promptId]
    )
  }

  const filteredPrompts = useMemo(() => {
    let result = showFavoritesOnly 
      ? prompts.filter(p => favorites.includes(p.id))
      : prompts

    if (!showFavoritesOnly && searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (!showFavoritesOnly && selectedPlatform !== 'all') {
      result = result.filter(p => p.platform === selectedPlatform)
    }

    if (!showFavoritesOnly && selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    switch (sortBy) {
      case 'hot':
        result = [...result].sort((a, b) => b.salesCount - a.salesCount)
        break
      case 'newest':
        result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price)
        break
    }

    return result
  }, [searchQuery, selectedPlatform, selectedCategory, sortBy, showFavoritesOnly, favorites])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">PromptHub</span>
              <span className="text-sm text-gray-400">AI提示词模板</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="搜索模板..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 md:w-64 bg-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <button 
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  showFavoritesOnly ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                收藏 ({favorites.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Platform Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {platforms.map(p => (
            <button
              key={p.key}
              onClick={() => setSelectedPlatform(p.key)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                selectedPlatform === p.key
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Category + Sort */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(c => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                  selectedCategory === c.key
                    ? 'bg-gray-200 text-gray-800'
                    : 'text-gray-500'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm"
          >
            {sortOptions.map(o => (
              <option key={o.key} value={o.key}>{o.name}</option>
            ))}
          </select>
        </div>

        {/* Results */}
        <div className="text-sm text-gray-500 mb-4">
          {showFavoritesOnly ? '收藏' : '全部'} · {filteredPrompts.length} 个模板
        </div>

        {/* Grid */}
        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrompts.map(prompt => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                isFavorite={favorites.includes(prompt.id)}
                onToggleFavorite={(e) => toggleFavorite(e, prompt.id)}
                onClick={() => setSelectedPrompt(prompt)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            {showFavoritesOnly ? '暂无收藏' : '无匹配结果'}
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedPrompt && (
        <PromptModal 
          prompt={selectedPrompt} 
          isFavorite={favorites.includes(selectedPrompt.id)}
          onToggleFavorite={(e) => toggleFavorite(e, selectedPrompt.id)}
          onClose={() => setSelectedPrompt(null)} 
        />
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 py-8 text-center text-sm text-gray-400">
        PromptHub · AI提示词模板市场
      </footer>
    </div>
  )
}

function PromptCard({ prompt, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {/* Cover */}
      <div className="aspect-video bg-gray-100 flex items-center justify-center text-4xl">
        {prompt.coverImage}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-gray-900 line-clamp-2">{prompt.title}</h3>
          <button
            onClick={onToggleFavorite}
            className={`flex-shrink-0 text-lg ${isFavorite ? 'text-red-500' : 'text-gray-300'}`}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{prompt.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{prompt.platform}</span>
            <span className="text-gray-300">·</span>
            <span className="text-sm text-gray-400">{prompt.category}</span>
          </div>
          {prompt.price === 0 ? (
            <span className="text-sm font-medium text-green-600">免费</span>
          ) : (
            <span className="text-sm font-medium text-gray-900">¥{prompt.price}</span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
          <span>★ {prompt.rating}</span>
          <span>·</span>
          <span>已售 {prompt.salesCount}</span>
        </div>
      </div>
    </div>
  )
}

function PromptModal({ prompt, isFavorite, onToggleFavorite, onClose }) {
  const [copied, setCopied] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {showPayment ? (
          <PaymentView prompt={prompt} onBack={() => setShowPayment(false)} onCopy={handleCopy} copied={copied} />
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{prompt.coverImage}</span>
                <div>
                  <h2 className="font-semibold text-gray-900">{prompt.title}</h2>
                  <div className="text-sm text-gray-400">
                    ★ {prompt.rating} · 已售 {prompt.salesCount}
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">描述</h3>
                <p className="text-gray-700">{prompt.description}</p>
              </div>

              {/* Prompt */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">提示词</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 whitespace-pre-wrap font-mono max-h-48 overflow-y-auto">
                  {prompt.content}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{prompt.platform}</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{prompt.category}</span>
                {prompt.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">#{tag}</span>
                ))}
              </div>

              {/* Creator */}
              <div className="flex items-center justify-between py-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{prompt.creator.avatar}</span>
                  <div>
                    <div className="font-medium text-gray-900">{prompt.creator.name}</div>
                    <div className="text-xs text-gray-400">已售 {prompt.creator.sales}</div>
                  </div>
                </div>
                <button 
                  onClick={onToggleFavorite}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isFavorite ? '♥ 已收藏' : '♡ 收藏'}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 flex gap-3">
              {prompt.price === 0 ? (
                <button
                  onClick={handleCopy}
                  className={`flex-1 py-3 rounded-xl font-medium ${
                    copied ? 'bg-green-500 text-white' : 'bg-gray-900 text-white'
                  }`}
                >
                  {copied ? '已复制' : '复制提示词'}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
                  >
                    预览
                  </button>
                  <button
                    onClick={() => setShowPayment(true)}
                    className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium"
                  >
                    ¥{prompt.price} 购买
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function PaymentView({ prompt, onBack, onCopy, copied }) {
  const [step, setStep] = useState('qrcode') // qrcode -> success

  const handlePay = () => {
    setStep('success')
  }

  return (
    <div className="p-6">
      {step === 'qrcode' ? (
        <>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={onBack} className="text-gray-400 hover:text-gray-600">←</button>
            <span className="font-medium">完成支付</span>
          </div>

          <div className="text-center mb-6">
            <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-6xl text-gray-300">⊞</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">¥{prompt.price}</div>
          </div>

          <div className="text-center text-sm text-gray-500 mb-6">
            请使用微信或支付宝扫描支付
          </div>

          <button
            onClick={handlePay}
            className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium"
          >
            已完成支付
          </button>
        </>
      ) : (
        <>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
              ✓
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">支付成功</h3>
            <p className="text-gray-500 mb-6">现在可以获取提示词了</p>
          </div>

          <button
            onClick={onCopy}
            className={`w-full py-3 rounded-xl font-medium mb-3 ${
              copied ? 'bg-green-500 text-white' : 'bg-gray-900 text-white'
            }`}
          >
            {copied ? '已复制到剪贴板' : '复制提示词'}
          </button>
          
          <button 
            onClick={onBack}
            className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium"
          >
            返回
          </button>
        </>
      )}
    </div>
  )
}

export default App

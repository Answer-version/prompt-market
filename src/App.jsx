import { useState, useMemo, useEffect } from 'react'
import { prompts, platforms, categories } from './data/prompts'

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('prompthub-favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [showFavorites, setShowFavorites] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

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

  const handleCopy = (e, content, id) => {
    e.stopPropagation()
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredPrompts = useMemo(() => {
    let result = showFavorites 
      ? prompts.filter(p => favorites.includes(p.id))
      : prompts

    if (!showFavorites && selectedPlatform !== 'all') {
      result = result.filter(p => p.platform === selectedPlatform)
    }

    if (!showFavorites && selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    return result
  }, [selectedPlatform, selectedCategory, showFavorites, favorites])

  // Count by platform
  const platformCounts = useMemo(() => {
    const counts = {}
    prompts.forEach(p => {
      counts[p.platform] = (counts[p.platform] || 0) + 1
    })
    return counts
  }, [])

  // Count by category
  const categoryCounts = useMemo(() => {
    const counts = {}
    prompts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-14 border-b flex items-center px-4 fixed top-0 left-0 right-0 bg-white z-30">
        <div className="flex items-center gap-6 w-full max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-gray-900">PromptHub</span>
          </div>
          
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="搜索提示词..."
              className="w-full h-9 px-4 rounded-lg text-sm bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button 
            onClick={() => setShowFavorites(!showFavorites)}
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
              showFavorites 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            我的收藏 {favorites.length}
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="pt-14 flex">
        {/* Left Sidebar */}
        <aside className="w-52 border-r fixed left-0 top-14 bottom-0 overflow-y-auto bg-white">
          <div className="p-4">
            {/* Platform */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">平台</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedPlatform('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    selectedPlatform === 'all'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>全部</span>
                  <span className="text-xs opacity-60">{prompts.length}</span>
                </button>
                {platforms.filter(p => p.key !== 'all').map(p => (
                  <button
                    key={p.key}
                    onClick={() => setSelectedPlatform(p.key)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      selectedPlatform === p.key
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{p.name}</span>
                    <span className="text-xs opacity-60">{platformCounts[p.key] || 0}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">分类</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>全部</span>
                  <span className="text-xs opacity-60">{prompts.length}</span>
                </button>
                {categories.filter(c => c.key !== 'all').map(c => (
                  <button
                    key={c.key}
                    onClick={() => setSelectedCategory(c.key)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      selectedCategory === c.key
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-xs opacity-60">{categoryCounts[c.key] || 0}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 ml-52">
          <div className="p-6">
            {/* Results count */}
            <div className="text-sm text-gray-400 mb-4">
              {showFavorites ? '我的收藏' : '全部'} · {filteredPrompts.length} 个提示词
            </div>

            {/* List */}
            {filteredPrompts.length > 0 ? (
              <div className="space-y-3">
                {filteredPrompts.map(prompt => (
                  <PromptItem 
                    key={prompt.id} 
                    prompt={prompt} 
                    isFavorite={favorites.includes(prompt.id)}
                    onToggleFavorite={(e) => toggleFavorite(e, prompt.id)}
                    onCopy={(e) => handleCopy(e, prompt.content, prompt.id)}
                    onClick={() => setSelectedPrompt(prompt)}
                    copied={copiedId === prompt.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400">
                {showFavorites ? '暂无收藏' : '无匹配结果'}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      {selectedPrompt && (
        <PromptModal 
          prompt={selectedPrompt} 
          isFavorite={favorites.includes(selectedPrompt.id)}
          onToggleFavorite={(e) => toggleFavorite(e, selectedPrompt.id)}
          onCopy={(e) => handleCopy(e, selectedPrompt.content, selectedPrompt.id)}
          copied={copiedId === selectedPrompt.id}
          onClose={() => setSelectedPrompt(null)} 
        />
      )}
    </div>
  )
}

function PromptItem({ prompt, isFavorite, onToggleFavorite, onCopy, onClick, copied }) {
  return (
    <div 
      className="border rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer bg-white"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-medium text-gray-900 mb-1">{prompt.title}</h3>
          
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">
              {prompt.platform}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">
              {prompt.category}
            </span>
            {prompt.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                #{tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-1">{prompt.description}</p>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span>★ {prompt.rating}</span>
            <span>·</span>
            <span>已用 {prompt.salesCount}</span>
            {prompt.isHot && (
              <>
                <span>·</span>
                <span className="text-orange-500">热门</span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onToggleFavorite}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              isFavorite 
                ? 'text-red-500 bg-red-50' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
          <button
            onClick={onCopy}
            className={`h-9 px-4 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            {copied ? '已复制' : '复制'}
          </button>
        </div>
      </div>
    </div>
  )
}

function PromptModal({ prompt, isFavorite, onToggleFavorite, onCopy, copied, onClose }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{prompt.coverImage}</span>
            <div>
              <h2 className="font-semibold text-gray-900">{prompt.title}</h2>
              <div className="text-sm text-gray-400">
                ★ {prompt.rating} · 已用 {prompt.salesCount}
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">
              {prompt.platform}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">
              {prompt.category}
            </span>
            {prompt.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                #{tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">描述</h3>
            <p className="text-gray-700">{prompt.description}</p>
          </div>

          {/* Prompt Content */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">提示词</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono overflow-x-auto">
              {prompt.content}
            </div>
          </div>

          {/* Creator */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t">
            <span className="text-xl">{prompt.creator.avatar}</span>
            <div>
              <div className="font-medium text-gray-900 text-sm">{prompt.creator.name}</div>
              <div className="text-xs text-gray-400">已售 {prompt.creator.sales}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-3">
          <button
            onClick={onToggleFavorite}
            className={`px-4 py-2 rounded-lg text-sm ${
              isFavorite 
                ? 'bg-red-50 text-red-500' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isFavorite ? '♥ 已收藏' : '♡ 收藏'}
          </button>
          <button
            onClick={onCopy}
            className={`flex-1 py-2 rounded-lg text-sm font-medium text-white ${
              copied ? 'bg-green-500' : 'bg-gray-900'
            }`}
          >
            {copied ? '已复制到剪贴板' : '复制提示词'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

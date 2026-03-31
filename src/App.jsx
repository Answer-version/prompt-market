import { useState, useMemo, useEffect, useRef } from 'react'
import { prompts, categories, platforms, sortOptions } from './data/prompts'

function formatCount(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K'
  }
  return num.toString()
}

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubCategory, setSelectedSubCategory] = useState('all')
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('prompthub-favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [showFavorites, setShowFavorites] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState('list') // list or grid
  const [filterMode, setFilterMode] = useState('OR') // AND or OR
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [toast, setToast] = useState(null)
  const toastTimerRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('prompthub-favorites', JSON.stringify(favorites))
  }, [favorites])

  const showToast = (message, type = 'success') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
    }
    setToast({ message, type })
    toastTimerRef.current = setTimeout(() => setToast(null), 2000)
  }

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
    showToast('已复制到剪贴板')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const togglePlatform = (platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const filteredPrompts = useMemo(() => {
    let result = showFavorites 
      ? prompts.filter(p => favorites.includes(p.id))
      : prompts

    // Search filter
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // SubCategory filter
    if (selectedSubCategory !== 'all') {
      result = result.filter(p => p.subCategory === selectedSubCategory)
    }

    // Platform filter
    if (filterMode === 'OR') {
      if (selectedPlatform !== 'all') {
        result = result.filter(p => p.platform === selectedPlatform)
      }
      if (selectedPlatforms.length > 0) {
        result = result.filter(p => selectedPlatforms.includes(p.platform))
      }
    } else {
      // AND mode - must match all selected
      if (selectedPlatforms.length > 0) {
        result = result.filter(p => selectedPlatforms.includes(p.platform))
      }
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        result = [...result].sort((a, b) => b.useCount - a.useCount)
        break
      case 'newest':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case 'useCount':
        result = [...result].sort((a, b) => b.useCount - a.useCount)
        break
    }

    return result
  }, [searchQuery, selectedPlatform, selectedCategory, selectedSubCategory, sortBy, showFavorites, favorites, filterMode, selectedPlatforms])

  const getCategoryCount = (categoryKey) => {
    if (categoryKey === 'all') return prompts.length
    return prompts.filter(p => p.category === categoryKey).length
  }

  const getSubCategories = (categoryKey) => {
    if (categoryKey === 'all') return []
    const cat = categories.find(c => c.key === categoryKey)
    return cat ? cat.subCategories : []
  }

  const currentSubCategories = getSubCategories(selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="h-14 bg-white border-b flex items-center px-4 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center gap-6 w-full max-w-7xl mx-auto">
          <a href="/" className="flex items-center gap-2">
            <span className="text-lg">💡</span>
            <span className="font-semibold text-gray-900">PromptHub</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <a href="#" className="text-blue-600 font-medium">提示词</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">使用说明</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">反馈建议</a>
          </nav>

          <div className="flex-1" />
          
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/Answer-version/prompt-market" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
            >
              <span>⭐</span>
              <span>Star</span>
            </a>
            <button 
              onClick={() => setShowFavorites(!showFavorites)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                showFavorites 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 bg-gray-100'
              }`}
            >
              ❤️ {favorites.length}
            </button>
            <button 
              onClick={() => setShowMobileFilter(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Filter Overlay */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">筛选</span>
                <button onClick={() => setShowMobileFilter(false)} className="text-gray-400">✕</button>
              </div>
              
              <MobileFilters
                categories={categories}
                platforms={platforms}
                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
                selectedPlatform={selectedPlatform}
                selectedPlatforms={selectedPlatforms}
                filterMode={filterMode}
                onCategoryChange={(c) => { setSelectedCategory(c); setSelectedSubCategory('all'); }}
                onSubCategoryChange={setSelectedSubCategory}
                onPlatformChange={setSelectedPlatform}
                onTogglePlatform={togglePlatform}
                onFilterModeChange={setFilterMode}
                getCategoryCount={getCategoryCount}
                getSubCategories={getSubCategories}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="pt-14 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-56 border-r bg-white fixed left-0 top-14 bottom-0 overflow-y-auto">
          <div className="p-4">
            <DesktopFilters
              categories={categories}
              platforms={platforms}
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              selectedPlatform={selectedPlatform}
              selectedPlatforms={selectedPlatforms}
              filterMode={filterMode}
              onCategoryChange={(c) => { setSelectedCategory(c); setSelectedSubCategory('all'); }}
              onSubCategoryChange={setSelectedSubCategory}
              onPlatformChange={setSelectedPlatform}
              onTogglePlatform={togglePlatform}
              onFilterModeChange={setFilterMode}
              getCategoryCount={getCategoryCount}
              getSubCategories={getSubCategories}
            />
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 md:ml-56">
          <div className="p-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {/* Search */}
              <div className="relative flex-1 min-w-48 max-w-md">
                <input
                  type="text"
                  placeholder="搜索提示词..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 rounded-lg text-sm bg-white border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 rounded-lg text-sm bg-white border"
              >
                {sortOptions.map(o => (
                  <option key={o.key} value={o.key}>{o.name}</option>
                ))}
              </select>

              {/* View Toggle */}
              <div className="flex rounded-lg border overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 h-9 text-sm ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
                >
                  ☰
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 h-9 text-sm ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
                >
                  ⊞
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== 'all' || selectedSubCategory !== 'all' || selectedPlatform !== 'all' || selectedPlatforms.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-gray-500">筛选:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')} className="ml-1">×</button>
                  </span>
                )}
                {selectedSubCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                    {selectedSubCategory}
                    <button onClick={() => setSelectedSubCategory('all')} className="ml-1">×</button>
                  </span>
                )}
                {selectedPlatform !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 text-xs rounded">
                    {selectedPlatform}
                    <button onClick={() => setSelectedPlatform('all')} className="ml-1">×</button>
                  </span>
                )}
                <button 
                  onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); setSelectedPlatform('all'); setSelectedPlatforms([]); }}
                  className="text-xs text-blue-500 hover:underline"
                >
                  清除全部
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="text-sm text-gray-500 mb-4">
              {showFavorites ? '我的收藏' : '全部'} · {filteredPrompts.length} 个提示词
            </div>

            {/* List */}
            {filteredPrompts.length > 0 ? (
              viewMode === 'list' ? (
                <div className="space-y-3">
                  {filteredPrompts.map(prompt => (
                    <PromptListItem 
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredPrompts.map(prompt => (
                    <PromptGridItem 
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
              )
            ) : (
              <div className="text-center py-16 text-gray-400">
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

function DesktopFilters({
  categories, platforms, selectedCategory, selectedSubCategory, selectedPlatform,
  selectedPlatforms, filterMode, onCategoryChange, onSubCategoryChange,
  onPlatformChange, onTogglePlatform, onFilterModeChange, getCategoryCount, getSubCategories
}) {
  return (
    <div>
      {/* Filter Mode Toggle */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>筛选模式</span>
        </div>
        <div className="flex rounded-lg border overflow-hidden">
          <button
            onClick={() => onFilterModeChange('AND')}
            className={`flex-1 px-3 py-1.5 text-xs ${filterMode === 'AND' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
          >
            AND
          </button>
          <button
            onClick={() => onFilterModeChange('OR')}
            className={`flex-1 px-3 py-1.5 text-xs ${filterMode === 'OR' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
          >
            OR
          </button>
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">分类</h3>
        <div className="space-y-0.5">
          {categories.map(cat => (
            <div key={cat.key}>
              <button
                onClick={() => onCategoryChange(cat.key)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                  selectedCategory === cat.key
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-xs opacity-60">{getCategoryCount(cat.key)}</span>
              </button>
              {selectedCategory === cat.key && cat.subCategories?.length > 0 && (
                <div className="ml-4 mt-1 space-y-0.5">
                  <button
                    onClick={() => onSubCategoryChange('all')}
                    className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                      selectedSubCategory === 'all'
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    全部
                  </button>
                  {cat.subCategories.map(sub => (
                    <button
                      key={sub}
                      onClick={() => onSubCategoryChange(sub)}
                      className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                        selectedSubCategory === sub
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Platform */}
      {filterMode === 'OR' && (
        <div>
          <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">平台</h3>
          <div className="space-y-0.5">
            {platforms.filter(p => p.key !== 'all').map(p => (
              <button
                key={p.key}
                onClick={() => onPlatformChange(p.key === selectedPlatform ? 'all' : p.key)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                  selectedPlatform === p.key
                    ? 'bg-gray-900 text-white'
                    : selectedPlatforms.includes(p.key)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{p.name}</span>
                <span className="text-xs opacity-60">{p.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MobileFilters({
  categories, platforms, selectedCategory, selectedSubCategory, selectedPlatform,
  selectedPlatforms, filterMode, onCategoryChange, onSubCategoryChange,
  onPlatformChange, onTogglePlatform, onFilterModeChange, getCategoryCount, getSubCategories
}) {
  return (
    <div>
      {/* Filter Mode Toggle */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>筛选模式</span>
        </div>
        <div className="flex rounded-lg border overflow-hidden">
          <button
            onClick={() => onFilterModeChange('AND')}
            className={`flex-1 px-3 py-1.5 text-xs ${filterMode === 'AND' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
          >
            AND
          </button>
          <button
            onClick={() => onFilterModeChange('OR')}
            className={`flex-1 px-3 py-1.5 text-xs ${filterMode === 'OR' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
          >
            OR
          </button>
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">分类</h3>
        <div className="space-y-0.5">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => onCategoryChange(cat.key)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                selectedCategory === cat.key
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-xs opacity-60">{getCategoryCount(cat.key)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Platform */}
      <div>
        <h3 className="text-xs font-medium text-gray-400 uppercase mb-2">平台</h3>
        <div className="space-y-0.5">
          {platforms.filter(p => p.key !== 'all').map(p => (
            <button
              key={p.key}
              onClick={() => onPlatformChange(p.key === selectedPlatform ? 'all' : p.key)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                selectedPlatform === p.key
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{p.name}</span>
              <span className="text-xs opacity-60">{p.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function PromptListItem({ prompt, isFavorite, onToggleFavorite, onCopy, onClick, copied }) {
  return (
    <div 
      className="bg-white border rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900">{prompt.title}</h3>
            {prompt.isHot && (
              <span className="text-orange-500 text-sm" title="热门">🔥</span>
            )}
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
              {prompt.platform}
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
              {prompt.category}
            </span>
            {prompt.subCategory && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                {prompt.subCategory}
              </span>
            )}
            {prompt.isUserShared && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-orange-50 text-orange-600">
                用户分享
              </span>
            )}
            <span className="text-xs text-gray-400">
              🔥 {formatCount(prompt.useCount)}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-1 mb-2">{prompt.description}</p>

          {/* Content preview */}
          <div className="text-xs text-gray-400 font-mono line-clamp-2 bg-gray-50 rounded p-2">
            {prompt.content.slice(0, 150)}...
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <button
            onClick={onToggleFavorite}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
              isFavorite 
                ? 'text-red-500 bg-red-50' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            {isFavorite ? '❤️' : '♡'}
          </button>
          <button
            onClick={onCopy}
            className={`h-8 px-3 rounded-lg flex items-center justify-center text-xs font-medium ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {copied ? '已复制' : '复制'}
          </button>
          {prompt.sourceUrl && (
            <a
              href={prompt.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              title="查看来源"
            >
              🔗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function PromptGridItem({ prompt, isFavorite, onToggleFavorite, onCopy, onClick, copied }) {
  return (
    <div 
      className="bg-white border rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{prompt.title}</h3>
          <button
            onClick={onToggleFavorite}
            className={`flex-shrink-0 w-7 h-7 rounded flex items-center justify-center text-sm ${
              isFavorite ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {isFavorite ? '❤️' : '♡'}
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1 mb-2">
          <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
            {prompt.platform}
          </span>
          {prompt.isHot && (
            <span className="text-xs text-orange-500">🔥</span>
          )}
          {prompt.isUserShared && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-orange-50 text-orange-600">
              用户分享
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">{prompt.description}</p>

        {/* Use count */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">🔥 {formatCount(prompt.useCount)}</span>
          <button
            onClick={onCopy}
            className={`h-7 px-2 rounded text-xs font-medium ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 text-white'
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-t-2xl sm:rounded-xl w-full sm:max-w-xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{prompt.coverImage}</span>
            <div className="min-w-0">
              <h2 className="font-semibold text-gray-900 text-sm truncate">{prompt.title}</h2>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>🔥 {formatCount(prompt.useCount)}</span>
                {prompt.isHot && <span className="text-orange-500">🔥 热门</span>}
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
            {prompt.subCategory && (
              <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                {prompt.subCategory}
              </span>
            )}
            {prompt.isUserShared && (
              <span className="text-xs px-2 py-0.5 rounded bg-orange-50 text-orange-600">
                用户分享
              </span>
            )}
            {prompt.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                #{tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="mb-4">
            <h3 className="text-xs font-medium text-gray-400 mb-1">描述</h3>
            <p className="text-gray-700 text-sm">{prompt.description}</p>
          </div>

          {/* Prompt Content */}
          <div>
            <h3 className="text-xs font-medium text-gray-400 mb-1">提示词</h3>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-wrap font-mono overflow-x-auto max-h-48">
              {prompt.content}
            </div>
          </div>

          {/* Source */}
          {prompt.sourceUrl && (
            <div className="mt-4 pt-3 border-t">
              <a 
                href={prompt.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline flex items-center gap-1"
              >
                🔗 查看来源
              </a>
            </div>
          )}

          {/* Creator */}
          <div className="flex items-center gap-3 mt-4 pt-3 border-t">
            <span className="text-lg">{prompt.creator.avatar}</span>
            <div>
              <div className="font-medium text-gray-900 text-sm">{prompt.creator.name}</div>
              <div className="text-xs text-gray-400">已使用 {formatCount(prompt.useCount)} 次</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-2 flex-shrink-0">
          <button
            onClick={onToggleFavorite}
            className={`px-3 py-2 rounded-lg text-xs ${
              isFavorite 
                ? 'bg-red-50 text-red-500' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isFavorite ? '❤️ 已收藏' : '♡ 收藏'}
          </button>
          <button
            onClick={onCopy}
            className={`flex-1 py-2 rounded-lg text-xs font-medium text-white ${
              copied ? 'bg-green-500' : 'bg-blue-600'
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

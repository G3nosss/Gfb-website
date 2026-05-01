import { useState } from 'react'

// Arunas product card — Haldiram-style vibrant card
export default function ProductCard({ product, onInquiry }) {
  const [inquired, setInquired] = useState(false)

  // Get initials for placeholder image
  const initials = product.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  // Lowest price in sizes
  const lowestPrice = Math.min(...product.sizes.map((s) => s.price))
  const highestPrice = Math.max(...product.sizes.map((s) => s.price))

  const handleInquiry = () => {
    setInquired(true)
    onInquiry?.(product)
    setTimeout(() => setInquired(false), 2000)
  }

  // Category color map
  const categoryColors = {
    Bhujia: 'bg-orange-100 text-orange-700',
    Mixture: 'bg-yellow-100 text-yellow-700',
    Chana: 'bg-amber-100 text-amber-700',
    Bhakarwadi: 'bg-red-100 text-red-700',
    Chiwda: 'bg-lime-100 text-lime-700',
    Sweets: 'bg-pink-100 text-pink-700',
    Chips: 'bg-blue-100 text-blue-700',
    Other: 'bg-gray-100 text-gray-600',
  }

  return (
    <div
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 
                 hover:-translate-y-1 overflow-hidden flex flex-col border border-orange-50"
      role="article"
      aria-label={`${product.name} snack product`}
    >
      {/* Image Area */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50 aspect-square">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-arunas-orange/10 to-arunas-yellow/20">
            <span className="font-poppins font-bold text-4xl text-arunas-orange/40 select-none">
              {initials}
            </span>
          </div>
        )}

        {/* Category pill overlay */}
        <span
          className={`absolute top-3 left-3 text-xs font-poppins font-semibold px-2 py-1 rounded-full
                      ${categoryColors[product.category] || 'bg-gray-100 text-gray-600'}`}
        >
          {product.category}
        </span>

        {/* Veg dot */}
        <span
          className="absolute top-3 right-3 w-5 h-5 border-2 border-green-600 rounded-sm flex items-center justify-center bg-white"
          aria-label="Vegetarian"
          title="Pure Vegetarian"
        >
          <span className="w-2.5 h-2.5 bg-green-600 rounded-full block" />
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-poppins font-bold text-arunas-brown text-base leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Size chips */}
        <div className="flex flex-wrap gap-1 mb-3 mt-1">
          {product.sizes.map((s) => (
            <span
              key={s.weight}
              className="text-xs bg-orange-50 text-arunas-orange border border-orange-200 
                         rounded-full px-2 py-0.5 font-nunito"
            >
              {s.weight}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-4">
          <span className="font-poppins font-bold text-arunas-orange text-xl">
            ₹{lowestPrice}
          </span>
          {lowestPrice !== highestPrice && (
            <span className="font-nunito text-gray-400 text-sm">
              – ₹{highestPrice}
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleInquiry}
          aria-label={`Add ${product.name} to inquiry`}
          className={`mt-auto w-full py-2 rounded-xl text-sm font-poppins font-semibold 
                      border-2 transition-all duration-200 focus:outline-none focus:ring-2 
                      focus:ring-arunas-orange focus:ring-offset-2
                      ${
                        inquired
                          ? 'bg-arunas-orange text-white border-arunas-orange'
                          : 'bg-transparent text-arunas-orange border-arunas-orange hover:bg-arunas-orange hover:text-white'
                      }`}
        >
          {inquired ? '✓ Added!' : 'Add to Inquiry'}
        </button>
      </div>
    </div>
  )
}

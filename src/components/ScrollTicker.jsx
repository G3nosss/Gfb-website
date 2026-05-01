// Infinite horizontal scroll ticker strip

export default function ScrollTicker({
  text = 'HANDCRAFTED · AUTHENTIC · ASSAMESE · PREMIUM · BOLD ·',
  repeat = 6,
  className = '',
  speed = 'animate-ticker',
}) {
  const items = Array(repeat).fill(text)

  return (
    <div
      className={`overflow-hidden whitespace-nowrap select-none ${className}`}
      aria-hidden="true"
    >
      <div className={`inline-flex ${speed}`} style={{ willChange: 'transform' }}>
        {items.map((item, i) => (
          <span key={i} className="inline-block px-6">
            {item}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="inline-block px-6">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

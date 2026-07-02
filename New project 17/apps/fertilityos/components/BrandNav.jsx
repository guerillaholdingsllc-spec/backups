export function BrandNav({ active = "FertilityFund" }) {
  const items = [
    ["FertilityFund", "/fertilityfund"],
    ["MaleGenesis", "/malegenesis"],
    ["IVFCompare", "/ivfcompare"],
    ["Command Center", "/command-center"]
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/86 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="/fertilityfund" className="text-lg font-bold tracking-normal text-ink">
          FertilityOS
        </a>
        <div className="flex gap-1 overflow-x-auto rounded-md bg-ink/5 p-1">
          {items.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`whitespace-nowrap rounded px-3 py-2 text-sm font-semibold ${
                active === label ? "bg-white text-ink shadow-sm" : "text-ink/65"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

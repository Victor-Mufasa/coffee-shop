import { useState } from "react";

function ShopPage({ products }) {
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.origin.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Our Coffee Selection</h2>
        <div className="flex items-center bg-white border rounded px-2">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search Coffee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white rounded shadow p-7">
            <div className="text-center text-4xl relative bg-gray-100 rounded p-4">
              <span className="top-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                {p.location}
              </span>
            </div>
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-gray-600 text-sm">{p.description}</p>
            <div className="flex justify-between items-center mt-2 pt-2 border-t">
              <span className="text-gray-600 text-sm">{p.origin}</span>
              <span className="text-amber-700 font-bold">
                ${p.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No coffee found matching your search</p>
        </div>
      )}
    </div>
  );
}

export default ShopPage;

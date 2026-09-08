import { useState } from "react";

function AdminPage({ products, onAdd, onUpdate, onDelete }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    origin: '',
    price: '',
    location: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...form,
      price: parseFloat(form.price)
    };
    
    if (editingId) {
      onUpdate(editingId, productData);
      setEditingId(null);
    } else {
      onAdd(productData);
    }
    
    setForm({ name: '', description: '', origin: '', price: '', location: '' });
    setIsAdding(false);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      origin: product.origin,
      price: product.price,
      location: product.location
    });
    setIsAdding(true);
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm({ name: '', description: '', origin: '', price: '', location: '' });
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin Portal</h2>
        <button onClick={() => setIsAdding(true)} className="bg-amber-600 text-white px-4 py-2 rounded-2xl font-semibold hover:bg-amber-700">
          Add Coffee
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-4 rounded-2xl shadow mb-6">
          <h3 className="text-lg font-bold mb-3">
            {editingId ? 'Edit Coffee' : 'Add New Coffee'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Coffee Name</label>
                <input
                  name="name"
                  placeholder="Type Here"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Origin</label>
                <input
                  name="origin"
                  placeholder="Type Here"
                  value={form.origin}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  name="location"
                  placeholder="Type Here"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-2xl"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <input
                  name="price"
                  type="number"
                  placeholder="0.00"
                  value={form.price}
                  step={0.01}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-2xl"
                  required
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Text here"
                value={form.description}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border rounded-2xl"
                required
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="bg-amber-600 text-white px-6 py-2 font-semibold hover:bg-amber-700 rounded-2xl">
                {editingId ? 'Update' : 'Submit'}
              </button>
              <button type="button" onClick={cancelForm} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-3xl font-semibold hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        <h3 className="font-bold text-lg mb-3">Current Inventory</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {products.map(p => (
            <div key={p.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl">☕</span>
                <div>
                  <div className="font-bold">{p.name}</div>
                  <div className="text-gray-500 text-sm">{p.origin} · {p.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-amber-700 font-bold mr-1">${p.price.toFixed(2)}</span>
                <button onClick={() => startEdit(p)} className="w-8 h-9 bg-gray-200 rounded-2xl hover:bg-gray-300">
                  Edit
                </button>
                <button onClick={() => onDelete(p.id)} className="w-12 h-9 bg-rose-100 text-rose-600 rounded-3xl hover:bg-rose-200">
                  Del
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
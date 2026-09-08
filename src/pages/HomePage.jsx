import { Link } from "react-router";

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <div className="bg-linear-to-br bg-amber-900 rounded-2xl p-8 grid gap-6 mb-8 justify-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-50">
            The go to store for your<br />coffee needs
          </h2>
          <p className="text-amber-200 text-lg mt-2">
            Discover the finest coffee beans from around the world.
          </p>
          <Link to="/shop" className="inline-block mt-4 bg-amber-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-amber-700">
            Shop Now
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl text-center shadow">
          <h3 className="font-bold text-lg">Global Sourcing</h3>
          <p className="text-gray-500 text-sm">Directly sourced from the best coffee farms worldwide.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl text-center shadow">
          <h3 className="font-bold text-lg">Fresh Roasting</h3>
          <p className="text-gray-500 text-sm">Roasted to perfection for the ultimate flavor experience.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl text-center shadow">
          <h3 className="font-bold text-lg">Sustainable</h3>
          <p className="text-gray-500 text-sm">Supporting ethical and sustainable coffee farming.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
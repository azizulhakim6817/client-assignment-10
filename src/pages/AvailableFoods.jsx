import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:3000/foods");
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };
    fetchFoods();
  }, []);

  const sortedFoods = [...foods].sort((a, b) => {
    const aNum = parseInt(a.foodQuantity?.match(/\d+/)?.[0]) || 0;
    const bNum = parseInt(b.foodQuantity?.match(/\d+/)?.[0]) || 0;
    return bNum - aNum;
  });

  return (
    <section className="bg-gray-100 p-6 my:p-16">
      <h2 className="text-2xl font-bold mb-8 text-center text-yellow-500">
        Available Foods
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sortedFoods.map((food) => (
          <motion.div
            key={food._id}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded shadow-md"
          >
            <img
              src={food.foodImage || "https://via.placeholder.com/150"}
              alt={food.foodName}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="font-bold text-xl text-yellow-600 mb-1">
              {food.foodName}
            </h3>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Serves:</span> {food.foodQuantity}
            </p>
            <p className="text-sm mb-3 text-gray-600">
              <span className="font-semibold">Location:</span>{" "}
              {food.pickupLocation}
            </p>
            {/* single food */}
            <Link
              to={`/food-details/${food._id}`}
              className="block text-center bg-yellow-400 font-semibold py-2 rounded hover:bg-orange-700 hover:text-white"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AvailableFoods;

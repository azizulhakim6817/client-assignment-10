import { useEffect, useState } from "react";
import Header from "../component/Header";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Home = () => {
  const [foods, setFoods] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error("Error fetching foods:", err));
  }, []);

  return (
    <div>
      {/* Banner Section */}
      <Header />

      {/* Featured Foods */}
      <section className="bg-gray-100 p-4 md:p-10">
        <h2 className="text-2xl font-bold mb-10 text-center text-gray-700">
          Featured Foods
        </h2>
        <div className="gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {foods
            ?.slice(0, 6)
            ?.sort((a, b) => {
              // "Serves 5 people" -> 5
              const aNum = parseInt(a.foodQuantity.match(/\d+/)[0]);
              const bNum = parseInt(b.foodQuantity.match(/\d+/)[0]);
              return bNum - aNum;
            })
            .map((food) => (
              <motion.div
                key={food._id}
                whileHover={{ scale: 1.05 }}
                className="card bg-white  p-4 rounded shadow-md"
              >
                <img
                  src={food.foodImage || "https://via.placeholder.com/150"}
                  alt={food.foodName}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-bold mb-1 text-[18px] md:text-xl text-yellow-600">
                  {food.foodName}
                </h3>
                <p className="my-1">
                  <span className="font-bold text-[14px] text-gray-600">
                    Serves :{" "}
                  </span>{" "}
                  {food.foodQuantity}
                </p>
                <p className="mb-3 text-[14px]">
                  <span className="font-bold text-gray-600">Location : </span>{" "}
                  {food.pickupLocation}
                </p>
                <Link
                  to={`/food-details/${food._id}`}
                  className="px-4 py-2 font-semibold bg-yellow-400 text-center rounded hover:bg-orange-700 hover:text-white"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
        </div>
        <div className="text-center my-6 md:my-12">
          <Link
            to="/available-foods"
            className="btn px-6 py-2 font-semibold text-[16px] bg-yellow-400  rounded hover:bg-orange-700 hover:text-white"
          >
            Show All
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100  pb-20 pt-10 px-4 sm:px-8 ">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-700">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center max-w-6xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6  rounded-xl shadow-xl bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-orange-400">
              1. Post Food
            </h3>
            <p className="text-gray-600">
              Add the surplus food you want to donate with clear details and a
              photo.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6  rounded-xl shadow-xl bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-orange-400">
              2. Find Food
            </h3>
            <p className="text-gray-600">
              Browse available foods nearby and request what you need.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6  rounded-xl shadow-xl bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-orange-400">
              3. Collect Food
            </h3>
            <p className="text-gray-600">
              Once accepted, meet the donor and collect your shared food.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission / Community Stats */}
      <section className="mission py-16 px-4 sm:px-8  bg-orange-100 text-center shadow-inner">
        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl sm:text-3xl font-bold mb-4 text-gray-700"
        >
          Our Mission
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
        >
          To reduce food waste and strengthen community bonds by connecting
          generous donors with people in need.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6  rounded-xl shadow-xl bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-400">
              120+
            </h3>
            <p className="text-gray-600 mt-2">Food Donors</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl shadow-xl bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-400">
              500+
            </h3>
            <p className="text-gray-600 mt-2">Food Requests Fulfilled</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6  rounded-xl shadow-xl bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-400">
              1000+
            </h3>
            <p className="text-gray-600 mt-2">Community Members</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

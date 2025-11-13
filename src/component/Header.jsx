import { motion } from "framer-motion";
import { Link } from "react-router";

const Header = () => {
  return (
    <div>
      <section
        className="bg-linear-to-r from-yellow-300  to-orange-500 
                 bg-size-[200%_200%] animate-gradient-x p-8 md:p-14 text-center text-white"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-gray-800"
        >
          Welcome to <span className="text-orange-700">PlateShare</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base sm:text-lg text-gray-900 leading-relaxed max-w-2xl mx-auto"
        >
          Share your surplus food with the community and help reduce food waste.
          Together, we can make a difference!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8"
        >
          <Link
            to="/available-foods"
            className="inline-block px-8 py-3  text-white text-md font-medium rounded-lg shadow bg-gray-600  hover:bg-orange-700 transition-colors duration-300"
          >
            View All Foods
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Header;

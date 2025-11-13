import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 p-6">
      {/* Animated 404 number */}
      <div className="relative w-30 h-30 mb-8">
        <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-50"></div>
        <div className="absolute inset-0 rounded-full bg-yellow-500 flex justify-center items-center text-white font-extrabold text-xl shadow-lg">
          404
        </div>
      </div>

      {/* Main message */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-700 mb-4 text-center animate-bounce">
        Page Not Found
      </h2>
      <p className="text-yellow-800 mb-6 text-center text-sm sm:text-base md:text-lg px-2 sm:px-4">
        Sorry, the page you are looking for does not exist.
      </p>

      {/* Go back button */}
      <Link
        to="/"
        className="px-6 py-3 sm:px-8 sm:py-4 bg-yellow-600 hover:bg-yellow-800 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

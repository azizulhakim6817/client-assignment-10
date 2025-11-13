import { useRouteError, Link } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 p-6">
      <h1 className="text-xl  md:text-3xl  font-bold text-yellow-700 mb-4 animate-bounce text-center">
        Oops! Something went wrong
      </h1>
      <h1 className="text-xl  md:text-3xl  font-bold text-yellow-700 ">
        Not Fund Page
      </h1>

      {error && (
        <p className="text-yellow-800 mb-6 text-center text-sm sm:text-base md:text-lg px-2 sm:px-4">
          {error.statusText || error.message || "Page not found."}
        </p>
      )}

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

export default ErrorPage;

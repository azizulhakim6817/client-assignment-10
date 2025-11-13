import { useLoaderData } from "react-router";

const FoodDetails = () => {
  const food = useLoaderData();

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-yellow-100 via-orange-100 to-white p-4 sm:p-6 md:p-10">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="w-full h-64 md:h-80 overflow-hidden">
          <img
            src={food.foodImage || "https://via.placeholder.com/400x300"}
            alt={food.foodName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-6 md:p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-600 mb-3">
            {food.foodName}
          </h1>

          <p className="text-gray-700 text-lg mb-4 font-bold">
            {food.foodQuantity}
          </p>

          <div className="flex flex-col md:flex-row justify-between gap-4 text-gray-600 text-base mb-6">
            <div>
              <span className="font-bold ">Serves : </span>
              {food.pickupLocation}
            </div>
            <div>
              <span className="font-bold">⏰ Expire Date : </span>
              {food.expireDate}
            </div>
          </div>

          <p className="bg-yellow-50 border-yellow-200 rounded-lg p-4 italic text-gray-700">
            “{food.additionalNotes}”
          </p>

          <button className="mt-6 px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition">
            Request This Food
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;

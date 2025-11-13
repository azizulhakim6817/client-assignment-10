import { useState } from "react";
import axios from "axios";

import CalendarIcon from "../component/CalendarIcon ";
import { toast } from 'react-toastify';


const AddFood = () => {
  const [expireDate, setExpireDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const food_name = e.target.food_name.value;
    const food_image = e.target.food_image.value;
    const food_quantity = e.target.food_quantity.value;
    const pickup_location = e.target.pickup_location.value;
    const additional_notes = e.target.additional_notes.value;
    const donator_name = e.target.donator_name.value;
    const email = e.target.email.value;
    const donator_image = e.target.donator_image.value;
    const food_status = e.target.food_status.value || "Available";

    const foodData = {
      food_name,
      food_image,
      food_quantity,
      pickup_location,
      expire_date: expireDate,
      additional_notes,
      donator_name,
      donator_email: email,
      donator_image,
      food_status,
    };

    try {
      const res = await axios.post("http://localhost:3000/food", foodData);
      if (res.status === 201 || res.status === 200) {
        toast.success("Food submitted successfully!");
        e.target.reset();
        setExpireDate(null);
      }
    } catch (err) {
      console.error("Error submitting food:", err);
      toast.error("Failed to submit food. Try again.");
    }
  };

  return (
    <div className="py-8  px-4 md:px-14 bg-gray-100 flex justify-center items-center">
      <div className="card bg-base-100 w-[300px] md:w-[600px] shrink-0 shadow-xl p-8">
        <h1 className="text-xl md:text-2xl font-bold text-center text-yellow-600 mb-4">
          Create a Food
        </h1>

        <form onSubmit={handleSubmit}>
          <label className="label">Food Name :</label>
          <input
            type="text"
            name="food_name"
            className="input w-full mb-2"
            placeholder="Food name..."
            required
          />

          <label className="label">Food Image :</label>
          <input
            type="text"
            name="food_image"
            className="input w-full mb-2"
            placeholder="Food Image..."
            required
          />

          <label className="label">Food Quantity :</label>
          <input
            type="text"
            name="food_quantity"
            className="input w-full mb-2"
            placeholder="Serves 2 people..."
            required
          />

          <label className="label">Pickup Location :</label>
          <input
            type="text"
            name="pickup_location"
            className="input w-full mb-2"
            placeholder="Location..."
            required
          />

          <div>
            <label className="label mr-4">Expire Date :</label>
            <CalendarIcon value={expireDate} onChange={setExpireDate} />
          </div>
          <label className="label mt-2">Additional Notes :</label>
          <input
            type="text"
            name="additional_notes"
            className="input w-full mb-2"
            placeholder="Additional Notes..."
          />

          <label className="label">Donator Name :</label>
          <input
            type="text"
            name="donator_name"
            className="input w-full mb-2"
            placeholder="Donator Name..."
            required
          />

          <label className="label">Email :</label>
          <input
            type="email"
            name="email"
            className="input w-full mb-2"
            placeholder="Email..."
            required
          />

          <label className="label">Donator Image :</label>
          <input
            type="text"
            name="donator_image"
            className="input w-full mb-2"
            placeholder="Donator Image URL..."
          />

          <label className="label">Food Status :</label>
          <input
            type="text"
            name="food_status"
            className="input w-full mb-2"
            placeholder="Available"
            defaultValue="Available"
          />

          <button
            type="submit"
            className="btn font-bold text-[16px] bg-yellow-400 text-black mt-4 w-full"
          >
            Create Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;

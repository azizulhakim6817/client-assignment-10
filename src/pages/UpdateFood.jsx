import { use } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const ManageMyFoods = () => {
  const { user } = use(AuthContext);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-foods?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setFoods(data));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this food?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/food/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setFoods(foods.filter((food) => food._id !== id));
            Swal.fire("Deleted!", "Your food has been deleted.", "success");
          });
      }
    });
  };

  return (
    <div className="p-6 md:px-14">
      <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">
        Manage My Foods
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-yellow-400 text-black font-semibold">
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td>{food.food_name}</td>
                <td>{food.food_quantity}</td>
                <td>{food.pickup_location}</td>
                <td>{food.food_status}</td>
                <td className="flex gap-2">
                  <Link
                    to={`/update-food/${food._id}`}
                    className="btn btn-sm bg-blue-500 text-white"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="btn btn-sm bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMyFoods;

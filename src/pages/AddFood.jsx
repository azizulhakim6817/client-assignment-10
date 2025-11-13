import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AddFood() {
  const [user] = useAuthState(auth);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (err) => reject(err);
        });

      const base64Image = await toBase64(data.foodImage[0]);

      const token = await user.getIdToken();
      await axios.post(
        "/api/foods",
        {
          ...data,
          foodImage: base64Image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Food added successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add food");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Food</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("foodName", { required: true })}
          placeholder="Food Name"
          className="input"
        />
        <input
          type="file"
          {...register("foodImage", { required: true })}
          className="input"
        />
        <input
          {...register("foodQuantity", { required: true })}
          placeholder="Serves 2 people"
          className="input"
        />
        <input
          {...register("pickupLocation", { required: true })}
          placeholder="Pickup Location"
          className="input"
        />
        <input
          type="date"
          {...register("expireDate", { required: true })}
          className="input"
        />
        <textarea
          {...register("additionalNotes")}
          placeholder="Additional Notes"
          className="input"
        />
        <button type="submit" className="btn-primary">
          Add Food
        </button>
      </form>
    </div>
  );
}

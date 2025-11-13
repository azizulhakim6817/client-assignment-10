import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarIcon = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(value || null);

  const handleChange = (date) => {
    setSelectedDate(date);
    onChange(date); // pass date back to parent
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      placeholderText="Select Expire Date..."
      className="input w-full"
      dateFormat="yyyy-MM-dd"
      minDate={new Date()}
      showIcon
    />
  );
};

export default CalendarIcon;


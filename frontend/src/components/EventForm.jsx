import { useState } from "react";
import "./EventForm.css"; // Ensure this import points to the correct CSS file

const EventForm = () => {
  const [eventData, setEventData] = useState({
    eventName: "",
    venue: "",
    eventDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:4000/create-event", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Event created successfully:", data);
      alert("Event created successfully!");
    } else {
      alert(data.message || "Error creating event");
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>Request Event</h2>
      <input
        type="text"
        name="eventName"
        placeholder="Event Name"
        value={eventData.eventName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="venue"
        placeholder="Venue"
        value={eventData.venue}
        onChange={handleChange}
      />
      <input
        type="date"
        name="eventDate"
        value={eventData.eventDate}
        onChange={handleChange}
      />
      <button className="btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default EventForm;

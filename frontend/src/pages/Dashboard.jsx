import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";


const Dashboard = () => {
  const [todayEvents, setTodayEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    fetch("https://calendar-backend-5fh6.onrender.com/events/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((events) => {
        const today = new Date().toISOString().split("T")[0];

        const todayList = [];
        const upcomingList = [];
        const pastList = [];

        events.forEach((e) => {
          const eventDate = e.start.split("T")[0];

          if (eventDate === today) todayList.push(e);
          else if (eventDate > today) upcomingList.push(e);
          else pastList.push(e);
        });

        setTodayEvents(todayList);
        setUpcomingEvents(upcomingList);
        setPastEvents(pastList);
      });
  }, []);


  const handleEdit = (event) => {
  navigate("/calendar", {
    state: { editEvent: event },
  });
};


const handleDelete = async (id) => {
  if (!window.confirm("Delete this event?")) return;

  await fetch(`https://calendar-backend-5fh6.onrender.com/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  window.location.reload();
};

  const renderEvents = (list, isPast = false) =>
  list.length ? (
    list.map((e) => (
      <li key={e.id} className="event-item">
        <div>
          <strong>{e.title}</strong>
          <br />
          <small>
            {e.start.replace("T", " ")} – {e.end.replace("T", " ")}
          </small>
        </div>

        <div className="event-actions">
          {!isPast && (
            <button
              className="edit-btn"
              onClick={() => handleEdit(e)}
            >
              Edit
            </button>
          )}
          <button
            className="delete-btn"
            onClick={() => handleDelete(e.id)}
          >
            Delete
          </button>
        </div>
      </li>
    ))
  ) : (
    <p className="empty">No events</p>
  );


  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-grid">
        <section>
  <h3>📅 Today</h3>
  <ul>{renderEvents(todayEvents)}</ul>
</section>

<section>
  <h3>⏭ Upcoming</h3>
  <ul>{renderEvents(upcomingEvents)}</ul>
</section>

<section>
  <h3>⏪ Past</h3>
  <ul>{renderEvents(pastEvents, true)}</ul>
</section>

      </div>
    </div>
  );
};

export default Dashboard;

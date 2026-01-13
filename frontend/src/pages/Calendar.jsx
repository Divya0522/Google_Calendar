import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "../components/EventModal";
import "../styles/calendar.css";
import { useLocation } from "react-router-dom";


const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [allowDateEdit, setAllowDateEdit] = useState(false);
  const EVENTS_URL = "http://127.0.0.1:8000/events/";
  const location = useLocation();




  const fetchEvents = async () => {
    const res = await fetch(`${EVENTS_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
  if (location.state?.editEvent) {
    const e = location.state.editEvent;

    setEditingEvent({
      id: e.id,
      title: e.title,
      description: e.description,
      notify_before: e.notify_before,
      event_date: e.start.split("T")[0],
      start_time: e.start.split("T")[1].slice(0, 5),
      end_time: e.end.split("T")[1].slice(0, 5),
    });

    setSelectedDate(e.start.split("T")[0]);
    setAllowDateEdit(true);
    setShowModal(true);
  }
}, [location.state]);


  const handleCreateClick = () => {
  const today = new Date().toISOString().split("T")[0];
  setSelectedDate(today);
  setAllowDateEdit(true);    
  setShowModal(true);
};


  const handleDateClick = (info) => {
  setSelectedDate(info.dateStr);
  setAllowDateEdit(false);   
  setShowModal(true);
};


  const handleSaveEvent = async (eventData) => {
    const url = editingEvent
      ? `${EVENTS_URL}${editingEvent.id}`
      : `${EVENTS_URL}`;

    const method = editingEvent ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(eventData),
    });

    setShowModal(false);
    setEditingEvent(null);
    fetchEvents();
  };

  const handleDeleteEvent = async () => {
    await fetch(`${EVENTS_URL}${editingEvent.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setShowModal(false);
    setEditingEvent(null);
    fetchEvents();
  };

 const handleEventClick = (info) => {
  setEditingEvent({
    id: info.event.id,
    title: info.event.title,
    description: info.event.extendedProps.description,
    notify_before: info.event.extendedProps.notify_before,
    event_date: info.event.startStr.split("T")[0],
    start_time: info.event.startStr.split("T")[1].slice(0, 5),
    end_time: info.event.endStr.split("T")[1].slice(0, 5),
  });

  setSelectedDate(info.event.startStr.split("T")[0]);
  setAllowDateEdit(false); // 🔒 FIX
  setShowModal(true);
};


  return (
    <div style={{ padding: "20px" }}>
      <button className="create-btn" onClick={handleCreateClick}>
        + Create
      </button>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      {showModal && (
  <EventModal
    selectedDate={selectedDate}
    allowDateEdit={allowDateEdit}
    eventData={editingEvent}
    onSave={handleSaveEvent}
    onDelete={handleDeleteEvent}
    onClose={() => {
      setShowModal(false);
      setEditingEvent(null);
    }}
  />
)}

    </div>
  );
};

export default Calendar;

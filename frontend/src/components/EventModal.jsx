import { useState } from "react";
import "../styles/EventModal.css";

const EventModal = ({
  selectedDate,
  onClose,
  onSave,
  onDelete,
  eventData,
  allowDateEdit,
}) => {
  const [title, setTitle] = useState(eventData?.title || "");
  const [startTime, setStartTime] = useState(eventData?.start_time || "10:00");
  const [endTime, setEndTime] = useState(eventData?.end_time || "11:00");
  const [eventDate, setEventDate] = useState(selectedDate);
  const [description, setDescription] = useState(eventData?.description || "");
  const [notifyBefore, setNotifyBefore] = useState(
    eventData?.notify_before || 10
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      description,
      event_date: eventDate,
      start_time: startTime,
      end_time: endTime,
      notify_before: notifyBefore,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Event</h2>

        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />

          <label>Notify Before</label>
          <select
            value={notifyBefore}
            onChange={(e) => setNotifyBefore(Number(e.target.value))}
          >
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={30}>30 minutes</option>
          </select>

          <label>Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            readOnly={!allowDateEdit}
          />

          <label>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <label>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            {eventData && (
              <button type="button" className="delete-btn" onClick={onDelete}>
                Delete
              </button>
            )}

            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;

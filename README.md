# Calendar Management Application

A full-stack calendar management web application inspired by Google Calendar.
Users can securely log in, create, update, and manage calendar events through an interactive interface.



## Features

* User authentication (Register & Login)
* JWT-based secure access
* Interactive calendar (Month / Week / Day views)
* Create, edit, and delete events
* Event fields:

  * Title
  * Description
  * Date
  * Start Time
  * End Time
  * Notify Before (5 / 10 / 30 minutes)
* Dashboard for:

  * Today’s events
  * Upcoming events
  * Past events


##  Tech Stack

### Frontend

* React (Vite)
* React Router
* FullCalendar


### Backend

* FastAPI
* JWT Authentication
* Pydantic
* PostgreSQL

### Database

* Supabase (PostgreSQL)



##  Project Structure

```
frontend/   → React application
backend/    → FastAPI server
```



##  How to Run the Project

### Backend

```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

##  Authentication Flow

* User logs in → receives JWT token
* Token stored in browser
* Protected routes accessible only after login

---

##  Outcome

This project demonstrates full-stack development skills including authentication, API development, database integration, and frontend UI design.

---

##  Author

**Divyasrilakshmi**

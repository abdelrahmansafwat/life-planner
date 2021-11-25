import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Schedule() {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    console.log(localStorage.getItem("schedule"));
    let schedule = localStorage.getItem("schedule");
    
    let scheduleParsed = JSON.parse(schedule);
    let eventsParsed = [];

    scheduleParsed.map((value, index) => {
        eventsParsed.push(JSON.parse(value));
    });

    setAllEvents(eventsParsed);
  }, []);

  return (
    <React.Fragment>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        headerToolbar={false}
        height={"auto"}
        allDaySlot={false}
        firstDay={1}
        //slotDuration={"01:00:00"}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        dayHeaderContent={(calendar) => weekDays[calendar.date.getDay()]}
        events={allEvents}
      />
    </React.Fragment>
  );
}

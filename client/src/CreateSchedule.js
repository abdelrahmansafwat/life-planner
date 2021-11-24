import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";

let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CreateSchedule() {
  const [allEvents, setAllEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [selectedTime, setSelectedTime] = useState({});

  const setEvent = () => {
    let events = [...allEvents];

    console.log([selectedTime.start.getDay()]);

    events.push({
      id: selectedTime.startStr,
      title: eventTitle + " (" + eventType + ")",
      start: selectedTime.start,
      end: selectedTime.end,
      //daysOfWeek: [selectedTime.start.getDay()]
    });

    setAllEvents(events);
    handleClose();
  };

  const handleOpen = (info) => {
    setSelectedTime(info);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTime({});
    setEventTitle("");
    setEventType("");
    setOpen(false);
  };

  const planLife = () => {
    let events = [...allEvents];

    allEvents.map((value, index) => {
        if(value.title.split("(")[1]){
            if(value.title.split("(")[1].replace(")", "") === "Sports"){
                events.push({
                    id: dayjs(value.start).subtract(1, "hour").toString(),
                    title: "Stretch",
                    start: dayjs(value.start).subtract(1, "hour").toDate(),
                    //daysOfWeek: [dayjs(value.start).subtract(1, "hour").toDate().getDay()],
                    //end: value.start,
                });
                events.push({
                    id: value.end.toString(),
                    title: "Eat",
                    start: dayjs(value.end).add(1, "hour").toDate(),
                    //daysOfWeek: [dayjs(value.end).add(1, "hour").toDate().getDay()],
                    //end: dayjs(value.end).add(1, "hour").toDate(),
                });
            }
            else if(value.title.split("(")[1].replace(")", "") === "Class"){
                events.push({
                    id: dayjs(value.start).subtract(1, "day").toString(),
                    title: "Cover asynchronous content",
                    start: dayjs(value.start).subtract(1, "day").add(1, "hour").toDate(),
                    //daysOfWeek: [dayjs(value.start).subtract(1, "day").add(1, "hour").toDate().getDay()],
                    //end: dayjs(value.start).subtract(1, "day").add(1, "hour").toDate(),
                });
                events.push({
                    id: value.end.toString(),
                    title: "Make revision notes",
                    start: dayjs(value.end).add(1, "hour").toDate(),
                    //daysOfWeek: [dayjs(value.end).add(1, "hour").toDate().getDay()],
                    //end: dayjs(value.end).add(1, "hour").toDate(),
                });
            }
            else if(value.title.split("(")[1].replace(")", "") === "Clubbing"){
                events.push({
                    id: dayjs(value.start).subtract(2, "hour").toString(),
                    title: "Drink",
                    start: dayjs(value.start).subtract(2, "hour").toDate(),
                    //daysOfWeek: [dayjs(value.start).subtract(2, "hour").toDate().getDay()],
                    //end: dayjs(value.start).subtract(1, "hour").subtract(30, "minute").toDate(),
                });
                events.push({
                    id: value.end.toString(),
                    title: "Sleep",
                    start: dayjs(value.end).add(30, "minute").toDate(),
                    //daysOfWeek: [dayjs(value.end).add(30, "minute").toDate().getDay()],
                    //end: dayjs(value.end).add(30, "minute").toDate(),
                });
            }
            else if(value.title.split("(")[1].replace(")", "") === "Meal"){
                events.push({
                    id: dayjs(value.start).subtract(1, "hour").toString(),
                    title: "Buy ingredients",
                    start: dayjs(value.start).subtract(1, "hour").toDate(),
                    //daysOfWeek: [dayjs(value.start).subtract(1, "hour").toDate().getDay()],
                    //end: value.start,
                });
                events.push({
                    id: value.end.toString(),
                    title: "Clean up",
                    start: dayjs(value.end).add(30, "minute").toDate(),
                    //daysOfWeek: [dayjs(value.end).add(30, "minute").toDate().getDay()],
                    //end: dayjs(value.end).add(30, "minute").toDate(),
                });
            }
        }
    });

    console.log(events);

    setAllEvents(events);
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="event"
            label="Event Title"
            fullWidth
            variant="standard"
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="event-type-label">Event Type</InputLabel>
            <Select
              labelId="event-type-select-label"
              id="event-type-select"
              value={eventType}
              label="Age"
              onChange={(e) => setEventType(e.target.value)}
            >
              <MenuItem value={"Sports"}>Sports</MenuItem>
              <MenuItem value={"Class"}>Class</MenuItem>
              <MenuItem value={"Clubbing"}>Clubbing</MenuItem>
              <MenuItem value={"Meal"}>Meal</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={setEvent}>Add</Button>
        </DialogActions>
      </Dialog>
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
        selectable={true}
        select={handleOpen}
      />
      <Button fullWidth onClick={planLife}>Plan Your Life</Button>
    </React.Fragment>
  );
}

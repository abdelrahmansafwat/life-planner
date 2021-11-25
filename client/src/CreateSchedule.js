import React, { useState, useRef } from "react";
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
  MenuItem,
  Typography,
  Grid,
  Fab,
  Paper,
  MenuList,
  Grow,
  Popper,
  ClickAwayListener,
} from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import Lottie from "react-lottie";
import scientist from "./assets/scientist.json";
import history from "./history";

let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CreateSchedule() {
  const [allEvents, setAllEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [selectedTime, setSelectedTime] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [ready, setReady] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [created, setCreated] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleMenuClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenMenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenu(false);
    }
  }

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
    setReady(false);
    let events = [...allEvents];

    setTimeout(function () {
      setReady(true);
      setConfirm(true);
    }, 10000);

    allEvents.map((value, index) => {
      if (value.title.split("(")[1]) {
        if (value.title.split("(")[1].replace(")", "") === "Sports") {
          events.push({
            id: dayjs(value.start).subtract(1, "hour").toString(),
            title: "Stretch before " + value.title.split("(")[0],
            start: dayjs(value.start).subtract(1, "hour").toDate(),
            //daysOfWeek: [dayjs(value.start).subtract(1, "hour").toDate().getDay()],
            //end: value.start,
          });
          events.push({
            id: value.end.toString(),
            title: "Eat after " + value.title.split("(")[0],
            start: dayjs(value.end).add(1, "hour").toDate(),
            //daysOfWeek: [dayjs(value.end).add(1, "hour").toDate().getDay()],
            //end: dayjs(value.end).add(1, "hour").toDate(),
          });
        } else if (value.title.split("(")[1].replace(")", "") === "Class") {
          events.push({
            id: dayjs(value.start).subtract(1, "day").toString(),
            title:
              "Cover " + value.title.split("(")[0] + " asynchronous content",
            start: dayjs(value.start).subtract(1, "day").toDate(),
            //daysOfWeek: [dayjs(value.start).subtract(1, "day").add(1, "hour").toDate().getDay()],
            //end: dayjs(value.start).subtract(1, "day").add(1, "hour").toDate(),
          });
          events.push({
            id: value.end.toString(),
            title: "Make revision notes for " + value.title.split("(")[0],
            start: dayjs(value.end).add(1, "hour").toDate(),
            //daysOfWeek: [dayjs(value.end).add(1, "hour").toDate().getDay()],
            //end: dayjs(value.end).add(1, "hour").toDate(),
          });
        } else if (value.title.split("(")[1].replace(")", "") === "Clubbing") {
          events.push({
            id: dayjs(value.start).subtract(2, "hour").toString(),
            title: "Drink water before" + value.title.split("(")[0],
            start: dayjs(value.start).subtract(2, "hour").toDate(),
            //daysOfWeek: [dayjs(value.start).subtract(2, "hour").toDate().getDay()],
            //end: dayjs(value.start).subtract(1, "hour").subtract(30, "minute").toDate(),
          });
          events.push({
            id: value.end.toString(),
            title: "Sleep after " + value.title.split("(")[0],
            start: dayjs(value.end).add(30, "minute").toDate(),
            //daysOfWeek: [dayjs(value.end).add(30, "minute").toDate().getDay()],
            //end: dayjs(value.end).add(30, "minute").toDate(),
          });
        } else if (value.title.split("(")[1].replace(")", "") === "Meal") {
          events.push({
            id: dayjs(value.start).subtract(1, "hour").toString(),
            title: "Buy ingredients for " + value.title.split("(")[0],
            start: dayjs(value.start).subtract(1, "hour").toDate(),
            //daysOfWeek: [dayjs(value.start).subtract(1, "hour").toDate().getDay()],
            //end: value.start,
          });
          events.push({
            id: value.end.toString(),
            title: "Clean up after " + value.title.split("(")[0],
            start: dayjs(value.end).add(30, "minute").toDate(),
            //daysOfWeek: [dayjs(value.end).add(30, "minute").toDate().getDay()],
            //end: dayjs(value.end).add(30, "minute").toDate(),
          });
        }
      }
    });

    setAllEvents(events);
  };

  return (
    <React.Fragment>
      {!created && (
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
          {ready && (
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
                dayHeaderContent={(calendar) =>
                  weekDays[calendar.date.getDay()]
                }
                events={allEvents}
                selectable={true}
                select={handleOpen}
              />
              {!confirm && (
                <Button fullWidth onClick={planLife}>
                  Plan Your Life
                </Button>
              )}
            </React.Fragment>
          )}
          {!ready && (
            <React.Fragment>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: scientist,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={400}
                width={400}
              />
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                justifyContent="center"
                //style={{ minHeight: "100vh" }}
              >
                <Grid item xs={3}>
                  <Typography sx={{ flexGrow: 1, textAlign: "center" }}>
                    Hang on...
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography sx={{ flexGrow: 1, textAlign: "center" }}>
                    Our rocket scientists are planning your life
                  </Typography>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
          {confirm && (
            <React.Fragment>
              <Fab
                style={{
                  position: "fixed",
                  bottom: 30,
                  right: 30,
                  zIndex: 100,
                }}
                size="medium"
                onClick={handleToggle}
                variant="extended"
                ref={anchorRef}
              >
                Can you manage this schedule?
              </Fab>
              <Popper
                open={openMenu}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{
                  zIndex: 100,
                  width: 250,
                }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleMenuClose}>
                        <MenuList
                          autoFocusItem={openMenu}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                            onClick={() => {
                              console.log("Saved");
                              let eventsStringified = [];
                              allEvents.map((value, index) => {
                                eventsStringified.push(JSON.stringify(value));
                              });
                              localStorage.setItem(
                                "schedule",
                                JSON.stringify(eventsStringified)
                              );
                              setCreated(true);
                            }}
                          >
                            Yes
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setAllEvents([]);
                              setOpenMenu(false);
                              setConfirm(false);
                            }}
                          >
                            No
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      {created && (
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
      )}
    </React.Fragment>
  );
}

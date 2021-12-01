//ffd500
//864cbf

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
  Avatar,
} from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import Lottie from "react-lottie";
import scientist from "./assets/scientist.json";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./styles.css";

let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dayColors = [
  "#38483c",
  "#a2c3aa",
  "#7fa387",
  "#719178",
  "#637f69",
  "#556d5a",
  "#475b4b",
];
//let dayColors = ["#8FB4CF","#CF5384","#CF7730","#CFAC30","#D1394E","#D1C23F","#30CCBD",];
let dayEventColors = [
  "#8db596",
  "#d1e1d5",
  "#c6dacb",
  "#bbd3c0",
  "#afcbb6",
  "#a4c4ab",
  "#98bca1",
];
//let dayEventColors = ["#A0CAE8","#F6629D","#F58C38","#F0C837","#F04158","#F0DE47","#3AF2E0",];

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
  const history = useHistory();
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle classes={{ root: { color: "black" } }}>Add Event</DialogTitle>
        <DialogContent>
          <TextField
            //autoFocus
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
              <MenuItem style={{ color: "black" }} value={"Sports"}>Sports</MenuItem>
              <MenuItem style={{ color: "black" }} value={"Class"}>Class</MenuItem>
              <MenuItem style={{ color: "black" }} value={"Clubbing"}>Clubbing</MenuItem>
              <MenuItem style={{ color: "black" }} value={"Meal"}>Meal</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "black" }} onClick={handleClose}>Cancel</Button>
          <Button style={{ color: "black" }} onClick={setEvent}>Add</Button>
        </DialogActions>
      </Dialog>
      {ready && (
        <React.Fragment>
          <Carousel
            autoPlay={false}
            emulateTouch={true}
            showStatus={false}
            showIndicators={false}
            infiniteLoop={false}
            preventMovementUntilSwipeScrollTolerance={true}
            swipeScrollTolerance={20}
          >
            {[1, 2, 3, 4, 5, 6, 0].map((value, index) => (
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                justifyContent="center"
                //style={{ minHeight: "100vh" }}
              >
                <Grid item>
                  <Paper
                    elevation={5}
                    style={{
                      width: "100%",
                      //marginBottom: 50,
                      borderRadius: 50,
                      paddingTop: 50,
                      paddingBottom: 50,
                      backgroundColor: dayColors[value],
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      style={{
                        backgroundColor: "#8DB596",
                        marginBottom: 25,
                        width: 500,
                        height: 50,
                      }}
                    >
                      <Typography variant="h3">Life Planner</Typography>
                    </Avatar>
                    <FullCalendar
                      plugins={[timeGridPlugin, interactionPlugin]}
                      headerToolbar={false}
                      height={"auto"}
                      allDaySlot={false}
                      firstDay={1}
                      slotMinTime={"07:00"}
                      hiddenDays={[1, 2, 3, 4, 5, 6, 0].filter(
                        (e) => e !== value
                      )}
                      eventBackgroundColor={dayEventColors[value]}
                      eventBorderColor={dayEventColors[value]}
                      eventTextColor={"#000"}
                      //minTime={"07:00"}
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
                  </Paper>
                </Grid>
              </Grid>
            ))}
          </Carousel>
          {!confirm && (
            <Fab
              style={{
                position: "fixed",
                bottom: 5,
                right: 5,
                zIndex: 100,
                backgroundColor: "#8DB596",
              }}
              size="medium"
              onClick={planLife}
              variant="extended"
            >
              Plan Your Life
            </Fab>
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
            <Grid item>
              <Typography sx={{ flexGrow: 1, textAlign: "center" }}>
                Hang on...
              </Typography>
            </Grid>
            <Grid item>
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
              bottom: 5,
              right: 5,
              zIndex: 100,
              backgroundColor: "#8DB596",
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
                          axios.create({ baseURL: window.location.origin });
                          axios
                            .post("/api/upload_schedule/new", {
                              user_id: localStorage.getItem("user_id"),
                              schedule: allEvents,
                            })
                            .then(function (response) {
                              console.log(response);
                              history.push("/schedule");
                            })
                            .catch(function (error) {
                              console.log(error);
                            });
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
  );
}

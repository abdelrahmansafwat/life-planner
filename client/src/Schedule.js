import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Grid, Paper, Avatar, Typography } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
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

export default function Schedule() {
  const [allEvents, setAllEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    /*
    console.log(localStorage.getItem("schedule"));
    let schedule = localStorage.getItem("schedule");

    let scheduleParsed = JSON.parse(schedule);
    let eventsParsed = [];

    scheduleParsed.map((value, index) => {
      eventsParsed.push(JSON.parse(value));
    });
    */

    axios.create({ baseURL: window.location.origin });
    axios
      .post("/api/retrieve_schedule/specific", {
        user_id: localStorage.getItem("user_id"),
      })
      .then(function (response) {
        console.log(response.data.data[0]);
        if (response.data.data[0]) {
          setAllEvents(response.data.data[0].schedule);
        } else {
          history.push("/create-schedule");
        }
        //history.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });

    //setAllEvents(eventsParsed);
  }, []);

  return (
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
                hiddenDays={[1, 2, 3, 4, 5, 6, 0].filter((e) => e !== value)}
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
                //selectable={true}
                //select={handleOpen}
              />
            </Paper>
          </Grid>
        </Grid>
      ))}
      </Carousel>
    </React.Fragment>
  );
}

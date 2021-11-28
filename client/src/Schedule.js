import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
        if(response.data.data[0]){
          setAllEvents(response.data.data[0].schedule);
        }
        else {
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
                marginBottom: 50,
                borderRadius: 50,
                paddingTop: 50,
                paddingBottom: 50,
                backgroundColor: "#8DB596",
              }}
            >
              <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                headerToolbar={false}
                height={"auto"}
                allDaySlot={false}
                firstDay={1}
                slotMinTime={"07:00"}
                hiddenDays={[1, 2, 3, 4, 5, 6, 0].filter((e) => e !== value)}
                eventBackgroundColor={"#BEDBBB"}
                eventBorderColor={"#BEDBBB"}
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
    </React.Fragment>
  );
}

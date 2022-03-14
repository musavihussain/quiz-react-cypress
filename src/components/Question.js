import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { Box } from "@mui/system";

function Question(props) {
  const [selected, setSelected] = useState("");
  const [counter, setCounter] = useState(15);
  const [timerColor, setTimerColor] = useState("black");
  const [addMoreTime, setAddMoreTime] = useState(true);

  const changeHandler = (event) => {
    setSelected(event.target.value);
  };

  const nextClickHandler = () => {
    props.onAnswerUpdate((prevState) => [
      ...prevState,
      { q: props.data.question, a: selected },
    ]);
    setSelected("");
    if (props.activeQuestion < props.numberOfQuestions - 1) {
      setCounter(15);
      props.onSetActiveQuestion(props.activeQuestion + 1);
    } else {
      props.onSetStep(3);
    }
  };

  const addTenSecondHandler = () => {
    setCounter(counter + 10);
    setAddMoreTime(false);
  };

  useEffect(() => {
    if (counter === 0) {
      nextClickHandler();
    }
    if (counter < 6) {
      setTimerColor("red");
    } else {
      setTimerColor("black");
    }

    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  return (
    <Container sx={{ py: 5 }}>
      <Grid container justifyContent="center">
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", mb: 3 }}>
                <div>
                  {props.showOptionRemoval && (
                    <Button
                      onClick={props.onRemoveWrongAnswers}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mr: 2 }}
                    >
                      Remove 2 wrong options
                    </Button>
                  )}
                </div>
                <div>
                  {addMoreTime && (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={addTenSecondHandler}
                    >
                      Add Time
                    </Button>
                  )}
                </div>
              </Box>

              <div
                id="timer"
                style={{
                  color: timerColor,
                  marginBottom: "30px",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <AccessAlarmsIcon sx={{ mr: 1 }} />
                Remaining Time: {counter}
              </div>

              <FormControl fullWidth>
                <FormLabel id="quiz-question">{props.data.question}</FormLabel>
                <RadioGroup
                  defaultValue=""
                  onChange={changeHandler}
                >
                  {props.data.choices.map((option) => {
                    return (
                      <FormControlLabel
                        key={option.id}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                        name="quiz-choices"
                      />
                    );
                  })}
                </RadioGroup>
                <Button
                  variant="contained"
                  id="next-question-btn"
                  sx={{ mt: 4 }}
                  onClick={nextClickHandler}
                  fullWidth
                >
                  Next
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Question;

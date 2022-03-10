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

function Question({
  data,
  onAnswerUpdate,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
}) {
  const [selected, setSelected] = useState("");
  const [counter, setCounter] = useState(15);
  const [timerColor, setTimerColor] = useState("black");

  const changeHandler = (event) => {
    setSelected(event.target.value);
  };

  const nextClickHandler = () => {
    onAnswerUpdate((prevState) => [
      ...prevState,
      { q: data.question, a: selected },
    ]);
    console.log("number of questions", numberOfQuestions);
    setSelected("");
    if (activeQuestion < numberOfQuestions - 1) {
      setCounter(15);
      onSetActiveQuestion(activeQuestion + 1);
      console.log("active question", activeQuestion);
    } else {
      onSetStep(3);
    }
  };

  useEffect(() => {
    if (counter === 0) {
      console.log("counter is zero now");
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
                <FormLabel id="quiz-question">{data.question}</FormLabel>
                <RadioGroup defaultValue="" onChange={changeHandler}>
                  {data.choices.map((option) => {
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

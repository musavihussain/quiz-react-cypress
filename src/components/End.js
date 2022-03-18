import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function End({ results, data, time }) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [unAnsweredQuestions, setUnAnsweredQuestions] = useState(0);

  const dataChart = {
    labels: ["Correct", "Incorrect", "Unanswered"],
    datasets: [
      {
        label: "# of answers",
        data: [correctAnswers, incorrectAnswers, unAnsweredQuestions],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    let correct = 0;
    let incorrect = 0;
    let unAnswered = 0;
    results.forEach((result, index) => {
      if (result.a === data[index].answer) {
        correct++;
      } else if (result.a === "") {
        unAnswered++;
      } else {
        incorrect++;
      }
      setCorrectAnswers(correct);
      setIncorrectAnswers(incorrect);
      setUnAnsweredQuestions(unAnswered);
    });
  }, []);
  return (
    <Container sx={{ py: 5 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" textAlign={"center"}>
                Result
              </Typography>
              <Pie data={dataChart} />

              <Grid container spacing={2} sx={{ my: 4 }}>
                <Grid item xs={12}>
                  <Typography variant="h5" textAlign={"center"}>
                    Overall: {Math.ceil((correctAnswers * 100) / 11) + "%"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  Correct
                </Grid>
                <Grid item xs={6}>
                  <span id="correct-answer">{correctAnswers}</span>
                </Grid>
                <Grid item xs={6}>
                  Incorrect
                </Grid>
                <Grid item xs={6}>
                  <span id="incorrect-answer">{incorrectAnswers}</span>
                </Grid>
                <Grid item xs={6}>
                  Unanswered
                </Grid>
                <Grid item xs={6}>
                  <span id="unanswered-questions">{unAnsweredQuestions}</span>
                </Grid>
              </Grid>
              <Button variant="contained" fullWidth onClick={() => {
                document.location.reload()
              }}>Try again</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default End;

import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

function Start({onQuizStart}) {
  return (
    <Container sx={{ py: 5 }} id="container">
      <Grid container justifyContent="center">
        <Grid item xs={12} md={4} textAlign="center">
          <Card>
            <CardContent>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                Take a quiz
              </Typography>
              <Typography component="div">
                Test your Javascript skills
              </Typography>
              <Button variant="contained" id="start-quiz" sx={{ mt: 4 }} onClick={onQuizStart}>
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Start;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Modal, Form } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Full 5-day workout plan JSON (unchanged from previous)
const workoutPlan = {
  "workout_plan": {
    "goal": "Reduce weight and achieve a proper body figure similar to an actress within 4 months",
    "target_audience": { "age": 24, "weight_kg": 62, "height_ft": 5.3, "experience": "Beginner", "focus_areas": ["body fat", "belly fat"] },
    "schedule": { "days_per_week": 5, "time": "6:00 AM - 7:00 AM", "duration_minutes": 60 },
    "days": [
      {
        "day": 1,
        "name": "Full Body Beginner Workout",
        "objective": "Get the body moving, burn calories, and activate muscles",
        "exercises": [
          {"name": "Warm-Up (Dynamic Stretching)", "reps": "-", "sets": "-", "rest": "-"},
          {"name": "Jumping Jacks", "reps": "30 sec", "sets": 3, "rest": "20 sec"},
          {"name": "Bodyweight Squats", "reps": "12-15", "sets": 3, "rest": "30 sec"},
          {"name": "Glute Bridges", "reps": "12-15", "sets": 3, "rest": "30 sec"},
          {"name": "Standing Leg Raises (each leg)", "reps": 12, "sets": 3, "rest": "20 sec"},
          {"name": "Seated Knee Lifts (Core)", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Plank (Knee Plank)", "reps": "20 sec", "sets": 3, "rest": "30 sec"},
          {"name": "Cool Down & Stretching", "reps": "-", "sets": "-", "rest": "-"}
        ],
        "benefits": "Activates all major muscle groups and boosts metabolism"
      },
      {
        "day": 2,
        "name": "Lower Body Focus",
        "objective": "Tone thighs, shape glutes, and burn belly fat",
        "exercises": [
          {"name": "Warm-Up (Jumping Jacks + Leg Swings)", "reps": "-", "sets": "-", "rest": "-"},
          {"name": "Squats", "reps": "12-15", "sets": 3, "rest": "30 sec"},
          {"name": "Step-ups (stairs or low bench)", "reps": "12 (each leg)", "sets": 3, "rest": "30 sec"},
          {"name": "Donkey Kicks (each leg)", "reps": 12, "sets": 3, "rest": "20 sec"},
          {"name": "Standing Side Leg Lifts", "reps": 12, "sets": 3, "rest": "20 sec"},
          {"name": "Wall Sit", "reps": "20-30 sec", "sets": 3, "rest": "30 sec"},
          {"name": "Seated Ab Twists", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Cool Down & Stretching", "reps": "-", "sets": "-", "rest": "-"}
        ],
        "benefits": "Burns fat from hips and thighs while building shape"
      },
      {
        "day": 3,
        "name": "Upper Body & Arms Toning",
        "objective": "Tone arms, shoulders, and upper body while improving strength",
        "exercises": [
          {"name": "Warm-Up (Arm Circles, Shoulder Rolls)", "reps": "-", "sets": "-", "rest": "-"},
          {"name": "Dumbbell Shoulder Press (2-3kg)", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Bicep Curls", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Tricep Dips (Chair)", "reps": "8-10", "sets": 3, "rest": "30 sec"},
          {"name": "Wall Push-Ups", "reps": 10, "sets": 3, "rest": "30 sec"},
          {"name": "Standing Side Arm Raises", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Seated Ab Twists", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Cool Down & Stretching", "reps": "-", "sets": "-", "rest": "-"}
        ],
        "benefits": "Sculpts toned arms without making them bulky"
      },
      {
        "day": 4,
        "name": "Belly Fat Burner & Core Strengthening",
        "objective": "Focus on burning belly fat and tightening the midsection",
        "exercises": [
          {"name": "Warm-Up (Torso Twists, Side Stretches)", "reps": "-", "sets": "-", "rest": "-"},
          {"name": "Standing Side Crunches (each side)", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Knee Tucks (Seated)", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Bicycle Crunches", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Leg Raises (Bent Knees)", "reps": 10, "sets": 3, "rest": "30 sec"},
          {"name": "Plank", "reps": "20-30 sec", "sets": 3, "rest": "30 sec"},
          {"name": "Glute Bridges", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Cool Down & Stretching", "reps": "-", "sets": "-", "rest": "-"}
        ],
        "benefits": "Flattens the stomach and tightens the waistline"
      },
      {
        "day": 5,
        "name": "Full-Body Fat Burn & Toning",
        "objective": "Burn maximum calories and strengthen muscles",
        "exercises": [
          {"name": "Warm-Up (High Knees, Arm Circles)", "reps": "-", "sets": "-", "rest": "-"},
          {"name": "Squats", "reps": "12-15", "sets": 3, "rest": "30 sec"},
          {"name": "Step-ups (each leg)", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Standing Side Crunches", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Plank Shoulder Taps", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Glute Bridges", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Russian Twists", "reps": 12, "sets": 3, "rest": "30 sec"},
          {"name": "Cool Down & Stretching", "reps": "-", "sets": "-", "rest": "-"}
        ],
        "benefits": "Mix of cardio and strength to burn fat and shape the body"
      }
    ]
  }
};

// Motivational quotes
const startQuotes = ["Start strong, finish stronger!", "Today’s effort, tomorrow’s reward.", "You’ve got this—let’s move!"];
const endQuotes = ["Great job—you’re unstoppable!", "One workout closer to your goal!", "Proud of you—keep shining!"];

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 9)); // March 9, 2025 (Sunday)
  const [displayedWorkout, setDisplayedWorkout] = useState(null);
  const [workoutData] = useState(workoutPlan.workout_plan);
  const [completedExercises, setCompletedExercises] = useState({});
  const [progress, setProgress] = useState({});
  const [savedWorkouts, setSavedWorkouts] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [exerciseTrackers, setExerciseTrackers] = useState({});
  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [selfie, setSelfie] = useState(null);
  const [currentQuote] = useState(startQuotes[Math.floor(Math.random() * startQuotes.length)]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('workoutProgress')) || {};
    const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts')) || {};
    setProgress(savedProgress);
    setSavedWorkouts(savedWorkouts);
    setDisplayedWorkout(getWorkoutForDate(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem('workoutProgress', JSON.stringify(progress));
    localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
  }, [progress, savedWorkouts]);

  const getWorkoutForDate = (date) => {
    const dayOfWeek = date.getDay();
    return (dayOfWeek >= 1 && dayOfWeek <= 5) ? workoutData.days[dayOfWeek - 1] : null;
  };

  const handleTileClick = (date) => {
    const workout = getWorkoutForDate(date);
    setDisplayedWorkout(workout);
  };

  const startWorkout = () => {
    setStartTime(new Date());
    setShowStartModal(true);
  };

  const finishWorkout = () => {
    setShowEndModal(true); // Show end modal even if not all exercises are completed
  };

  const toggleExerciseCompletion = (day, exerciseIndex) => {
    const dateKey = selectedDate.toDateString();
    const newCompleted = { ...completedExercises };
    if (!newCompleted[dateKey]) newCompleted[dateKey] = {};
    newCompleted[dateKey][exerciseIndex] = !newCompleted[dateKey][exerciseIndex];
    setCompletedExercises(newCompleted);

    const totalExercises = displayedWorkout?.exercises.length || 0;
    const completedCount = Object.values(newCompleted[dateKey] || {}).filter(Boolean).length;
    setProgress((prev) => ({
      ...prev,
      [dateKey]: { completed: completedCount, total: totalExercises },
    }));

    if (completedCount === totalExercises) setShowEndModal(true);
  };

  const trackExercise = (exerciseIndex, field, value) => {
    const dateKey = selectedDate.toDateString();
    setExerciseTrackers((prev) => ({
      ...prev,
      [dateKey]: { ...prev[dateKey], [exerciseIndex]: { ...prev[dateKey]?.[exerciseIndex], [field]: value } },
    }));
  };

  const saveWorkout = () => {
    const dateKey = selectedDate.toDateString();
    const endTime = new Date();
    const duration = startTime ? Math.round((endTime - startTime) / 60000) : 0;
    setSavedWorkouts((prev) => ({
      ...prev,
      [dateKey]: {
        startTime: startTime?.toISOString(),
        endTime: endTime.toISOString(),
        duration,
        exercises: exerciseTrackers[dateKey] || {},
        selfie,
      },
    }));
    setShowEndModal(false);
    setStartTime(null);
    setExerciseTrackers((prev) => ({ ...prev, [dateKey]: {} }));
    setSelfie(null);
  };

  const handleSelfieUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setSelfie(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const getExerciseDetails = (exerciseName) => {
    const instructions = {
      "Warm-Up (Dynamic Stretching)": "Perform 5 minutes of arm circles, neck rolls, and side bends.",
      "Jumping Jacks": "Jump with legs apart and arms overhead, then return to start.",
      "Bodyweight Squats": "Lower hips as if sitting, keep chest up, then stand.",
      "Glute Bridges": "Lie on back, lift hips using glutes, hold, then lower.",
      "Standing Leg Raises (each leg)": "Lift one leg forward, keep it straight, then lower.",
      "Seated Knee Lifts (Core)": "Sit and lift knees toward chest, then lower.",
      "Plank (Knee Plank)": "Hold a plank position on knees for stability.",
      "Cool Down & Stretching": "Stretch major muscle groups for 5 minutes.",
      "Warm-Up (Jumping Jacks + Leg Swings)": "Do jumping jacks and leg swings for 5 minutes.",
      "Squats": "Stand with feet apart, lower hips, then stand.",
      "Step-ups (stairs or low bench)": "Step up onto a surface, alternating legs.",
      "Donkey Kicks (each leg)": "On all fours, kick one leg back, then switch.",
      "Standing Side Leg Lifts": "Lift leg to the side, keep it straight, then lower.",
      "Wall Sit": "Lean against a wall, slide down to a seated position, hold.",
      "Seated Ab Twists": "Sit, twist torso side to side.",
      "Warm-Up (Arm Circles, Shoulder Rolls)": "Circle arms and roll shoulders for 5 minutes.",
      "Dumbbell Shoulder Press (2-3kg)": "Press dumbbells overhead, then lower.",
      "Bicep Curls": "Curl dumbbells toward shoulders, then lower.",
      "Tricep Dips (Chair)": "Use a chair to dip, bending elbows.",
      "Wall Push-Ups": "Push against a wall, bending elbows.",
      "Standing Side Arm Raises": "Raise arms to sides, then lower.",
      "Warm-Up (Torso Twists, Side Stretches)": "Twist torso and stretch sides for 5 minutes.",
      "Standing Side Crunches (each side)": "Crunch to the side, lifting knee.",
      "Knee Tucks (Seated)": "Sit, tuck knees to chest, then extend.",
      "Bicycle Crunches": "Lie down, pedal legs while twisting torso.",
      "Leg Raises (Bent Knees)": "Lie down, lift bent knees, then lower.",
      "Plank": "Hold a plank position on elbows.",
      "Warm-Up (High Knees, Arm Circles)": "Do high knees and arm circles for 5 minutes.",
      "Plank Shoulder Taps": "In plank, tap opposite shoulder, alternate.",
      "Russian Twists": "Sit, twist torso with hands together."
    };
    const referenceLinks = {
      "Warm-Up (Dynamic Stretching)": "https://www.youtube.com/watch?v=MkYdJZlfgCo",
      "Jumping Jacks": "https://www.youtube.com/watch?v=c4DAnQ6DtF8",
      "Bodyweight Squats": "https://www.youtube.com/watch?v=aclHkVaku9U",
      "Glute Bridges": "https://www.youtube.com/watch?v=OUskM71w4A0",
      "Standing Leg Raises (each leg)": "https://www.youtube.com/watch?v=7PizgEeF5lA",
      "Seated Knee Lifts (Core)": "https://www.youtube.com/watch?v=IzL_8guwADs",
      "Plank (Knee Plank)": "https://www.youtube.com/watch?v=5G67xoNd-QU",
      "Cool Down & Stretching": "https://www.youtube.com/watch?v=7PizgEeF5lA",
      "Warm-Up (Jumping Jacks + Leg Swings)": "https://www.youtube.com/watch?v=c4DAnQ6DtF8",
      "Squats": "https://www.youtube.com/watch?v=aclHkVaku9U",
      "Step-ups (stairs or low bench)": "https://www.youtube.com/watch?v=zvZcN6tz2rU",
      "Donkey Kicks (each leg)": "https://www.youtube.com/watch?v=Sj33AX2oP9g",
      "Standing Side Leg Lifts": "https://www.youtube.com/watch?v=zvZcN6tz2rU",
      "Wall Sit": "https://www.youtube.com/watch?v=y-wV4Venusw",
      "Seated Ab Twists": "https://www.youtube.com/watch?v=IzL_8guwADs",
      "Warm-Up (Arm Circles, Shoulder Rolls)": "https://www.youtube.com/watch?v=MkYdJZlfgCo",
      "Dumbbell Shoulder Press (2-3kg)": "https://www.youtube.com/watch?v=5G67xoNd-QU",
      "Bicep Curls": "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
      "Tricep Dips (Chair)": "https://www.youtube.com/watch?v=0326dy_-CzM",
      "Wall Push-Ups": "https://www.youtube.com/watch?v=5G67xoNd-QU",
      "Standing Side Arm Raises": "https://www.youtube.com/watch?v=zvZcN6tz2rU",
      "Warm-Up (Torso Twists, Side Stretches)": "https://www.youtube.com/watch?v=MkYdJZlfgCo",
      "Standing Side Crunches (each side)": "https://www.youtube.com/watch?v=IzL_8guwADs",
      "Knee Tucks (Seated)": "https://www.youtube.com/watch?v=IzL_8guwADs",
      "Bicycle Crunches": "https://www.youtube.com/watch?v=9FGilxCbdz8",
      "Leg Raises (Bent Knees)": "https://www.youtube.com/watch?v=JB2oyawG2KI",
      "Plank": "https://www.youtube.com/watch?v=5G67xoNd-QU",
      "Warm-Up (High Knees, Arm Circles)": "https://www.youtube.com/watch?v=MkYdJZlfgCo",
      "Plank Shoulder Taps": "https://www.youtube.com/watch?v=5G67xoNd-QU",
      "Russian Twists": "https://www.youtube.com/watch?v=wkD8rjkodUI"
    };
    return {
      instructions: instructions[exerciseName] || "Follow the video/image.",
      reference: referenceLinks[exerciseName] || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    };
  };

  const chartData = {
    labels: Object.keys(progress).slice(-7),
    datasets: [{ label: 'Exercises Completed', data: Object.values(progress).slice(-7).map(p => p.completed), backgroundColor: 'rgba(75, 192, 192, 0.6)' }],
  };

  return (
    <div className="app">
      <Container fluid className="py-4">
        <h1 className="text-center mb-4 text-primary"><i className="fas fa-dumbbell me-2"></i>My Wife Workout Planner</h1>
        <p className="text-center text-muted mb-4"><i className="fas fa-bullseye me-2"></i><strong>Goal:</strong> {workoutData.goal}</p>
        <p className="text-center text-muted mb-4"><i className="fas fa-clock me-2"></i><strong>Schedule:</strong> {workoutData.schedule.time}, {workoutData.schedule.days_per_week} days/week</p>
        <Card className="quote-card mb-4">
          <Card.Body>
            <blockquote className="blockquote mb-0 text-center text-success">
              <i className="fas fa-quote-left me-2"></i>{currentQuote}<i className="fas fa-quote-right ms-2"></i>
            </blockquote>
          </Card.Body>
        </Card>

        <Row>
          <Col xs={12} md={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Header className="bg-gradient-primary text-white"><i className="fas fa-calendar-alt me-2"></i>Workout Calendar</Card.Header>
              <Card.Body>
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  className="custom-calendar w-100"
                  tileClassName={({ date }) => {
                    const workout = getWorkoutForDate(date);
                    return workout ? `workout-day day-${workout.day}` : 'rest-day';
                  }}
                  tileContent={({ date }) => {
                    const workout = getWorkoutForDate(date);
                    return (
                      <div className="tile-content" onClick={() => handleTileClick(date)}>
                        {workout ? (
                          <span className="workout-label"><i className="fas fa-running me-1"></i>Day {workout.day}</span>
                        ) : (
                          <span className="rest-label"><i className="fas fa-bed me-1"></i>Rest</span>
                        )}
                      </div>
                    );
                  }}
                  onClickDay={(value, event) => event.preventDefault()}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Header className="bg-gradient-success text-white">
                <i className="fas fa-dumbbell me-2"></i>{displayedWorkout ? displayedWorkout.name : "Rest Day"} - {selectedDate.toDateString()}
              </Card.Header>
              <Card.Body>
                {displayedWorkout ? (
                  <>
                    <Button variant="primary" className="mb-3 me-2" onClick={startWorkout} disabled={startTime}>
                      <i className="fas fa-play me-2"></i>Start Workout
                    </Button>
                    {startTime && (
                      <Button variant="warning" className="mb-3" onClick={finishWorkout}>
                        <i className="fas fa-stop me-2"></i>Finish Workout
                      </Button>
                    )}
                    <p><i className="fas fa-hourglass-start me-2"></i><strong>Start Time:</strong> {startTime ? startTime.toLocaleTimeString() : "Not started"}</p>
                    <p><i className="fas fa-bullseye me-2"></i><strong>Objective:</strong> {displayedWorkout.objective}</p>
                    <p><i className="fas fa-heart me-2"></i><strong>Benefits:</strong> {displayedWorkout.benefits}</p>
                    <ListGroup variant="flush">
                      {displayedWorkout.exercises.map((exercise, index) => {
                        const details = getExerciseDetails(exercise.name);
                        const isCompleted = completedExercises[selectedDate.toDateString()]?.[index];
                        const tracker = exerciseTrackers[selectedDate.toDateString()]?.[index] || {};
                        return (
                          <ListGroup.Item key={index} className={isCompleted ? 'completed' : ''}>
                            <h5><i className="fas fa-running me-2"></i>{exercise.name}</h5>
                            <p><i className="fas fa-redo me-2"></i><strong>Reps:</strong> {exercise.reps} | <strong>Sets:</strong> {exercise.sets} | <i className="fas fa-pause me-2"></i><strong>Rest:</strong> {exercise.rest}</p>
                            <p><i className="fas fa-info-circle me-2"></i>{details.instructions}</p>
                            <p><a href={details.reference} target="_blank" rel="noopener noreferrer" className="text-primary"><i className="fas fa-video me-2"></i>Watch Exercise Video</a></p>
                            <Form.Group className="mb-2">
                              <Form.Label><i className="fas fa-stopwatch me-2"></i>Time Spent (sec):</Form.Label>
                              <Form.Control
                                type="number"
                                value={tracker.time || ''}
                                onChange={(e) => trackExercise(index, 'time', e.target.value)}
                                disabled={!startTime}
                              />
                            </Form.Group>
                            <Form.Group className="mb-2">
                              <Form.Label><i className="fas fa-redo me-2"></i>Reps Done:</Form.Label>
                              <Form.Control
                                type="number"
                                value={tracker.reps || ''}
                                onChange={(e) => trackExercise(index, 'reps', e.target.value)}
                                disabled={!startTime}
                              />
                            </Form.Group>
                            <Form.Group className="mb-2">
                              <Form.Label><i className="fas fa-layer-group me-2"></i>Sets Done:</Form.Label>
                              <Form.Control
                                type="number"
                                value={tracker.sets || ''}
                                onChange={(e) => trackExercise(index, 'sets', e.target.value)}
                                disabled={!startTime}
                              />
                            </Form.Group>
                            <Button
                              variant={isCompleted ? 'outline-danger' : 'success'}
                              onClick={() => toggleExerciseCompletion(displayedWorkout.day, index)}
                              disabled={!startTime}
                            >
                              {isCompleted ? <><i className="fas fa-undo me-2"></i>Undo</> : <><i className="fas fa-check me-2"></i>Mark as Done</>}
                            </Button>
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                    <p className="mt-3"><i className="fas fa-chart-line me-2"></i><strong>Progress:</strong> {progress[selectedDate.toDateString()]?.completed || 0}/{displayedWorkout.exercises.length} exercises completed</p>
                  </>
                ) : (
                  <p className="text-center"><i className="fas fa-bed me-2"></i>Enjoy your rest day!</p>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Header className="bg-gradient-info text-white"><i className="fas fa-chart-bar me-2"></i>Weekly Progress</Card.Header>
              <Card.Body>
                <Bar data={chartData} options={{ responsive: true }} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={showStartModal} onHide={() => setShowStartModal(false)}>
          <Modal.Header closeButton className="bg-gradient-primary text-white">
            <Modal.Title><i className="fas fa-rocket me-2"></i>Let’s Get Started!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-center">{startQuotes[Math.floor(Math.random() * startQuotes.length)]}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowStartModal(false)}>
              <i className="fas fa-play me-2"></i>Begin Now
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEndModal} onHide={() => setShowEndModal(false)}>
          <Modal.Header closeButton className="bg-gradient-success text-white">
            <Modal.Title><i className="fas fa-trophy me-2"></i>Workout Completed!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-center">{endQuotes[Math.floor(Math.random() * endQuotes.length)]}</p>
            <Form.Group>
              <Form.Label><i className="fas fa-camera me-2"></i>Upload a Selfie!</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleSelfieUpload} />
              {selfie && <img src={selfie} alt="Workout Selfie" className="mt-3 rounded" style={{ maxWidth: '100%' }} />}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={saveWorkout}>
              <i className="fas fa-save me-2"></i>Save Workout
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default App;
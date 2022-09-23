import { useState } from "react";
import { initialWorkouts, generateWorkout } from "./Workouts.js";
import "./App.css";

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts);

  const addNewWorkout = () => {
    const newWorkout = generateWorkout();
    setWorkouts([...workouts, newWorkout]);
  };

  const deleteWorkout = (workoutToDelete) => {
    const reducedWorkouts = workouts.filter(function (workout) {
      return workout !== workoutToDelete;
    });
    setWorkouts(reducedWorkouts);
  };

  const completeWorkout = (workoutToUpdate) => {
    console.log("workoutToUpdate", workoutToUpdate);

    const updatedWorkouts = workouts.map(function (workout) {
      if (workout === workoutToUpdate) {
        return {
          exercise: workoutToUpdate.exercise,
          reps: workoutToUpdate.reps,
          sets: workoutToUpdate.sets,
          rest: workoutToUpdate.rest,
          done: !workoutToUpdate.done,
        };
      }
      return workout;
    });

    setWorkouts(updatedWorkouts);
  };

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of{" "}
              <strong>
                {workout.reps}x{workout.exercise}
              </strong>{" "}
              with {workout.rest} seconds rest
            </p>
            {!workout.done && (
              <button onClick={(e) => completeWorkout(workout)}>Done</button>
            )}
            {workout.done && <p>✅</p>}
            <button onClick={(e) => deleteWorkout(workout)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

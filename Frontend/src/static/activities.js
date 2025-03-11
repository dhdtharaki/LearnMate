// activities.js

const activities = [
    { name: "Play matching card games to improve memory and focus", timeTake: 9, retries: 1 },
    { name: "Practice mindfulness exercises like breathing or focusing on sounds", timeTake: 7, retries: 1 },
    { name: "Use visual schedules to break down daily tasks step by step", timeTake: 16, retries: 1 },
    { name: "Create a simple task list with pictures to help organize daily chores", timeTake: 12, retries: 1 },
    { name: "Play simple board games or puzzles to improve planning and recall", timeTake: 22, retries: 1 },
    { name: "Practice memory games that require following steps to complete tasks", timeTake: 18, retries: 1 },
    { name: "Practice completing chores independently with a visual checklist", timeTake: 19, retries: 1 },
    { name: "Work on puzzles that involve following a sequence of steps", timeTake: 27, retries: 1 },
    { name: "Engage in short focus-based learning tasks to improve task completion", timeTake: 30, retries: 1 },
    { name: "Create step-by-step checklists for tasks like getting dressed or cleaning up", timeTake: 11, retries: 2 },
    { name: "Practice recognizing and discussing feelings with simple role-play exercises", timeTake: 17, retries: 2 },
    { name: "Work on simple puzzles that require sequential thinking and problem-solving", timeTake: 14, retries: 2 },
    { name: "Use role-play to practice recognizing mistakes and discussing what can be improved", timeTake: 20, retries: 2 },
    { name: "Use role-play to practice recognizing mistakes and discussing what can be improved", timeTake: 20, retries: 2 },
    { name: "Organize chores into smaller tasks and track progress", timeTake: 18, retries: 2 },
    { name: "Set simple goals and break them down into smaller achievable steps", timeTake: 21, retries: 2 },
    { name: "Use guided discussions to set and identify personal goals for the future", timeTake: 27, retries: 2 },
    { name: "Work on problem-solving puzzles that require recognizing patterns and strategies", timeTake: 32, retries: 2 },
    { name: "Practice organizing tasks by priority with a simple list or visual chart", timeTake: 23, retries: 2 },
    { name: "Work one-on-one with a coach to break down tasks into simple steps", timeTake: 16, retries: 3 },
    { name: "Practice social skills through role-play exercises that focus on recognition of mistakes", timeTake: 20, retries: 3 },
    { name: "Engage in short focused activities like simple puzzles or memory games", timeTake: 17, retries: 3 },
    { name: "Use visual aids and cues to improve social interaction and task completion", timeTake: 24, retries: 3 },
    { name: "Practice memory games where steps must be recalled in order", timeTake: 22, retries: 3 },
    { name: "Provide immediate feedback during tasks to reinforce step completion", timeTake: 26, retries: 3 },
    { name: "Gradually introduce tasks with multiple steps and provide clear instructions", timeTake: 29, retries: 3 },
    { name: "Practice task prioritization with simple guidance like a checklist or reminder", timeTake: 25, retries: 3 },
    { name: "Work on task prioritization without external help by using visual aids and reminders", timeTake: 32, retries: 3 },
    { name: "Role-playing Social Scenarios", timeTake: 10, retries: 1 },
];

function findActivityByName(name) {
  
  // Remove any trailing period from the name
  const cleanedName = name.replace(/\.$/, "");
  console.log(cleanedName)
  // Search for the cleaned name
  return activities.find(activity => activity.name === cleanedName);
}

// Exporting the array and function
export { activities, findActivityByName };
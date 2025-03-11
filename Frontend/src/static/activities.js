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
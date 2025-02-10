def recommend_activities_for_metacognitive_domain(age, Metacognitive_Level):
    # Define activity recommendations based on age and metacognitive level, focusing on developing metacognitive skills
    activity_recommendations = {
        0: {  # Mild Level Activities
            '5_to_8': [
                "Play matching card games to improve memory and focus.",
                "Practice mindfulness exercises like breathing or focusing on sounds.",
                "Use visual schedules to break down daily tasks step by step.",
            ],
            '9_to_11': [
                "Create a simple task list with pictures to help organize daily chores.",
                "Play simple board games or puzzles to improve planning and recall.",
                "Practice memory games that require following steps to complete tasks."
            ],
            '12_to_14': [
                "Practice completing chores independently with a visual checklist.",
                "Work on puzzles that involve following a sequence of steps.",
                "Engage in short, focus-based learning tasks to improve task completion."
            ]
        },
        1: {  # Moderate Level Activities
            '5_to_8': [
                "Create step-by-step checklists for tasks like getting dressed or cleaning up.",
                "Practice recognizing and discussing feelings with simple role-play exercises.",
                "Work on simple puzzles that require sequential thinking and problem-solving."
            ],
            '9_to_11': [
                "Use role-play to practice recognizing mistakes and discussing what can be improved.",
                "Organize chores into smaller tasks and track progress.",
                "Set simple goals and break them down into smaller, achievable steps."
            ],
            '12_to_14': [
                "Use guided discussions to set and identify personal goals for the future.",
                "Work on problem-solving puzzles that require recognizing patterns and strategies.",
                "Practice organizing tasks by priority with a simple list or visual chart."
            ]
        },
        2: {  # Severe Level Activities
            '5_to_8': [
                "Work one-on-one with a coach to break down tasks into simple steps.",
                "Practice social skills through role-play exercises that focus on recognition of mistakes.",
                "Engage in short, focused activities like simple puzzles or memory games."
            ],
            '9_to_11': [
                "Use visual aids and cues to improve social interaction and task completion.",
                "Practice memory games where steps must be recalled in order.",
                "Provide immediate feedback during tasks to reinforce step completion."
            ],
            '12_to_14': [
                "Gradually introduce tasks with multiple steps and provide clear instructions.",
                "Practice task prioritization with simple guidance, like a checklist or reminder.",
                "Work on task prioritization without external help by using visual aids and reminders."
            ]
        }
    }

    # Determine the appropriate age group
    if 5 <= age <= 8:
        age_group = '5_to_8'
    elif 9 <= age <= 11:
        age_group = '9_to_11'
    else:  # For ages 12 to 14
        age_group = '12_to_14'

    # Select the activities based on age and metacognitive level
    if Metacognitive_Level in activity_recommendations:
        selected_activities = activity_recommendations[Metacognitive_Level].get(age_group, [])
    else:
        return []  # Return an empty list if no matching activities are found

    return selected_activities

def recommend_activities_for_psychomotor_domain(level, age):
    """Suggest activities based on psychomotor level and age."""
    
    # Dictionary mapping psychomotor levels and age groups to recommended activities
    activities_by_age = {
        "Severe": {
            "5-8": ["Threading Beads", "Drawing Shapes", "Color Sorting"],
            "9-11": ["Building Block Towers", "Tracing Patterns", "Basic Finger Exercises"],
            "12-14": ["Learning Basic Crafts", "Simple Hand Exercises", "Gardening Tasks"]
        },
        "Moderate": {
            "5-8": ["Throwing and Catching Balls", "Buttoning Shirts", "Walking on a Line"],
            "9-11": ["Cutting Shapes with Scissors", "Tracing Letters", "Interactive Dance Steps"],
            "12-14": ["Learning to Type", "Organizing Small Objects", "Structured Physical Games"]
        },
        "Mild": {
            "5-8": ["Hand-over-Hand Assistance Tasks", "Sensory Play with Sand or Water", "Simple Arm Movements"],
            "9-11": ["Interactive Music Therapy", "Pushing Large Objects", "Basic Yoga Poses"],
            "12-14": ["Basic Physical Therapy Exercises", "Guided Art Therapy", "Learning to Stack Blocks"]
        }
    }

    # Determine the appropriate age range based on the given age
    if 5 <= age <= 8:
        age_range = "5-8"
    elif 9 <= age <= 11:
        age_range = "9-11"
    elif 12 <= age <= 14:
        age_range = "12-14"
    else:
        raise ValueError("Age out of range")  # Raise an error if age is outside the expected range

    # Retrieve recommended activities for the given psychomotor level and age group
    recommended_activities = activities_by_age[level][age_range]

    # Print the recommended activities in a user-friendly format
    print(f"\nRecommended Activities for {level} Level (Age {age_range}):")
    for activity in recommended_activities:
        print(f"- {activity}")

    return recommended_activities  # Return the list of recommended activities


def recommend_activities_for_affective_domain(AD_Level, age):
    ADactivities = {
        "Mild": {
            "5-8": [
                "Emotion Identification with Facial Expressions: Use flashcards with various facial expressions and have the child identify the emotion.",
                "Role-playing Social Scenarios: Set up social situations and practice them together.",
                "Mindfulness activities of teach deep breathing",
                "Mindfulness activities of guided relaxation.",
                "Mindfulness activities of gentle stretching."
            ],
            "9-11": [ 
                "Group activities of participate in board games.",
                "Group activities of participate in team sports.",
                "Group activities of participate in board games collaborative art projects."
            ],
            "12-14": [
                "Emotion Identification with Discussion: Use flashcards and have more in-depth discussions about emotions.",
                "Advanced Role-playing: Recognize more complex social emotional situations.",
                "Team Collaboration: Engage in group projects requiring teamwork."
            ]
        },
        "Moderate": {
            "5-8": [
                "Emotion Wheel: Use a wheel with different emotions and ask the child to talk about a time they felt that emotion.",
                "Therapeutic Play: Engage in play that allows the child to express emotions through toys."
            ],
            "9-11": [
                "Feelings Journal or Chart: Use a simple feelings chart with faces showing different emotions.",
                "Social Skills Groups: Place the child in a small group setting with peers to practice communication."
            ],
            "12-14": [
                "Guided Emotional Role-play: Use videos, role-playing, or puppet shows to demonstrate social situations.",
                "Teach simple breathing techniques.",
                "Do exercises."
            ]
        },
        "Severe": {
            "5-8": [
                "Picture Exchange Communication System (PECS): Use a picture system to help the child communicate their feelings.",
                "Sensory Activities: Use stress balls, deep pressure, swings, or textured materials to help with emotional regulation."
            ],
            "9-11": [
                "Picture Exchange Communication System (PECS): Use a picture system to help the child communicate their feelings in advance manner.",
                "Story Time with Emotions: Use storybooks that focus on emotions and discuss how the characters might feel."
            ],
            "12-14": [
                "Use different emotions and ask the child to talk about a time they felt that emotion.",
                "The child can understand what response activities to expect in different emotional situations."
            ]
        }
    }

    # Determine age group
    if 5 <= age <= 8:
        age_group = "5-8"
    elif 9 <= age <= 11:
        age_group = "9-11"
    elif 12 <= age <= 14:
        age_group = "12-14"
    else:
        raise ValueError("Age not supported for these activities.")

    # Return activities for the specific level and age group
    return ADactivities[AD_Level][age_group]


def recommend_activities_for_cognitive_domain(age, Cognitive_Level):
    # Define activity recommendations based on age and cognitive level, focusing on developing cognitive skills
    activity_recommendations = {
        0: {  # Mild Level Activities
            '5_to_8': [
                "Role-playing Social Scenarios",
                "Routine Building",
            ],
            '9_to_11': [
                "Pretend to run a grocery store or library to teach social roles and cooperation",
                "Create indoor or outdoor hunts with clues to enhance critical thinking and observation skills",
            ],
            '12_to_14': [
                "Offer riddles or real-world challenges like planning a picnic",
                "Use visual calendars to teach time management and planning",
            ]
        },
        1: {  # Moderate Level Activities
            '5_to_8': [
                "Work together on a mural or collage",
                "Count objects during daily activities (eg: setting the table, sorting groceries)",
            ],
            '9_to_11': [
                "Play games like 'Simon Says' to practice listening and responding",
                "Asking questions about the day",
            ],
            '12_to_14': [
                "Provide puzzles of varying complexity to build problem-solving",
                "Take turns adding to a story to foster creativity and active listening"

            ]
        },
        2: {  # Severe Level Activities
            '5_to_8': [
                "Use cards with matching pairs (colors, animals, etc.) to improve memory and focus",
                "Teach behaviours in different social situations",
            ],
            '9_to_11': [
                "Have the child sort objects by color, size, or shape to develop categorization skills",
                "Use picture cards to sequence events in a logical order",
            ],
            '12_to_14': [
                "Engage in activities that involve identifying and completing patterns (eg: bead stringing)",
                "Activities like building with limited blocks to teach collaboration and sharing",
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

    print(Cognitive_Level)
    print(activity_recommendations)
    # Select the activities based on age and metacognitive level
    if Cognitive_Level in activity_recommendations:
        selected_activities = activity_recommendations[Cognitive_Level].get(age_group, [])
    else:
        return []  # Return an empty list if no matching activities are found

    return selected_activities



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


def recommend_activities_for_psycimoto_domain(level, age):
    """Suggest activities based on psychomotor level and age."""
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

    # Determine the age range
    if 5 <= age <= 8:
        age_range = "5-8"
    elif 9 <= age <= 11:
        age_range = "9-11"
    elif 12 <= age <= 14:
        age_range = "12-14"
    else:
        raise ValueError("Age out of range")

    recommended_activities = activities_by_age[level][age_range]
    print(f"\nRecommended Activities for {level} Level (Age {age_range}):")
    for activity in recommended_activities:
        print(f"- {activity}")
    return recommended_activities

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../apis/axiosInstance";
import Header from '../../components/Header'


const MetaCognitiveDomain = () => {
    const navigate = useNavigate();
    const loggedUser = localStorage.getItem('user');
    const userObject = JSON.parse(loggedUser);


    const questions = [
        "Does your child usually stay focused on a task without getting easily distracted?",
        "Can your child plan how to complete a task on their own?",
        "Does your child remember and follow steps in the correct order when given instructions?",
        "Does your child complete chores fully without needing reminders or corrections?",
        "Can your child understand and explain what they are trying to achieve in an activity?",
        "Does your child notice and acknowledge when they make a mistake?",
        "Can your child decide which task to do first when given multiple things to do?",
    ];

    const questionsPayload = [
        "Concentration",
        "Individual_Tasks_Planning",
        "Remember_Steps",
        "Finish_Chores_Properly",
        "Identify_Goals",
        "Recognize_Mistakes",
        "Prioritize_Tasks",
    ];

    const options = [1, 2, 3, 4, 5];

    const options2 = ["Never", "Rarely", "Sometimes", "Often", "Always"];

    const [responses, setResponses] = useState({});

    const handleOptionChange = (questionIndex, option) => {
        setResponses({
            ...responses,
            [questionIndex]: option,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Survey Responses:", responses);
            console.log("logged", userObject);

            const payload = Object.entries(responses).reduce(
                (acc, [index, answer]) => {
                    acc[questionsPayload[index]] = answer;
                    return acc;
                },
                {}
            );
            payload['email'] = userObject.email;
            payload['Age'] = userObject.age * 1;
            payload['Gender'] = 1;
            payload['Family_History'] = 1;

            const res = await axios.post("meta-cognitive-predict", payload);

            // Pass only serializable data (e.g., res.data)
            console.log("Response from server:", res.data);
            res.data.domain = 'Meta-Cognitive'
            navigate('/answers', { state: { data: res.data } }); // Pass only the serializable part
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.message || "Something went wrong!",
            });
        }
    };


    const handleBackClick = () => {
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-cyan-100 flex flex-col items-center">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="w-3/4 bg-white p-10 rounded-xl shadow-2xl mt-10">
                <h1 className="text-cyan-600 text-2xl font-semibold mb-8 text-center">
                    Rate your child's knowledge and regulation
                </h1>
                <form onSubmit={handleSubmit}>
                    <table className="w-full text-gray-700">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-4 text-lg">Questions</th>
                                {options2.map((option, index) => (
                                    <th key={index} className="text-center text-lg text-cyan-600">
                                        {option}
                                    </th>
                                ))}
                            </tr>
                            {/* <tr className="border-b">
                                <th></th>
                                {options.map((option, index) => (
                                    <th key={index} className="text-center text-sm text-gray-500">
                                        {option === 1
                                            ? "Very Poor"
                                            : option === 2
                                                ? "Poor"
                                                : option === 3
                                                    ? "Average"
                                                    : option === 4
                                                        ? "Good"
                                                        : "Excellent"}
                                    </th>
                                ))}
                            </tr> */}
                        </thead>
                        <tbody>
                            {questions.map((question, qIndex) => (
                                <tr key={qIndex} className="border-b hover:bg-gray-100">
                                    <td className="py-4 pr-4 text-gray-700 font-medium">{question}</td>
                                    {options.map((option, oIndex) => (
                                        <td key={oIndex} className="text-center">
                                            <input
                                                type="radio"
                                                name={question}
                                                value={option}
                                                checked={responses[qIndex] === option}
                                                onChange={() => handleOptionChange(qIndex, option)}
                                                className="form-radio w-5 h-5 text-cyan-600 focus:ring-cyan-500"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={handleBackClick}
                            className="bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg shadow-md hover:bg-gray-400 transform duration-200"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="bg-cyan-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:bg-cyan-700 transform duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default MetaCognitiveDomain;
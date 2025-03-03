import React from "react";
import { useNavigate } from "react-router-dom";
import ChartImage from "../assets/user/signin.png"; // Replace with the chart image path
import KidsImage from "../assets/user/avator.png"; // Replace with the kids' image path

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center">
            {/* Header */}
            <header className="w-full bg-blue-600 text-white py-4 flex items-center justify-between px-10">
                <h1 className="text-3xl font-bold">Learnmate.</h1>
                <div className="space-x-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-100 transition"
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-800 transition"
                    >
                        Register
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col lg:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg mt-8 overflow-hidden">
                {/* Left Section */}
                <section className="p-6 flex-1">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">
                        Welcome to LearnMate!
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Unlock the potential of every child with autism through personalized
                        growth and support. At LearnMate, we believe that every child
                        deserves a chance to shine. Our platform offers tailored activities
                        and guidance to help children develop essential life skills, build
                        confidence, and embrace their unique strengths.
                    </p>
                </section>

                {/* Right Section with Chart */}
                <div className="flex items-center justify-center p-6">
                    <img
                        src={ChartImage}
                        alt="Chart Placeholder"
                        className="rounded-lg shadow-lg max-h-60"
                    />
                </div>
            </main>

            {/* "Did You Know?" Section */}
            <section className="w-full max-w-6xl bg-blue-100 rounded-lg shadow-lg mt-6 p-6">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Left: Kids Image */}
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <img
                            src={KidsImage}
                            alt="Kids Playing"
                            className="w-48 h-48 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    {/* Right: Text Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">
                            Did you know?
                        </h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>
                                A study conducted at a neuro-developmental center in Northern
                                Sri Lanka revealed that approximately <strong>47%</strong> of
                                autistic children display <strong>moderate to severe impairments</strong> in <em>social interaction</em>, with <strong>43%</strong> facing challenges in communication.
                            </li>
                            <li>
                                Most children with autism require personalized strategies to thrive in education and social environments.
                            </li>
                        </ul>
                        <p className="mt-4 text-gray-700">
                            By understanding these unique characteristics, our platform is
                            designed to provide tools and activities that cater to the
                            diverse needs of autistic children, empowering them to grow and
                            succeed in their own way.
                        </p>
                        <p className="mt-2 text-blue-800 font-semibold italic">
                            Join us in transforming lives—one step at a time.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

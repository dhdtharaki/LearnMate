import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/Navbar";
import Avator from "../assets/user/avator.png";
import { Form, Input, Select, Button } from "antd";
import axios from '../apis/axiosInstance'
import Swal from "sweetalert2";


const { Option } = Select;

export default function ProfilePage() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Retrieve user data from localStorage
        const user = localStorage.getItem("user");
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserData(parsedUser);
            // Populate form fields with user data
            form.setFieldsValue(parsedUser);
        }
    }, [form]);

    const onFinish = async (values) => {
        console.log("Form submitted: ", values);
        console.log(userData, "userData")
        let payload = {
            name: values.name,
            age: values.age * 1,
            gender: values.gender * 1,
            asdFamilyMember: values.asdFamilyMember * 1,
            email: userData.email
        }
        try {
            const result = await Swal.fire({
                title: "Do you want to update your data?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
            });

            if (values.age * 1 >= 5 && values.age * 1 <= 14) {
                if (result.isConfirmed) {
                    // values.email = userData.email
                    const res = await axios.put("/update", payload);
                    Swal.fire(
                        "Congratulations! You Have Successfully update date",
                        "",
                        "success"
                    );
                    navigate("/settings");
                    localStorage.setItem("user", JSON.stringify(payload));
                } else {
                    Swal.fire("Update Cancelled", "", "error");
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Age must be between 5 and 14",
                });
            }


        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response?.data?.message || err.message,
            });
        }


        navigate("/settings"); // Redirect on save
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-cyan-500 to-blue-500">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl p-8 border border-purple-400">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Profile</h2>

                    {/* Profile Image Section */}
                    <div className="flex items-center mb-8">
                        <img
                            src={Avator}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-purple-400"
                        />
                        <button className="ml-6 text-cyan-500 underline hover:text-cyan-700 transition duration-200">
                            Change Profile Image
                        </button>
                    </div>

                    {/* Profile Form */}
                    <Form
                        form={form}
                        name="profile"
                        layout="vertical"
                        onFinish={onFinish}
                        className="space-y-6"
                    >
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                                name="name"
                                label="Full Name"
                                rules={[{ required: true, message: "Please enter your name!" }]}
                            >
                                <Input
                                    placeholder="Enter your name"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                />
                            </Form.Item>

                            <Form.Item
                                name="age"
                                label="Age"
                                rules={[
                                    { required: true, message: "Please enter your child's age!" },
                                ]}
                            >
                                <Input
                                    type="number"
                                    placeholder="Child's Age"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                />
                            </Form.Item>
                        </div>

                        {/* Address Field */}
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true, message: "Please select your gender!" }]}
                        >
                            <Select
                                placeholder="Child's Gender"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            >
                                <Option value="0">Male</Option>
                                <Option value="1">Female</Option>
                            </Select>
                        </Form.Item>

                        {/* Guardian's Name */}
                        <Form.Item
                            name="asdFamilyMember"
                            label="Any Family Member has ASD"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select if any family member has ASD!",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Any family member has ASD?"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            >
                                <Option value="1">Yes</Option>
                                <Option value="0">No</Option>
                            </Select>
                        </Form.Item>


                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 mt-6">
                            <Button
                                type="default"
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-md"
                                onClick={() => navigate("/dashboard")}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-md"
                            >
                                Save
                            </Button>
                        </div>
                    </Form>
                </div>
            </main>
        </div>
    );
}

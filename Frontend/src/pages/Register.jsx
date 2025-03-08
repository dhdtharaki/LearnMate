import React from "react";
import { useNavigate, Link } from "react-router-dom";
import registerImage from "../assets/user/register.jpg";
import axios from "../apis/axiosInstance";
import Swal from "sweetalert2";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }

    try {
      const result = await Swal.fire({
        title: "Do you want to Register With Learnmate?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      });

      if (values.age * 1 >= 5 && values.age * 1 <= 14) {
        if (result.isConfirmed) {
          // values.email = userData.email
          const res = await axios.post("/register", values);
          Swal.fire(
            "Congratulations! You Have Successfully Registered with Learnmate",
            "",
            "success"
          );
          navigate("/login");
        } else {
          Swal.fire("Registration Cancelled", "", "error");
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center max-w-4xl w-full">
        {/* Left Section */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={registerImage}
            alt="Happy Kids"
            className="rounded-lg"
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 mt-8 md:mt-0 md:ml-8">
          <h1 className="text-2xl font-bold text-blue-700 mb-6">
            Create an account
          </h1>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </Form.Item>

            <Form.Item
              name="gender"
              rules={[{ required: true, message: "Please select your gender!" }]}
            >
              <Select
                placeholder="Child's Gender"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <Option value="0">Male</Option>
                <Option value="1">Female</Option>
                {/* <Option value="Other">Other</Option> */}
              </Select>
            </Form.Item>

            <Form.Item
              name="age"
              rules={[
                { required: true, message: "Please enter your child's age!" },
                // { type: "number", min: 1, max: 18, message: "Age must be between 1 and 18!" },
              ]}
            >
              <Input
                type="number"
                placeholder="Child's Age"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </Form.Item>

            <Form.Item
              name="asdFamilyMember"
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

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="Enter your e-mail"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Re-enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-700 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

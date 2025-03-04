import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import login from "../assets/user/home.jpg";
import axios from "../apis/axiosInstance";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await axios.post("login", {
        email: values.email,
        password: values.password,
      });

      console.log(res.data.user)

      if (res.status !== 200) {
        throw new Error(res.data.message || "Invalid User");
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.response,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user)); // Save user data if needed
      navigate("/home"); // Redirect to another page
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center max-w-4xl w-full">
        {/* Left Section */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={login} // Replace with your image URL
            alt="Happy Kids"
            className="rounded-lg"
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 mt-8 md:mt-0 md:ml-8">
          <h1 className="text-2xl font-bold text-blue-700 mb-6">Log In</h1>
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="Enter your e-mail"
                prefix={<MailOutlined />}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                prefix={<LockOutlined />}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-700 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-700 font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

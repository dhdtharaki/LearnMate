import { Button, Form, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "../apis/axiosInstance";


export const FeedBackModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Received values:", values);
      await axios.post("/feedback", values);
      Swal.fire({
        icon: "success",
        title: "Feedback Submitted",
        text: "Thank you for your feedback!",
      });
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Give Feedback
      </Button>
      <Modal
        title="Please Provide Your Feedback"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="feedback"
            rules={[{ required: true, message: "Please enter your feedback!" }]}
          >
            <TextArea rows={4} placeholder="Enter your feedback here..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
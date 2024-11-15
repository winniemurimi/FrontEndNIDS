import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

export const Model = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [detectionMessages, setDetectionMessages] = useState([]);
  const [recipientName, setRecipientName] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkToken = () => {
      if (localStorage.getItem("token") === null) {
        navigate("/login");
      }
    };
    checkToken();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const predictKNN = async () => {
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    setLoading(true);

    try {
      // Simulate the file upload and prediction process
      const simulatedResponse = {
        accuracy: 95, // Example accuracy
        predictedClass: "Malicious", // Example predicted class
      };

      const { accuracy, predictedClass } = simulatedResponse;

      // Set the prediction result
      setPredictionResult({ accuracy, predictedClass });

      // Set the detection messages
      setDetectionMessages([
        "Unauthorized access attempts: Multiple failed login attempts from different IP addresses",
        "Unusual network traffic pattern: Large volumes of outbound traffic to unexpected destinations",
        "Data exfiltration: Data being transferred to unauthorized destinations",
        "Use of prohibited applications or services: Known malicious IP addresses or domains",
        "Access to restricted resources: Known malware signatures",
        "Suspicious file transfers: Large files being downloaded or uploaded",
      ]);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("An error occurred during prediction.");
    }
  };

  const sendEmail = () => {
    const serviceId = 'service_vxovu3a';
    const templateId = 'template_arh9g9h';
    const publicKey = '6MMQ01aNDHzl35JzF';

    const templateParams = {
      to_name: recipientName,
      from_name: "Prediction",
      message: "predictedClass: Malicious",
      reply_to: "moleenchinhoyi@gmail.com",
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        alert("Prediction results sent to your email!");
      }, (err) => {
        console.error('Failed to send email. Error:', err);
        alert("Failed to send email.");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendEmail();
  };

  const downloadMessages = () => {
    const messages = [
      "Network Intrusion Detection Report",

      "accuracy: 95", // Example accuracy
      "predictedClass Malicious",
      
      "Unauthorized access attempts: Multiple failed login attempts from different IP addresses",
      "Unusual network traffic pattern: Large volumes of outbound traffic to unexpected destinations",
      "Data exfiltration: Data being transferred to unauthorized destinations",
      "Use of prohibited applications or services: Known malicious IP addresses or domains",
      "Access to restricted resources: Known malware signatures",
      "Suspicious file transfers: Large files being downloaded or uploaded",
    ];

    const blob = new Blob([messages.join('\n')], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'detection_messages.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    // Check if the input contains only letters
    if (/^[a-zA-Z]*$/.test(value)) {
      setRecipientName(value);
      setErrorMessage(''); // Clear the error message
    } else {
      setErrorMessage('Please enter letters only.'); // Set error message if input is invalid
    }
  };

  return (
    <div>
      <div>
        <h2>UPLOAD AND PREDICT</h2>
      </div>
      <div style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div className="d-flex justify-content-center form-control shadow-none" style={{ borderStyle: "dashed", borderRadius: 0, width: "100%" }}>
          <input
            type="file"
            className="btn btn-success"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        <button onClick={predictKNN} disabled={loading} className="btn btn-dark d-grid gap-2 col-3 mx-auto">
          {loading ? 'Loading...' : 'Upload and Predict'}
        </button>

        {predictionResult && (
          <div>
            <h2>Prediction Result</h2>
            <p>Accuracy: {predictionResult.accuracy}%</p>
            <p>Predicted Class: {predictionResult.predictedClass}</p>
          </div>
        )}

        {detectionMessages.length > 0 && (
          <div>
            <h2>Detection Results</h2>
            <ul>
              {detectionMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
            <button onClick={downloadMessages} className="btn btn-success">Download Detection Messages</button>
          </div>
        )}
      </div>
      <br />
      <h2>Email</h2>
      <br />
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <input
          type="text"
          placeholder="Recipient Name"
          value={recipientName}
          onChange={handleChange}
          required
         
          className="form-control mx-2"
        />
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
        <button type="submit" className="btn btn-success d-grid gap-2 col-3 mx-auto">Send Email</button>
      </form>
      <br />
      <br />
    </div>
  );
};

export default Model;
import axios from "axios";
import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser"; 

export const Model = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [detectionMessages, setDetectionMessages] = useState([]);;
  const [recipientName, setRecipientName] = useState(""); // State for recipient name
 

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
            "Unauthorized access attempts:Multiple failed login attempts from different IP addresses",
            "Unusual network traffic pattern:Large volumes of outbound traffic to unexpected destinations",
            "Data exfiltration:Data being transferred to unauthorized destinations",
            "Use of prohibited applications or services:Known malicious IP addresses or domains",
            "Access to restricted resources:Known malware signatures",
            "Suspicious file transfers:Large files being downloaded or uploaded"
        ]);

        setLoading(false);
    } catch (error) {
        console.error(error);
        setLoading(false);
        alert("An error occurred during prediction.");
    }
}
  const sendEmail = () => {

    const serviceId = 'service_vxovu3a';
    const templateId =  'template_arh9g9h';
    const publicKey = '6MMQ01aNDHzl35JzF';

    const templateParams = {
      to_name: recipientName, // Use the recipient's name from the input
      from_name: "Prediction", // Change to your name
      message: "predictedClass: Malicous",
      reply_to: "moleenchinhoyi@gmail.com", // Change to your email
    };

    emailjs.send(serviceId, templateId, templateParams , publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        alert("Prediction results sent to your email!");
      }, (err) => {
        console.error('Failed to send email. Error:', err);
        alert("Failed to send email.");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    sendEmail(); // Call sendEmail function
  };

  return (
    <div>
      <div>
        <h2> UPLOAD AND PREDICT </h2>
      </div>
      <div  style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
      <div className="d-flex justify-content-center form-control shadow-none" style={{ borderStyle: "dashed", borderRadius: 0, width: "100%" }}>
            <input
                type="file"
                className="btn btn-primary"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
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
                </div>
            )}
        </div>
        <br/>
        <div>
    
  </div>
      <br />
      <h2>Email</h2>
      <br />
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <input
          type="text"
          placeholder="Date"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          required
          className="form-control mx-2"
        />
        <button type="submit" className="btn btn-primary d-grid gap-2 col-3 mx-auto">Send Email</button>
      </form>
      <br />
<br/>     
    
    </div>
  );
};

export default Model;
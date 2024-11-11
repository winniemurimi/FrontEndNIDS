import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com"; 

export const Model = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState({
    accuracy: "",
    predictedClass: "",
  });
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

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/predictKNN", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { accuracy, predictedClass } = response.data;
      setPredictionResult({ accuracy, predictedClass });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("An error occurred during prediction.");
    }
  };


  emailjs.init({
    publicKey: '6MMQ01aNDHzl35JzF',
  });
  
  const sendEmail = () => {
    const templateParams = {
      to_name: recipientName, // Use the recipient's name from the input
      from_name: "Moleen", // Change to your name
      accuracy: predictionResult.accuracy,
      predictedClass: predictionResult.predictedClass,
      reply_to: "seketaw2010@gmail.com", // Change to your email
    };

    emailjs.send('service_vxovu3a', 'template_arh9g9h')
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
      <div className="d-flex justify-content-center" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
        <h2>Choose CSV File for Prediction</h2>
      </div>
      <div className="d-flex justify-content-center form-control shadow-none" style={{ borderStyle: "dashed", borderRadius: 0, width: "100%" }}>
        <input id="file-input" type="file" className="btn btn-primary" accept=".csv" onChange={handleFileChange} />
      </div>
      <br />
      <div className="d-flex justify-content-center" id="loading">
        {loading ? <p>Loading...</p> : <p></p>}
      </div>
      <br />
      <button className="btn btn-dark d-grid gap-2 col-3 mx-auto" onClick={predictKNN} disabled={!file}>
        Predict
      </button>
      <br />
      
      <br />
      <h5>Accuracy rate:</h5>
      <h5 id="truth">{predictionResult.accuracy}</h5>
      <br />
      <h5>Predicted Attack Class:</h5>
      <h5 id="Prediction">{predictionResult.predictedClass}</h5>
      <br />
      <h2>Email</h2>
      <br />
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <input
          type="text"
          placeholder="Recipient Name"
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
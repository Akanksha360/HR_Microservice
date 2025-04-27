import axios from "axios";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import RequestBody from "./RequestBody";

export function Service({ service }) {
  const { getAccessTokenSilently } = useAuth0();
  const [responseData, setResponseData] = useState("No response yet.");
  const apiBase = "http://localhost:8001/HRService";
  const [RequestModel, setRequestModel] = useState();
  const [RequestModelQuery, setRequestModelQuery] = useState();

  const showMessage = (message) => {
    setResponseData(typeof message === "string" ? message : JSON.stringify(message, null, 2));
  };

  const fetchToken = async () => await getAccessTokenSilently();

  const handleGet = async () => {
    try {

      const token = await fetchToken();
      const requestModelQuery = JSON.parse(RequestModelQuery || "null"
      );

      const res = await axios.get(`${apiBase}/${service}`, {
        headers: {
          authorization: `Bearer ${token}`,
          requestmodelquery: requestModelQuery,
        },
      });

      showMessage(res.data?.dataCollection || "No data received.");
    } catch (error) {
      console.error(error);
      showMessage("Error during GET.");
    }
  };

  const handlePost = async () => {
    const requestModel = RequestModel;
    if (!requestModel) return showMessage("Please provide RequestModel.");
    try {
      const token = await fetchToken();
      const res = await axios.post(`${apiBase}/${service}`, {}, {
        headers: {
          requestmodel: JSON.parse(requestModel),
          authorization: `Bearer ${token}`,
        },
      });

      showMessage(res.data?.message);
    } catch (error) {
      console.error(error);
      showMessage("Error during POST.");
    }
  };

  const handlePut = async () => {
    const id = localStorage.getItem("id");
    const requestModel = RequestModel;
    if (!id || !requestModel) return showMessage("Please provide RequestModel and ID.");

    try {
      const token = await fetchToken();
      const res = await axios.put(`${apiBase}/${service}/${id}`, {}, {
        headers: {
          requestmodel: JSON.parse(requestModel),
          authorization: `Bearer ${token}`,
        },
      });

      showMessage(res.data?.message);
      
    } catch (error) {
      console.error(error);
      showMessage("Error during PUT.");
    }
  };

  const handleDelete = async () => {
    const id = localStorage.getItem("id");
    if (!id) return showMessage("Please provide ID.");

    try {
      const token = await fetchToken();
      const res = await axios.delete(`${apiBase}/${service}/${parseInt(id)}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      showMessage(res.data?.message);
      localStorage.removeItem("id");
    } catch (error) {
      console.error(error);
      showMessage("Error during DELETE.");
    }
  };

  // 🎯 Data-driven UI for buttons
  const actions = [
    { label: "GET", onClick: handleGet },
    { label: "POST", onClick: handlePost },
    { label: "PUT", onClick: handlePut },
    { label: "DELETE", onClick: handleDelete },
  ];

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">{service}</h2>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {actions.map(({ label, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className="px-5 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition"
          >
            {label}
          </button>
        ))}
      </div>

      <RequestBody setRequestModelQuery={setRequestModelQuery} setRequestModel={setRequestModel}/>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Response</h3>
        <textarea
          readOnly
          rows={6}
          value={responseData}
          className="w-full border border-gray-300 p-3 rounded-lg font-mono text-sm bg-gray-50 resize-none"
        />
      </div>
    </div>
  );
}

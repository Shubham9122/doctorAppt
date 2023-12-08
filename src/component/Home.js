import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../Service/commonHttp";
import * as Yup from "yup";
import { useFormik } from "formik";
const Home = () => {
  const [patientData,setPatientData]=useState([])

  
function getPatientDetails(value){
     setPatientData({
      id:value._id,
      name:value.name,
      age:value.age,
      medicalHistory:value.medicalHistory
     })
}

  const [formType, setFormType] = useState("add");
  const validatePatient = Yup.object().shape({
    name: Yup.string().required("please add name"),
    age: Yup.number().required("please age"),
    medicalHistory: Yup.string().required("please add medical history"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      medicalHistory: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: validatePatient,
    onSubmit: (values) => {
      if (formType === "add") {
        addPatient(values);
      } else if(formType==="edit") {
        editPatient(values);
      }
    },
  });

  
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [patientList, setPatientList] = useState([]);
  const listOfPatient = async () => {
    try {
      await Axios({
        method: "get",
        url: "/",
      }).then((response) => {
        return setPatientList(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addPatient = async (values) => {
    try {
      await Axios({
        method: "Post",
        url: "/api/addPatient",
        data: {
          name: values.name,
          age: values.age,
          medicalHistory: values.medicalHistory,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deletePatient = async () => {
    try {
      await Axios({
        method: "delete",
        url: "/api/deletePatient",
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const editPatient = async (values) => {
    try {
      await Axios({
        method: "Post",
        url: "/api/editPatient",
        data: {
          name: values.name,
          age: values.age,
          medicalHistory: values.medicalHistory,
        },
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listOfPatient();
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>

        {/* Doctor Profile Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mr-4">
              {/* You can replace the image source with the user's profile image URL */}
              <img
                src="https://via.placeholder.com/150"
                alt="User Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <Link to="/profilePage">
                <p className="text-lg font-semibold">John Doe</p>
              </Link>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>
          </div>
        </div>

        {/* Patient Table Section */}
        <div>
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-2">Patient Record</h2>=
            <button
              className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Add Patient
            </button>
            {showModal ? (
              <>
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-3xl font=semibold">General Info</h3>
                        <button
                          className="bg-transparent border-0 text-black float-right"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                            x
                          </span>
                        </button>
                      </div>
                      <form
                        onSubmit={() => {
                          formik.handleSubmit();
                        }}
                        className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full"
                      >
                        <div className="relative p-6 flex-auto">
                          <label className="block text-black text-sm font-bold mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            name="name"
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                          />

                          <label className="block text-black text-sm font-bold mb-1">
                            Age
                          </label>
                          <input
                            type="number"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            name="age"
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                          />
                          <label className="block text-black text-sm font-bold mb-1">
                            medicalHistroy
                          </label>
                          <input
                            type="text"
                            value={formik.values.medicalHistory}
                            onChange={formik.handleChange}
                            name="medicalHistory"
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                          />
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {/* {addPatient && (
          <>
            
          </>
        ) } */}
          </div>

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Age</th>
                <th className="py-2 px-4 border-b">medicalHistroy</th>
                {/* edit patient information */}
                {editModal ? (
                  <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                            <h3 className="text-3xl font=semibold">
                              General Info
                            </h3>
                            <button
                              className="bg-transparent border-0 text-black float-right"
                              onClick={() => setEditModal(false)}
                            >
                              <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                                x
                              </span>
                            </button>
                          </div>
                            <form onSubmit={()=>{
                              formik.handleSubmit()
                            }} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                          <div className="relative p-6 flex-auto">
                              <label className="block text-black text-sm font-bold mb-1">
                                First Name
                              </label>
                              <input
                              value={patientData.name} 
                              name="name"
                              onChange={formik.handleChange}
                              className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />

                              <label className="block text-black text-sm font-bold mb-1">
                                Age
                              </label>
                              <input
                                type="number"
                                value={patientData.age}
                                name="age"
                                onChange={formik.handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                              />
                              <label className="block text-black text-sm font-bold mb-1">
                                medicalHistroy
                              </label>
                              <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                           
                          </div>
                          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </button>
                            <button
                              className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              Submit
                            </button>
                          </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {patientList.map((user, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.age}</td>
                  <td className="py-2 px-4 border-b">{user.medicalHistory}</td>
                  <button
                    onClick={() => {
                      getPatientDetails(user)
                      setEditModal(true);
                    }}
                    className="py-2 px-4 border-b"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(ueser) => {
                      deletePatient(user);
                    }}
                    className="text-red py-2 px-4 border-b"
                  >
                    Delete
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;

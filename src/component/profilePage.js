import React, { useState } from "react";
import Axios from '../Service/commonHttp'
import * as Yup from 'yup';
import { useFormik } from "formik";
const ProfilePage = () => {
  const [showModal,setShowModal]=useState(false)
  const validatePatient = Yup.object().shape({
    name: Yup.string().required("please add name"),
    age: Yup.number().required("please age"),
    medicalHistory: Yup.string().required("please add medical history"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      department: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: validatePatient,
    onSubmit: (values) => {
      editDoctorProfile(values)
    },
  });
  const editDoctorProfile=async(values)=>{
    try{
      await Axios({
        method:'put',
        url:'/api/editDoctorProfile',
        data:{
          name:values.name,
          email:values.email,
          department:values.department
        }
      })
    }catch(error){
      console.log(error
      )
    }
  }
  return (
    <>
      <body class="bg-gray-100">
        <div class="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
          <img
            class="w-32 h-32 rounded-full mx-auto"
            src="https://picsum.photos/200"
            alt="Profile picture"
          />
          <h2 class="text-center text-2xl font-semibold mt-3">John Doe</h2>
          <p class="text-center text-gray-600 mt-1">Software Engineer</p>
          <div class="flex justify-center mt-5">
            <a href="/" class="text-blue-500 hover:text-blue-700 mx-3">
              Twitter
            </a>
            <a href="/" class="text-blue-500 hover:text-blue-700 mx-3">
              LinkedIn
            </a>
            <a href="/" class="text-blue-500 hover:text-blue-700 mx-3">
              GitHub
            </a>
          </div>
          <div class="mt-5">
            <h3 class="text-xl font-semibold">Bio</h3>
            <p class="text-gray-600 mt-2">
              John is a software engineer with over 10 years of experience in
              developing web and mobile applications. He is skilled in
              JavaScript, React, and Node.js.
            </p>

          </div>
          <div className="flex">
          <p className="text-red-500">Do you want to edit your Account</p>
          <button onClick={()=>{
           setShowModal(true)
          }} className="text-blue-500">Edit </button>
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
                             Name
                          </label>
                          <input
                            type="text"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            name="name"
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                          />

                          <label className="block text-black text-sm font-bold mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            name="email"
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                          />
                          <label className="block text-black text-sm font-bold mb-1">
                            Department
                          </label>
                          <input
                            type="text"
                            value={formik.values.department}
                            onChange={formik.handleChange}
                            name="department"
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
          </div>

        </div>
      </body>
    </>
  );
};

export default ProfilePage;

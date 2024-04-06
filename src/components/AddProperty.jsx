import React, { useEffect, useState } from "react";
import axios from "axios";

const Add = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = useState({
    address: "",
    email: "",
    phoneNumber: "",
    images: null,
    videos: null,
  });

  useEffect(() => {
    if (
      formData.address.length > 0 &&
      formData.email.length > 0 &&
      formData.phoneNumber.length > 0 &&
      (formData.images !== null || formData.videos !== null)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImagesChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      images: e.target.files,
    }));
  };

  const handleVideosChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      videos: e.target.files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObject = new FormData();
    formDataObject.append("address", formData.address);
    formDataObject.append("email", formData.email);
    formDataObject.append("phoneNumber", formData.phoneNumber);
    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        formDataObject.append("images", formData.images[i]);
      }
    }
    if (formData.videos) {
      for (let i = 0; i < formData.videos.length; i++) {
        formDataObject.append("videos", formData.videos[i]);
      }
    }

    console.log(formDataObject);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://server-jvhw.onrender.com/api/addproperty",
        formDataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Property added successfully", response.data);
    } catch (error) {
      console.log("Property add failed", error.message);
    } finally {
      setLoading(false);

      setFormData({
        address: "",
        email: "",
        phoneNumber: "",
        images: null,
        videos: null,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white  border-4 rounded-lg shadow relative m-10">
          <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold">
              {loading ? "Loading.." : "Add Property"}
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Property Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder=""
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Property Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder=""
                  required=""
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder=""
                  required=""
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="images"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Property Images
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  className="block w-full cursor-pointer appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="videos"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Property Videos
                </label>
                <input
                  type="file"
                  id="videos"
                  name="videos"
                  accept="video/*"
                  multiple
                  onChange={handleVideosChange}
                  className="block w-full cursor-pointer appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 rounded-b">
            <button
              className={`text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                buttonDisabled ? "cursor-not-allowed bg-gray-300" : ""
              }`}
              type="submit"
            >
              {loading ? "Saving..." : "Save Property"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;


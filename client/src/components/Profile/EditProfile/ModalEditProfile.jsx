import React, { useEffect, useState } from "react";

import TagsInput from "./TagsInput";
import { SetProfileService } from "../../../services/Profile/set-profile";
import { uploadImage } from "../../../services/uploadFile/uploadFile";

const EditProfileModal = ({
  show,
  handleClose,
  handleSubmitModal,
  userData,
}) => {
  const [formData, setFormData] = useState({
    name: userData.user.name || "",
    username: userData.user.username || "ejemplo",
    location: userData.user.location || "",
    job: userData.user.job || "",
    roles: userData.user.roles || [],
    email: userData.user.email || "",
    avatar: userData.user.avatar || "https://via.placeholder.com/150",
    socialLinks: {
      github: userData.user.socialLinks?.github || "www.github.com",
      linkedin: userData.user.socialLinks?.linkedin || "www.linkedin.com",
      facebook: userData.user.socialLinks?.facebook || "www.facebook.com",
      instagram: userData.user.socialLinks?.instagram || "www.instagram.com",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleRolesChange = (newRoles) => {

    setFormData((prevData) => ({ ...prevData, roles: newRoles }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      socialLinks: { ...prevData.socialLinks, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const update = SetProfileService.updateProfile(formData);
    if (update) {
      handleSubmitModal();
    } else {
      alert("No se actualizo el usuario");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert("Por favor, selecciona un archivo.");
      return;
    }
    const imageData = new FormData();
    imageData.append("file", file);
    const response = await uploadImage(imageData);

    if (response.fileUrls && response.fileUrls.length > 0) {
      const imageUrl = response.fileUrls[0].fileUrl;

      setFormData((prevData) => ({
        ...prevData,
        avatar: imageUrl,
      }));
    } else {
      console.error("No se recibió ninguna URL de imagen.");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-secondBlack-900 bg-opacity-50 flex justify-center items-center backdrop-blur-md z-20">
      <div className="bg-secondBlack-700 px-8 py-6 rounded-lg shadow-lg w-full max-w-[850px] transform h-fit">
        <h2 className="text-sm font-bold text-primaryGreen-400 mb-2">
          Editar perfil
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div
            className="flex flex-row w-full gap-x-5
          "
          >
            <div className="size-fit relative">
              <input
                type="file"
                id="fileInput"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="fileInput"
                className=" w-full h-full bg-secondBlack-700 border border-secondBlack-400 rounded-lg cursor-pointer flex items-center justify-center"
              >
                <div
                  className="flex flex-col
                text-center justify-center items-center size-[200px]"
                >
                  <img
                    src={formData.avatar} // Imagen de ejemplo
                    alt="Ejemplo"
                    className="size-full rounded-t-lg object-cover"
                  />
                  <span className="text-secondBlack-100 text-xs py-1">
                    Foto de perfil
                  </span>
                </div>
              </label>
            </div>

            <div className="flex flex-col w-full">
              <div className="mb-2">
                <label
                  className="block text-primaryGreen-400 text-xs font-bold mb-1"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 text-xs"
                />
              </div>

              <div className="mb-2">
                <label
                  className="block text-secondBlack-100 text-xs font-bold mb-1"
                  htmlFor="location"
                >
                  País
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 text-xs"
                >
                  <option>Argentina</option>
                  <option>Chile</option>
                  <option>Uruguay</option>
                  <option>Canadá</option>
                  <option>Estados Unidos</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-2">
            <label
              className="block text-secondBlack-100 text-xs font-bold mb-1"
              htmlFor="job"
            >
              Descripcion del perfil profesional
            </label>
            <textarea
              id="job"
              name="job"
              rows="1"
              value={formData.job}
              onChange={handleChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 text-xs"
            ></textarea>
          </div>

          <div className="mb-2">
            <label className="block text-secondBlack-100 text-xs font-bold mb-1">
              Rol
            </label>
            <div className="flex space-x-1">
              {Array.isArray(formData.roles)
                ? formData?.roles?.map((role, index) => (
                    <span
                      key={index}
                      className="inline-block bg-primaryGreen-400 text-secondBlack-900 text-xs font-semibold rounded-full px-2 py-1"
                    >
                      {role.name}
                    </span>
                  ))
                : null}
            </div>
          </div>

          <TagsInput
            roles={formData.roles.map((role) => role.name) || []}
            onChange={handleRolesChange}
          />

          <div className="mb-2">
            <label className="block text-secondBlack-100 text-xs font-bold mb-1">
              Redes sociales
            </label>
            <input
              type="text"
              name="github"
              placeholder="Github"
              value={formData.socialLinks.github}
              onChange={handleSocialLinkChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 mb-1 text-xs"
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
              value={formData.socialLinks.linkedin}
              onChange={handleSocialLinkChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 mb-1 text-xs"
            />
            <input
              type="text"
              name="facebook"
              placeholder="Facebook"
              value={formData.socialLinks.facebook}
              onChange={handleSocialLinkChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 mb-1 text-xs"
            />
            <input
              type="text"
              name="instagram"
              placeholder="Instagram"
              value={formData.socialLinks.instagram}
              onChange={handleSocialLinkChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 text-xs"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="bg-secondBlack-400 hover:bg-secondBlack-100 text-white py-1 px-2 rounded mr-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="border border-primaryGreen-400 text-primaryGreen-400 bg-transparent px-4 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;

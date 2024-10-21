import React, { useEffect, useState } from 'react';

import TagsInput from './TagsInput';

const EditProfileModal = ({ show, handleClose,handleSubmitModal,userData }) => {
  const [formData, setFormData] = useState({
    name: userData.user.name,
    country: userData.user.location,
    job: userData.user.job,
    roles:[...userData.user.roles],
    email: userData.user.email,
    socialLinks: {
      github: 'www.github.com',
      linkedin: 'www.linkedin.com',
      facebook: 'www.facebook.com',
      instagram: 'www.instagram.com',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleRolesChange = (newRoles) => {
    console.log(newRoles);
    
    setFormData((prevData) => ({ ...prevData, roles: newRoles }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      socialLinks: { ...prevData.socialLinks, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos actualizados:', formData);
    handleSubmitModal();
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file.name);
    }
  };
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-secondBlack-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-secondBlack-700 p-2 rounded-lg shadow-lg w-1/2 max-w-md h-auto transform scale-[90%]">
        <h2 className="text-sm font-bold text-primaryGreen-400 mb-2">Editar perfil</h2>
        <form onSubmit={handleSubmit}
          encType='multipart/form-data'>
          <div className='flex flex-row
          '>
            <div className="w-[100vh] m-2 relative">
              <input
                type="file"
                id="fileInput"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="fileInput"
                className="block w-full h-full bg-secondBlack-700 border border-secondBlack-400 rounded-lg cursor-pointer flex items-center justify-center"
              >
                <div className="flex flex-col
                text-center justify-center items-center">
                  <img
                    src="https://via.placeholder.com/150" // Imagen de ejemplo
                    alt="Ejemplo"
                    className="w-25 h-25 mb-2 rounded-lg"
                  />
                  <span className="text-secondBlack-100 text-xs">Foto de perfil</span>
                </div>
              </label>
            </div>

            <div className='flex flex-col w-screen'>
              <div className="mb-2">
                <label className="block text-secondBlack-100 text-xs font-bold mb-1" htmlFor="name">
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
                <label className="block text-secondBlack-100 text-xs font-bold mb-1" htmlFor="country">
                  País
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
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
            <label className="block text-secondBlack-100 text-xs font-bold mb-1" htmlFor="job">
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
            <label className="block text-secondBlack-100 text-xs font-bold mb-1">Rol</label>
            <div className="flex space-x-1">
              {formData.roles.map((role, index) => (
                <span
                  key={index}
                  className="inline-block bg-primaryGreen-400 text-secondBlack-900 text-xs font-semibold rounded-full px-2 py-1"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          <TagsInput roles={formData.roles}
          onChange={handleRolesChange}/>

          <div className="mb-2">
            <label className="block text-secondBlack-100 text-xs font-bold mb-1">Redes sociales</label>
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

}

export default EditProfileModal;
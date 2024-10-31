import React, { useEffect, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import rolesData from "../../../data/perfil-roles.json";

const suggestions = rolesData?.roles?.map((rol, index) => ({
  id: rol.name,
  text: rol.name,
  className: 'text-black'
})) || [];

const TagsInput = ({ roles, onChange }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(roles.map((rol) => {
      return {
        id: rol,
        text: rol,
        className: 'text-black '
      }
    }))

  }, [])

  useEffect(() => {
    onChange(tags.map((rol) => rol.text));
  }, [tags])

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAllDelete = () => {
    setTags([]); // Limpiar todas las etiquetas
  };

  const handleAddition = (tag) => {
    const isValidTag = suggestions.some(suggestion => suggestion.text === tag.text);

    if (isValidTag) {
      setTags([...tags, tag]);

      onChange(tags.map((rol) => rol.text));
    } else {
      alert("El tag ingresado no es válido. Debes seleccionar un rol de la lista.");
    }
  };

  return (
    <div className="border border-secondBlack-400 rounded p-2 w-full">
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        placeholder="Tus Roles : FrontEnd"
        classNames={{
          tagInputField: 'text-white w-[59vh] my-2 p-2 rounded border-0 focus:outline-none bg-primaryGreen-400',
          tags: 'flex flex-wrap w-full gap-2 rounded',
          tag: 'my-1 mr-1 rounded bg-primaryGreen-400 text-black px-2 py-1',
          suggestions: 'bg-primaryGreen-400 rounded text-black px-2 py-1',
          remove: 'ml-1'
        }}
      />
      {
        tags.length > 0 ? (
          <button
            onClick={handleAllDelete}
            className="mt-2 w-full bg-red-500 text-white py-2 px-3 rounded" // Botón a lo ancho
          >
            Borrar todos
          </button>
        ) : null
      }
    </div>
  );
};

export default TagsInput;

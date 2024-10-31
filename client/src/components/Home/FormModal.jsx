import { useEffect, useState } from "react";
import { uploadImage } from "../../services/uploadFile/uploadFile";
import { APIDOMAIN } from "../../../vars";

const FormModal = () => {
  const [text, setText] = useState({
    title: "",
    text: "",
  });

  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState([]);
  //const [upImage, setUpImage] = useState([]);
  let varImage;

  useEffect(() => {
    if (image.length > 0) {
      const previewArray = image.map((item) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(item);
        });
      });
      Promise.all(previewArray).then((results) => setPreview(results));
    } else {
      setPreview([]);
    }
  }, [image]);

  const createPost = async () => {
    try {
      const response = await fetch(`${APIDOMAIN}/api/v1/post`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: text.title,
          content: text.text,
          technologies: ["react", "nextjs"],
          images: varImage,
        }),
      });
      if (!response.ok) {
        throw new Error("Error en la respuesta de la api");
      }
      const data = await response.json();
      if (data) {
        alert("exito en subir posteo");
      }
      return data;
    } catch (error) {
      console.log("error al hacer el post", error);
    }
  };

  const handlesClicDelete = (id) => {
    setPreview(preview.filter((item, index) => index !== id));
    setImage(image.filter((item, index) => index !== id));
  };

  const handleFileUploadArray = async () => {
    try {
      // Usa Promise.all para esperar todas las subidas
      const urls = await Promise.all(
        image.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await uploadImage(formData); // Llama a la función uploadImage
          
          return response.fileUrls ? response.fileUrls[0].fileUrl : null; // Extrae el primer URL si existe
        })
      );

      //setUpImage(urls.filter((url) => url !== null)); // Filtra y setea solo URLs válidas
      varImage = urls.filter((url) => url !== null);
    } catch (error) {
      console.error("Error al subir las imágenes:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleFileUploadArray();
    createPost();
  };

  const handleChandeInput = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
    if (preview.length <= 0) {
      setImage([]);
    }
  };

  return (
    <form
      className="flex flex-col items-end gap-y-3"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        value={text.title}
        placeholder="Titulo de post"
        className="w-full max-h-[40px] h-full p-3 bg-secondBlack-400 rounded-xl"
        name="title"
        onChange={(e) => handleChandeInput(e)}
      />
      <textarea
        placeholder="Crea un posteo"
        className="w-full h-[180px] p-3 bg-secondBlack-400 rounded-xl"
        onChange={(e) => handleChandeInput(e)}
        value={text.text}
        name="text"
      />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setImage(Array.from(e.target.files))}
        className=" w-full "
      />
      {/* image && <img src={preview} className="size-[100px]" /> */}
      <ul className="flex items-start gap-x-3 w-full">
        {preview?.map((item, index) => (
          <li
            key={index}
            className="size-[100px] rounded-lg overflow-hidden relative"
          >
            <button
              className=" absolute top-1 right-1 bg-red-600 px-1 text-sm rounded-full"
              onClick={() => handlesClicDelete(index)}
            >
              X
            </button>
            <img
              src={item}
              alt={`imagen-${index}`}
              className="size-full object-cover"
            />
          </li>
        ))}
      </ul>
      <button className="p-2 border border-primaryGreen-400 text-primaryGreen-400 rounded-lg hover:bg-primaryGreen-400 hover:text-white ">
        Publicar
      </button>
    </form>
  );
};

export default FormModal;

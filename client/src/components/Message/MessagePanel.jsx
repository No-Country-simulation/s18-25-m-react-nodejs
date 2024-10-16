export const MessagePanel = () => {
    return (
      <div className="w-2/4 bg-black-900 text-black p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Ángela Leiva</h2>
          <span className="bg-green-500 text-sm px-2 py-1 rounded-full">En línea</span>
        </div>
        <div className="space-y-4">
          <div className="p-3 bg-black-700 rounded-lg">
            <p>Ángela Leiva</p>
            <p className="text-xs text-black-400">Hola, ¿cómo estás?</p>
          </div>
          <div className="p-3 bg-black-700 rounded-lg self-end text-right">
            <p>Manuel Rodríguez</p>
            <p className="text-xs text-black-400">Bien, ¿y tú?</p>
          </div>
          {/* Repetir para más mensajes */}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="w-full px-4 py-2 bg-black-800 rounded-l-lg text-black"
          />
          <button className="bg-blue-500 px-4 py-2 rounded-r-lg">Enviar</button>
        </div>
      </div>
    );
  };
  
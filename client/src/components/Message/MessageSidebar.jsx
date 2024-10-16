export const MessageSidebar = () => {
    return (
      <div className="w-1/4 bg-black-800 text-grey-500 p-4">
        <h2 className="black text-black-800 font-bold mb-4">Mensajes</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/path-to-image" // Reemplaza con la imagen adecuada
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-bold text-black-500">Esquerra Quevedo</p>
                <p className="text-xs text-black-400">Enviado</p>
              </div>
            </div>
          </div>
          {/* Repetir similar para otros contactos */}
        </div>
      </div>
    );
  };
  
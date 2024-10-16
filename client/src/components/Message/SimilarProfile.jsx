export const SimilarProfiles = () => {
    return (
      <div className="w-1/4 bg-black-800 text-grey-500 p-4">
        <h2 className="text-lg font-bold mb-4">Perfiles Similares</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src="/path-to-image" // Reemplaza con la imagen adecuada
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <p className="text-sm">Ángela Leiva</p>
          </div>
          {/* Repetir para otros perfiles */}
        </div>
        <h2 className="text-lg font-bold mt-6 mb-4">Notificaciones</h2>
        <div className="space-y-2">
          <div className="p-2 bg-black-700 rounded-lg">
            <p>Nuevo evento: Charla de tecnología</p>
          </div>
          {/* Repetir para más notificaciones */}
        </div>
      </div>
    );
  };
  
import React, { useState, useEffect } from "react";

const AvatarSelector = ({ isOpen, onClose, onSelect }) => {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchAvatars = async () => {
      setLoading(true);
      setError(null); 

      try {
        const token = localStorage.getItem("at");
        const response = await fetch(
          "https://znginx.perisync.work/api/v1/acc/account/avatar",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch avatars.");
        }

        const data = await response.json();
        setAvatars(data);
      } catch (err) {
        setError(err.message || "Failed to load avatars.");
      } finally {
        setLoading(false);
      }
    };

    fetchAvatars();
  }, [isOpen]);

  const handleAvatarSelect = async (avatar) => {
    try {
      const token = localStorage.getItem("at");
      const response = await fetch(
        "https://znginx.perisync.work/api/v1/acc/account/avatar",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ avatarId: avatar.id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update avatar.");
      }

      onSelect(avatar.url);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update avatar.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Choose Your Avatar</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading avatars...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {/* Default Avatar */}
            <div
              className={`aspect-square rounded-lg border-2 ${
                !selectedAvatar ? "border-blue-500" : "border-gray-200"
              } flex items-center justify-center cursor-pointer overflow-hidden`}
              onClick={() => setSelectedAvatar(null)}
            >
              <img
                src="/default-avatar.png"
                alt="Default Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Avatar List */}
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className={`aspect-square rounded-lg border-2 ${
                  selectedAvatar?.id === avatar.id ? "border-blue-500" : "border-gray-200"
                } flex items-center justify-center cursor-pointer overflow-hidden`}
                onClick={() => setSelectedAvatar(avatar)}
              >
                <img
                  src={avatar.url}
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Upload Avatar Placeholder */}
            <div className="aspect-square rounded-lg border-2 border-gray-200 flex items-center justify-center cursor-pointer">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 text-red-500 font-medium">
            Cancel
          </button>
          <button
            onClick={() => selectedAvatar && handleAvatarSelect(selectedAvatar)}
            className={`px-4 py-2 text-white rounded-lg font-medium ${
              selectedAvatar ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!selectedAvatar}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelector;

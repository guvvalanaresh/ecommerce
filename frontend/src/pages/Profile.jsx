import { useEffect, useState } from "react";
import { getProfile, updateProfile, getAddresses, addAddress, deleteAddress } from "../api/user.api.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: ""
  });

  const [newAddress, setNewAddress] = useState({
    label: "",
    line1: "",
    city: "",
    pincode: ""
  });

  useEffect(() => {
    loadProfile();
    loadAddresses();
  }, []);

  const loadProfile = async () => {
    const res = await getProfile();
    setProfile(res.data);

    setForm({
      name: res.data.name || "",
      email: res.data.email || ""
    });
  };

  const loadAddresses = async () => {
    const res = await getAddresses();
    setAddresses(res.data);
  };

  const handleProfileUpdate = async () => {
    await updateProfile(form);
    setEditMode(false);
    loadProfile();
  };

  const handleAddAddress = async () => {
    await addAddress(newAddress);
    setNewAddress({ label: "", line1: "", city: "", pincode: "" });
    loadAddresses();
  };

  const handleDeleteAddress = async (id) => {
    await deleteAddress(id);
    loadAddresses();
  };

  if (!profile) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">

      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {/********** Profile Section **********/}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6">

        <h2 className="text-xl font-semibold mb-4">Personal Info</h2>

        {!editMode ? (
          <>
            <p><strong>Name:</strong> {profile.name || "Not set"}</p>
            <p className="mt-2"><strong>Email:</strong> {profile.email || "Not set"}</p>

            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border rounded p-2 w-full mb-3"
            />

            <input
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border rounded p-2 w-full mb-3"
            />

            <button
              onClick={handleProfileUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="ml-3 bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/********** Address Section **********/}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Your Addresses</h2>

        {addresses.length === 0 ? (
          <p className="text-gray-500">No addresses added.</p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.id}
              className="border p-3 rounded-lg mb-3 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{addr.label}</p>
                <p className="text-gray-600 text-sm">{addr.line1}</p>
                <p className="text-gray-600 text-sm">{addr.city} - {addr.pincode}</p>
              </div>

              <button onClick={() => handleDeleteAddress(addr.id)}>
                <DeleteIcon className="text-red-500" />
              </button>
            </div>
          ))
        )}

        {/***** Add New Address *******/}
        <h3 className="text-lg font-semibold mt-5 mb-2">Add New Address</h3>

        <input
          type="text"
          placeholder="Label (Home, Work...)"
          value={newAddress.label}
          onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="text"
          placeholder="Address line"
          value={newAddress.line1}
          onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="text"
          placeholder="City"
          value={newAddress.city}
          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="text"
          placeholder="Pincode"
          value={newAddress.pincode}
          onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
          className="border p-2 w-full mb-2 rounded"
        />

        <button
          onClick={handleAddAddress}
          className="bg-orange-600 text-white px-4 py-2 rounded w-full mt-3"
        >
          Add Address
        </button>
      </div>
    </div>
  );
}

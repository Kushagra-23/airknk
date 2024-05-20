import { useEffect, useState } from "react";
import { PhotoUploader } from "../PhotoUploader";
import axios from "axios";
import { Perks } from "../Perks";
import { AccountNav } from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    });
  }, [id]);

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  };

  const inputDescription = (text) => {
    return <p className="text-gray-500 text-sm">{text}</p>;
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  const addNewPlace = async (e) => {
    e.preventDefault();
    await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput("Title", "Title for your place")}
        <input
          type="text"
          placeholder="title, for example: My lovely apt"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {preInput("Address", "Address to this place")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {preInput("Photos", "more=better")}
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {preInput("Perks", "Select all the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />
        {preInput("Extra Info", "house rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput("Check in & out times", "Add check in and out times")}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="11:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max no of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
};

import { Children, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("places")
      .then((response) => {
        setPlaces(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        throw error;
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center text-4xl mt-40">
        Loading....
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {places.length > 0 ? (
        Children.toArray(
          places.map((place) => (
            <Link to={"/place/" + place._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt="IMAGE"
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          ))
        )
      ) : (
        <div className="flex justify-center items-center text-4xl mt-40">
          Unable to fetch data🥲
        </div>
      )}
    </div>
  );
}

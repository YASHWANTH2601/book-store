import { useState } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import Spinning from "../components/Spinning";
import { useNavigate, useParams } from "react-router-dom";
export default function DeleteBook() {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {Loading ? (
        <Spinning />
      ) : (
        <div className="flex flex-col border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h2 className="text-2xl">
            Are You Sure You want to delete this book
          </h2>
          <div className="my-4">
            <button
              className="p-4 bg-red-500 text-white m-8 w-full"
              onClick={handleDeleteBook}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

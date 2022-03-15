import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import * as moment from "moment";
import "moment/locale/tr";
moment.locale("tr");
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [note, setNote] = useState("");

  const formatDate = (date) => {
    var momentDate = moment(date);
    const tarih = momentDate.format("DD.MM.YYYY");
    return tarih;
  };

  const date = (date) => {
    var yayinlanma = moment(date).startOf("second").fromNow();
    return yayinlanma;
  };

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    await axios
      .get("/api/notes")
      .then((res) => {
        setNotes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.log(err);
      });
  };

  const save = async (e) => {
    e.preventDefault();
    if (username.length <= 1 || note.length <= 1 || !username || !note) {
      toast.error("Boş bırakma!");
    } else if (note.length > 90 || username.length > 30) {
      toast.error("Çok uzun!");
    } else {
      const data = {
        username: username,
        note: note,
      };
      setNotes([...notes, data]);
      getNotes();
      const res = axios.post("/api/notes", data);
      toast.promise(res, {
        loading: "Bir saniye..",
        success: "Eklendi!",
        error: "Eklenirken hata oldu!",
      });
      e.target[0].value = "";
      e.target[1].value = "";
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <Toaster />
      <Head>
        <title>Home Page</title>
      </Head>
      <Header />
      <div className="flex items-center h-full">
        <div className="left flex-1 h-full bg-red-600">
          {loading ? (
            "Yükleniyor.."
          ) : notes.length > 0 ? (
            <ul className="w-full h-full pb-16 p-2 overflow-y-auto">
              {notes &&
                notes.reverse().map((note, i) => {
                  return (
                    <li
                      key={i}
                      className="w-full h-24 my-3 rounded-lg relative overflow-hidden bg-white flex flex-col px-5 items-start justify-center"
                    >
                      <div className="releative h-full w-full">
                        <h3 className="text-lg absolute top-5 left-4 w-8/12 leading-none text-gray-800 break-words">
                          {note.note}
                        </h3>
                        <p className="text-base absolute truncate bottom-4 left-4 text-gray-400">
                          {note.username}
                        </p>
                      </div>

                      <span className="absolute flex flex-col items-end justify-center top-5 right-5 text-sm text-gray-400">
                        <div>{formatDate(note.createdAt)}</div>
                        <div>{date(note.createdAt)}</div>
                        <button>Report</button>
                      </span>
                    </li>
                  );
                })}
            </ul>
          ) : (
            "Veri yok!"
          )}
        </div>
        <div className="right flex-1 h-full bg-blue-700 w-full items-center justify-center flex-col">
          <h2 className="text-2xl font-medium text-white m-5">
            Create New Note
          </h2>
          <form
            method="post"
            action="#"
            className="flex flex-col w-10/12 h-full space-y-4 p-4 mx-auto"
            onSubmit={(e) => save(e)}
          >
            <input
              type="text"
              name="username"
              placeholder="username..."
              className="h-12 p-4 rounded-lg border-2 hover:border-slate-900 outline-none"
              onChange={(e) => setUsername(e.target.value)}
              defaultValue={username}
            />
            <textarea
              type="text"
              name="note"
              placeholder="note..."
              className="h-44 p-4 rounded-lg border-2 hover:border-slate-900 outline-none resize-none"
              onChange={(e) => setNote(e.target.value)}
              defaultValue={note}
            />
            <button
              type="submit"
              className="w-full h-12 bg-indigo-700 rounded-lg text-white font-medium text-xl"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import Head from "next/head";
import Header from "../components/Header";

function notes() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Head>
        <title>Notes Page</title>
      </Head>
      <Header />
      <div className="left"></div>
      <div className="right"></div>
    </div>
  );
}

export default notes;

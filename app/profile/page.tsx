import Link from "next/link";
import React from "react";

const ProfilePage = () => {
  return (
    <div>
      <h1>Profile</h1>
      <Link
        href="/edit"
        className="bg-slate-400 px-3 py-0.5 rounded-2xl text-center flex justify-center items-center text-base font-semibold"
      >
        Edit
      </Link>
    </div>
  );
};

export default ProfilePage;

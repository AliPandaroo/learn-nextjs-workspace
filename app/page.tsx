import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">APP</h1>

        <div className="flex justify-around flex-wrap gap-x-3 gap-y-1 items-center *:no-underline *:text-slate-700 hover:*:text-slate-500 *:bg-slate-800/20 *:px-3 *:py-0.5 *:rounded-2xl">
          <Link href="/counter">Smart Counter</Link>
          <Link href="/users">datatable</Link>
          <Link href="/profile/edit">Edit Profile</Link>
        </div>
      </main>
    </div>
  );
}

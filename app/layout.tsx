import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingDockDemo } from "@/components/navbar";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { FloatingDockDemo1 } from "@/components/loggedout";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuizCraftAI",
  description: "AI powered flashcards",
  icons: {
    icon: "/Screenshot 2024-08-22 at 10.05.38 PM.png", // Specify the path to your favicon here
  },

};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()
  const {data: {user}} = await supabase.auth.getUser()
  const logout = async () => {
    "use server"
    const supabase = createClient()
    await supabase.auth.signOut()
  } 
  return (
    <html lang="en">
      <head>
        <title>QuizCraft</title>
      </head>
      <body className={`bg-[#6A7FDB] flex flex-col min-h-screen pt-16 ${inter.className}`}>
        <header className="bg-white bg-opacity-10 p-4 fixed top-0 left-0 right-0 z-50">
          <nav className="container mx-auto flex justify-between items-center">
          {user ? (
            <>
            <Link href="/home" className="text-white text-2xl font-bold">QuizCraftAI</Link>
              <form action={logout}>
                <button type="submit" className="bg-white text-[#6A7FDB] px-4 py-2 rounded hover:bg-opacity-90 transition-colors">Logout</button>
              </form>
            </>
            ) : (
              <> 
                <Link href="/" className="text-white text-2xl font-bold">QuizCraftAI</Link>
              <div>
                <Link href="/login" className="text-white hover:text-gray-200 mr-4">Login</Link>
                <Link href="/login" className="bg-white text-[#6A7FDB] px-4 py-2 rounded hover:bg-opacity-90 transition-colors">Sign Up</Link>
              </div>
              </>
            )}
          </nav>
        </header>
        <main className="flex-grow overflow-auto pb-16">
          {children}
        </main>
        {user?(
        <div className="fixed bottom-0 left-0 right-0">
          <FloatingDockDemo />
        </div>): (
          <div className="fixed bottom-0 left-0 right-0">
          <FloatingDockDemo1 />
        </div>
        )}
      </body>
    </html>
  );
}

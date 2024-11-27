import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingDockDemo } from "@/components/navbar";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { FloatingDockDemo1 } from "@/components/loggedout";
import { Analytics } from "@vercel/analytics/react"

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
    <>
    <html lang="en">
      <Analytics/>
      <head>
        <title>QuizCraft</title>
      </head>
      <body className={`bg-[#3d2222] flex flex-col min-h-screen pt-16 ${inter.className}`}>
        <header className="bg-white bg-opacity-10 p-4 fixed top-0 left-0 right-0 z-50">
          <nav className="container mx-auto flex justify-between items-center">
          {user ? (
            <>
            <Link href="/home" className="text-white text-2xl font-bold">QuizCraftAI</Link>
            <div className="flex flex-row justify-center items-center gap-3">
              <form action={logout}>
                <button type="submit" className="bg-white text-[#3d2222] px-4 py-2 rounded hover:bg-opacity-90 transition-colors">Logout</button>
              </form>
              <Link href="https://x.com/thequizcraftai?s=21" className="text-white px-3 py-1 rounded text-xl font-bold hover:bg-opacity-90 transition-colors bg-blue-700">Twitter </Link>
              </div>
            </>
            ) : (
              <> 
                <Link href="/" className="text-white text-2xl font-bold">QuizCraftAI</Link>
                <div className="flex flex-row justify-center items-center gap-3">
                <Link href="/login" className="text-white hover:text-gray-200 mr-4">Login</Link>
                <Link href="/login" className="bg-white text-[#3d2222] px-4 py-2 rounded hover:bg-opacity-90 transition-colors">Sign Up</Link>
                <Link href="https://x.com/thequizcraftai?s=21" className="text-white px-8 py-3 rounded-lg text-xl font-bold hover:bg-opacity-90 transition-colors bg-blue-700">Twitter </Link>
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
         <footer className="bg-white bg-opacity-10 p-4 bottom-0 left-0 right-0 z-50">
        <div className="container mx-auto text-right w-full text-white">
          <p>&copy; 2022 QuizCraftAI</p>
          <p>Contact email: hello@quizcraftai.com</p>
        </div>
      </footer>
      </body>
    </html>
  
    </>
  );
}

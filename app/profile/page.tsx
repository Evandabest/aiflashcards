import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Profile = async () => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser();
  const id = user?.id;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id)
  
  if (error) {
    console.error('Error fetching posts:', error);
    return null; // Return null or an error component instead of undefined
  }

  let posts: any = []
  for (let i = 0; i < data.length; i++) {
    posts = [...posts, data[i].posts]
  }

  const goToEdit = async (formData: FormData) => {
    "use server"
    redirect("/profile/edit")
  }

  return (
    <div className="bg-[#6A7FDB] min-h-screen p-8 flex flex-col items-center justify-center">
      <div className="bg-white bg-opacity-20 rounded-lg p-8 w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Profile</h1>
        <form className="flex flex-col items-center">
          <img 
            className="rounded-full mb-8 h-32 w-32 border-4 border-white" 
            src={data[0].pfp} 
            alt="Profile Picture" 
          />
          <p className="text-white text-xl mb-6">Display name: {data[0].name}</p>
          <button 
            formAction={goToEdit}
            className="bg-white text-[#6A7FDB] font-bold py-2 px-6 rounded hover:bg-opacity-90 transition-colors"
          >
            Edit Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
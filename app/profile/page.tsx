import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Profile = async () => {
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser();
    const id = user?.id;
    const {data, error} = await supabase.from('profiles').select('*').eq('id', id)
    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    console.log(data[0])

    let posts : any = []
    for (let i = 0; i < data.length; i++) {
        posts = [...posts, data[i].posts]
    }

    const goToEdit = async (formData: FormData) => {
        "use server"
        redirect("/profile/edit") 
    }

    return (
        <>
        <div className="flex flex-col items-center justify-center">
            <form className="flex flex-col shadow-md bg-white rounded-md shadow-black p-4 w-80 m-auto items-center justify-center mt-12">
                <img className="rounded-full mb-8 h-24 w-24" src={data[0].pfp} alt="Profile Pictuxre" />
                <p className="mb-4">Display name: {data[0].username}</p>
                <button formAction={goToEdit}>Edit</button>
            </form>
        </div>
        </>
    )
}

export default Profile

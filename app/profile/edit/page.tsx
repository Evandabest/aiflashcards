"use client"
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProfileInfo {
    pfp: string | null;
    name: string | null;
}

const Edit = () => {
    const supabase = createClient()
    const router = useRouter()
    const [data, setData] = useState<ProfileInfo>({
        pfp: "",
        name: "",
    })
    const [newPfp, setNewPfp] = useState<File | undefined>(undefined)
    const [id, setId] = useState<string | undefined>(undefined)

    useEffect(() => {
        const getData = async () => {
            const {data: {user}} = await supabase.auth.getUser();
            const id = user?.id
            if (!id) {
                console.error('Error fetching user id');
                return;
            }
            setId(id)
            const {data, error} = await supabase.from('profiles').select('*').eq('id', id).single()
            if (error) {
                console.error('Error fetching chats:', error);
                return;
            }
            if (!data) {
                console.error('Profile not found');
                return;
            }
            setData(data)
        }
        getData()
    }, [supabase])

    const newFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) {
            return;
        }
        console.log(file)
        setNewPfp(file)
    }

    const getURL = async (link:string) => {
        const { data: {publicUrl} } = await supabase.storage.from('pfp').getPublicUrl(link);
            if (!publicUrl) {
                console.error('Error fetching public url');
                return;
        }
        return publicUrl
    }

    const edit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let updatedProfile = { ...data }
        if (newPfp) {
            const time = Date.now()
            const {data, error} = await supabase.storage.from('pfp').upload(`${id}_${time}`, newPfp)
            if (error) {
                console.error('Error uploading pfp:', error);
                return;
            }
            const publicUrl = await getURL(`${id}_${time}`)
            if (!publicUrl) {
                console.error('Error fetching public url');
                return;
            }
            updatedProfile.pfp = publicUrl
        }
        const { data: updatedData, error: updateError } = await supabase.from('profiles').update({
            pfp: updatedProfile.pfp, 
            name: updatedProfile.name
        }).eq('id', id);
        
        if (updateError) {
            console.error('Error updating profile:', updateError);
            return;
        }
        router.push('/profile')
    }

    const changeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="bg-[#3d2222] min-h-screen p-8 flex flex-col items-center justify-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-8 w-full max-w-md">
                <h1 className="text-white text-3xl font-bold mb-6 text-center">Edit Profile</h1>
                <form onSubmit={edit} className="flex flex-col items-center">
                    {newPfp ? (
                        <img className="rounded-full h-32 w-32 mb-8 border-4 border-white" src={URL.createObjectURL(newPfp)} alt="Profile Picture" onError={(e) => e.currentTarget.src = 'default-placeholder.png'} />
                    ) : (
                        <img className="rounded-full h-32 w-32 mb-8 border-4 border-white" src={data.pfp || 'default-placeholder.png'} alt="Profile Picture" onError={(e) => e.currentTarget.src = 'https://bjgvfehipzlfxmpzwljg.supabase.co/storage/v1/object/public/pfp/basic-default-pfp-pxi77qv5o0zuz8j3.jpg?t=2024-08-14T21%3A11%3A46.418Z'} />
                    )}
                    <label className="text-white mb-2">Select new profile picture</label>
                    <input className="mb-4 text-white" type="file" onChange={newFile} name="file" />
                    <label className="text-white mb-2">Display name:</label>
                    <input 
                        name="name" 
                        className="mb-6 p-2 rounded bg-white bg-opacity-50 text-white placeholder-gray-200 w-full"
                        value={data.name ?? ""} 
                        onChange={changeInfo}
                    />
                    <button 
                        type="submit"
                        className="bg-white text-[#3d2222] font-bold py-2 px-6 rounded hover:bg-opacity-90 transition-colors"
                    >
                        Confirm changes
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Edit
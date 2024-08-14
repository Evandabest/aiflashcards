"use client"
import { createClient } from "@/utlils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface profileInfo {
    pfp: string | null;
    username: string | null;
}

const Edit = () => {
    const supabase = createClient()
    const router = useRouter()
    const [data, setData] = useState<profileInfo>({
        pfp: "",
        username: "",
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

    const edit = async (e: any) => {
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
            username: updatedProfile.username
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
        <>   
            <div className="flex flex-col items-center justify-center">
                <form className="flex flex-col shadow-md bg-white rounded-md shadow-black p-4 w-80 m-auto items-center justify-center mt-12">
                {newPfp ? (
                    <img className="rounded-full h-24 w-24 mb-8" src={URL.createObjectURL(newPfp)} alt="Profile Picture" onError={(e) => e.currentTarget.src = 'default-placeholder.png'} />
                    ) : (
                    <img className="rounded-full h-24 w-24 mb-8" src={data.pfp || 'default-placeholder.png'} alt="Profile Picture" onError={(e) => e.currentTarget.src = 'https://bjgvfehipzlfxmpzwljg.supabase.co/storage/v1/object/public/pfp/basic-default-pfp-pxi77qv5o0zuz8j3.jpg?t=2024-08-14T21%3A11%3A46.418Z'} />
                    )}
                    <p className="my-2">Select new profile picture</p>
                    <input type="file" onChange={newFile} name="file" />
                    <p className="my-2">Display name:</p>
                    <input name="username" className="mb-8" defaultValue={data.username ?? ""} onChange={changeInfo} value={data.username ?? ""} />
                    <button type="submit" onClick={(e) => edit(e)}>Confirm changes </button>
                </form>
            </div>
        </>
    )
}

export default Edit

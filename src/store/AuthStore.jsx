import { create } from "zustand";
import {supabase, MostrarUsuarios} from "../index"

export const useAuthStore = create((set) => ({
    loginGoogle: async()=>{
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        console.log("data user:", data)        

    },
    loginEmail: async(p) =>{
        const {data, error} = await supabase.auth.signInWithPassword({
            email: p.email,
            password: p.password
        })

        if(error){
            console.log(error.status)
            if(error.status==400){
                throw new Error("Correo o contraseña no son validos")
            }else{
                throw new Error("Error: " + error.message)
            }
        }

        return data.user;


    },
    crearUserYLogin: async(p) => {
        const {data,error} = await supabase.auth.signUp({
            email: p.email,
            password: p.password
        })
        return data.user;
    },

    cerrarSesion: async() =>{
        await supabase.auth.signOut()
    }
}))
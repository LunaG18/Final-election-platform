"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import { BALLOT_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import Link from "next/link";
import {auth} from '@/util/firebase';
import { loginValidation } from "@/validationSchema/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";

const Login = () => {
    const { handleSubmit, register, formState:{errors}} = loginValidation();
    const router = useRouter();
    useAuthentication();
    const submitForm = (values:any) => {
        signInWithEmailAndPassword(auth,values.email,values.password).then((response)=>{
            router.push(BALLOT_ROUTE);
        }).catch((e)=>{
            console.log("Login Error ", e.message);
            alert("Please try Again");
        });
    }

    return (
        <div className=" h-screen flex justify-center items-center min-h-full flex-col  px-6 py-12 lg:px-8 flex-1 bg-blue-300">
<div className="sm:mx-auto sm:w-full sm:max-w-sm">

      <img
        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/election-campaign-logo-template-design-d097bf8c17d33549b3f4e7c6ed1c9de0_screen.jpg?ts=1677474006"
        alt="Election logo"
        className="mx-auto h-90 w-auto"
      />
   

<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black underline">
            Log in to your account
</h2>
<p><br></br></p>
</div>
        
            <div className="w-1/2 rounded-md bg-white/30 shadow-lg flex justify-between flex-col text-center">
               
                <form onSubmit={handleSubmit(submitForm)} className="h-full w-1/2 mx-auto ">
                    <InputField
                        register={register}
                        error={errors.email}
                        type="text"
                        placeholder="Enter Your Email Here..."
                        name="email"
                        label="Email"
                    />
                    <InputField
                        register={register}
                        error={errors.password}
                        type="password"
                        placeholder="Enter Your Password Here..."
                        name="password"
                        label="Password"
                    />
                    <SubmitButton label="Submit" />
                </form>
                <div className="h-20 mx-auto">
                    <span className="text-sm text-gray-600">Dont have an account?  
                        <Link href={REGISTER_ROUTE}><span className="text-blue-500 font-semibold text-md" > Register Here</span></Link>
                    </span>
                </div>
            </div>
        </div>
      
    )
}

export default Login;
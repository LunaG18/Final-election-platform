"use client";
import { HOME_ROUTE, LOGIN_ROUTE, BALLOT_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { AuthContext } from "@/provider/AuthProvider";
import { auth } from "@/util/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const {user}:any = AuthContext();
    const router = useRouter();
    const logOut = () => {
        signOut(auth).then((response)=>{
            router.push(LOGIN_ROUTE);
        }).catch((e)=>{
            console.log("Logout Catch ",e.message)
        })
    }

    return (
        <header className="h-20  flex px-10 drop-shadow-[0px_2px_10px_rgba(2,0,0) text-black">
            <nav className="w-full mx-auto flex justify-between items-center px-2 text-black text-xl">
                <Link href={HOME_ROUTE} className="text-blue-500 font-bold text-[2rem]"><div>Election Platform</div></Link>
                <ul className="flex gap-4 inline-flex h-10 items-center justify-center rounded-md font-semibold border-b-2 border-blue-500 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300">
                    {!user?.isLogin &&
                        <>
                            <Link href={LOGIN_ROUTE}><li>Login</li></Link>
                            <p>|</p>
                            <Link href={REGISTER_ROUTE}><li>Register</li></Link>
                        </>
                    }
                    {user?.isLogin &&
                        <>
                            <Link href={BALLOT_ROUTE}><li>Profile</li></Link>
                            <li className=" cursor-pointer" onClick={logOut}>Logout</li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;
"use client"

import {sidebarLinks} from "@/constants";
import Link from "next/link";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import { SignOutButton, SignedIn, useAuth} from "@clerk/nextjs";

function LeftSidebar(){
    // it use to know which page is currenty beign used
    const router = useRouter();
    const pathname = usePathname();
    const {userId} = useAuth();

    return (
        <section className="custome-scrollbar leftsidebar">
            <div className="fle w-full flex-1 flex-col gap-6
            px-6">
                {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes
                        (link.route) && link.route.length > 1) || pathname === link.route;

                if(link.route === '/profile') link.route =`${link.route}/${userId}`
                return (
                    <Link href={link.route}
                    key={link.label} //because we are mappong over the elements
                    className={`leftsidebar_link 
                     ${isActive && 'bg-primary-500'}`} // check which class is active and change it's color to bg-primary-500
                    >
                        <Image
                            src={link.imgURL}
                            alt={link.label}
                            width={24}
                            height={24}
                        />

                        <p className="text-light-1
                         max-lg:hidden">
                            {link.label}
                        </p>
                    </Link>
                )}
                )}
            </div>
            <div className="mt-10 px-6">
            <SignedIn>
                        <SignOutButton signOutCallback={()=> 
                        router.push('/sign-in')
                        }>
                            <div className="flex cursor-pointer
                            gap-4 p-4">
                                <Image 
                                src="/assets/logout.svg"
                                alt="logout"
                                width={24}
                                height={24}
                                />
                                <p className="text-light-2
                                max-lg:hidden">
                                    Logout
                                </p>
                            </div>
                        </SignOutButton>
                    </SignedIn>
            </div>
        </section>
    )
}
export default LeftSidebar;
// React Component for Navbar

export const Logo=()=>{
    return(
            <p className="text-white text-xl relative">
                Any 
                <span className="text-red-500 text-lg font-bold">DO</span>
            </p>
    )
}

export default function Navbar(){
    return(
            <nav className="w-full px-3 md:py-11 py-6 absolute top-0 flex justify-center">
                <Logo/>
            </nav>
    )
}
import { createContext, useState } from "react"


export const WishlistContext = createContext(null);

const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([])

    console.log(wishlist);


    const toggleWishlist = (clothes) => {
        const idx = wishlist.findIndex((q) => q._id === clothes._id)
        if (idx === -1) {
            setWishlist([...wishlist, { ...clothes }])
        } else {
            setWishlist([...wishlist].filter((q) => q._id !== clothes._id))
        }
    }
    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>{children}</WishlistContext.Provider>
    )
}

export default WishlistProvider
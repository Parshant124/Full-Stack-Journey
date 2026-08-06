import React, {createContext, useContext} from "react";

const BookMark = createContext({
    bookmarks : [],
    addBookMark: () => {},
    removeBookMark: () => {}
})

export const BookMarkProvider = BookMark.Provider

export const useBookMark = () => {
    return ( useContext(BookMark) );
}
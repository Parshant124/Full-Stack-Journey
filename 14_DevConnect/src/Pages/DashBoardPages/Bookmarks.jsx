import React,{useState} from "react";
import {useBookMark, useCurrSessionUser, useCurrUser} from "../../contexts"
import BookMarkCard from "./components/BookMarkCard";

function Bookmarks() {
  const[searchValue, setSearchValue] = useState("")
  const {bookmarks, removeBookMark} = useBookMark()
  const{currUserId} = useCurrUser();
  const{currSessionUserId} = useCurrSessionUser();

  const userId = currSessionUserId || currUserId;

  const myBookMarks = bookmarks.filter((curr) => curr.user === userId)

  
  return (
    <div className="p-4 flex flex-col gap-4 bg-gray-100 h-full">
      <div>
        <h2 className="text-2xl font-bold">BookMarks</h2>
        <h4 className="text-[14px] text-gray-600">
          Save and manage your useful resources.
        </h4>
      </div>
      <div>
        <input
          type="text"
          className="border-2 px-2 py-1 text-[14px] rounded-md bg-white border-gray-300 w-1/2"
          placeholder="Search bookmarks..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="bg-white p-6 rounded-lg">
        {myBookMarks.length > 0 ? myBookMarks.map((bookmark) => <BookMarkCard projectId={bookmark.project} />) : "nothing"}
      </div>
    </div>
  );
}

export default Bookmarks;

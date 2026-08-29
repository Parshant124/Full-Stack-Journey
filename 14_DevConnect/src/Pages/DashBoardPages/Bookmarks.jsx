import { useState } from "react";
import { useAuth, useBookMark, useProject } from "../../contexts";
import BookMarkCard from "./components/BookMarkCard";

function Bookmarks() {
  const [searchValue, setSearchValue] = useState("");
  const [searchProject, setSearchProject] = useState([]);
  const { bookmarks } = useBookMark();
  const { currentUser } = useAuth();
  const { projects } = useProject();

  const userId = currentUser?.id;

  const myBookMarks = bookmarks.filter((curr) => curr.user === userId);

  const searchBookMark = (str) => {
    setSearchValue(str);
    if (!str.trim()) return;

    setSearchProject(
      myBookMarks.filter((bookmark) => {
        const currProject = projects.find(
          (project) => project.createdOn === bookmark.project,
        );

        return currProject?.name.toLowerCase().includes(str.toLowerCase());
      }),
    );
  };

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
          onChange={(e) => searchBookMark(e.target.value)}
        />
      </div>
      {searchValue.length <= 0 ? (
        <div className={`bg-white p-6 rounded-lg`}>
          {myBookMarks.length > 0 ? (
            myBookMarks.map((bookmark) => (
              <BookMarkCard projectId={bookmark.project} />
            ))
          ) : (
            <div className="flex items-center justify-center">
              <h4 className="text-3xl font-bold text-gray-500">Nothing...</h4>
            </div>
          )}
        </div>
      ) : (
        <div className={`bg-white p-6 rounded-lg`}>
          {searchProject.length > 0 ? (
            searchProject.map((bookmark) => (
              <BookMarkCard projectId={bookmark.project} />
            ))
          ) : (
            <div className="flex items-center justify-center">
              <h4 className="text-3xl font-bold text-gray-500">
                Nothing here...
              </h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Bookmarks;

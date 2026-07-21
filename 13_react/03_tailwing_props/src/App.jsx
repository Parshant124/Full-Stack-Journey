import "./App.css";
import Card from "./Card";

function App() {
  return (
    <>
      <div className="flex flex-row gap-10  m-4">
        <Card
          className="m-10 bg-gray-300 p-4"
          cardTitle="Test1"
          productImg="https://images.pexels.com/photos/1027130/pexels-photo-1027130.jpeg"
        />
        <Card
          className="m-10 bg-gray-300 p-4"
          productDesc="Test2"
          cardTitle="Test1"
        />
      </div>
    </>
  );
}

export default App;

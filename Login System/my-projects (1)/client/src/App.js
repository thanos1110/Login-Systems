//2
import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import Home from "./pages/Home";

function App() {

  //==========================
  // const [message, setMessage] = useState("");
  // useEffect(() => {
  //   fetch("http://localhost:4000/message")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);
  //==========================

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;


//1

// function App() {
//   return (
//     <div >
//       Hello
//     </div>
//   );
// }

// export default App;

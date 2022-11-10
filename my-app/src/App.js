import { useState } from "react";
import Home, { Cheval } from "D:/webdev/tp/my-app/src/Tp3/cheval";
import Adduser, { Addcheval } from "D:/webdev/tp/my-app/src/Tp3/addcheval";
import Edituser, { Editcheval } from "D:/webdev/tp/my-app/src/Tp3/editcheval";

function App() {
  const [displayForm, setDisplayForm] = useState(true);
  return (
   <div className="App">
    <Cheval/>
    <Addcheval />
    <Editcheval/>
   </div>
  );
}

export default App;

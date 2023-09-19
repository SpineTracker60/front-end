import { BrowserRouter,Router , Routes, Route } from "react-router-dom";
import routes from "./path";

function Routing() {
    const route = routes();
    return (


    <Routes>
        {route.map(({ path, element }) => (
        <Route path={path} element={element} key={path} />
        ))}
    </Routes>


    );
}
export default Routing;
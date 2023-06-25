import { Routes, Route } from "react-router-dom";
import Links from "./pages/Links";
import LinksUpdate from "./pages/LinksUpdate";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
    return (
        <div id="page-container">
            {/* not included in the route */}
            <div id="content-wrap">
                <Routes>
                    <Route path="/" element={<Links />} />
                    <Route path="/admin" element={<LinksUpdate />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;

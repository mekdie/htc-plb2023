import { Routes, Route } from "react-router-dom";
import Links from "./pages/Links";
import LinksAdmin from "./pages/LinksAdmin";
import NotFound from "./pages/NotFound";
import "./App.css";
import Footer from "./components/Footer";

function App() {
    return (
        <div id="page-container">
            {/* not included in the route */}
            <div id="content-wrap">
                <Routes>
                    <Route path="/" element={<Links />} />
                    <Route path="/admin" element={<LinksAdmin />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;

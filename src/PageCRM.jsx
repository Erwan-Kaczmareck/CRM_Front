import Nav from "./Nav.jsx";
import Tabs from "./Tabs.jsx";
import "./PageCRM.css";

export default function PageCRM() {
    return (
        <>
            <body>
            <div className="header">
                <Nav/>
            </div>


            <div className="content">
                <Tabs/>
            </div>
            </body>
        </>
    );
}

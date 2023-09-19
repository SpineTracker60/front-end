import WebcamPage from "../WebcamPage/WebcamPage";
import LoginQuestion from "../LoginPage/LoginQuestion"
import LoginPage from "../LoginPage/LoginPage";
import PrivacyPolicy from "../terms/PrivacyPolicy";
import ServiceTerm from "../terms/ServiceTerm";

const routes = () => [
    {
        path : "/",
        element : <LoginPage/>,
    },
    {
        path : "/userInfo",
        element : <LoginQuestion/>,
    },
    {
        path : "/main",
        element : <WebcamPage/>,
    },
    {
        path : "/privacyPolicy",
        element : <PrivacyPolicy/>,
    },
    {
        path : "serviceTerm",
        element : <ServiceTerm/>,
    },
];

export default routes;
import NavigationBar from "../../components/navigationBar.jsx";
import BasicTabs from "../../components/Tabs.jsx";
export default function UserPage(props) {

    return <>
        <NavigationBar></NavigationBar>
        <BasicTabs contract={props.contract}></BasicTabs>
    </>;
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./sidebar_item.css";

type SidebarIconProps = {
  icon: IconProp;
  label: string;
  //   setSidebarWidth?: React.Dispatch<React.SetStateAction<boolean>>;
};

const hi = () => {
  console.log("HI");
};

const SidebarItem = ({ icon, label }: SidebarIconProps) => (
  <div className="sidebarItem_container" onClick={hi}>
    <FontAwesomeIcon icon={icon} size="2xl" />
    {/* {label ? <span className="sidebar_item_label">{label}</span> : <div />} */}
  </div>
);
export default SidebarItem;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./sidebar_item.css";

type SidebarIconProps = {
  icon: IconProp;
  label: string;
  //   setSidebarWidth?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarItem = ({ icon, label }: SidebarIconProps) => (
  <div className="sidebarItem_container">
    <FontAwesomeIcon icon={icon} size="2xl" className="sidebarItem_icon" />
    <span className="sidebar_item_label">{label}</span>
  </div>
);
export default SidebarItem;

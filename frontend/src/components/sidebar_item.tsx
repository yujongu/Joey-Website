import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./sidebar_item.css";
import { useNavigate } from "react-router-dom";

type SidebarIconProps = {
  icon: IconProp;
  label: string;
  address: string;
  //   setSidebarWidth?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarItem = ({ icon, label, address }: SidebarIconProps) => {
  const navigate = useNavigate();

  const redirectToPage = (label: string) => {
    navigate(address, { replace: true });
  };

  return (
    <div
      className="sidebarItem_container isButton"
      onClick={() => redirectToPage(label)}
    >
      <FontAwesomeIcon icon={icon} size="2xl" className="sidebarItem_icon" />
      <span className="sidebar_item_label">{label}</span>
    </div>
  );
};
export default SidebarItem;

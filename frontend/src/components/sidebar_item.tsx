import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./sidebar_item.css";
import { useNavigate } from "react-router-dom";

type SidebarIconProps = {
  icon: IconProp;
  label: string;
  //   setSidebarWidth?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarItem = ({ icon, label }: SidebarIconProps) => {
  const navigate = useNavigate();

  const redirectToPage = (label: string) => {
    navigate(`/${label.toLowerCase()}`, { replace: true });
  };

  return (
    <div
      className="sidebarItem_container"
      onClick={() => redirectToPage(label)}
    >
      <FontAwesomeIcon icon={icon} size="2xl" className="sidebarItem_icon" />
      <span className="sidebar_item_label">{label}</span>
    </div>
  );
};
export default SidebarItem;

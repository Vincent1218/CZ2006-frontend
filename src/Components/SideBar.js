import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import './CSS/SideBar.css'
import cx from "classnames";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className={cx("sideBtn", { "sideBtn-closed": !isOpen })} onClick={() => setIsOpen(!isOpen)}></div>
      <div className={cx("sidebar", { "sidebar-closed": !isOpen })}>
        <CSSTransition
          in={isOpen}
          timeout={200}
          classNames={"fade"}
          unmountOnExit
        >
          <div className="sidebarList">
            <div className= "row1">1</div>
            <div className= "row2">2</div>
            <div className= "row3">3</div>
            <div className= "row4">4</div>
          </div>
        </CSSTransition>
      </div>
    </div>

  );
};

export default Sidebar;

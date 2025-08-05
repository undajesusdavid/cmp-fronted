import React from "react";
import styles from "./Tabs.module.css";

const TabPanel = ({ active, children }) => (
  <div className={active ? styles.tabPanel : styles.tabPanelHidden}>{children}</div>
);

export default TabPanel;

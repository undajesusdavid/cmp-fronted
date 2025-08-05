import React from "react";
import styles from "./Tabs.module.css";
import TabPanel from "./TabPanel";

const TabList = ({ children }) => (
  <div className={styles.tabList}>{children}</div>
);

const Tab = ({ active, onClick, children }) => (
  <button
    className={active ? `${styles.tab} ${styles.active}` : styles.tab}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

const Tabs = ({ tabs, activeIndex, onTabChange }) => (
  <div className={styles.tabsContainer}>
    <TabList>
      {tabs.map((tab, idx) => (
        <Tab key={idx} active={activeIndex === idx} onClick={() => onTabChange(idx)}>
          {tab.label}
        </Tab>
      ))}
    </TabList>
    {tabs.map((tab, idx) => (
      <TabPanel key={idx} active={activeIndex === idx}>
        {tab.content}
      </TabPanel>
    ))}
  </div>
);

export default Tabs;

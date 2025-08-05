import PropTypes from "prop-types";
import styles from "./SectionContainer.module.css";

const SectionContainer = ({ children, direction = "column" }) => {
  const containerClass =
    direction === "column"
      ? styles.sectionsContainer
      : styles.SectionContainerRow;

  return <div className={containerClass}>{children}</div>;
};

SectionContainer.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(["column", "row"]),
};

export default SectionContainer;

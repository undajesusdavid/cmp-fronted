import styles from "./DetailItem.module.css";

const DetailItem = ({ label, value, fullWidth = false }) => (
  <div
    className={`${styles.detailItem} ${fullWidth ? styles.fullWidthItem : ""}`}
  >
    <strong>{label}:</strong> <span>{value}</span>
  </div>
);

export default DetailItem;
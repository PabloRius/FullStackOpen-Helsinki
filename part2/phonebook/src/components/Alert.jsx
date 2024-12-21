export const Alert = (props) => {
  const { active, content, status } = props;
  return active && <p className={`Alert ${status}`}>{content}</p>;
};

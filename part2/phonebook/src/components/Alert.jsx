export const Alert = (props) => {
  const { active, content } = props;
  return active && <p className="Alert">{content}</p>;
};

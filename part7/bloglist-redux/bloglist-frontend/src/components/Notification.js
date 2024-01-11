const Notification = (props) => {
  const { error, notice } = props;

  return (
    <div>
      {error ? <div className="error">{error}</div> : null}
      {notice ? <div className="notice">{notice}</div> : null}
    </div>
  );
};

export default Notification;

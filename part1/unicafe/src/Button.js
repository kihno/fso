const Button = (props) => {
    const { text, value, set } = props;

    return (
        <button onClick={() => set(value + 1)}>{text}</button>
    );
}
  
  export default Button;

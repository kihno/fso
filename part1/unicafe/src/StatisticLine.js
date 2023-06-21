const StatisticLine = (props) => {
    const { text, value } = props;

    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
}
  
  export default StatisticLine;

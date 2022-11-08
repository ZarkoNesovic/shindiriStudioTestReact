const header = (props) => {
  const returnDateString = () => {
    const date = new Date();
    const monthString = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = date.getMonth();
    let year = date.getFullYear();
    return "Available budget in " + monthString[month] + " " + year + ":";
  };

  const returnNumberSign = (number) => {
    let sign = "";
    if (number > 0) sign = "+";
    if (number < 0) sign = "-";
    return sign;
  };
  const percentageCalculationFunction = (income, expense) => {
    if (income === 0) {
      return 0;
    } else {
      return Math.round((expense / income) * 100);
    }
  };

  return (
    <div className="header-container">
      <div className="budget-container budget-text">
        <div className="date-box">{returnDateString()}</div>
        <div className="budget-box">
          {" "}
          {returnNumberSign(props.budget) + Math.abs(props.budget)}
        </div>
      </div>

      <div className="grid-container-3 income-container">
        <div className="grid-item-1">Income</div>
        <div className="grid-item-2">+ {props.income}</div>
      </div>
      <div className="grid-container-3 expense-container">
        <div className="grid-item-1">Expense</div>
        <div className="grid-item-2">- {props.expense}</div>
        <div className="grid-item-3">
          {percentageCalculationFunction(props.income, props.expense) + "%"}
        </div>
      </div>
    </div>
  );
};
export default header;

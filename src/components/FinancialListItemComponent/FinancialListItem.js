import { useState } from "react";

const FinancialListItem = (props) => {
  const deleteFirstElementHandelerTest = () => {
    if (props.data.type === "expense") {
      props.dispatch({ type: "remove_expense", payload: props.data });
    }
    if (props.data.type === "income") {
      props.dispatch({ type: "remove_income", payload: props.data });
    }
  };
  const returnAmountText = () => {
    let sign = "+";
    if (props.data.type == "expense") {
      sign = "-";
    }
    return sign + props.data.amount;
  };

  const returnPercentage = () => {
    if (props.income) {
      return Math.round((props.data.amount / props.income) * 100) + "%";
    } else {
      return 0 + "%";
    }
  };
  const canDisplay = () => {
    let bool = false;
    if (props.data.type == "expense") {
      bool = true;
    }
    console.log("Can display" + props.data.type);
    console.log(props.data.type == "expense" && props.income);
    return bool;
  };
  let test = returnPercentage();

  return (
    <tr>
      <td>{props.data.comment}</td>
      <td>{returnAmountText()}</td>

      {canDisplay() && <td>{test}</td>}
      <td>
        <button
          id={props.data.id}
          onClick={deleteFirstElementHandelerTest}
          className="btn-table"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default FinancialListItem;

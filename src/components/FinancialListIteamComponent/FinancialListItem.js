import { useState } from "react";

const FinancialListItem = (props) => {
  const deleteFirstElementHandelerTest = (event) => {
    //console.log(event.target.id);
    props.deleteFirstElementHandeler(event.target.id, props.data.type);
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
      <td>{props.data.type}</td>
      {canDisplay() && <td>{test}</td>}
      <td>
        <button id={props.data.id} onClick={deleteFirstElementHandelerTest}>
          Remove
        </button>
      </td>
    </tr>
  );
};

export default FinancialListItem;

import { useState } from "react";
import "./InputForm.css";

const InputForm = (props) => {
  const [enteredType, setEnteredType] = useState("income");
  const [enteredComment, setEnteredComment] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [buttonColour, setButtonColour] = useState("red");

  const typeChangeHandeler = (event) => {
    setEnteredType(event.target.value);
  };
  const commentChangeHandeler = (event) => {
    //console.log(event.target.value);
    setEnteredComment(event.target.value);
  };
  const amountChangeHandeler = (event) => {
    //console.log(event.target.value);
    setEnteredAmount(event.target.value);
  };

  function submitHandeler(event) {
    event.preventDefault();

    //TODO:FORM VALIDATION BEFORE SUBMIT

    const financialData = {
      id: Math.random(),
      type: enteredType,
      comment: enteredComment,
      amount: enteredAmount,
    };

    props.onFinancialDataChange(financialData);

    setEnteredType("income");
    setEnteredAmount("");
    setEnteredComment("");
  }
  //TODO:ERROR MESSAGE FOR CUSTOMER
  return (
    <div className="form-container">
      <form action="" onSubmit={submitHandeler}>
        <select
          value={enteredType}
          onChange={typeChangeHandeler}
          className={"form-control"}
        >
          <option value="income" name="income">
            Income
          </option>
          <option value="expense" name="expense">
            Expense
          </option>
        </select>
        <input
          className="form-control"
          type="text"
          name="comment"
          value={enteredComment}
          onChange={commentChangeHandeler}
          placeholder="Add description"
          title="Comment shouldnt be longer than 50 characters"
          pattern="[A-Za-z]{0,50}"
          required
        />
        <input
          className="form-control"
          type="number"
          name="amount"
          id=""
          min="1"
          value={enteredAmount}
          onChange={amountChangeHandeler}
          placeholder="Value"
          required
        />
        <input
          type="submit"
          value="Save"
          className={enteredType == "income" ? "btn-income" : "btn-expense"}
        />
      </form>
    </div>
  );
};

export default InputForm;

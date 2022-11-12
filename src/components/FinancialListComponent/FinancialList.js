import FinancialListItem from "../FinancialListItemComponent/FinancialListItem";

const FinancialList = (props) => {
  return (
    <div className="tables-container">
      <div className="container-table">
        <div>Income</div>
        <table className="table-income">
          <tbody>
            {props.incomeList.map((data) => (
              <FinancialListItem
                data={data}
                key={data.id}
                deleteFirstElementHandeler={props.deleteFirstElementHandeler}
                dispatch={props.dispatch}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="container-table">
        <div>Expenses</div>
        <table className="table-expense">
          <tbody>
            {props.expenseList.map((data) => (
              <FinancialListItem
                data={data}
                key={data.id}
                income={props.income}
                deleteFirstElementHandeler={props.deleteFirstElementHandeler}
                dispatch={props.dispatch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default FinancialList;

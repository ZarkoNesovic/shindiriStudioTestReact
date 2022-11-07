import FinancialListItem from "../FinancialListIteamComponent/FinancialListItem";
import "./financialListCss.css";
const FinancialList = (props) => {
  return (
    <div className="container-flex">
      <div className="container-table-income">
        <div>Income</div>
        <table className="table-income">
          <tbody>
            {props.incomeList.map((data) => (
              <FinancialListItem
                data={data}
                key={data.id}
                deleteFirstElementHandeler={props.deleteFirstElementHandeler}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="container-table-expense">
        <div>Expenses</div>
        <table className="table-expense">
          <tbody>
            {props.expenseList.map((data) => (
              <FinancialListItem
                data={data}
                key={data.id}
                income={props.income}
                deleteFirstElementHandeler={props.deleteFirstElementHandeler}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default FinancialList;

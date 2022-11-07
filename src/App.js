import { useState, useEffect } from "react";
import "./App.css";

import InputForm from "./components/InputFormComponent/InputForm";
import FinancialList from "./components/FinancialListComponent/FinancialList";

function App() {
  const [budget, setBudget] = useState(() => {
    const budgetFromLocalStorage = localStorage.getItem("budget");
    return budgetFromLocalStorage !== null
      ? parseInt(budgetFromLocalStorage)
      : 0;
  });
  const [income, setIncome] = useState(() => {
    const incomeFromLocalStorage = localStorage.getItem("income");
    return incomeFromLocalStorage !== null
      ? parseInt(incomeFromLocalStorage)
      : 0;
  });
  const [expense, setExpense] = useState(() => {
    const expenseFromLocalStorage = localStorage.getItem("expense");
    return expenseFromLocalStorage !== null
      ? parseInt(expenseFromLocalStorage)
      : 0;
  });

  const [incomeList, setIncomeList] = useState(() => {
    const incomeListFromLocalStorage = localStorage.getItem("incomeList");

    return incomeListFromLocalStorage !== null
      ? JSON.parse(incomeListFromLocalStorage)
      : [];
  });
  const [expenseList, setExpenseList] = useState(() => {
    const expenseListFromLocalStorage = localStorage.getItem("expenseList");

    return expenseListFromLocalStorage !== null
      ? JSON.parse(expenseListFromLocalStorage)
      : [];
  });

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

  //TODO:Srediti brisanje iz lokalnog skladista
  const deleteFirstElementHandeler = (id, type) => {
    if (type === "income") {
      let list = [...incomeList];
      let indexToDelete = list.findIndex((listItem) => {
        return listItem.id == id;
      });
      const amountToRemove = parseInt(list[indexToDelete].amount);
      list.splice(indexToDelete, 1);
      //console.log("index" + list[indexToDelete].amount + "-------------");
      setIncome(() => {
        const newIncome = income - amountToRemove;
        localStorage.setItem("income", newIncome);
        return newIncome;
      });
      setBudget(() => {
        let local = budget;
        if (!budget) {
          local = 0;
        }
        let newBudget = local - amountToRemove;
        console.log(newBudget);
        localStorage.setItem("budget", newBudget);
        return newBudget;
      });

      setIncomeList(() => {
        localStorage.setItem("incomeList", JSON.stringify(list));
        return list;
      });
    }
    if (type === "expense") {
      let list = [...expenseList];
      let indexToDelete = list.findIndex((listItem) => {
        return listItem.id == id;
      });
      const amountToRemove = parseInt(list[indexToDelete].amount);
      list.splice(indexToDelete, 1);
      setExpense(() => {
        const newExpense = expense - amountToRemove;
        localStorage.setItem("expense", newExpense);
        return newExpense;
      });
      setBudget(() => {
        let local = budget;
        if (!budget) {
          local = 0;
        }
        let newBudget = local + amountToRemove;
        localStorage.setItem("budget", newBudget);
        return newBudget;
      });
      setExpenseList(() => {
        localStorage.setItem("expenseList", JSON.stringify(list));
        return list;
      });
    }
  };

  const financialDataChangeHandeler = (financialData) => {
    if (financialData.type == "income") {
      //Update income, income list,expense list(percentages) and budget
      setIncome((income) => {
        const newIncome = income + parseInt(financialData.amount);
        localStorage.setItem("income", newIncome);
        return newIncome;
      });
      setIncomeList((incomeList) => {
        const newIncomeList = [financialData, ...incomeList];
        console.log(JSON.stringify([financialData, ...incomeList]));
        localStorage.setItem("incomeList", JSON.stringify(newIncomeList));
        return newIncomeList;
      });
      setBudget((Budget) => {
        let test = expense;
        if (!income) {
          test = 0;
        }
        const newBudget = income - test + parseInt(financialData.amount);
        localStorage.setItem("budget", newBudget);
        return newBudget;
      });
    }
    if (financialData.type == "expense") {
      //Update expense, expense list(percentage changes), budget
      setExpense((income) => {
        const newExpense = expense + parseInt(financialData.amount);
        localStorage.setItem("expense", newExpense);
        return newExpense;
      });
      setExpenseList((expenseList) => {
        const newExpenseList = [financialData, ...expenseList];
        //console.log(JSON.stringify([financialData, ...expenseList]));
        localStorage.setItem("expenseList", JSON.stringify(newExpenseList));
        return newExpenseList;
      });
      setBudget((budget) => {
        let test = income;
        if (!income) {
          test = 0;
        }
        const newBudget = income - expense - parseInt(financialData.amount);
        localStorage.setItem("budget", newBudget);

        return newBudget;
      });
    }
  };

  return (
    <div className="App">
      <div className="header-container">
        <div className="container-row">
          <div className="date-box">{returnDateString()}</div>
          <div className="budget-box">
            {" "}
            {returnNumberSign(budget) + Math.abs(budget)}
          </div>
        </div>
        <div className="container-50">
          <div className="container-grid income-box">
            <div>Income</div>
            <div>+ {income}</div>
          </div>
          <div className="container-grid expense-box">
            <div>Expense</div>
            <div className="container-row2-grid-2">- {expense}</div>
            <div className="container-row2-grid-2">
              {percentageCalculationFunction(income, expense) + "%"}
            </div>
          </div>
        </div>
      </div>
      <InputForm onFinancialDataChange={financialDataChangeHandeler} />
      <FinancialList
        incomeList={incomeList}
        expenseList={expenseList}
        income={income}
        deleteFirstElementHandeler={deleteFirstElementHandeler}
      />
    </div>
  );
}

export default App;

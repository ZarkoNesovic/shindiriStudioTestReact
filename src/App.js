import { useState, useEffect, useReducer } from "react";
import "./App.css";

import InputForm from "./components/InputFormComponent/InputForm";
import FinancialList from "./components/FinancialListComponent/FinancialList";
import Header from "./components/HeaderComponent/Header";

function App() {
  //Change use states for use reducer

  //Data init for reducer
  const lsIncome = parseFloat(localStorage.getItem("income")) || 0;
  const lsIncomeList = JSON.parse(localStorage.getItem("incomeList")) || [];
  const lsExpemse = parseFloat(localStorage.getItem("expense")) || 0;
  const lsExpenseList = JSON.parse(localStorage.getItem("expenseList")) || [];
  const lsBudget = parseFloat(localStorage.getItem("budget")) || 0;

  const dataInitialization = {
    income: lsIncome,
    incomeList: lsIncomeList,
    expense: lsExpemse,
    expenseList: lsExpenseList,
    budget: lsBudget,
  };
  //console.log(dataInitialization);
  const updateLocalStorage = (state) => {
    localStorage.setItem("income", state.income);
    localStorage.setItem("incomeList", JSON.stringify(state.incomeList));
    localStorage.setItem("expense", state.expense);
    localStorage.setItem("expenseList", JSON.stringify(state.expenseList));
    localStorage.setItem("budget", state.budget);
  };

  const update = (state) => {
    let newObj = {
      income: state.income,
      expense: state.expense,
      budget: state.income - state.expense,
      incomeList: state.incomeList,
      expenseList: state.expenseList,
    };
    updateLocalStorage(state);
    return newObj;
  };
  const financialDataReducer = (state, action) => {
    //console.log(action.type);
    switch (action.type) {
      case "add_income":
        state.income = state.income + parseFloat(action.payload.amount);
        state.incomeList = [action.payload, ...state.incomeList];
        state.budget = state.budget + parseFloat(action.payload.amount);
        break;
      case "remove_income":
        state.income = state.income - parseFloat(action.payload.amount);
        state.incomeList = state.incomeList.filter((itemData) => {
          return itemData !== action.payload;
        });
        state.budget = state.budget - parseFloat(action.payload.amount);
        break;
      case "add_expense":
        state.expense = state.expense + parseFloat(action.payload.amount);
        state.expenseList = [action.payload, ...state.expenseList];
        state.budget = state.budget - parseFloat(action.payload.amount);
        break;
      case "remove_expense":
        state.expense = state.expense - parseFloat(action.payload.amount);
        state.expenseList = state.expenseList.filter((itemData) => {
          return itemData !== action.payload;
        });
        state.budget = state.budget + parseFloat(action.payload.amount);
        break;
      default:
        break;
    }

    return update(state);
  };

  const [state, dispatch] = useReducer(
    financialDataReducer,
    dataInitialization
  );

  //TODO:Srediti brisanje iz lokalnog skladista

  const financialDataChangeHandeler = (financialData) => {
    let action = {};
    if (financialData.type === "income") {
      action = { type: "add_income", payload: financialData };
    }
    if (financialData.type === "expense") {
      action = { type: "add_expense", payload: financialData };
    }
    dispatch(action);
  };
  return (
    <div className="app-container">
      <Header
        income={state.income}
        expense={state.expense}
        budget={state.budget}
      ></Header>

      <InputForm onFinancialDataChange={financialDataChangeHandeler} />
      <FinancialList
        incomeList={state.incomeList}
        expenseList={state.expenseList}
        income={state.income}
        dispatch={dispatch}
      />
    </div>
  );
}

export default App;

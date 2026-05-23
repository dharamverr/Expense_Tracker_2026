import React, { useState } from "react";
import useFilter from "../hooks/useFilter";
import ContextMenu from "./ContextMenu";

export default function ExpenseTable({
  rowid,
  edit,
  expenses,
  setExpenses,
  formExpense,
}) {
  //console.log(expenses)
  const [expense, setExpense] = formExpense;
  const [editable, setEditable] = edit;
  const [category, setCategory] = useState("");
  const [rowId, setRowId] = rowid;
  const [contextPosition, setContextPosition] = useState({});
  const totalAmount = expenses.reduce(
    (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.amount),
    0,
  );
  //console.log(totalAmount);
  // const filteredData = expenses.filter((expense) => {
  //   return expense.category.toLowerCase().includes(category)
  // })
  // console.log(filteredData);
  const [filteredData, setQuery] = useFilter(expenses, (data) => data.category);
  const [sorting, setSorting] = useState(() => () => {});
  return (
    <>
      <ContextMenu
        edit={edit}
        formExpense={formExpense}
        setExpenses={setExpenses}
        setContextPosition={setContextPosition}
        expenses={expenses}
        rowId={rowId}
        contextPosition={contextPosition}
      />
      <table
        onClick={() => {
          if (contextPosition.left) {
            setContextPosition({});
          }
        }}
      >
        <thead>
          <tr>
            <th className="table-heading">
              <span>Title</span>
             <div className="title">
               <svg
                xmlns="http://www.w3.org/2000/svg"
                id="up-arrow"
                width="17"
                height="14"
                fill="#000"
                className="icon flat-color"
                data-name="Flat Color"
                viewBox="0 0 20 20"
                onClick={() =>
                  setSorting(() => (a, b) => a.title.localeCompare(b.title))
                }
              >
                <g id="SVGRepo_iconCarrier">
                  <path
                    id="primary"
                    fill="#000"
                    d="m15.71 5.29-3-3a1 1 0 0 0-1.42 0l-3 3a1 1 0 0 0 1.42 1.42L11 5.41V21a1 1 0 0 0 2 0V5.41l1.29 1.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42"
                  ></path>
                </g>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                id="Layer_1"
                width="17"
                height="14"
                fill="#000"
                stroke="#000"
                strokeWidth="14.763"
                version="1.1"
                viewBox="0 0 476.213 476.213"
                onClick={() =>
                  setSorting(() => (a, b) => b.title.localeCompare(a.title))
                }
              >
                <path
                  id="SVGRepo_iconCarrier"
                  d="m287.5 384.394-34.393 34.393V0h-30v418.787l-34.394-34.393-21.213 21.212 70.607 70.607 70.606-70.607z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                onClick={() => setSorting(() => () => {})}
              >
                <path
                  d="M18 6L6 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
             </div>
            </th>
            <th className="table-cell">
              <select
                name=""
                id="select-category"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
              >
                <option value="">All</option>
                <option value="Cloth">Cloth</option>
                <option value="Education">Education</option>
                <option value="Medicine">Medicine</option>
                <option value="Bill">Bill</option>
              </select>
            </th>
            <th className="table-heading">
              <span>Amount</span>
              <div  className="title">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                id="up-arrow"
                width="17"
                height="14"
                fill="#000"
                className="icon flat-color"
                data-name="Flat Color"
                viewBox="0 0 20 20"
                onClick={() => setSorting(() => (a, b) => a.amount - b.amount)}
              >
                <g id="SVGRepo_iconCarrier">
                  <path
                    id="primary"
                    fill="#000"
                    d="m15.71 5.29-3-3a1 1 0 0 0-1.42 0l-3 3a1 1 0 0 0 1.42 1.42L11 5.41V21a1 1 0 0 0 2 0V5.41l1.29 1.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42"
                  ></path>
                </g>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                id="Layer_1"
                width="17"
                height="14"
                fill="#000"
                stroke="#000"
                strokeWidth="14.763"
                version="1.1"
                viewBox="0 0 476.213 476.213"
                onClick={() => setSorting(() => (a, b) => b.amount - a.amount)}
              >
                <path
                  id="SVGRepo_iconCarrier"
                  d="m287.5 384.394-34.393 34.393V0h-30v418.787l-34.394-34.393-21.213 21.212 70.607 70.607 70.606-70.607z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                onClick={() => setSorting(() => () => {})}
              >
                <path
                  d="M18 6L6 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              </div>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.sort(sorting).map((expense) => (
            <tr
              key={expense.id}
              onContextMenu={(e) => {
                e.preventDefault();
                setContextPosition({ left: e.clientX + 4, top: e.clientY + 4 });
                setRowId(expense.id);
              }}
            >
              <td>{expense.title}</td>
              <td>{expense.category}</td>
              <td>₹ {expense.amount}</td>
              <td >
                <div className="action-icons">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="17"
                  viewBox="-2.69 -2.69 95.1 95.1"
                  onClick={() => {
                    setExpense({
                      title: expense.title,
                      category: expense.category,
                      amount: expense.amount,
                    });
                    setRowId(expense.id)
                    setEditable(true);
                  }}
                >
                  <g id="SVGRepo_iconCarrier">
                    <g
                      id="Group_11"
                      fill="none"
                      stroke="#011fff"
                      strokeMiterlimit="10"
                      strokeWidth="7.178"
                      data-name="Group 11"
                      transform="translate(-1020.3 -668.175)"
                    >
                      <path
                        id="Path_53"
                        d="m1066.1 682.8-34.8 34.8a3.86 3.86 0 0 0-1.1 2.2l-.8 10.1a2.488 2.488 0 0 0 2.8 2.8l9.8-.8a3.86 3.86 0 0 0 2.2-1.1l35-35a3.04 3.04 0 0 0 .3-4.3l-9.1-9.1a3.05 3.05 0 0 0-4.3.4Z"
                        data-name="Path 53"
                      ></path>
                      <path
                        id="Path_54"
                        strokeLinecap="round"
                        d="m1079.6 690.2-7.8-7.8a3.684 3.684 0 0 1 0-5.3l5.8-5.8a3.684 3.684 0 0 1 5.3 0l7.8 7.8a3.684 3.684 0 0 1 0 5.3l-5.8 5.8a3.87 3.87 0 0 1-5.3 0Z"
                        data-name="Path 54"
                      ></path>
                      <path
                        id="Path_55"
                        strokeLinecap="round"
                        d="M1098.6 755.9h-72a4.27 4.27 0 0 1-4.3-4.3v-3.3a4.27 4.27 0 0 1 4.3-4.3h72a4.27 4.27 0 0 1 4.3 4.3v3.3a4.27 4.27 0 0 1-4.3 4.3Z"
                        data-name="Path 55"
                      ></path>
                    </g>
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                  id="Capa_1"
                  width="20"
                  height="17"
                  fill="#fc0000"
                  stroke="#000"
                  strokeWidth="6.144"
                  version="1.1"
                  viewBox="0 0 512 512"
                  onClick={() => {
                    setExpenses(expenses.filter((item) => item.id !== expense.id))
                  }}
                >
                  <g id="SVGRepo_iconCarrier">
                    <path d="M432 96h-48V32c0-17.672-14.328-32-32-32H160c-17.672 0-32 14.328-32 32v64H80c-17.672 0-32 14.328-32 32v32h416v-32c0-17.672-14.328-32-32-32zm-240 0V64h128v32zM80 480.004C80 497.676 94.324 512 111.996 512h288.012C417.676 512 432 497.676 432 480.008V192H80zM320 272c0-8.836 7.164-16 16-16s16 7.164 16 16v160c0 8.836-7.164 16-16 16s-16-7.164-16-16zm-80 0c0-8.836 7.164-16 16-16s16 7.164 16 16v160c0 8.836-7.164 16-16 16s-16-7.164-16-16zm-80 0c0-8.836 7.164-16 16-16s16 7.164 16 16v160c0 8.836-7.164 16-16 16s-16-7.164-16-16z"></path>
                  </g>
                </svg>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td></td>
            <td>₹ {totalAmount}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

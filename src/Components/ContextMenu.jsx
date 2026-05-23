import React from 'react'

export default function ContextMenu({ edit,formExpense,setExpenses,setContextPosition,expenses,rowId,contextPosition}) {
  const [expense, setExpense] = formExpense
  const [editable, setEditable] = edit
  if(!contextPosition.left) return
  return (
    <div className='context-menu' style={contextPosition}>
      <div onClick={() => {
        const rowEdit = expenses.find((expense) => expense.id === rowId)
        setExpense({
      title: rowEdit.title,
      category: rowEdit.category,
      amount: rowEdit.amount,
    })
    setEditable(true)
    setContextPosition({})
      }}>Edit</div>
      <div onClick={() => {
        setExpenses(expenses.filter((expense) => expense.id !== rowId))
        setContextPosition({})
      }}>Delete</div>
    </div>
  )
}

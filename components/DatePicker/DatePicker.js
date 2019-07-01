import styles from './DatePicker.scss'
import React, { useEffect } from 'react'
import cx from 'classnames'

const DatePicker = ({ className, fieldClassName, label, value, onChange }) => {

  let dateValue;
  if (!value) {
    dateValue = [0, 0, 0]
  } else {
    dateValue = [
      value.getFullYear(),
      value.getMonth() + 1,
      value.getDate(),
    ]
  }

  const monthOptions = [{ label: 'Month', value: 0 }, ...months]
  const dateOptions = [{ label: 'Date', value: 0 }, ...dates]
  const yearOptions = [{ label: 'Year', value: 0 }, ...years]

  function handleChange(type, value) {
    let d;
    if (type === 'month') {
      if(dateValue[0] == 0) dateValue[0] = 2019;
      if(dateValue[2] == 0) dateValue[2] = 1
      d = new Date(dateValue[0], value - 1, dateValue[2])
    } else if (type === 'date') {
      if(dateValue[0] == 0) dateValue[0] = 2019;
      if(dateValue[1] == 0) dateValue[1] = 1
      d = new Date(dateValue[0], dateValue[1] - 1, value)
    } else if (type === 'year') {
      if(dateValue[1] == 0) dateValue[1] = 1
      if(dateValue[2] == 0) dateValue[2] = 1
      d = new Date(value, dateValue[1] - 1, dateValue[2])
    }
    if (value == 0) {
      d = null
    }
    onChange({ target: { value: d } })
  }

  return (
    <div className={cx(className, fieldClassName, styles.root)}>
      <label className={styles.label}>{label}</label>
      <div className={styles.container}>
        <select className={cx(fieldClassName, styles.field)} value={dateValue[1]}
          onChange={(e) => handleChange('month', e.target.value)}>
          {monthOptions.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>
        <select className={cx(fieldClassName, styles.field)} value={dateValue[2]}
          onChange={(e) => handleChange('date', e.target.value)}>
          {dateOptions.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>
        <select className={cx(fieldClassName, styles.field)} value={dateValue[0]}
          onChange={(e) => handleChange('year', e.target.value)}>
          {yearOptions.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>
      </div>
    </div>
  );
}

const months = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
]

const dates = [...(new Array(31))].map((x, index) => ({ label: index + 1, value: index + 1 }))

const years = [...(new Array(201))].map((x, index) => ({ label: index + 1899, value: index + 1899 }))

export default DatePicker;
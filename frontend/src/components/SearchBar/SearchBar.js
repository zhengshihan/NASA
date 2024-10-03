import React, { useState } from "react";
import { TextField, Button } from "@mui/material"; // 引入 Material-UI 组件
import styles from "./SearchBar.module.css"; // 引入 CSS 模块

const SearchBar = ({ onSearch }) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const maxDate = yesterday.toISOString().split("T")[0];
  const [inputDate, setInputDate] = useState(maxDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputDate) {
      onSearch(inputDate);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <TextField
        type="date"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
        className={styles.inputField}
        InputProps={{
          inputProps: { max: maxDate },
          style: { color: "#ffffff" },
          // 修改输入文本颜色// 设置最大日期
        }}
        label="Select Date"
        variant="outlined"
        size="medium"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={styles.searchButton}
        size="large" // 设置按钮大小与输入框匹配
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;

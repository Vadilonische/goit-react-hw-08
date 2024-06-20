import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { useState } from "react";
import { changeFilter } from "../../redux/filtersSlice";
import { selectFilter } from "../../redux/selectors";

export default function SearchBox() {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    dispatch(changeFilter(evt.target.value));
  };

  return (
    <div className={css.searchBox}>
      <p className={css.searchLable}>Find contacts by name</p>
      <input
        className={css.searchInput}
        type="text"
        value={filter.name}
        onChange={handleChange}
      />
    </div>
  );
}

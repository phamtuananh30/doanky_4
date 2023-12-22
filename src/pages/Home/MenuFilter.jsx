import useSwr from "swr";
import { apiClient } from "../../services/API";
import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import Styles from "./HomePage.module.scss";

export default function MenuFilter({ filter, setFilter }) {
  const dataFilter = [
    {
      title: " hãng sản xuất ",
      items: [
        { content: "Apple" },
        { content: "ASUS" },
        { content: "dell" },
        { content: "INTEL" },
      ],
    },
    {
      title: " Dung lượng RAM ",
      items: [
        { content: "8G" },
        { content: "16G" },
        { content: "24G" },
        { content: "32G" },
        { content: "64G" },
      ],
    },
    {
      title: " vga trang bị ",
      items: [
        { content: "amd rx" },
        { content: "nvdia gt" },
        { content: "nvdia gtx" },
        { content: "nvdia rtx" },
      ],
    },
  ];

  const Filter = "";
  function handleOnChange(e) {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  }
  function handleOnChangeRam(e) {
    if (e.target.checked) {
      setFilter({ ...filter, ram: e.target.value });
    } else {
      setFilter({ ...filter, ram: "" });
    }
  }
  if (dataFilter) {
    return (
      <div className={clsx(Styles.menu_filter)}>
        {dataFilter.map((category, index) => {
          if (category.title === " Dung lượng RAM ") {
            return (
              <div key={index} className={clsx(Styles.group_filter)}>
                <div className={clsx(Styles.title_filter)}>
                  {category.title}
                </div>
                <div className={clsx(Styles.item_filter)}>
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className={clsx(Styles.filter)}>
                      <input
                        type="checkbox"
                        value={item.content}
                        onChange={handleOnChangeRam}
                        readOnly
                      />
                      <label>{item.content}</label>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <div key={index} className={clsx(Styles.group_filter)}>
              <div className={clsx(Styles.title_filter)}>{category.title}</div>
              <div className={clsx(Styles.item_filter)}>
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className={clsx(Styles.filter)}>
                    <input type="checkbox" value={item.content} readOnly />
                    <label>{item.content}</label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <div className={clsx(Styles.group_filter)}>
          <div className={clsx(Styles.title_filter)}>Khoảng giá</div>
          <div className={clsx(Styles.item_filter)}>
            <input
              placeholder="Khoảng đầu"
              type="number"
              name="first"
              onChange={handleOnChange}
            />
            <input
              placeholder="Khoảng cuối"
              type="number"
              name="last"
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

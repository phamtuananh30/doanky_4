import clsx from "clsx";
import Styles from "../home/HomePage.module.scss";
import list from "../../assets/icon_svg/list-ul.svg";
import MenuCategory from "../home/MenuCategory.jsx";
import MenuFilter from "../home/MenuFilter.jsx";
import sliders from "../../assets/icon_svg/sliders.svg";
import grid_3 from "../../assets/icon_svg/grid-3x3-gap.svg";
import grid from "../../assets/icon_svg/grid.svg";
import React, { useEffect, useState } from "react";
import useSwr from "swr";
import cart from "../../assets/icon_svg/cart.svg";
import lap002 from "@/assets/home/product/lap002.jpg";
import { apiClient } from "../../services/API.js";
function Category() {
  const [viewType, setViewType] = useState(false);
  const [filter, setFilter] = useState({
    first: 0,
    last: 100000000000000,
  });
  const { data, isLoading, error } = useSwr(
    `/product/getAllByCost?max=${filter.last}&min=${filter.first}`,
    (endpoint) => apiClient.get(endpoint).then((data) => data)
  );
  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <div
        className={clsx(Styles.flex, Styles.center, Styles.tile_list_product)}
      >
        <div className={clsx(Styles.product_portfolio)}>
          <div className={clsx(Styles.flex, Styles.center)}>
            <img src={list} alt="" className={clsx(Styles.icon_white)} />
            Danh mục sản phẩm
          </div>
          <div className={clsx(Styles.menu_Category)}>
            <MenuCategory></MenuCategory>
          </div>
        </div>
      </div>
      <div className={clsx(Styles.flex, Styles.main_list_product)}>
        <div className={clsx(Styles.block_filter)}>
          <MenuFilter filter={filter} setFilter={setFilter}></MenuFilter>
        </div>
        <div className={clsx(Styles.block_list_product)}>
          <div
            className={clsx(
              Styles.list_product
              // viewType && Styles.view_type
            )}
          >
            <div className={clsx(Styles.arrange, Styles.flex)}>
              <div
                className={clsx(Styles.flex, Styles.tile_arrange)}
                style={{
                  cursor: "pointer",
                  textTransform: "uppercase",
                  fontSize: "14px",
                }}
              >
                <img src={sliders} alt="" className={clsx(Styles.icon_white)} />
                SẮP XẾP SẢN PHẨM
              </div>
              <div>
                <ul
                  style={{
                    cursor: "pointer",
                    textTransform: "uppercase",
                    fontSize: "14px",
                  }}
                >
                  <li>mới nhất</li>
                  <li>xem nhiều</li>
                  <li>Giảm nhiều</li>
                  <li>còn hàng</li>
                </ul>
                <ul>
                  <li>
                    <select
                      name="price"
                      id="price"
                      style={{
                        cursor: "pointer",
                        textTransform: "uppercase",
                        fontSize: "14px",
                      }}
                    >
                      <option value="">Giá tăng dần</option>
                      <option value="">Giá giảm dần</option>
                    </select>
                  </li>
                  <li
                    // onClick={handleViewTypeClick(false)}
                    className={clsx(!viewType && Styles.viewType)}
                  >
                    <img
                      className={clsx(Styles.icon_white)}
                      src={grid_3}
                      alt=""
                    />
                  </li>
                  <li
                    // onClick={handleViewTypeClick(true)}
                    className={clsx(viewType && Styles.viewType)}
                  >
                    <img
                      className={clsx(Styles.icon_white)}
                      src={grid}
                      alt=""
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className={clsx(Styles.group_product, Styles.flex)}>
              {data?.data?.map((product, index) => (
                <div key={index} className={clsx(Styles.product)}>
                  <div className={clsx(Styles.hover_detail)}>
                    <img src={lap002} alt="" />
                    <div className={clsx(Styles.detail_product)}>
                      <div className={clsx(Styles.name_product)}>
                        {product.title}
                      </div>
                      <ul>
                        <li className={clsx(Styles.price_product)}>
                          price :{product.promotional}
                          {/* {formattedPrice.format(
                          product.price - (product.price * product.discount) / 100
                      )} */}
                        </li>
                        <li>
                          cost : <del>{product.cost}</del>
                        </li>
                        {/* <li>guarantee : {product.guarantee}</li> */}
                        <li>
                          status :
                          {product.status ? (
                            <span style={{ color: "green" }}>In Stock</span>
                          ) : (
                            <span style={{ color: "red" }}>Out of Stock</span>
                          )}
                        </li>
                      </ul>
                      {/* <div>
                    <div className={clsx(Styles.title_product)}>
                      product parameters
                    </div>
                    <ul className={clsx(Styles.parameter_product)}>
                      {product.productParameters.map((Parameter, index) => (
                          <li key={index}>+ {Parameter.parameters}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className={clsx(Styles.title_product)}>Promotions</div>
                    <div className={clsx(Styles.title_promotion_product)}>
                      {product.Promotion}
                    </div>
                    <ul className={clsx(Styles.promotions_product)}>
                      {product.Promotions.map((Promotions, index) => (
                          <li key={index}>
                            + {Promotions.Promotion}
                            <div className={clsx(Styles.promotion_package_product)}>
                              {Promotions.promotionPackage.map(
                                  (Promotions, index) => (
                                      <div key={index}>{Promotions.promotion}</div>
                                  )
                              )}
                            </div>
                          </li>
                      ))}
                    </ul>
                  </div> */}
                    </div>
                  </div>
                  <div className={clsx(Styles.flex, Styles.information)}>
                    <div
                      className={clsx(Styles.flex, Styles.other_information)}
                    >
                      <span>Evaluate: ?/5 </span>
                      <span className={clsx(Styles.flex)}>
                        Code:<p>{product.productCode}</p>
                      </span>
                    </div>
                    <span className={clsx(Styles.name_product)}>
                      {product.title}
                    </span>
                    <span className={clsx(Styles.price_product)}>
                      {product.promotional}
                      {/* {formattedPrice.format(
                  product.price - (product.price * product.discount) / 100
              )} */}
                    </span>
                    <del>{product.cost}</del>
                    <div>
                      {product.status ? (
                        <span style={{ color: "green" }}>In Stock</span>
                      ) : (
                        <span style={{ color: "red" }}>Out of Stock</span>
                      )}
                    </div>
                  </div>
                  {/* <div className={clsx(Styles.discount_product)}>
                {product.discount}%
              </div> */}
                  <div className={clsx(Styles.cart)}>
                    <img
                      onClick={() => onAddtoCartHandler(products)}
                      src={cart}
                      alt=""
                      className={clsx(Styles.icon_white)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;

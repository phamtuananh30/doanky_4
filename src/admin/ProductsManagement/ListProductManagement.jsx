import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import Styles from "./List.module.scss";
import useSwr from "swr";
import { apiClient } from "../../services/API";

const ListProductManagement = () => {
  const { data, isLoading, error, mutate } = useSwr(
    "/product/getAll",
    (endpoint) => apiClient.get(endpoint).then((data) => data)
  );

  const handleDelete = async (productId) => {
    try {
      await apiClient.patch(`/product/updateDisable/${productId}`);
      mutate("/product/getAll");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (data) {
    return (
      <div className={clsx(Styles.list_product, Styles.flex)}>
        <table>
          <thead>
            <tr
              style={{
                cursor: "pointer",
                textTransform: "uppercase",
                fontSize: "14px",
              }}
            >
              <th>Stt</th>
              <th>Title</th>
              <th>Warranty Period</th>
              <th>Cost</th>
              <th>Promotional</th>
              <th>Video</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((product, index) => (
              <tr
                key={index}
                style={{
                  cursor: "pointer",
                  textTransform: "uppercase",
                  fontSize: "14px",
                }}
              >
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.warrantyPeriod}</td>
                <td>{product.cost}</td>
                <td>{product.promotional}</td>
                <td>{product.video}</td>
                <td>
                  <NavLink to={"/admin/edit-products/" + product.id}>
                    edit
                  </NavLink>
                </td>
                <td onClick={() => handleDelete(product.id)}>delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // return <div className="container mt-5">Loading...</div>;
};

export default ListProductManagement;

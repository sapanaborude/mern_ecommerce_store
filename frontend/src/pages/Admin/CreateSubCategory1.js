import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import SubCategoryForm from "../../components/Form/SubCategoryForm";
import { Modal } from "antd";
import { Select } from "antd";  //antd contains a set of high quality components and demos for building rich, interactive user interfaces.

const { Option } = Select;

const CreateSubCategory1 = () => {
  const [subcategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcatName, setSubCatName] = useState("");
  const [subcatVisible, setSubCatVisible] = useState(false);
  const [subcatSelected, setSubCatSelected] = useState(null);
  const [subcatUpdatedName, setSubCatUpdatedName] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://mern-ecommerce-backend-c87p.onrender.com/api/v1category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //get all cat
  const getAllSubCategory = async () => {
    try {
      const { data } = await axios.get("https://mern-ecommerce-backend-c87p.onrender.com/api/v1subcategory/get-subcategory");
      if (data?.success) {
        setSubCategories(data?.subcategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting subcatgeory");
    }
  };

  useEffect(() => {
    getAllSubCategory();
  }, []);

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
      const subcatData = new FormData();
      subcatData.append("subcatName", subcatName);
      subcatData.append("category", category);
      const { data } = axios.post(
        "https://mern-ecommerce-backend-c87p.onrender.com/api/v1subcategory/create-subcategory",
        subcatData
      );
      if (data?.success) {
        toast.success(`${subcatName} is created`);
        getAllSubCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("somthing went wrong in input form");
    }
  };

  //update subcategory
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const subcatData = new FormData();
      subcatData.append("subcatName", subcatName);
      subcatData.append("category", category);
      const { data } = axios.put(
        `https://mern-ecommerce-backend-c87p.onrender.com/api/v1subcategory/update-subcategory/${id}`,
        subcatData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Subcategory Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `https://mern-ecommerce-backend-c87p.onrender.com/api/v1subcategory/delete-subcategory/${pId}`
      );
      if (data.success) {
        toast.success(`subcategory is deleted`);

        getAllSubCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Sub Category"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Sub Category</h1>
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.catName}
                </Option>
              ))}
            </Select>
            <div className="p-3 w-50">
              <SubCategoryForm
                handleSubmit={handleSubmit}
                value={subcatName}
                setValue={setSubCatName}
              />
            </div>

            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Category Name</th>
                    <th scope="col">Sub Category Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subcategories?.map((c) => (
                    <>
                      <tr>
                        <td key={c.category._id} >{c.category.catName}</td>
                        <td key={c._id}>{c.subcatName}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setSubCatVisible(true);
                              setSubCatUpdatedName(c.subcatName);
                              setSubCatSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setSubCatVisible(false)}
              footer={null}
              open={subcatVisible}
            >
              <SubCategoryForm
                value={subcatUpdatedName}
                setValue={setSubCatUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateSubCategory1;

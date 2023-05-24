import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Shared/utlts/api";
import Input from "../../Shared/components/input";
import TableComponent from "../../Shared/components/Table";
import ActionButton from "../../Shared/components/ActionButtons";
import Modal from "../../Shared/components/Modal";
import { useFormik } from "formik";
import * as yup from "yup";

import loadingGif from "../../App/resources/images/ZZ5H.gif";

//child initial value
let initialValues = {
  id: "",
  firstname: "",
  lastname: "",
  class: "",
};

//parent initial value
let initialParentValue = {
  id: "",
  firstname: "",
  lastname: "",
  clientId: "",
  package: "",
};

//child model
const itemSchema = yup.object({
  firstname: yup.string().required("This field is required"),
  lastname: yup.string(),
  class: yup.string(),
});

//parent model
const parentItemSchema = yup.object({
  firstname: yup.string().required("This field is required"),
  clientId: yup.string(),
  lastname: yup.string(),
  package: yup.string(),
});

export default function EditPage() {
  const param = useParams();

  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openParentEditModal, setOpenParentEditModal] = useState(false);
  const [parentData, setParentData] = useState();
  const [childData, setChildData] = useState();
  const [query, setQuery] = useState({
    role: "Student",
    parentId: param.id,
  });

  function makeReload() {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    setReload(randomNumber);
  }

  async function dataBind() {
    setLoading(true);
    await api.get(`/parents/getOne/${param.id}`).then((res) => {
      setParentData(res);
    });
    await api.get(`/students/all`, { ...query }).then((res) => {
      setChildData(res.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    dataBind();
  }, [reload]);

  //child formik
  const childFormik = useFormik({
    initialValues: initialValues,
    validationSchema: itemSchema,
    onSubmit: (values) => {
      const data = {
        id: values.id,
        firstname: values.firstname,
        lastname: values.lastname,
        categories: {
          update: {
            title: values.class,
          },
        },
      };

      update(data);
    },
  });

  //parent formik
  const parentFormik = useFormik({
    initialValues: initialParentValue,
    validationSchema: parentItemSchema,
    onSubmit: (values) => {
      const data = {
        id: values.id,
        firstname: values.firstname,
        verificationcode: values.clientId,
        lastname: values.lastname,
        // packages: {
        //   update: {
        //     type: values.package,
        //   },
        // },
      };

      update(data);
    },
  });

  const childTableColoumn = [
    {
      title: "",
      formating: (item, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: "Name",
      key: "firstname",
      sort: false,
    },
    {
      title: "Class",
      formating: (item, index, dataItem) => {
        console.log(dataItem);
        return (
          <div>{dataItem.categories ? dataItem.categories.title : ""}</div>
        );
      },
    },

    {
      title: "Videos",
      formating: (item, index, dataItem) => {
        return <div>{""}</div>;
      },
    },
    {
      title: "Assessments",
      formating: (item, index, dataItem) => {
        return <div>{""}</div>;
      },
    },
    {
      title: "Action",
      key: "email",
      sort: false,
      formating: (item, index, dataItem) => {
        return (
          <ActionButton
            openmodal={() => {
              modalHandle(dataItem);
            }}
            deleteMethod={() => {
              deleteItem(index);
            }}
          />
        );
      },
    },
  ];

  function modalHandle(item) {
    console.log(item);
    if (item) {
      childFormik.values.id = item.id;
      childFormik.values.firstname = item.firstname;
      childFormik.values.lastname = item.lastname;
      childFormik.values.class = item.categories ? item.categories.title : "";
    }

    setOpenEditModal(!openEditModal);
  }

  function parentModalHandle() {
    if (parentData) {
      parentFormik.values.id = parentData.id;
      parentFormik.values.firstname = parentData.firstname;
      parentFormik.values.lastname = parentData.lastname;
      parentFormik.values.clientId = parentData.verificationcode;
      parentFormik.values.package = parentData.packages
        ? parentData.packages.type
        : null;
    }

    setOpenParentEditModal(!openEditModal);
  }

  function update(values) {
    makeReload();
    api
      .put("/parents", values)
      .then((res) => {
        prompt("Update Successfull");
        makeReload();
      })
      .catch((error) => prompt(error));
  }

  function deleteItem(index) {
    //delete
  }

  if (!loading) {
    return (
      <div className="dpflex-db">
        <div>
          <div>
            <div>{`Firstname : ${parentData.firstname}`}</div>
            <div>{`Lastname : ${parentData.lastname}`}</div>
            <div>{`client id: ${parentData.verificationcode}`}</div>
            {/* <div>{`Package: ${
              parentData.packages ? parentData.packages.type : ""
            }`}</div> */}
            <button onClick={parentModalHandle}>Edit Parent</button>
          </div>
        </div>
        <div style={{ width: "80%" }}>
          <TableComponent
            loading={loading}
            data={childData.data}
            button={setQuery}
            column={childTableColoumn}
            name={"pagination"}
          />
        </div>

        {/* child Model */}
        {openEditModal && (
          <Modal>
            <Input
              name={"firstname"}
              value={childFormik.values.firstname}
              warningText={childFormik.errors.firstname}
              onChange={childFormik.handleChange}
            />
            <Input
              name={"lastname"}
              value={childFormik.values.lastname}
              warningText={childFormik.errors.lastname}
              onChange={childFormik.handleChange}
            />
            <Input
              name={"class"}
              value={childFormik.values.class}
              warningText={childFormik.errors.class}
              onChange={childFormik.handleChange}
            />
            <div>
              <button onClick={() => setOpenEditModal(false)}>close</button>
              <button onClick={childFormik.handleSubmit}>Edit</button>
            </div>
          </Modal>
        )}

        {/* parent Model */}
        {openParentEditModal && (
          <Modal>
            <Input
              name={"firstname"}
              value={parentFormik.values.firstname}
              warningText={parentFormik.errors.firstname}
              onChange={parentFormik.handleChange}
            />
            <Input
              name={"lastname"}
              value={parentFormik.values.lastname}
              warningText={parentFormik.errors.lastname}
              onChange={parentFormik.handleChange}
            />
            <Input
              name={"clientId"}
              value={parentFormik.values.clientId}
              warningText={parentFormik.errors.clientId}
              onChange={parentFormik.handleChange}
            />
            <Input
              name={"package"}
              value={parentFormik.values.package}
              warningText={parentFormik.errors.package}
              onChange={parentFormik.handleChange}
            />
            <div>
              <button onClick={() => setOpenParentEditModal(false)}>
                close
              </button>
              <button onClick={parentFormik.handleSubmit}>Edit</button>
            </div>
          </Modal>
        )}
      </div>
    );
  } else {
    return (
      <div className="loading-div">
        <img className="loading-img" src={loadingGif} alt="loading" />
      </div>
    );
  }
}

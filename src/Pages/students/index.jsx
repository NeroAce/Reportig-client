import React, { useEffect } from "react";
import TableComponent from "../../Shared/components/Table";
import { useState } from "react";
import ActionButton from "../../Shared/components/ActionButtons";
import Modal from "../../Shared/components/Modal";
import FilterArea from "../../Shared/components/FilterArea";
import "./styles.css";
import api from "../../Shared/utlts/api";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const navigate = useNavigate();

  const [orgainisation, setOrganisation] = useState([]);
  const [packages, setPackages] = useState([]);

  const [loading, setloading] = useState(true);
  const [reload, setReload] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [editData, setEditData] = useState([]);

  const [query, setQuery] = useState({
    startDate: "",
    endDate: new Date(),
    role: "Student",
    page: 1,
    pagesize: 10,
    name: "joindate",
    type: "asc",
    downloadxl: "N",
  });

  const coloumn = [
    {
      title: "",
      formating: (item, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: "Name",
      key: "firstname",
      sort: true,
    },
    {
      title: "Email",
      key: "emailid",
      sort: true,
    },
    {
      title: "Mobile",
      key: "mobile",
      sort: true,
    },
    {
      title: "Class",
      key: "categoryfield",
      sort: false,
      formating: (item, index, dataItem) => {
        const data =
          dataItem.categories != null ? dataItem.categories.title : "";
        return <div>{data}</div>;
      },
    },

    {
      title: "Joining Date",
      key: "joindate",
      sort: true,
      formating: (item, index, dataItem) => {
        if (item) {
          const date = new Date(item);

          const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const monthsOfYear = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          const dayOfWeek = daysOfWeek[date.getDay()];
          const month = monthsOfYear[date.getMonth()];
          const year = date.getFullYear();
          const day = date.getDate();

          const formattedDate = `${dayOfWeek}, ${month} ${day} ${year}`;

          return <div>{formattedDate}</div>;
        } else {
          return <div></div>;
        }
      },
    },
    {
      title: "Client Code",
      key: "verificationcode",
      sort: true,
    },

    { title: "Refer By", key: "referby", sort: true },
    // {
    //   title: "Package",
    //   sort: false,
    //   formating: (item, index, dataItem) => {
    //     const data = dataItem.packages != null ? dataItem.packages.type : "";
    //     return <div>{data}</div>;
    //   },
    // },
    // {
    //   title: "City",
    //   sort: false,
    //   formating: (item, index, dataItem) => {
    //     const data = dataItem.city != null ? dataItem.city : "";
    //     return <div>{data}</div>;
    //   },
    // },
    {
      title: "Valid Up To",
      key: "validupto",
      sort: false,
      formating: (item, index, dataItem) => {
        const date = new Date(item).toDateString();
        return <div>{date}</div>;
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
              if (dataItem.parentid) {
                edit(dataItem.parentid);
              }
            }}
            deleteMethod={() => {
              deleteItem(index);
            }}
          />
        );
      },
    },
  ];

  function makeReload() {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    setReload(randomNumber);
  }

  function searchBtn(value) {
    setQuery({ ...query, search: value });
    makeReload();
  }

  function edit(id) {
    setloading(true);
    navigate(`/edit/${id}`);
  }

  const dropDownbind = () => {
    setloading(true);
    api
      .get(
        "/students/all",
        { ...query },
        query.downloadxl === "Y" ? "blob" : null
      )
      .then((response) => {
        if (query.downloadxl === "Y") {
          const blob = new Blob([response], { type: "text/xlsx" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${Date.now()}.xlsx`);
          document.body.appendChild(link);
          link.click();
          setQuery((prevQuery) => ({
            ...prevQuery,
            downloadxl: "N",
          }));
          makeReload();
        } else {
          setData(response.data);
          setloading(false);
        }
      });

    api.get("/students/orgainisation").then((res) => {
      setOrganisation(res);
    });

    // api.get("/students/pacakes").then((res) => {
    //   setPackages(res);
    // });
  };

  useEffect(() => {
    dropDownbind();
  }, [reload, query.pagesize, query.page, query.name, query.type]);

  function pageSizeHandle(e) {
    setQuery((prevQuery) => ({
      ...prevQuery,
      pagesize: e,
    }));
  }

  function exportbtn() {
    console.log("hit");
    setQuery((prevQuery) => ({
      ...prevQuery,
      downloadxl: "Y",
    }));
    makeReload();
  }

  function pagerhandle(e) {
    setQuery((prevQuery) => ({
      ...prevQuery,
      page: e,
    }));
  }

  function modalhandle(index) {
    edit(index);
  }

  async function deleteItem(index) {
    const id = data.data[index]["id"];
    setloading(true);
    await api.get(`/students/delete/${id}`, {});
    setReload("deleted");
  }

  return (
    <div>
      <div className="dpflex">
        <h1>Students</h1>
        <button className="ml-20" onClick={() => navigate("/lead")}>
          Parents
        </button>
        <button
          className="ml-20"
          onClick={() => {
            {
              localStorage.clear("token");
              navigate("/");
            }
          }}
        >
          Logout
        </button>
      </div>
      <FilterArea
        to={query.endDate}
        from={query.startDate}
        organisation={orgainisation}
        promo={["Anugrah Madison", "UFO", "88Guru"]}
        status={packages}
        dnd={["SUBSCRIBED", "NOT SUBSCRIBED"]}
        setFilter={setQuery}
        exportbtn={exportbtn}
        searchBtn={searchBtn}
      />

      <TableComponent
        loading={loading}
        data={data.data}
        button={setQuery}
        column={coloumn}
        pagination={true}
        name={"pagination"}
        value={query.pagesize}
        onChange={pageSizeHandle}
        page={query.page}
        totalPages={data.totalPages}
        setPage={pagerhandle}
      />

      {openModal && (
        <Modal setState={setOpenModal}>
          <div>
            <div className="modal-div">
              <label className="mrg-r-20">
                Email:{" "}
                <input
                  type="email"
                  name="email"
                  value={"email" in editData ? editData.email : ""}
                />
              </label>
              <label>
                Name:{" "}
                <input
                  type="email"
                  name="name"
                  value={"name" in editData ? editData.name : ""}
                />
              </label>
            </div>
          </div>
          <button>save</button>
          <button onClick={() => setOpenModal(false)}>close</button>
        </Modal>
      )}
    </div>
  );
}

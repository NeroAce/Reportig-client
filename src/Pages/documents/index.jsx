import React, { useEffect, useState } from "react";
import api from "../../Shared/utlts/api";
import TableComponent from "../../Shared/components/Table";
import Modal from "../../Shared/components/Modal";
import axios from "axios";

export default function Documents() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [openDetail, setOpenDetail] = useState(false);
  const [openCreateFolder, setOpenCreateFolder] = useState(false);
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [userIndex, setUserIndex] = useState(false);
  const [warningText, setWaningText] = useState("");

  const [data, setData] = useState({});
  const [reload, setReload] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({
    title: "",
    path: "uploads",
    pagesize: 10,
    page: 1,
  });

  const column = [
    {
      title: "#",
      formating: (item, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: "id",
      key: "id",
    },
    {
      title: "Name",
      key: "title",
      formating: (item, index) => {
        return (
          <div
            onClick={() => {
              setQuery((prevQuery) => ({
                ...prevQuery,
                path: `${query.path}/${item}`,
              }));
            }}
          >
            {item}
          </div>
        );
      },
    },
    {
      title: "Type",
      key: "type",
    },
    {
      title: "Action",
      key: "email",
      sort: false,
      formating: (item, index) => {
        return (
          <div className="dpflex">
            <button onClick={() => openDetails(index)}>Details</button>
            <button>Delete</button>
          </div>
        );
      },
    },
  ];

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  function makeReload() {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    setReload(randomNumber);
  }

  function openDetails(index) {
    setUserIndex(index);
    const waitForUpdate = () => {
      if (userIndex === index) {
        setOpenDetail(true);
      }
    };
    setTimeout(waitForUpdate, 0);
  }

  function createfolder() {
    if (query.title !== "") {
      const data = { title: query.title, path: query.path };
      setWaningText("");
      api.post("/documents/createfolder", { ...data }).then((res) => {
        alert("success");
        makeReload();
      });
    } else {
      setWaningText("No Fields cant't be empty");
    }
  }

  function uploadFile() {
    if (query.title !== "") {
      const formData = new FormData();
      formData.append("document", selectedFile);
      formData.append("path", query.path);

      console.log(selectedFile);

      setWaningText("");
      axios
        .post("http://localhost:3001/documents/upload", formData)
        .then((response) => {
          console.log("File uploaded successfully");
          // Handle response or update state as needed
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle error or update state as needed
        });
    } else {
      setWaningText("Field cant't be empty");
    }
  }

  function apiBind() {
    api.get("/documents", { ...query }).then((res) => {
      setData(res.data);
      setLoading(false);
    });
    console.log(query);
  }

  function removeLastWordFromPath(path) {
    return path.replace(/\/[^/]+$/, "");
  }

  useEffect(() => {
    apiBind();
  }, [reload, query.path]);

  if (!loading) {
    console.log(data);
    return (
      <div>
        <button
          onClick={() => {
            setOpenCreateFolder(true);
          }}
        >
          Create Folder
        </button>
        <button
          onClick={() => {
            setOpenUploadFile(true);
          }}
        >
          upload file
        </button>
        <h1>{query.path}</h1>
        {query.path !== "uploads" && (
          <button
            onClick={() => {
              setQuery((prevQuery) => ({
                ...prevQuery,
                path: removeLastWordFromPath(query.path),
              }));
            }}
          >
            Go Back
          </button>
        )}
        <TableComponent
          loading={loading}
          data={data}
          button={setQuery}
          column={column}
        />

        {openDetail && data && data.length > userIndex && (
          <Modal>
            <div>
              <p>Title:{data[userIndex].title}</p>
              <p>Type:{data[userIndex].type}</p>
              <button onClick={() => setOpenDetail(false)}>Close</button>
            </div>
          </Modal>
        )}
        {openCreateFolder && (
          <Modal>
            <h1>Create Folder</h1>
            <div>
              <div>Foldername</div>
              <input
                value={query.title}
                onChange={(e) => {
                  setQuery((prevQuery) => ({
                    ...prevQuery,
                    title: e.target.value,
                  }));
                }}
                type="text"
              />
              <div>{warningText}</div>

              <button onClick={createfolder}>Submit</button>
              <button onClick={() => setOpenCreateFolder(false)}>Close</button>
            </div>
          </Modal>
        )}
        {openUploadFile && (
          <Modal>
            <div>{warningText}</div>
            <h1>Upload File</h1>

            <div>
              <div>
                <div>Filename</div>
                <input
                  value={query.title}
                  onChange={(e) => {
                    setQuery((prevQuery) => ({
                      ...prevQuery,
                      title: e.target.value,
                    }));
                  }}
                  type="text"
                />
                <input type="file" name="document" onChange={changeHandler} />
              </div>
              <button onClick={uploadFile}>Upload</button>
              <button onClick={() => setOpenUploadFile(false)}>Close</button>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

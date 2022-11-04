import { useEffect, useRef, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";
import axios from "axios";

interface IFile {
  id: number;
  originalName: string;
  fileName: string;
  size: number;
  type: string;
  lastModified: number;
}

function App() {
  const [data, setData] = useState<IFile[]>([]);
  const hiddenFileInput = useRef<any>(null);

  let BASE_URL = "http://localhost:5000/file/";

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    hiddenFileInput.current.click();
  };

  const getData = async () => {
    await axios
      .get("http://localhost:5000/api/")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);

    // check is size is greater than 10MB
    if (file.size > 10000000) {
      toast.error("File size is greater than 10MB");
      return;
    }

    await axios
      .post("http://localhost:5000/api/", formData)
      .then((res) => {
        toast.success("File uploaded successfully");
        getData();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleDelete = async (id: number) => {
    window.confirm("Are you sure you want to delete this file?") &&
      (await axios
        .delete("http://localhost:5000/api/" + id)
        .then((res) => {
          toast.success("Deleted Successfully");
          getData();
        })
        .catch((err) => {
          console.log(err);
        }));
  };

  const handleView = (url: string) => {
    window.open(BASE_URL + url, "_blank");
  };

  const columns: ColumnsType<IFile> = [
    {
      title: "Original Name",
      dataIndex: "originalName",
      key: "name",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size: number) => `${size / 1000} KB`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        if (
          type.split("/")[1] ===
          "vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          return "Docx";
        } else if (
          type.split("/")[1] ===
          "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          return "Excel";
        } else if (
          type.split("/")[1] ===
          "vnd.openxmlformats-officedocument.presentationml.presentation"
        ) {
          return "PowerPoint";
        } else if (type.split("/")[1] === "pdf") {
          return "PDF";
        } else if (type.split("/")[1] === "msword") {
          return "Doc";
        } else if (type.split("/")[1] === "vnd.ms-excel") {
          return "Excel";
        } else if (type.split("/")[1] === "vnd.ms-powerpoint") {
          return "PowerPoint";
        } else return type.split("/")[1];
      },
    },
    {
      title: "Uploaded Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => {
        return new Date(createdAt).toLocaleDateString("en-US");
      },
    },
    {
      title: "Action",
      key: "action",
      render: (data: IFile) => {
        return (
          <div className="flex flex-row space-x-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-500 hover:text-red-700  hover:rounded cursor-pointer"
              onClick={() => handleDelete(data.id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            {data.type.split("/")[1] === "pdf" ? (
              <button
                onClick={() => handleView(data.fileName)}
                className="text-blue-500 hover:text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="container flex flex-col  mx-auto px-6 py-3">
      <h1 className="text-4xl font-bold py-5 text-sky-700">File List</h1>

      <div className="flex flex-row justify-end mr-5">
        <div className="flex flex-row">
          <input
            type="file"
            ref={hiddenFileInput}
            className="hidden"
            onChange={handleUpload}
            accept="application/*"
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}
          >
            Upload
          </button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        className="px-4 py-3"
        pagination={{ pageSize: 10 }}
      />
      <ToastContainer />
    </div>
  );
}

export default App;

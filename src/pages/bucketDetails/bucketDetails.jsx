import React, { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  listFilesInBucket,
  downloadMediaLink,
  uploadFile
} from "../../services/googleStorageApi";
import { Table, Spinner } from "react-bootstrap";

function Bucket(props) {
  const bucket = props.match.params.bucket;

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState({});
  const [orderByNameDirection, setOrderByNameDirection] = useState("des");

  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    const res = await listFilesInBucket(bucket);
    if (res.status === 200 && res.data.items) {
      setFiles(res.data.items);
    }
  }

  const hanleSelectFile = async (file) => {
    console.log(file);
    setSelectedFile(file);
    const df = await downloadMediaLink(bucket, file.name);
    downloadFile(df.data, file.contentType, file.name);
    console.log(df);
  };

  const downloadFile = (data, contentType, fileName) => {
    const url = window.URL.createObjectURL(
      new Blob(new Uint32Array(data), {
        type: contentType,
      })
    );
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.target = "_blank";
    anchor.download = fileName;
    anchor.style = "display: none";

    document.body.appendChild(anchor);
    anchor.click();

    setTimeout(function () {
      document.body.removeChild(anchor);
    }, 100);
  };

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    const uf = await uploadFile(bucket, file.name, file.name);
    if(uf.status === 200) await fetchData();
  }

  const orderByName = () => {
    const orderedFiles = files;
    if (orderByNameDirection === "des") {
      setOrderByNameDirection("asc");
      orderedFiles.sort((a, b) => a.name + b.name);
    } else if (orderByNameDirection === "asc") {
      setOrderByNameDirection("des");
      orderedFiles.sort((a, b) => a.name - b.name);
    }
    setFiles([
      ...orderedFiles.map((of) => files.find((f) => f.name === of.name)),
    ]);
  };

  return (
    <>
      {props.token ? (
        <div className="home-container p-3">
          <h5>{bucket}</h5>
          {files ? (
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th className="d-flex justify-content-between">
                    File Name{" "}
                    <button onClick={orderByName}>
                      {orderByNameDirection}
                    </button>
                  </th>
                  <th>Size</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr
                    key={`${file.name}-${index}`}
                    onClick={() => hanleSelectFile(file)}
                  >
                    <td>{index}</td>
                    <td>{file.name}</td>
                    <td>{file.size}</td>
                    <td>{file.contentType}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Spinner className="spinner" animation="border" role="status" />
          )}
          <label className="mr-2" htmlFor="inputId">Upload File</label>
          <input
            id="inputId"
            type="file"
            onChange={handleUploadFile}
          ></input>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default connect((state) => state)(Bucket);

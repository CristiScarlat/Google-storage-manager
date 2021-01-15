import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { listBucketsByProject } from "../../services/googleStorageApi";
import { Table, Spinner } from "react-bootstrap";

function Home() {
  const token = localStorage.getItem("access_token");
  const [buckets, setBuckets] = useState(null);

  useEffect(() => {
    async function fetchBuckets() {
      const res = await listBucketsByProject();
      if (res.status === 200) setBuckets(res?.data?.items);
    }
    token && fetchBuckets();
  }, [token]);

  console.log({ token, buckets });

  return (
    <>
      {token ? (
        <div className="home-container p-3">
          <div>Buckets list </div>
          {buckets ? <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Bucket Name</th>
                <th>Storage Class</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {buckets.map((bucket, index) => (
                  <tr>
                    <td>{index}</td>
                    <td>{bucket.name}</td>
                    <td>{bucket.storageClass}</td>
                    <td>{bucket.location}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          : <Spinner className="spinner" animation="border" role="status"/>}
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Home;

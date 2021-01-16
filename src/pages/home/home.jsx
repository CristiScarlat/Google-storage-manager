import React, { useState, useEffect, useRef } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { listBucketsByProject } from "../../services/googleStorageApi";
import { Table, Spinner } from "react-bootstrap";

import './home.css';

function Home(props) {

  const [buckets, setBuckets] = useState(null);

  useEffect(() => {
    
    async function fetchBuckets() {
      const res = await listBucketsByProject();
      if (res.status === 200) setBuckets(res?.data?.items);
    }
    props.token && fetchBuckets();
  }, []);


  return (
    <>
      {props.token ? (
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
                  <tr key={`${bucket.name}-${index}`}>
                    <td>{index}</td>
                    <td><Link to={`/bucket-details/${bucket.name}`}>{bucket.name}</Link></td>
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

export default connect(state => state)(Home);

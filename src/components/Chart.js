import React from 'react';
import {Line} from 'react-chartjs-2'
import { gql } from "apollo-boost";

const getHistoricData = (client) => {
  client
  .query({
    query: gql`
      {
        getMetrics
      }
    `
  })
  .then(result => {
    console.log(result)
  })
}

const Chart = props => {
  const {client} = props
  console.log("client")
  console.log(client)

  return null
}

export default Chart
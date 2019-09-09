import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from "@material-ui/core/styles";
import { Line } from 'react-chartjs-2'
import { gql } from "apollo-boost";

const useStyles = makeStyles(theme => ({
  MuiFormGroup: {
    background: theme.palette.background.main,
    margin: "1em",
    float: "left"
  }
}));

// Chart Stuff
// const chartStyle = {
//   width: "60% !important",
//   height: "80vh !important"
// }
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
const data = {
  datasets: [
    {
      label: '# of Flowers',
      data: [12, 19, 3, 5, 2, 3],
    },
    {
      label: '# of Pencils',
      data: [1, 9, 13, 8, 12, 13],
    },
  ]
}

const MainContainer = props => {
  const metrics = props.metric.data.getMetrics
  const {client} = props
  
  const classes = useStyles();

  const initialStates = {}
  metrics.forEach( metric => {
    initialStates[metric] = false
  })
  
  const [state, setState] = React.useState(initialStates);
  
  const handleChange = (name) => event => {
    event.preventDefault()
    name = name.metric
    // console.log(name, event.target.checked)
    setState({ ...state, [name]: event.target.checked })
    console.log(state)
    // getLatestData(client, name, new Date().getTime())
    getHistoricData(client, name)
  };
  
  const getHistoricData = (client, inbound) => {
    let thirtyMinPrior = new Date().getTime() - (30 * 60 * 1000)
    let input = [`{ metricName: "${inbound}", after: ${thirtyMinPrior} }`]
    for (let item in state) {
      console.log(state[item])
      if (state[item] === true) {
        input.push(`{ metricName: "${item}", after: ${thirtyMinPrior} }`)
      }
    }
    console.log("input")
    console.log(input.join("\n"))
    client
    .query({
      query: gql`
      {
        getMultipleMeasurements(
          input: [${input.join("\n")}]
        ) {
          metric
          measurements {
            metric
            at
            value
            unit
          }
        }
      } 
      `
    })
    .then(result => {
      console.log(result)
      let newData = result.data.getMultipleMeasurements || []
      let dataSets = []
      newData.forEach(element => {
        let entry = {
          label: element.measurements[0].metric,
          data: element.measurements.map(x=>x.value)
        }
        console.log(entry)
        dataSets.push(entry)
      })
      data.dataSets = dataSets
    })
  }
  const getLatestData = (client, inbound, fromTimestamp) => {
    let input = [`{ metricName: "${inbound}", after: ${fromTimestamp} }`]
    for (let item in state) {
      console.log(state[item])
      if (state[item] === true) {
        input.push(`{ metricName: "${item}", after: ${fromTimestamp} }`)
      }
    }
    console.log("input")
    console.log(input.join("\n"))
    client
    .query({
      query: gql`
      {
        getMultipleMeasurements(
          input: [${input.join("\n")}]
        ) {
          metric
          measurements {
            metric
            at
            value
            unit
          }
        }
      } 
      `
    })
    .then(result => {
      console.log(result)
      
    })
  }
  const options = metrics.map( metric => {
    // console.log("line:", metric)
    return (
      <FormControlLabel
        key = {metric}
        control = {
          <Switch checked={state[metric]} onChange={handleChange({metric}, {client})} value={metric} color="primary" />
        }
        label ={metric}
        labelPlacement="start"
      />
    )
  })


  return (
    <div>
      <FormGroup className={classes.MuiFormGroup}>
        {options}
      </FormGroup>
      <Line data={data} options={chartOptions}/>
    </div>
  );
}

export default MainContainer
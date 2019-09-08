import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  MuiFormGroup: {
    background: theme.palette.background.main,
    margin: "1em",
    float: "left"
  }
}));

const MerticSwitch = props => {
  // console.log("props", props.metric)
  const metrics = props.metric.data.getMetrics
  const classes = useStyles();

  const [state, setState] = React.useState(false);

  const handleChange = name => event => {
    // console.log(name, event.target.checked)
    setState({ ...state, [name]: event.target.checked });
  };

  const options = metrics.map( metric => {
    // console.log("line:", metric)
    return (
      <FormControlLabel
        key={metric}
        control = {
          <Switch checked={state.metric} onChange={handleChange({metric})} value={metric} color="primary" />
        }
        label ={metric}
        labelPlacement="start"
      />
    )
  })


  return (
    <FormGroup className={classes.MuiFormGroup}>
      {options}
    </FormGroup>
  );
}

export default MerticSwitch
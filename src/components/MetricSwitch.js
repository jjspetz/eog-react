
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const MerticSwitch = props => {
  // console.log("props", props.metric)
  const metrics = props.metric.data.getMetrics

  const [state, setState] = React.useState(false);

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const options = metrics.map( x => {
    // console.log("line:", x)
    return (
      <FormControlLabel
        control={
          <Switch checked={state.x} onChange={handleChange({x})} value={x} />
        }
        label={x}
      />
    )
  })


  return (
    <FormGroup>
      {options}
    </FormGroup>
  );
}

export default MerticSwitch
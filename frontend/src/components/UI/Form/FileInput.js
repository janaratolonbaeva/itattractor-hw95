import React, {useRef, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  inputFile: {
    display: 'none'
  },
  inputText: {
    border: 'none',
    lineHeight: '36px',
    background: 'transparent'
  }
});

const FileInput = ({onChange, name, label}) => {
  const classes = useStyles();
  const inputRef = useRef();

  const [filename, setFilename] = useState('');

  const activateInput = () => {
    inputRef.current.click();
  };

  const onFileChange = e => {
    if (e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  return (
    <>
      <input
        type="file"
        name={name}
        className={classes.inputFile}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            onClick={activateInput}
          >
            Choose file
          </Button>
        </Grid>
        <Grid item>
          <input
            disabled
            value={filename}
            onClick={activateInput}
            placeholder="no file chosen"
            className={classes.inputText}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
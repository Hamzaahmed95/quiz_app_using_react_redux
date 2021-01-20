import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: "linear-gradient(45deg, #3C749C 30%, #3C749C 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 1px 1px 1px rgb(111, 115, 251)"
  }
};

function CustomButton(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button
      onClick={props.colorChange}
      className={clsx(classes.root, className)}
      {...other}
    >
      {children || props.text}
    </Button>
  );
}

CustomButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default withStyles(styles)(CustomButton);

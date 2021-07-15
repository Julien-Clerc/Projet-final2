import React, { Component } from 'react'

import { ThreeContext } from "../context";

export default () => (
    <ThreeContext.Consumer>
      {value => <h1>Hello {value.radio}!</h1>}
    </ThreeContext.Consumer>
);
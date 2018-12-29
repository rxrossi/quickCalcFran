import React, { Component } from "react"
import { Input, Paragraph, Divider, Label, Field } from "reakit"

const PERCENTAGE = 50

function processEntries(text) {
  const lines = text
    .split("\n")
    .filter(x => x !== "")
    .map(line => line.split(" ").filter(col => col !== ""))
    .filter(line => line.length > 0)

  const values = lines.map(line => {
    const valueIndex = line.length - 2

    return Number(line[valueIndex].replace(",", "."))
  })

  const sumOfValues = values.reduce((acc, curr) => acc + curr, 0)

  return {
    totalValue: sumOfValues,
    comission: (sumOfValues / 100) * PERCENTAGE
  }
}
class App extends Component {
  state = {
    totalValue: 0,
    comission: 0,
    lines: []
  }

  onChange = e => {
    this.setState(processEntries(e.target.value))
  }

  render() {
    const { totalValue, comission } = this.state
    return (
      <div
        style={{
          textAlign: "center"
        }}
      >
        <Field>
          <Label htmlFor="texto">Cole o texto abaixo</Label>
          <Input
            as="textarea"
            name="texto"
            onChange={this.onChange}
            rows={20}
            style={{
              width: "100%",
              border: "1px solid black"
            }}
          />
        </Field>
        <Divider />
        <div>
          <Paragraph>Total: {totalValue} </Paragraph>
          <Paragraph>Comissão: {comission} </Paragraph>
        </div>
      </div>
    )
  }
}

export default App

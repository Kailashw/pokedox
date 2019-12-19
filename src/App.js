import React from "react";
import "./App.css";
import SimpleTabs from "./containers/TabPanel";
import { Button } from '@material-ui/core';
import SimpleModal from "./component/Modal";

const API_URL = "https://5dfb223138678a00145fa952.mockapi.io/pokemons/"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      prevItems: [],
      undoFlag: false,
      checkedItems: [],
      tabs: [
        {
          label: "All",
          id: 0
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    fetch(API_URL+'/pokemons').then(response => response.json()).then(data=> this.setState({items : data , prevItems : data}))
  }

  onDragStart = (e, index) => {
    this.setState({ prevItems: this.state.items })
    this.draggedItem = this.state.items[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  onDragOver = index => {
    const draggedOverItem = this.state.items[index];
    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    // filter out the currently dragged item
    let items = this.state.items.filter(item => item !== this.draggedItem);
    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem);
    this.setState({ undoFlag: true, items });
  };

  resetOrder = () => {
    this.setState({ items: this.state.prevItems, undoFlag: false });
  }

  onDragEnd = () => {
    this.draggedIdx = null;
  };

  handleChange(e) {
    const item = parseInt(e.target.id);
    const isChecked = e.target.checked;
    let lis = this.state.checkedItems
    if (isChecked) {
      lis.push(item)
    } else {
      lis = lis.filter(el => el !== item);
    }
    this.setState({ checkedItems: lis })
  }

  onSave(res) {
    // add a tab to current tab list and 
    // call API to add tab and it's child in db
    // assign children to tab.
    if (res.categoryName) {
      this.state.tabs.push(
        {
          label: res.categoryName,
          id: this.state.tabs.length
        })
    } else {
      // push items to existing tab
    }
    this.setState({ checkedItems: [] })
  }

  render() {
    return (
      <div className="root1">
        <h1 style={{ textAlign: "center", backgroundColor: "yellow" }}> Pokedox</h1>
        <div>
          {
            this.state.undoFlag &&
            <Button variant="contained" color="secondary" onClick={() => this.resetOrder()}> Undo Last change </Button>
          }
          {
            this.state.checkedItems.length >= 2 &&
            <SimpleModal categories={this.state.tabs} save={this.onSave} />
          }
        </div>
        <div className="App">
          <SimpleTabs
            tabs={this.state.tabs}
            state={this.state}
            index={0}
            onDragStart={this.onDragStart}
            handleCheckbox={this.handleChange}
            onDragEnd={this.onDragEnd}
            onDragOver={this.onDragOver} />
        </div>
      </div>
    );
  }
}


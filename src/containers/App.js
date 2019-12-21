import React from "react";
import "./App.css";
import { connect } from 'react-redux';
import { fetchPokemons, fetchCategory, fetchCategories, deleteCategoryDetail, addNewCategory } from '../store/actions';
import PokemonCard from "../views/PokemonCard";
import { Button } from "@material-ui/core";
import AllPokemons from "./AllPokemons";
import CategoryPokemons from "./CategoryPokemons";

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      categoryId: 0,
      flush : false
    }
  }

  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchPokemons()
  }

  onTabChange = (id) => {
    this.setState({ categoryId: id })
    this.props.fetchCategory(id)
    this.setState({ flush : true })
  }

  deleteTab = (id) => {
    this.props.deleteCategoryDetail(id)
    this.onTabChange(0)
  }

  updateFlush = ()=>{
    this.setState({flush :false})
  }

  render() {
    const { pokemons, categories } = this.props
    const { categoryId, flush } = this.state
    return (
      <div style={{ backgroundColor: "yellow" }}>
        <h1 style={{ textAlign: "center" }}> Pokedox </h1>
        {/* <CategoriesList index={0} /> */}
        <div className="tabContainer">
          <div className="tab">
            {
              categories.map(el => <button className="tablinks" onClick={() => this.onTabChange(el.id)}> {el.name} </button>)
            }
          </div>
          <div style={{ backgroundColor: 'white' }}>
            {/** All Pokemons from 'All' Category goes here */}
            {
              parseInt(categoryId) === 0 &&
              <AllPokemons pokemons={pokemons} onTabChange={this.onTabChange}/>
            }
            {/** if not on 'All' Category, show delete option */}
            {
              parseInt(categoryId) !== 0 &&
              <Button variant="contained" color="secondary" onClick={() => this.deleteTab(categoryId)}> Delete category </Button>
            }
            {/** Other Pokemons from 'different' Category goes here */}
            {
              parseInt(categoryId) !== 0 &&
              <CategoryPokemons updateFlush={this.updateFlush} flush={flush} pokemons={pokemons} onTabChange={this.onTabChange}/>
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { pokemons } = state
  return { pokemons: pokemons.pokemons, categories: pokemons.categories }
}

export default connect(
  mapStateToProps,
  { fetchPokemons, fetchCategories, fetchCategory, deleteCategoryDetail, addNewCategory }
)(App);
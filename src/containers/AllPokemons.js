import React from "react";
import "./App.css";
import { connect } from 'react-redux';
import { fetchPokemons, fetchCategory, fetchCategories, deleteCategoryDetail, addNewCategory } from '../store/actions';
import PokemonCard from "../views/PokemonCard";
import { Checkbox } from "@material-ui/core";
import SimpleModal from "../components/Modal";

class AllPokemons extends React.Component {
    constructor(props) {
        super()
        this.state = {
            checkedItems: []
        }
    }

    componentDidMount() {

    }

    handleCheckbox(e) {
        const item = parseInt(e.target.id);
        const isChecked = e.target.checked;
        let checkedItems = this.state.checkedItems
        if (isChecked) {
            checkedItems.push(item)
        } else {
            checkedItems = checkedItems.filter(el => el !== item);
        }
        this.setState({ checkedItems: checkedItems })
    }

    onSave = (res) => {
        const { categories } = this.props
        const { checkedItems } = this.state
        if(res.categoryId){
            // different logic for adding to current category
        }
        res.pokeIds = checkedItems
        res.id = categories[categories.length-1].id
        this.props.addNewCategory(res)
        this.setState({ checkedItems : [] })
        this.props.onTabChange(0)
    }

    render() {
        const { pokemons, categories } = this.props
        const { checkedItems } = this.state
        return (
            <div>
                {
                    checkedItems.length > 1 &&
                    <SimpleModal categories={categories} save={this.onSave} />
                }
                {
                    pokemons.map(el => {
                        return (
                            <>
                                <Checkbox
                                    id={String(el.id)}
                                    checked={checkedItems.indexOf(el.id) > -1}
                                    onChange={(e) => this.handleCheckbox(e)}
                                    value="primary"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <PokemonCard item={el} />
                            </>)
                    })
                }
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
)(AllPokemons);
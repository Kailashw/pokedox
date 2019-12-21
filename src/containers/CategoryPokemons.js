import React from "react";
import "./App.css";
import { connect } from 'react-redux';
import { fetchPokemons, fetchCategory, fetchCategories, deleteCategoryDetail, addNewCategory } from '../store/actions';
import PokemonCard from "../views/PokemonCard";
import { Button } from "@material-ui/core";
import { isEqual } from "../Utility/helper";
class AllPokemons extends React.Component {
    constructor(props) {
        super()
        this.state = {
            categoryPokemons: [],
            prevItems: [],
            undoFlag : false
        }
    }

    componentDidMount() {
        const { pokemons } = this.props
        this.setState({ categoryPokemons: pokemons, prevItems: pokemons })
    }

    componentDidUpdate(){
        if(this.props.flush){
            this.setState({
                categoryPokemons : this.props.pokemons,
                prevItems: this.props.pokemons,
                undoFlag : false
            })
            this.props.updateFlush()
        }
    }

    componentWillUnmount() {
        this.state = {
            categoryPokemons: [],
            prevItems: []
        }
    }
    
    onDragStart = (e, index) => {
        this.setState({ prevItems: this.state.categoryPokemons })
        this.draggedItem = this.state.categoryPokemons[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    onDragOver = index => {
        const draggedOverItem = this.state.categoryPokemons[index];
        // if the item is dragged over itself, ignore
        if (this.draggedItem === draggedOverItem) {
            return;
        }
        // filter out the currently dragged item
        let items = this.state.categoryPokemons.filter(item => item !== this.draggedItem);
        // add the dragged item after the dragged over item
        items.splice(index, 0, this.draggedItem);
        this.setState({ undoFlag: true, categoryPokemons: items });
    };

    resetOrder = () => {
        this.setState({ categoryPokemons: this.state.prevItems, undoFlag: false });
    }

    onDragEnd = () => {
        this.draggedIdx = null;
    };

    render() {
        return (
            <>
            { this.state.undoFlag && <Button variant="contained" color="default" onClick={() => this.resetOrder()}> Undo Ordering </Button> }
            {/** save button for sorting */}
            {
            this.state.categoryPokemons.map((item, idx) => (
                <li style={{ listStyle: "none" }} key={item.id} onDragOver={() => this.onDragOver(idx)}>
                    <div
                        key={idx}
                        className="drag"
                        draggable
                        onDragStart={e => this.onDragStart(e, idx)}
                        onDragEnd={() => this.onDragEnd()}
                    >
                        <PokemonCard item={item} />
                    </div>
                </li>
            ))}
            </>
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
import { Button, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newItem: ' ',
            list: [],
        }
    }

    //incorporating local storage 
    componentDidMount() {
        this.hydrateStateWithLocalStorage();

        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );

        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }

    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = localStorage.getItem(key);

                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                }
            }
        }
    }

    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }

    updateInput(key, value) {
        // update react state
        this.setState({ [key]: value });
    }

    addItem(e) {

        e.preventDefault()
        // create a new item with unique id
        const newItem = {
            id: 1 + Math.random(),
            value: this.state.newItem.slice()

        };

        // copy current list of items
        const list = [...this.state.list];

        console.log(newItem.value)

        // add the new item to the list
        if(newItem.value !== ''){
        list.push(newItem);
        }


        // update state with new list, reset the new item input
        this.setState({
            list,
            newItem: ""
        });
    }

    deleteItem(id) {
        // copy current list of items
        const list = [...this.state.list];
        // filter out the item being deleted
        const updatedList = list.filter(item => item.id !== id);

        this.setState({ list: updatedList });
    }
    



    render = () =>

    
    <div className="container p-1">
            <div className="alert alert-primary text-center text-white bg-secondary m-1">
                <h1>ToDo </h1>
                <h3>Add a Item ...</h3>
            </div>
    {console.log(this.state.newItem)}

            <form className='center' onSubmit={(e) => this.addItem(e)}>
                <TextField
                    className="input-group-text"
                    type='text'
                    placeholder='Type item here'
                    value={this.state.newItem}
                    onChange={e => this.updateInput('newItem', e.target.value)} />

                <Button
                    className="btn btn-primary"
                    variant="outlined"
                    color="inherit"
                    onClick={() => this.addItem()}>
                    Add
                </Button>

            </form>

            <List>
                {this.state.list.map((item) => {
                    return (
                        <ListItem
                            key={item.value}
                            button
                            selected={item.selected}
                            onClick={() => this.deleteItem(item.id)}>
                            <ListItemText primary={item.value} />

                        </ListItem>
                    )
                })}
            </List>
        </div>

}

export default App;
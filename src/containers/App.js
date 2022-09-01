import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
// import { robots } from './robots';
import './App.css'; 


function App() {
    // constructor() {
    //     super()
    //     this.state = {
    //         // robots: robots, 
    //         robots: [],
    //         searchfield:''
    //     }
    //     console.log('constructor');
    // }
    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')
    const [count, setCount] = useState(0)

    // componentDidMount() {
        // console.log(this.props.store.getState()); //查看元素
    //     // this.setState({ robots: robots })
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(users => this.setState({ robots: users }))
    //     console.log('componentDidMount');
    // }
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users))
        // console.log(robots, searchfield); //查看元素
        // console.log(count); //查看計數
    },[])

    const onSearchChange = (event) => {
        setSearchfield( event.target.value )
        // console.log(event.target.value);
        // console.log(filteredRobots);
    }
    const filteredRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    console.log('render');
    return !robots.length ?
        <h1>Loading</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <button onClick={()=>setCount(count+1)}>Click Me!</button>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={ filteredRobots } />
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    
}

export default App;
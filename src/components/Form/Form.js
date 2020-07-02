import React from 'react'
import '../App/App.css';

export class Form extends React.Component {
    constructor(props){
        super(props)

        this.state= {
            arr: [],
            query: 'jurassic', 
            loading: true,
        }
    }
    componentDidMount(){
        const query = this.state.query

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=4606511efdb3d2482e0640646d012b0e&language=en-US&query=${query}&page=1&include_adult=false`)
            .then(res => res.json())
            .then(json => this.setState({ arr: json, loading: false})
            )
            .catch(err => { console.log('error: ', err) })
    }

    handleChange(e) {
        e.preventDefault()
        this.setState({query: e.target.value})
        console.log(this.state.query)

    }

    onButtonClicked(e){
        e.preventDefault()
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=4606511efdb3d2482e0640646d012b0e&language=en-US&query=${this.state.query}&page=1&include_adult=false`)
            .then(res => res.json())
            .then(json => this.setState({ arr: json, loading: false})
            )
            .catch(err => { console.log('error: ', err) })
        console.log(this.state.arr, 'array')
    }
    render() {
       const {loading} = this.state
    

        return (
            <div>
                {loading
                ?
                <h1>Loading</h1>
                :
                <>
                    <form className="form" onSubmit={this.onButtonClicked.bind(this)}>
                        <label className="label" for="search">Search Items</label>
                        <input className="input" type="text" name="search" placeholder="i.e. Jurassic Park" onChange={this.handleChange.bind(this)} value={this.state.query}/>
                        <button className="button">Submit</button>
                    </form>
                    <div className="card-list">
                        {this.state.arr.results.filter(movie => movie.poster_path).map((movie) =>{
                            return(
                            <div className="card" key={movie.id}>
                                <img className="card--image"
                                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                                alt={movie.title + ' poster'}
                                />
                                <div className="card--content">
                                <h3 className="card--title">{movie.title}</h3>
                                <p><small>RELEASE DATE: {movie.release_date}</small></p>
                                <p><small>RATING: {movie.vote_average}</small></p>
                                <p className="card--desc">{movie.overview}</p>
                                </div>
                            </div>)
                        })}
                    </div>
                </>
                }
                
            </div>
        );
    }
}

export default Form;

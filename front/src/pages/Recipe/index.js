import './index.css'

import Header from '../../components/Header/index'
import Footer from '../../components/Footer/index'
import NotAuth from '../NotAuth/index';


function Recipe(props ) {
    if(props.location.params === undefined)
        props.location.params = {data:null}
    
    var data = props.location.params.data;

    function groupIngredient() {
        let ingredients = [
            { ingredient: data.strIngredient1, measure: data.strMeasure1 },
            { ingredient: data.strIngredient2, measure: data.strMeasure2 },
            { ingredient: data.strIngredient3, measure: data.strMeasure3 },
            { ingredient: data.strIngredient4, measure: data.strMeasure4 },
            { ingredient: data.strIngredient5, measure: data.strMeasure5 },
            { ingredient: data.strIngredient6, measure: data.strMeasure6 },
            { ingredient: data.strIngredient7, measure: data.strMeasure7 },
            { ingredient: data.strIngredient8, measure: data.strMeasure8 },
            { ingredient: data.strIngredient9, measure: data.strMeasure9 },
            { ingredient: data.strIngredient10, measure: data.strMeasur10 },
            { ingredient: data.strIngredient11, measure: data.strMeasure11 },
            { ingredient: data.strIngredient12, measure: data.strMeasure12 },
            { ingredient: data.strIngredient13, measure: data.strMeasure13 },
            { ingredient: data.strIngredient14, measure: data.strMeasure14 },
            { ingredient: data.strIngredient15, measure: data.strMeasure15 },
            { ingredient: data.strIngredient16, measure: data.strMeasure16 },
            { ingredient: data.strIngredient17, measure: data.strMeasure17 },
            { ingredient: data.strIngredient18, measure: data.strMeasure18 },
            { ingredient: data.strIngredient19, measure: data.strMeasure19 },
            { ingredient: data.strIngredient20, measure: data.strMeasure20 }
        ]
        let filtered = ingredients.filter(function (el) {
            if (el.ingredient !== "" || el.ingredient !== null)
                return el;
        });
        return filtered;

    }


    function groupString() {
        return data.strInstructions.split('.')
    }



    return (
        <>
            {props.location.params.data ? <>
                <Header />
                <div className="Recipe">

                    <h1>{data.strMeal}</h1>
                    {/* <img src={props.location.params.data.strMealThumb} /> */}
                    <img src={data.strMealThumb} alt="foodImage"></img>
                    <h3>Ingredients</h3>
                    <div className="lists">

                        {groupIngredient().map((e, index) => (
                            <div key={index} className="ingredient">
                                <p> {e.ingredient} </p>
                                <p> {e.measure} </p>
                            </div>
                        ))
                        }
                    </div>
                    <h3>Instructions</h3>
                    {groupString().map((el, index) => <p className="struction" key={index}>{el}.</p>)}

                </div>
                <Footer />
            </>
                : <NotAuth />}
        </>

    );
}



export default Recipe;



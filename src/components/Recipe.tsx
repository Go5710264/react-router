import { Link, useParams } from 'react-router-dom';
import { TitleDescription } from './data/recipes';
import { RECIPES } from './data/recipes';
import { useState, useEffect } from 'react'

const fetch = (rId: string | undefined) : Promise<unknown> => {
    const recipeData = new Promise((resolve, reject) => {

        const recipe = Object.entries(RECIPES)
            .find(([id]) => { // перебор массива объектов
                return id === rId;
            });

        if(recipe) return resolve(recipe[1]);
        return reject('Error')
        
    })
    return recipeData;
}

type RecipeId = {
    rId?: string
}

const Recipe = () : JSX.Element => {
    const [recipe, setRecipe] = useState<TitleDescription | undefined>(undefined);
    const { rId }  : RecipeId  = useParams<string>();

    useEffect(() => {
        fetch(rId)
            .then((data: TitleDescription)  => setRecipe(data))
            .catch((e: string) : unknown  => {
                console.log(e);
                return setRecipe(undefined);
            })
    }), [rId]

    if (!recipe) return (
        <div>Рецепт не найден, перейти к <Link to='/'>списку рецептов</Link></div>
    )

    return (
        <div className='recipe' key={rId}>
            <h3 className='recipe__title'>{recipe.title}</h3>
            <p className='recipe__description'>{recipe.description}</p>
        </div>
    );
}

export default Recipe;
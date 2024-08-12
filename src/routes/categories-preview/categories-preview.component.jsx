import React, { useContext } from 'react'
import { CategoriesContext } from '../../context/categories.context';
import CategoryPreview from '../../component/category-preview/category-preview.component';

export default function CategoriesPreview() {
    const { categoriesMap } = useContext(CategoriesContext);
    return (
        <React.Fragment>
            {
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            }
        </React.Fragment>
    )
}

import { Link } from 'react-router-dom';
import './directory-item.styles.scss'

import React from 'react'

export default function DirectoryItem({ category }) {
    const { imageUrl, title } = category;
    return (
        <Link className="directory-item-container" to={`/shop/${title}`} >
            <div className="background-image"  style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className="directory-item-body">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </Link>
    )
}

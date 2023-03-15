import { FC } from "react";

import imageIngredientLayout from './image-ingredient.module.css'

const ImageIngredient: FC<{ src: string, name: string }> = ({ src, name }) => {
  return (
    <div className={imageIngredientLayout.gradientBox}>
      <img className={imageIngredientLayout.image} src={src} alt={name}></img>
    </div>
  )
}

export default ImageIngredient

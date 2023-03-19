import { FC } from "react";

import { letters } from '../../utils';
import imgWithRestLayout from './img-with-rest.module.css'

const ImgWithRest: FC<{ src: string, name: string, count?: string | null}> = ({ src, name, count = null }) => {
  return (
    <>
      <div className={imgWithRestLayout.boxMain}>
        <div className={imgWithRestLayout.boxUnit1}>
          <div className={imgWithRestLayout.gradientBox}>
            <img className={imgWithRestLayout.image} src={src} alt={name}></img>
          </div>
        </div>
        {count &&
          <div className={imgWithRestLayout.boxUnit2}>
            <div className={imgWithRestLayout.gradientBox}>
              <span className={`${imgWithRestLayout.count} ${letters}`}>{count}</span>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default ImgWithRest;

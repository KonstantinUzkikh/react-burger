import { FC } from "react";

import { letters } from '../../utils/types';
import tooMuchLayout from './too-much.module.css'

const TooMuch: FC<{ count: string }> = ({ count }) => {
  return (
    <div className={tooMuchLayout.gradientBox}>
      <span className={`${tooMuchLayout.count} ${letters}`}>{count}</span>
    </div>
  )
}

export default TooMuch

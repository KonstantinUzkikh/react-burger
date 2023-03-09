import { FC } from "react";

import { h1_type } from '../utils/types';
import feedLayout from './feed.module.css'

const FeedPage: FC = () => {
  return (
    <div className={feedLayout.boxPage}>
      <h1 className={`${h1_type} mb-5`}>Лента заказов</h1>
    </div>
  )
}

export default FeedPage

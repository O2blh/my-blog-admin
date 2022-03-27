import React from 'react'
import { Pie } from '@ant-design/plots'

import './style.css'
import { useClassify } from '../../../hooks'

const ArticleOverView = () => {
  const [classifies] = useClassify()
  const data = classifies
    .filter((item) => {
      return item.count > 0
    })
    .map((classify) => {
      return {
        type: classify.classify,
        value: classify.count,
      }
    })
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    autoFit: true,
    legend: false,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  }
  return (
    <div className="chartBox">
      <div className="chartTitle">文章概览</div>
      <Pie {...config} />
    </div>
  )
}

export default ArticleOverView

import React from 'react'
import { Pie } from '@ant-design/plots'

import './style.css'
import { useClassify } from '@/hooks'

const ArticleOverView = () => {
  const [classifies] = useClassify()
  // const data = classifies
  //   .filter((item) => {
  //     return item.count > 0
  //   })
  //   .map((classify) => {
  //     return {
  //       type: classify.classify,
  //       value: classify.count,
  //     }
  //   })
  // const config = {
  //   appendPadding: 10,
  //   data,
  //   angleField: 'value',
  //   colorField: 'type',
  //   radius: 0.8,
  //   legend: false,
  //   label: {
  //     type: 'outer',
  //     content: '{name} {percentage}',
  //   },
  //   interactions: [
  //     {
  //       type: 'pie-legend-active',
  //     },
  //     {
  //       type: 'element-active',
  //     },
  //   ],
  // }
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <div className="chartBox">
      <div className="chartTitle">文章概览</div>
      <Pie {...config} />
    </div>
  )
}

export default React.memo(ArticleOverView)

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { cloneDeep } from 'lodash'

Vue.use(VueRouter)


const routes1 = [
  {
      path: '/home'
  },
  {
      path: '/system',
      children: [
          {
              path: 'name1'
          },
          {
              path: 'name2'
          },
          {
              path: '/system/name3'
          },
          // {
          //     path: '/name4'
          // },
      ]
  }
]

console.log(routes1,"sss")

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about/:id',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: 'name1',
        name: 'name1',
        component: () => import(/* webpackChunkName: "about" */ '../views/Name1.vue')
      }
    ]
  },
  {
    path: '/home',
    name: 'hhome'
  },
  {
    path: '/system',
    name: 'system',
    children: [
      {
        path: 'name1',
        name: 'name1',
        component: () => import(/* webpackChunkName: "about" */ '../views/Name1.vue')
      },
      {
        path: 'name2'
      },
      {
        path: '/system/name3'
      },
      {
        path: '/name4'
      },
    ]
  }
]

// function intersection(a, b, fn) {
//   let arrays = [a, b];
//   arrays.reduce((accumulator, currentValue) =>
//     accumulator.filter((item) => {
//       return fn.call(this, a, b)
//     })
    
//     // currentValue.includes(item))
//   )
// };

// let a = {x:1,y:4,f:9}
// intersection()

function intersectionTwoArrayByProperty (arr1, arr2, fn) {
  let res = []
  for(let i = 0; i<arr1.length; i++) {
    for(let j = 0; j<arr2.length; j++) {
      console.log(arr1[i], arr2[j], 'fn(arr1[i], arr2[j])');
      if(fn(arr1[i], arr2[j])) {
        res.push(arr2[j])
      }
    }
  }
  return res
}

function filterRouter(remoteRoutes, clientRoutes) {
  //取两个数组中根据path属性相同的值
  //如果有children递归
  clientRoutes = cloneDeep(clientRoutes)
  console.log(remoteRoutes, clientRoutes);
  let nowPath = intersectionTwoArrayByProperty(remoteRoutes, clientRoutes, (a, b)=>{
    let hasChildren = Boolean(a.children && b.children);
    console.log(hasChildren, 'hasChildren');
    if(a.path == b.path && hasChildren) {
      //将children递归筛选一下
      b.children = filterRouter(a.children, b.children)
      console.log(b.children, 'b.children');
    }
    return a.path === b.path
  })
  console.log(nowPath);
  return nowPath
}

let res = filterRouter(routes, routes1)
console.log(res, 'res');

const router = new VueRouter({
  routes
})

export default router





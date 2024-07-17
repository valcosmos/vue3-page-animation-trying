import gsap from 'gsap'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

const animatePageIn = () => {
  const bannerOne = document.getElementById('banner-1')
  const bannerTwo = document.getElementById('banner-2')
  const bannerThree = document.getElementById('banner-3')
  const bannerFour = document.getElementById('banner-4')

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline()

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 100,
      stagger: 0.2,
    })
  }
}

const animatePageOut = (next) => {
  const bannerOne = document.getElementById('banner-1')
  const bannerTwo = document.getElementById('banner-2')
  const bannerThree = document.getElementById('banner-3')
  const bannerFour = document.getElementById('banner-4')
  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline()
    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: -100
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
      stagger: 0.2,
      onComplete: () => {
        next()
        animatePageIn()
      }
    })
  }
}

router.beforeEach((to, from, next) => {
  animatePageOut(next)
})

export default router

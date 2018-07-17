import Loadable from "react-loadable"
import { Loading } from "0-components"
const loadPage = path => Loadable({
    loader: () => import(`./${path}`),
    loading: Loading
})

const Home = loadPage("0-home")
const Details = loadPage("1-details")

export default [
    {
        path: "/my",
        component: Home
    },
    {
        path: "/my_:id",
        component: Details
    }
]
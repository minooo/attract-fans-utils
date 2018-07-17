import Loadable from "react-loadable"
import { Loading } from "0-components"

const loadPage = path => Loadable({
    loader: () => import(`./${path}`),
    loading: Loading
})

const Home = loadPage("0-home")
const Search = loadPage("1-search")

export default [
    {
        path: "/",
        component: Home
    },
    {
        path: "/search",
        component: Search
    }
]
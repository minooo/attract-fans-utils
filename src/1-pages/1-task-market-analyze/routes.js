import Loadable from "react-loadable"
import { Loading } from "0-components"
const loadPage = path => Loadable({
    loader: () => import(`./${path}`),
    loading: Loading
})

const UsersAnalyze = loadPage("0-users-analyze")
const TaskOkAnalyze = loadPage("1-task-ok-analyze")
const PrizeDisbution = loadPage("2-prize-disbution")

export default [
    {
        path: "/users-analyze",
        component: UsersAnalyze
    },
    {
        path: "/task-ok-analyze",
        component: TaskOkAnalyze
    },
    {
        path: "/prize-disbution",
        component: PrizeDisbution
    }
]
